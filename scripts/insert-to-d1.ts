#!/usr/bin/env bun
/**
 * Reads the merged fixtures and emits a single SQL file the wrangler CLI
 * applies to D1. After D1 is renamed to `h1f-core` and migrations/0001_init.sql
 * has been applied, run:
 *
 *   wrangler d1 execute h1f-core --remote --file=data/migration/_fixtures/d1-load.sql
 *
 * Or for local dev:
 *   wrangler d1 execute h1f-core --local --file=data/migration/_fixtures/d1-load.sql
 *
 * Run: bun scripts/insert-to-d1.ts
 * Output: data/migration/_fixtures/d1-load.sql (gitignored — contains PII)
 *
 * Idempotency: each row INSERTs OR IGNOREs on the PRIMARY KEY (canonical UUID).
 * Re-running the same load script is safe. For genuine cross-run re-merge
 * (new sources added later), regenerate merged fixtures first.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import type { PersonRow, EnrollmentRow, RawSubmissionRow } from './_lib/migration-types'

const REPO_ROOT = join(import.meta.dir, '..')
const FIX_DIR = join(REPO_ROOT, 'data/migration/_fixtures')
const OUT_PATH = join(FIX_DIR, 'd1-load.sql')

function escapeSql(v: unknown): string {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'number') return String(v)
  if (typeof v === 'boolean') return v ? '1' : '0'
  // SQLite single-quote literal: escape ' as ''
  return `'${String(v).replace(/'/g, "''")}'`
}

function loadOptional<T>(path: string): T[] {
  return existsSync(path) ? (JSON.parse(readFileSync(path, 'utf-8')) as T[]) : []
}

function buildPersonInsert(p: PersonRow): string {
  const cols = ['id', 'phone', 'email', 'full_name', 'visa_status', 'source', 'created_at', 'updated_at', 'notes']
  const vals = [p.id, p.phone, p.email, p.full_name, p.visa_status, p.source, p.created_at, p.updated_at, p.notes]
  return `INSERT OR IGNORE INTO people (${cols.join(', ')}) VALUES (${vals.map(escapeSql).join(', ')});`
}

function buildEnrollmentInsert(e: EnrollmentRow): string {
  const cols = ['id', 'person_id', 'program', 'cohort', 'status', 'payment_method', 'amount_cents', 'applied_at', 'paid_at', 'churned_at', 'metadata_json']
  const vals = [e.id, e.person_id, e.program, e.cohort, e.status, e.payment_method, e.amount_cents, e.applied_at, e.paid_at, e.churned_at, e.metadata_json]
  return `INSERT OR IGNORE INTO enrollments (${cols.join(', ')}) VALUES (${vals.map(escapeSql).join(', ')});`
}

function buildRawInsert(r: RawSubmissionRow): string {
  const cols = ['id', 'form_source', 'submitted_at', 'person_id', 'payload_json']
  const vals = [r.id, r.form_source, r.submitted_at, r.person_id, r.payload_json]
  return `INSERT OR IGNORE INTO form_submissions_raw (${cols.join(', ')}) VALUES (${vals.map(escapeSql).join(', ')});`
}

function main() {
  const people = loadOptional<PersonRow>(join(FIX_DIR, 'merged-people.json'))
  const enrollments = loadOptional<EnrollmentRow>(join(FIX_DIR, 'merged-enrollments.json'))

  const rawRows = loadOptional<RawSubmissionRow>(join(FIX_DIR, 'merged-form_submissions.json'))

  if (!people.length || !enrollments.length) {
    console.error(`❌ No merged fixtures found. Run: bun scripts/merge-fixtures.ts first.`)
    process.exit(1)
  }

  // Verify enrollment.person_id references exist in people table
  const peopleIds = new Set(people.map((p) => p.id))
  const orphanEnrollments = enrollments.filter((e) => !peopleIds.has(e.person_id))
  if (orphanEnrollments.length) {
    console.error(`❌ ${orphanEnrollments.length} orphan enrollments — re-run merge-fixtures.ts.`)
    process.exit(1)
  }
  const orphanRaw = rawRows.filter((r) => !peopleIds.has(r.person_id))
  if (orphanRaw.length) {
    console.error(`❌ ${orphanRaw.length} orphan raw submissions — re-run merge-fixtures.ts.`)
    process.exit(1)
  }

  // D1's HTTP API treats each statement as auto-commit — BEGIN/COMMIT not
  // supported. Idempotency lives in INSERT OR IGNORE on PRIMARY KEY.
  const lines: string[] = [
    `-- D1 backfill data load — generated ${new Date().toISOString()}`,
    `-- Source: data/migration/_fixtures/merged-{people,enrollments,form_submissions}.json`,
    `-- Apply: wrangler d1 execute h1f-tech-stack --remote --file=data/migration/_fixtures/d1-load.sql`,
    `-- Schema: migrations/0001_init.sql must be applied first`,
    ``,
    `-- People (${people.length} rows)`,
    ...people.map(buildPersonInsert),
    ``,
    `-- Enrollments (${enrollments.length} rows)`,
    ...enrollments.map(buildEnrollmentInsert),
    ``,
    `-- Form submissions raw (${rawRows.length} rows)`,
    ...rawRows.map(buildRawInsert),
    ``,
  ]

  const sql = lines.join('\n')
  writeFileSync(OUT_PATH, sql)

  const sizeKb = Math.round(sql.length / 1024)
  console.log(`✅ d1-load.sql generated`)
  console.log(`   people:           ${people.length}`)
  console.log(`   enrollments:      ${enrollments.length}`)
  console.log(`   form_submissions: ${rawRows.length}`)
  console.log(`   total SQL lines:  ${lines.length}`)
  console.log(`   file size:        ${sizeKb} KB`)
  console.log(`   → ${OUT_PATH}`)
  console.log(``)
  console.log(`   Apply (when D1 live):`)
  console.log(`   wrangler d1 execute h1f-core --remote --file=${OUT_PATH.replace(REPO_ROOT + '/', '')}`)
}

main()
