-- Phase 1 — D1 schema for h1f-core
-- Source of truth: docs/spec_cf-native-migration.md §"D1 schema (corrected)"
-- Apply: wrangler d1 execute h1f-core --file=migrations/0001_init.sql
--        (use --remote for prod, --local for local dev)
--
-- Pre-existing tables in h1f-tech-stack DB (analyses, launch_club_*,
-- growth_hack_tools) are NOT touched by this migration. Rename of the DB
-- to h1f-core happens via wrangler.toml; data is preserved.

CREATE TABLE IF NOT EXISTS people (
  id TEXT PRIMARY KEY,                   -- UUID v4, generated client-side
  phone TEXT,                            -- E.164, NULL if email-only source
  email TEXT,                            -- NULL if phone-only source
  full_name TEXT,
  visa_status TEXT,
  source TEXT NOT NULL,                  -- 'tally:<form_id>' | 'firestore:<col>' | 'whatsapp:community' | 'substack' | 'luma' | 'manual'
  created_at TIMESTAMP NOT NULL,         -- preserves historical timestamps from backfill; NEVER CURRENT_TIMESTAMP for backfilled rows
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT                             -- reserved for admin-queue annotations (NOT WhatsApp About — that goes in metadata_json)
);

-- Partial UNIQUE indexes enforce "unique-when-present" — column-level UNIQUE
-- doesn't, because SQLite treats multiple NULLs as distinct.
CREATE UNIQUE INDEX IF NOT EXISTS idx_people_phone ON people(phone) WHERE phone IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_people_email ON people(email) WHERE email IS NOT NULL;

CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,                   -- UUID v4
  person_id TEXT NOT NULL REFERENCES people(id),
  program TEXT NOT NULL,                 -- 'launch_club' | 'win_club' | 'serotte_handoff' | 'tough_love' | 'whatsapp_community' | 'substack' | 'luma_event'
  cohort TEXT NOT NULL DEFAULT '',       -- 'C1'..'C5', event_name, '' for none — NOT NULL so unique index works
  status TEXT NOT NULL,                  -- 'applied' | 'paid' | 'pending' | 'active' | 'completed' | 'churned' | 'refunded'
  payment_method TEXT,                   -- 'venmo' | 'zelle' | 'stripe' | 'free' | NULL
  amount_cents INTEGER,                  -- 0 for free programs
  applied_at TIMESTAMP NOT NULL,         -- preserves historical
  paid_at TIMESTAMP,
  churned_at TIMESTAMP,                  -- set when Substack/Luma cron flips status to churned
  metadata_json TEXT CHECK (metadata_json IS NULL OR json_valid(metadata_json))
);

-- Idempotency key: prevents duplicate enrollments from form replay/network retry.
CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_unique ON enrollments(person_id, program, cohort);

-- OKR query path: program filter + status filter + person_id join column.
CREATE INDEX IF NOT EXISTS idx_enrollments_program_status_person ON enrollments(program, status, person_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_person ON enrollments(person_id);

CREATE TABLE IF NOT EXISTS form_submissions_raw (
  id TEXT PRIMARY KEY,
  form_source TEXT NOT NULL,             -- 'tally:<form_id>' | 'native:serotte-v2' | etc.
  submitted_at TIMESTAMP NOT NULL,
  person_id TEXT NOT NULL REFERENCES people(id),  -- NOT NULL: dedup is synchronous at insert
  payload_json TEXT NOT NULL CHECK (json_valid(payload_json))
);

CREATE INDEX IF NOT EXISTS idx_submissions_form ON form_submissions_raw(form_source, submitted_at);
