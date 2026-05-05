#!/usr/bin/env bun
/**
 * Merges per-source backfill fixtures into a unified preview that mirrors
 * what D1 will look like after `INSERT ... ON CONFLICT(phone) DO UPDATE` runs
 * across all sources. Lets Sid spot-check cross-source dedup before D1 insert.
 *
 * Reads:  data/migration/_fixtures/{tally,whatsapp,firestore,substack,luma}-{people,enrollments}.json
 * Writes: data/migration/_fixtures/merged-{people,enrollments,stats}.json
 *
 * Identity resolution: phone-first, email-fallback (mirrors D1 partial UNIQUE
 * indexes). Per-source script-local UUIDs are remapped to canonical UUIDs;
 * enrollment.person_id is rewritten to the canonical id.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { PersonRow, EnrollmentRow } from './_lib/migration-types'

const REPO_ROOT = join(import.meta.dir, '..')
const FIX_DIR = join(REPO_ROOT, 'data/migration/_fixtures')

const SOURCES = ['tally', 'whatsapp', 'firestore', 'substack', 'luma'] as const
type SourceName = (typeof SOURCES)[number]

type SourceCount = { source: SourceName; people: number; enrollments: number }
type CrossSourceMatch = { canonicalId: string; sources: SourceName[]; phone: string | null; email: string | null }
type MergeStats = {
  per_source: SourceCount[]
  total_canonical_people: number
  total_enrollments: number
  cross_source_dedup_count: number     // people present in 2+ sources
  cross_source_matches_sample: CrossSourceMatch[]  // first 10 for spot-check
  conflicts: Array<{ phone: string | null; email: string | null; sources: SourceName[]; reason: string }>
}

function loadOptional<T>(path: string): T[] {
  if (!existsSync(path)) return []
  return JSON.parse(readFileSync(path, 'utf-8')) as T[]
}

function pickRicher(a: PersonRow, b: PersonRow): PersonRow {
  // When merging two records for the same person, keep the richer values.
  // First-seen `id`, `created_at`, `source` win; later fields fill nulls.
  return {
    id: a.id,
    phone: a.phone ?? b.phone,
    email: a.email ?? b.email,
    full_name: a.full_name ?? b.full_name,
    visa_status: a.visa_status ?? b.visa_status,
    source: a.source, // first-seen — D1 inserter can append ',+other' if Sid wants
    created_at: a.created_at < b.created_at ? a.created_at : b.created_at,
    updated_at: a.updated_at > b.updated_at ? a.updated_at : b.updated_at,
    notes: a.notes ?? b.notes,
  }
}

function main() {
  const byPhone = new Map<string, string>()    // phone → canonical id
  const byEmail = new Map<string, string>()    // email → canonical id
  const canonical = new Map<string, PersonRow>() // canonical id → row
  const remap = new Map<string, string>()      // script-local id → canonical id
  const sourceMembership = new Map<string, Set<SourceName>>() // canonical id → sources seen
  const perSource: SourceCount[] = []
  const conflicts: MergeStats['conflicts'] = []

  for (const source of SOURCES) {
    const peoplePath = join(FIX_DIR, `${source}-people.json`)
    const enrollPath = join(FIX_DIR, `${source}-enrollments.json`)
    const people = loadOptional<PersonRow>(peoplePath)
    const enrollments = loadOptional<EnrollmentRow>(enrollPath)
    perSource.push({ source, people: people.length, enrollments: enrollments.length })

    for (const p of people) {
      const phoneHit = p.phone ? byPhone.get(p.phone) : undefined
      const emailHit = p.email ? byEmail.get(p.email) : undefined

      if (phoneHit && emailHit && phoneHit !== emailHit) {
        conflicts.push({
          phone: p.phone,
          email: p.email,
          sources: [source, ...(sourceMembership.get(phoneHit) ?? new Set()), ...(sourceMembership.get(emailHit) ?? new Set())] as SourceName[],
          reason: 'phone+email match different canonical people',
        })
        // phone wins (identity key #1)
        remap.set(p.id, phoneHit)
        sourceMembership.get(phoneHit)!.add(source)
        continue
      }

      const canonicalId = phoneHit || emailHit
      if (canonicalId) {
        const existing = canonical.get(canonicalId)!
        const merged = pickRicher(existing, p)
        canonical.set(canonicalId, merged)
        if (p.phone && !byPhone.has(p.phone)) byPhone.set(p.phone, canonicalId)
        if (p.email && !byEmail.has(p.email)) byEmail.set(p.email, canonicalId)
        remap.set(p.id, canonicalId)
        sourceMembership.get(canonicalId)!.add(source)
      } else {
        const newId = randomUUID()
        canonical.set(newId, { ...p, id: newId })
        if (p.phone) byPhone.set(p.phone, newId)
        if (p.email) byEmail.set(p.email, newId)
        remap.set(p.id, newId)
        sourceMembership.set(newId, new Set([source]))
      }
    }
  }

  // Second pass: load enrollments, remap person_id, dedup on (person_id, program, cohort).
  const enrollMap = new Map<string, EnrollmentRow>()
  const statusRank: Record<string, number> = { applied: 1, paid: 2, active: 3, completed: 4, churned: 5, refunded: 6 }
  let totalEnrollmentsSeen = 0

  for (const source of SOURCES) {
    const enrollments = loadOptional<EnrollmentRow>(join(FIX_DIR, `${source}-enrollments.json`))
    totalEnrollmentsSeen += enrollments.length
    for (const e of enrollments) {
      const canonicalPersonId = remap.get(e.person_id)
      if (!canonicalPersonId) {
        conflicts.push({ phone: null, email: null, sources: [source], reason: `enrollment ${e.id} references unknown person ${e.person_id}` })
        continue
      }
      const remapped = { ...e, person_id: canonicalPersonId }
      const key = `${canonicalPersonId}|${e.program}|${e.cohort}`
      const existing = enrollMap.get(key)
      if (!existing || (statusRank[e.status] ?? 0) >= (statusRank[existing.status] ?? 0)) {
        enrollMap.set(key, remapped)
      }
    }
  }

  const peopleArr = Array.from(canonical.values())
  const enrollmentsArr = Array.from(enrollMap.values())

  // Cross-source overlap stats
  const multiSource = Array.from(sourceMembership.entries()).filter(([, s]) => s.size > 1)
  const crossSourceMatches: CrossSourceMatch[] = multiSource.slice(0, 10).map(([id, sources]) => {
    const row = canonical.get(id)!
    return { canonicalId: id, sources: Array.from(sources), phone: row.phone, email: row.email }
  })

  const stats: MergeStats = {
    per_source: perSource,
    total_canonical_people: peopleArr.length,
    total_enrollments: enrollmentsArr.length,
    cross_source_dedup_count: multiSource.length,
    cross_source_matches_sample: crossSourceMatches,
    conflicts,
  }

  writeFileSync(join(FIX_DIR, 'merged-people.json'), JSON.stringify(peopleArr, null, 2))
  writeFileSync(join(FIX_DIR, 'merged-enrollments.json'), JSON.stringify(enrollmentsArr, null, 2))
  writeFileSync(join(FIX_DIR, 'merged-stats.json'), JSON.stringify(stats, null, 2))

  console.log(`✅ merge complete`)
  for (const s of perSource) {
    console.log(`   ${s.source.padEnd(10)} → ${String(s.people).padStart(5)} people · ${String(s.enrollments).padStart(5)} enrollments`)
  }
  console.log(`   ──────────────────────────────────────────────`)
  console.log(`   canonical people:        ${peopleArr.length}`)
  console.log(`   total enrollments:       ${enrollmentsArr.length} (deduped from ${totalEnrollmentsSeen})`)
  console.log(`   cross-source dedup:      ${multiSource.length} people present in 2+ sources`)
  console.log(`   conflicts:               ${conflicts.length}`)
  console.log(`   → ${FIX_DIR}/merged-*.json`)
}

main()
