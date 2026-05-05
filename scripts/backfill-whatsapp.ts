#!/usr/bin/env bun
/**
 * Reads data/migration/whatsapp/community-1098-enriched.csv (1,084 of 1,088
 * members with E.164 phones — 99.6% coverage) and emits people/enrollments
 * fixture JSONs the D1 inserter consumes.
 *
 * Run: bun scripts/backfill-whatsapp.ts
 * Output: data/migration/_fixtures/whatsapp-{people,enrollments,skipped}.json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { parse } from 'csv-parse/sync'
import { normalizePhoneE164 } from './_lib/normalize'
import type { PersonRow, EnrollmentRow, SkippedRow } from './_lib/migration-types'

const REPO_ROOT = join(import.meta.dir, '..')
const CSV_PATH = join(REPO_ROOT, 'data/migration/whatsapp/community-1098-enriched.csv')
const OUT_DIR = join(REPO_ROOT, 'data/migration/_fixtures')

const SOURCE = 'whatsapp:community'
const PROGRAM = 'whatsapp_community'
const WHATSAPP_GROUPS = ['community'] as const

// Captured May 5, 2026 via /cdp scrape of WA Web (see EXECUTION.md).
// Hardcoded so re-runs after git checkout / cp don't drift via mtime.
const APPLIED_AT = '2026-05-05T00:00:00Z'

type CsvRow = { display_name: string; phone_e164: string; phone_raw: string; description: string }

function isSelfRow(row: CsvRow): boolean {
  // WA export labels Sid's own row "You". Distinct from import-whatsapp-csv.ts
  // which detects Sid by phone — different data shapes.
  return row.display_name.trim().toLowerCase() === 'you'
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const csvText = readFileSync(CSV_PATH, 'utf-8')
  const rows = parse(csvText, { columns: true, skip_empty_lines: true, relax_quotes: true }) as CsvRow[]

  const people: PersonRow[] = []
  const enrollments: EnrollmentRow[] = []
  const skipped: SkippedRow[] = []
  const phoneToRowNum = new Map<string, number>()

  rows.forEach((row, i) => {
    const csvRowNum = i + 2 // +1 for header, +1 for 1-indexed display
    const identifier = `row${csvRowNum}:${row.display_name.trim() || '(blank)'}`

    if (isSelfRow(row)) {
      skipped.push({ source: SOURCE, identifier, reason: 'self (Sid) — handled separately' })
      return
    }

    const phone = normalizePhoneE164(row.phone_e164)
    if (!phone) {
      skipped.push({ source: SOURCE, identifier, reason: 'no phone — admin queue' })
      return
    }

    const dupOfRow = phoneToRowNum.get(phone)
    if (dupOfRow !== undefined) {
      skipped.push({ source: SOURCE, identifier, reason: `duplicate phone — kept row ${dupOfRow}` })
      return
    }
    phoneToRowNum.set(phone, csvRowNum)

    const id = randomUUID()
    const fullName = row.display_name.trim() || null
    const description = row.description.trim() || null

    people.push({
      id,
      phone,
      email: null,
      full_name: fullName,
      visa_status: null,
      source: SOURCE,
      created_at: APPLIED_AT,
      updated_at: APPLIED_AT,
      notes: null,
    })

    const metadata: Record<string, unknown> = { whatsapp_groups: WHATSAPP_GROUPS }
    if (description) metadata.whatsapp_about = description

    enrollments.push({
      id: randomUUID(),
      person_id: id,
      program: PROGRAM,
      cohort: '',
      status: 'active',
      payment_method: 'free',
      amount_cents: 0,
      applied_at: APPLIED_AT,
      paid_at: null,
      churned_at: null,
      metadata_json: JSON.stringify(metadata),
    })
  })

  writeFileSync(join(OUT_DIR, 'whatsapp-people.json'), JSON.stringify(people, null, 2))
  writeFileSync(join(OUT_DIR, 'whatsapp-enrollments.json'), JSON.stringify(enrollments, null, 2))
  writeFileSync(join(OUT_DIR, 'whatsapp-skipped.json'), JSON.stringify(skipped, null, 2))

  console.log(`✅ whatsapp backfill complete`)
  console.log(`   csv rows:      ${rows.length}`)
  console.log(`   people:        ${people.length}`)
  console.log(`   enrollments:   ${enrollments.length}`)
  console.log(`   skipped:       ${skipped.length}`)
  console.log(`   → ${OUT_DIR}/whatsapp-*.json`)

  if (skipped.length) {
    const reasons = new Map<string, number>()
    for (const s of skipped) reasons.set(s.reason, (reasons.get(s.reason) ?? 0) + 1)
    console.log(`\n   skipped breakdown:`)
    for (const [r, n] of reasons) console.log(`     ${n.toString().padStart(4)}  ${r}`)
  }
}

main()
