/**
 * Shared row shapes mirroring the D1 `h1f-core` schema (see
 * docs/spec_cf-native-migration.md §Phase 1 D1 schema). Single source of truth
 * for all backfill scripts that emit fixture JSON consumed by the D1 inserter.
 */

export type PersonRow = {
  id: string
  phone: string | null
  email: string | null
  full_name: string | null
  visa_status: string | null
  source: string
  created_at: string
  updated_at: string
  notes: string | null // reserved for admin-queue annotations
}

export type EnrollmentRow = {
  id: string
  person_id: string
  program: string
  cohort: string
  status: string
  payment_method: string | null
  amount_cents: number
  applied_at: string
  paid_at: string | null
  churned_at: string | null
  metadata_json: string | null
}

export type RawSubmissionRow = {
  id: string
  form_source: string
  submitted_at: string
  person_id: string
  payload_json: string
}

/**
 * Unified skipped-row shape across all backfill scripts. Downstream merger
 * reads one schema regardless of source.
 *
 * - source: 'tally:<form_id>' | 'whatsapp:community' | 'firestore:<collection>' | ...
 * - identifier: respondentId / display_name / docId — whatever uniquely names the row
 * - reason: human-readable skip reason
 */
export type SkippedRow = {
  source: string
  identifier: string
  reason: string
}
