#!/usr/bin/env bun
/**
 * Reads data/migration/tally/*.json, normalizes per-form, applies the 2-pass
 * identity resolution rule from data/migration/field-map.md, and emits fixture
 * JSON files (people / enrollments / form_submissions / conflicts) the D1
 * inserter consumes once `h1f-core` is live.
 *
 * Run: bun scripts/backfill-tally.ts
 * Output: data/migration/_fixtures/tally-{people,enrollments,form_submissions,conflicts}.json
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { normalizePhoneE164, normalizeEmail } from './_lib/normalize'
import type { PersonRow, EnrollmentRow, RawSubmissionRow, SkippedRow } from './_lib/migration-types'

const REPO_ROOT = join(import.meta.dir, '..')
const TALLY_DIR = join(REPO_ROOT, 'data/migration/tally')
const OUT_DIR = join(REPO_ROOT, 'data/migration/_fixtures')

// pre-Apr 26 2026 = $500, post = $750 (Serotte productization gate)
const SEROTTE_CUTOVER = new Date('2026-04-26T00:00:00Z')

// ─────────────────────────────────────────────────────────────────────────────
// Form configuration. Cohort onboarding forms emit launch_club enrollments
// with the matching cohort code (status flips applied → active).
// ─────────────────────────────────────────────────────────────────────────────
type PaymentMethod = 'venmo' | 'zelle' | 'stripe' | 'free'
type Status = 'applied' | 'active' | 'paid' | 'completed'

type CohortRule = { kind: 'literal'; value: string } | { kind: 'fromField' }
type AmountRule = { kind: 'literal'; cents: number } | { kind: 'serotteByDate' }
type PaymentRule = { kind: 'literal'; value: PaymentMethod | null } | { kind: 'fromField' }

type FormConfig = {
  program: string
  cohort: CohortRule
  status: Status
  payment: PaymentRule
  amount: AmountRule
}

const LITERAL = (value: string): CohortRule => ({ kind: 'literal', value })
const FROM_FIELD: CohortRule = { kind: 'fromField' }
const ZERO: AmountRule = { kind: 'literal', cents: 0 }
const SEROTTE_AMOUNT: AmountRule = { kind: 'serotteByDate' }
const NO_PAYMENT: PaymentRule = { kind: 'literal', value: null }
const PAYMENT_FROM_FIELD: PaymentRule = { kind: 'fromField' }

const FORM_CONFIG: Record<string, FormConfig> = {
  D4qGoX: { program: 'serotte_handoff', cohort: LITERAL(''), status: 'paid', payment: PAYMENT_FROM_FIELD, amount: SEROTTE_AMOUNT },
  pbx9Y1: { program: 'launch_club', cohort: FROM_FIELD, status: 'applied', payment: NO_PAYMENT, amount: ZERO },
  KYQN27: { program: 'launch_club', cohort: LITERAL('C1'), status: 'active', payment: PAYMENT_FROM_FIELD, amount: ZERO },
  '7Rl0A2': { program: 'launch_club', cohort: LITERAL('C2'), status: 'active', payment: PAYMENT_FROM_FIELD, amount: ZERO },
  aQOWVq: { program: 'launch_club', cohort: LITERAL('C3'), status: 'active', payment: PAYMENT_FROM_FIELD, amount: ZERO },
  LZPK1y: { program: 'launch_club', cohort: LITERAL('C4'), status: 'active', payment: PAYMENT_FROM_FIELD, amount: ZERO },
  VLY4NE: { program: 'launch_club', cohort: LITERAL('C5'), status: 'active', payment: PAYMENT_FROM_FIELD, amount: ZERO },
  ODQagK: { program: 'launch_club', cohort: LITERAL('C1'), status: 'active', payment: PAYMENT_FROM_FIELD, amount: ZERO },
  KYx92V: { program: 'win_club', cohort: LITERAL(''), status: 'applied', payment: NO_PAYMENT, amount: ZERO },
  b59yv1: { program: 'launch_club', cohort: LITERAL(''), status: 'applied', payment: NO_PAYMENT, amount: ZERO },
}

const PAYMENT_KEYWORDS: Array<[RegExp, PaymentMethod]> = [
  [/venmo/, 'venmo'],
  [/zelle/, 'zelle'],
  [/stripe/, 'stripe'],
  [/free|comp/, 'free'],
]

const META_FIELDS: Array<[string, RegExp]> = [
  ['journey_stage', /where.*journey/i],
  ['biggest_blocker', /biggest\s*blocker/i],
  ['incorporated', /already\s*incorporated/i],
  ['us_state', /which\s*us\s*state/i],
  ['biz_prep_sheet_url', /business\s*prepared\s*sheet/i],
]

// ─────────────────────────────────────────────────────────────────────────────
// Tally JSON shape
// ─────────────────────────────────────────────────────────────────────────────
type Question = { id: string; type: string; title: string }
type Submission = {
  id: string
  formId: string
  respondentId: string
  isCompleted: boolean
  submittedAt: string
  responses: Array<{ questionId: string; answer: unknown }>
}
type FormBundle = { form_id: string; slug: string; questions: Question[]; submissions: Submission[] }

// ─────────────────────────────────────────────────────────────────────────────
// Normalizers. Type-not-title identity lookup keeps the script robust to title
// drift across forms ("Phone" vs "Phone Number" vs "Cell").
// ─────────────────────────────────────────────────────────────────────────────
function normalizeCohort(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  const m = raw.match(/^(C\d+)/i)
  return m && m[1] ? m[1].toUpperCase() : raw.trim()
}

function classifyPayment(raw: unknown): PaymentMethod | null {
  if (typeof raw !== 'string') return null
  const lower = raw.toLowerCase()
  return PAYMENT_KEYWORDS.find(([re]) => re.test(lower))?.[1] ?? null
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-form question index. Pre-computed once per form so submission processing
// is O(1) lookups, not O(Q*F) re-scans.
// ─────────────────────────────────────────────────────────────────────────────
type FormIndex = {
  byType: (type: string) => Question | undefined
  byTitle: (re: RegExp) => Question | undefined
}

function buildFormIndex(questions: Question[]): FormIndex {
  return {
    byType: (type) => questions.find((q) => q.type === type),
    byTitle: (re) => questions.find((q) => re.test(q.title)),
  }
}

function buildAnswerMap(sub: Submission): Map<string, unknown> {
  return new Map(sub.responses.map((r) => [r.questionId, r.answer]))
}

function answer(answers: Map<string, unknown>, q: Question | undefined): unknown {
  return q ? answers.get(q.id) : undefined
}

// ─────────────────────────────────────────────────────────────────────────────
// Resolve form-config rules against a submission. Returns concrete values —
// no sentinel types leak into the row builder.
// ─────────────────────────────────────────────────────────────────────────────
type Resolved = { cohort: string; amountCents: number; paymentMethod: PaymentMethod | null }

function resolveConfig(cfg: FormConfig, sub: Submission, idx: FormIndex, answers: Map<string, unknown>): Resolved {
  const cohort =
    cfg.cohort.kind === 'literal'
      ? cfg.cohort.value
      : normalizeCohort(answer(answers, idx.byTitle(/which\s*cohort/i)))

  const amountCents =
    cfg.amount.kind === 'literal'
      ? cfg.amount.cents
      : new Date(sub.submittedAt) < SEROTTE_CUTOVER
        ? 50000
        : 75000

  const paymentMethod =
    cfg.payment.kind === 'literal'
      ? cfg.payment.value
      : classifyPayment(answer(answers, idx.byTitle(/payment\s*(status|confirmed)/i)))

  return { cohort, amountCents, paymentMethod }
}

// ─────────────────────────────────────────────────────────────────────────────
// Identity resolution (in-memory; mirrors D1 partial UNIQUE indexes).
// ─────────────────────────────────────────────────────────────────────────────
type Conflict = { reason: string; phone: string | null; email: string | null; sourceA: string; sourceB: string }

class PersonStore {
  byPhone = new Map<string, string>()
  byEmail = new Map<string, string>()
  rows = new Map<string, PersonRow>()
  conflicts: Conflict[] = []

  upsert(input: Omit<PersonRow, 'id' | 'created_at' | 'updated_at' | 'notes'> & { ts: string }): string | null {
    const { phone, email, full_name, visa_status, source, ts } = input
    if (!phone && !email) return null

    const phoneHit = phone ? this.byPhone.get(phone) : undefined
    const emailHit = email ? this.byEmail.get(email) : undefined

    if (phoneHit && emailHit && phoneHit !== emailHit) {
      this.conflicts.push({
        reason: 'phone+email match different people',
        phone,
        email,
        sourceA: this.rows.get(phoneHit)!.source,
        sourceB: this.rows.get(emailHit)!.source,
      })
      // phone wins — identity key #1 per spec
      return phoneHit
    }

    const existingId = phoneHit || emailHit
    if (existingId) {
      const row = this.rows.get(existingId)!
      if (phone && !row.phone) {
        row.phone = phone
        this.byPhone.set(phone, existingId)
      }
      if (email && !row.email) {
        row.email = email
        this.byEmail.set(email, existingId)
      }
      if (full_name && !row.full_name) row.full_name = full_name
      if (visa_status && !row.visa_status) row.visa_status = visa_status
      row.updated_at = ts
      return existingId
    }

    const id = randomUUID()
    this.rows.set(id, { id, phone, email, full_name, visa_status, source, created_at: ts, updated_at: ts, notes: null })
    if (phone) this.byPhone.set(phone, id)
    if (email) this.byEmail.set(email, id)
    return id
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Row builders
// ─────────────────────────────────────────────────────────────────────────────
type FormResult = { enrollments: EnrollmentRow[]; raw: RawSubmissionRow[]; skipped: SkippedRow[] }

function buildMetadata(idx: FormIndex, answers: Map<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, re] of META_FIELDS) {
    const v = answer(answers, idx.byTitle(re))
    if (v) out[key] = v
  }
  return out
}

function processForm(bundle: FormBundle, store: PersonStore): FormResult {
  const result: FormResult = { enrollments: [], raw: [], skipped: [] }
  const cfg = FORM_CONFIG[bundle.form_id]
  if (!cfg) {
    result.skipped.push({ source: `tally:${bundle.form_id}`, identifier: '*', reason: 'no FORM_CONFIG entry' })
    return result
  }
  if (bundle.submissions.length === 0) return result

  const source = `tally:${bundle.form_id}`
  const idx = buildFormIndex(bundle.questions)
  const qFullName = bundle.questions.find((q) => q.type === 'INPUT_TEXT' && /full\s*name/i.test(q.title))
  const qEmail = idx.byType('INPUT_EMAIL')
  const qPhone = idx.byType('INPUT_PHONE_NUMBER')
  const qVisa = idx.byTitle(/visa\s*status/i)

  for (const sub of bundle.submissions) {
    if (!sub.isCompleted) continue
    const answers = buildAnswerMap(sub)

    const phone = normalizePhoneE164(answer(answers, qPhone))
    const email = normalizeEmail(answer(answers, qEmail))
    const fullName = (answer(answers, qFullName) as string | undefined) ?? null
    const visaStatus = (answer(answers, qVisa) as string | undefined) ?? null

    const personId = store.upsert({ phone, email, full_name: fullName, visa_status: visaStatus, source, ts: sub.submittedAt })
    if (!personId) {
      result.skipped.push({ source, identifier: sub.respondentId, reason: 'no phone or email — admin queue' })
      continue
    }

    const { cohort, amountCents, paymentMethod } = resolveConfig(cfg, sub, idx, answers)
    const metadata = buildMetadata(idx, answers)

    result.enrollments.push({
      id: randomUUID(),
      person_id: personId,
      program: cfg.program,
      cohort,
      status: cfg.status,
      payment_method: paymentMethod,
      amount_cents: amountCents,
      applied_at: sub.submittedAt,
      paid_at: cfg.status === 'paid' ? sub.submittedAt : null,
      churned_at: null,
      metadata_json: Object.keys(metadata).length ? JSON.stringify(metadata) : null,
    })

    result.raw.push({
      id: randomUUID(),
      form_source: source,
      submitted_at: sub.submittedAt,
      person_id: personId,
      payload_json: JSON.stringify({ submissionId: sub.id, respondentId: sub.respondentId, responses: sub.responses }),
    })
  }

  return result
}

// ─────────────────────────────────────────────────────────────────────────────
// Enrollment dedup. Mirrors D1's UNIQUE(person_id, program, cohort) — when a
// person submits pipeline + onboarding for the same cohort, status progresses.
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_RANK: Record<string, number> = { applied: 1, paid: 2, active: 3, completed: 4, churned: 5, refunded: 6 }

function dedupeEnrollments(rows: EnrollmentRow[]): EnrollmentRow[] {
  const map = new Map<string, EnrollmentRow>()
  for (const e of rows) {
    const key = `${e.person_id}|${e.program}|${e.cohort}`
    const existing = map.get(key)
    if (!existing || (STATUS_RANK[e.status] ?? 0) >= (STATUS_RANK[existing.status] ?? 0)) {
      map.set(key, e)
    }
  }
  return Array.from(map.values())
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const store = new PersonStore()
  const enrollments: EnrollmentRow[] = []
  const raw: RawSubmissionRow[] = []
  const skipped: SkippedRow[] = []

  for (const file of readdirSync(TALLY_DIR).filter((f) => f.endsWith('.json'))) {
    const bundle = JSON.parse(readFileSync(join(TALLY_DIR, file), 'utf-8')) as FormBundle
    const result = processForm(bundle, store)
    enrollments.push(...result.enrollments)
    raw.push(...result.raw)
    skipped.push(...result.skipped)
  }

  const dedupedEnrollments = dedupeEnrollments(enrollments)
  const people = Array.from(store.rows.values())

  writeFileSync(join(OUT_DIR, 'tally-people.json'), JSON.stringify(people, null, 2))
  writeFileSync(join(OUT_DIR, 'tally-enrollments.json'), JSON.stringify(dedupedEnrollments, null, 2))
  writeFileSync(join(OUT_DIR, 'tally-form_submissions.json'), JSON.stringify(raw, null, 2))
  writeFileSync(join(OUT_DIR, 'tally-conflicts.json'), JSON.stringify({ conflicts: store.conflicts, skipped }, null, 2))

  console.log(`✅ tally backfill complete`)
  console.log(`   people:           ${people.length}`)
  console.log(`   enrollments:      ${dedupedEnrollments.length} (deduped from ${enrollments.length})`)
  console.log(`   form_submissions: ${raw.length}`)
  console.log(`   conflicts:        ${store.conflicts.length}`)
  console.log(`   skipped:          ${skipped.length}`)
  console.log(`   → ${OUT_DIR}/tally-*.json`)

  if (store.conflicts.length || skipped.length) {
    console.log(`\n⚠️  Review tally-conflicts.json before running D1 insert.`)
  }
}

main()
