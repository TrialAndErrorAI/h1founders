# Spec: CF-Native Migration for h1bfounders.com

**Status**: Spec v2 — sharpened May 5, 2026 (3-agent adversarial review applied)
**Author**: Atlas (h1bfounders Project Atlas)
**Source**: 15-round /interview spec session + /sharpen review (Reuse + Quality + Efficiency lenses)
**Lineage**: v1 written 11:00 AM May 5 → /sharpen at 12:08 PM caught 6 HIGH + 11 MEDIUM convergent issues → v2 incorporates all convergent fixes; held divergent items surfaced at bottom for Sid

---

## Prerequisites

Before any phase begins:

- **Cloudflare account**: Ercan's `40ad419de279f41e9626e2faf500b6b4` (per `code/CLAUDE.md` L14). All `wrangler` commands run under this account.
- **Wrangler auth**: confirm `wrangler whoami` shows correct account before Phase 1.
- **Skill loads required**:
  - `cdp` skill — Phase 0 Tally CSV pulls invoke `cdp/domain-skills/tally/forms-and-submissions.md` recipe (do NOT hand-click).
  - `substack-api` skill — Phase 0 verifies subscriber-list endpoint, Phase 1 powers cron Worker.
  - `gmail-sender` skill — fallback email transport if T&E shared worker not ready by Phase 4 start.
  - `claude-browser` skill — auxiliary for any UI-only export (Tally CSV download, Luma admin if API blocked).
- **Secrets**: per user CLAUDE.md keychain convention. Required keys at runtime: `cf-api-token` (already set), `substack-api-token` (TBD), `luma-api-token` (TBD). Read at runtime via `security find-generic-password -a "$USER" -s "<name>" -w`. Never commit.
- **DNS**: SPF/DKIM/DMARC records for `h1bfounders.com` set in Phase 0 (DNS propagates slowly; do NOT defer to Phase 4).

---

## Problem

h1bfounders.com data lives across **5 silos** Sid doesn't fully control:

1. **Firebase / Firestore** (`h1founders` project) — `members`, `unclaimed`, `forum_threads`, `forum_replies`, plus phone-auth user accounts. Forum collections were killed Apr 7, 2026 in the Phase 2 site renovation but data lingers. Rules + indexes still deployed; client still imports firebase in 8 files.
2. **Tally** (10 forms, 77+ submissions) — Launch Club pipeline (48), cohort onboarding (5 forms / 26 subs), Serotte handoff (3), WIN CLUB application (0). Email + phone + cohort + payment status all owned by Tally. $25-50/mo.
3. **Substack** — 800+ email subscribers. Email-only.
4. **Luma** — Event attendees scattered across past events. Email-only.
5. **WhatsApp community** — 1,081 members across 18 groups. Real source of truth for community membership but never normalized.

**The cost of this fragmentation**: Sid can't answer *"who's in WhatsApp + paid Launch Club but never opened my Substack?"* or *"how many people in my orbit haven't been touched in 60 days?"* Worse, he can't trigger automation because the data is in 5 SaaS silos.

**The migration's first principle**: One queryable people table. Every channel is a source. Every program is an enrollment.

---

## Users

- **Sid (admin)** — needs queryable directory, enrollment ops, email triggers, paid WhatsApp group rollout.
- **Public visitor** — hits h1bfounders.com, sees programs, signs up via native form.
- **Existing member** — gets emails from Sid, no login required.
- **WIN CLUB / Launch Club member** — receives program-specific touchpoints, no login required v1.

**Out of users (v1)**: forum participants, badge climbers, member directory browsers — features killed Apr 7, do not resurrect.

---

## Scope (in v1) — RESCOPED

**v1 = Phase 0 + Phase 1 + Phase 2 (Serotte only) + Phase 5 (Firestore decommission). 3-4 weeks.**
**v2 = remaining native forms + frontend rewrite + Tally decommission. Separate sprint after v1 ships.**

This rescope addresses the realistic-effort finding from /sharpen Efficiency lens. v1 demonstrable value = "$0 SaaS spend on data layer + Serotte form lives natively + queryable directory across all 5 sources." Frontend rewrite + remaining forms are infrastructure cleanup that can wait.

### Data layer (v1)
- **D1 database**: ONE database, named `h1f-core`. Strategy: rename existing `h1f-tech-stack` (id `e60bb36e-ec6c-483a-97a5-67b63404f55b`) to `h1f-core` and add new tables alongside the existing `analyses`, `launch_club_*` tables. **Rationale**: cross-DB queries are impossible in D1; the OKR query "who hasn't been touched in 60d across all sources" requires joining `people` ↔ `enrollments` ↔ `launch_club_founders`. One DB or the OKR fails.
- **R2 bucket** `h1f-archives` for cold storage (Firestore dump, Tally CSVs, WhatsApp exports, Luma exports, growth_hacks.db).
- **NO KV in v1.** D1 + `expires_at` column handles rate limit + dedupe at <100 submissions/month volume. Add KV only when D1 contention shows.

### Identity model (corrected schema)
- **UUID primary key** on `people` table — opaque, internal.
- **`phone` UNIQUE-when-present** — enforced via `CREATE UNIQUE INDEX idx_people_phone ON people(phone) WHERE phone IS NOT NULL` (NOT column-level UNIQUE; column-level treats NULLs as distinct but blocks duplicate non-NULLs the same way and creates a contradictory dual-layer enforcement).
- **`email` UNIQUE-when-present** — same partial unique index pattern.
- **Auto-merge on email match** — auto-merge ONLY when no conflict. Conflict case (incoming row's email matches person A but phone matches person B) → reject and route to admin dedup queue. Do not silently corrupt identity.
- **Backfill `created_at` preserves historical timestamps** — backfill scripts MUST set `created_at = <source_timestamp>`, never default to migration day. Otherwise the OKR "untouched in 60 days" is broken because all backfilled rows show today's date.

### Source ingestion
- **WhatsApp** (v1: Chrome extension; v2: Baileys CF Worker):
  - **Why not /cdp**: WhatsApp Web 2026 strips phone numbers from member-list DOM rows for saved contacts (privacy by design). `data-testid="cell-frame-title"` shows display name only — no `data-id`, `data-jid`, or `href` exposing phone. `window.Store` was unexposed circa 2023. /cdp can scrape names but recreating phone access requires moduleRaid + webpack-chunk introspection (1-2 day project, brittle to every WA update).
  - **v1 path — Chrome extension** (one-time, ~20 min Sid effort): WAContactSaver (`https://chromewebstore.google.com/detail/wacontactsaver/nolibfldemoaiibepbhlcdhjkkgejdhl`) or WA Group Number Exporter (`https://chromewebstore.google.com/detail/wa-group-number-exporter/mbmldhpfnohbacbljfnjnmhfmecndfjp`). Both use moduleRaid to extract Contact store from WA Web's webpack runtime. Sid runs across 18 groups, CSVs land at `data/migration/whatsapp/`. Atlas runs dedup + ingest.
  - **v2 path — Baileys CF Worker** (ongoing sync): separate Node process that scans QR once, then runs as cron Worker via WhatsApp Web's WebSocket protocol (same protocol Web uses internally). Free, open-source, what AI bot startups use. Add alongside paid-group rollout when WA Business cost becomes justified. Refs: `github.com/whiskeysockets/Baileys`.
  - **NOT WhatsApp Business API** for our use case: designed for B2C messaging, group endpoints are limited to groups CREATED via API (not personal-account groups Sid already owns). Free platform but wrong tool.
  - Each group represented in `metadata_json.whatsapp_groups` array on the single WA enrollment per person.
  - **WhatsApp export is a Phase 0 exit criterion** (was in Phase 1; promoted because Phase 1 backfill needs the data).
- **Substack**: daily cron Worker → Substack API → upsert. **Pulls full subscriber list** (not delta). Any person with `program='substack'` enrollment NOT in today's pull → flip `status='churned'`, set `churned_at`. Otherwise unsubscribes are silently lost. Phase 0 verifies Substack API exposes a full-list endpoint.
- **Luma**: daily cron Worker → Luma API → upsert. Same full-list pattern. Phase 0 verifies Luma API.
- **One Worker, multiple cron triggers**: `workers/external-sync` Worker handles Substack + Luma + future sources via `[triggers] crons = [...]` config. Stagger schedules (Substack `0 6 * * *`, Luma `15 6 * * *`) to prevent isolate contention.
- **Tally**: backfill once via CSV export (10 forms × 77 submissions). Live forms migrated to native intake one at a time per v1/v2 split; Tally read-only after migration.
- **Firestore**: backfill ONLY collections that prove load-bearing. Forum collections (`forum_threads`, `forum_replies`) were killed Apr 7 — archive to R2 cold storage, do NOT import. `members` + `unclaimed` likely KEEP. Per-collection KEEP/ARCHIVE-ONLY/DROP decision is a Phase 0 step.

### Frontend (v1 deferred)
**v1 ships Serotte form as a React route inside the existing client/ app** (matching current aesthetic). Full HTML rewrite deferred to v2. Rationale: Phase 2 form needs to look like the rest of the site; mid-rewrite produces aesthetic chaos. /sharpen Efficiency H1 also flagged that the actual cost driver is Tailwind + firebase + react-router (not React itself); held for Sid decision in "Decisions Held for Sid" section below.

### Form intake architecture (v1: Serotte only)
- **Pages Functions** at `functions/api/forms/serotte.ts` — single file for v1.
- **Hono server vs Pages Functions fork**: codebase currently has BOTH (server/src/index.ts AND functions/api/launch-club/, functions/api/track/). v1 picks **Pages Functions only**. Hono server marked for deletion (Phase 1 step 0). Don't deepen the fork.
- Handler does: validate → resolve person (sync, NOT async) → upsert people → insert enrollment → insert form_submissions_raw → enqueue email → return success. `person_id` is NOT NULL on `form_submissions_raw` because dedup is synchronous.
- **No CAPTCHA in v1**. Add Cloudflare Turnstile if spam emerges.

### Email infrastructure (with hard fallback)
- **Primary**: Reuse Ercan's RAI email worker (T&E shared infra). h1bfounders is second tenant.
- **Fallback (HARD CUTOFF)**: If T&E shared email worker is not deployed by **Phase 4 start (week 4)**, ship Phase 4 with `gmail-sender` skill (already exists at `~/.claude/skills/gmail-sender/`). Migrate to T&E worker when ready.
- **Phase 0 exit criterion**: Sid confirms with Ercan that h1b will be a tenant. Without confirmation, the primary path is fictional. Open Question moved to Phase 0.

### Payment for Serotte handoff (v1: manual)
- Keep Venmo/Zelle manual reconciliation. No Stripe in v1.
- **State machine**: `pending` → `paid` → `refunded` (terminal). `disputed`/`failed` not modeled until Stripe lands in v2.
- Form captures `payment_method` choice + `payment_status='pending'`. Sid manually flips to `paid` via admin query when Venmo/Zelle settles.
- **Stale-pending alert**: admin view filters submissions in `pending` for >14 days. Otherwise silent rot.

### Auth surface
- **No public auth.** Public pages stay public.
- **Cloudflare Access for `/admin`** — Sid's email only, free tier (<50 users).
- No Firebase phone auth. No reCAPTCHA. No login UI.

### Admin surface (v1: minimal)
- `/admin` (Cloudflare Access gated): three views — recent enrollments, payment-pending list (incl. stale >14d filter), dedup-candidates queue.
- **Implementation**: Pages Functions render server-side HTML (no React, no client JS). One template per view. Vanilla forms post mutations to D1.
- Direct `wrangler d1 execute` is the fallback for ad-hoc queries.

---

## Scope (out of v1)

- **Stripe payments** — defer to v2 once Serotte productization gate (5 paid customers at $750) hits.
- **Member self-serve** — v2 or beyond.
- **Forum / badges / network directory** — killed Apr 7, stays killed.
- **Real-time WhatsApp sync** — quarterly manual until paid groups.
- **WhatsApp Business API** — deferred until paid groups demand.
- **Webhooks** — daily cron is the simpler primitive.
- **Multi-tenant SaaS** — this is Sid's site.
- **Full React kill / HTML rewrite** — moved to v2 (was Phase 3 in v1; created Phase 2/3 aesthetic dependency conflict per /sharpen).

---

## Approach

### Phase 0 — Audit + freeze (week 1, no code changes)

**Exit criteria** (ALL must pass before Phase 1):
1. Firestore JSON dump exists in R2.
2. Tally CSV bundle exists in R2 (10 forms × all submissions).
3. WhatsApp export complete for all 18 groups (CSV per group).
4. `code/data/migration/field-map.md` maps every source field to target D1 column.
5. **Firestore per-collection decision logged**: KEEP / ARCHIVE-ONLY / DROP for each. Forum collections marked ARCHIVE-ONLY by default.
6. **Sid confirms with Ercan**: h1b will be a tenant of T&E shared email worker. If declined → fallback to `gmail-sender` skill confirmed.
7. **Sid decides**: WIN CLUB form — kill (WhatsApp-only intake) or rebuild in v2.
8. **DNS records set**: SPF, DKIM, DMARC for `h1bfounders.com`. Verify via mxtoolbox.
9. **`growth_hacks.db` inspected**: schema captured (`sqlite3 growth_hacks.db .schema`), archived to R2, then nuked.
10. **Substack/Luma API endpoints verified**: full-list pull supported (not just delta/webhook).
11. **Backup retention written**: indefinite, R2 cold storage at $0.015/GB-month (<100MB dataset = ~$0.0036/mo). Open Q resolved.

**Steps** (parallelizable except where noted):
1. `firebase firestore:export gs://h1f-backup-<date>/` → download → upload to R2 `h1f-archives/firestore-2026-05/`. (Sid blocked task)
2. **Run `/cdp` skill** → tally domain skill auto-loads → download CSVs from each of 10 forms per `cdp/domain-skills/tally/forms-and-submissions.md`. Store at `code/data/migration/tally/<form-id>.csv` + R2 mirror. (Atlas, parallel with #1)
3. **Manual WhatsApp export** — 18 groups × ~2 min each. (Sid blocked task, parallel with #1, #2)
4. Build `code/data/migration/field-map.md` — every source field → target D1 column. (Atlas, after #1-#3)
5. Per-collection Firestore decision review with Sid (KEEP/ARCHIVE-ONLY/DROP per collection).
6. Inspect `data/growth_hacks.db`, archive, nuke.
7. **Phase 0 wrangler.toml scaffold** — write target `wrangler.toml` with all bindings (D1 `h1f-core`, R2 `h1f-archives`, cron triggers stub). Forcing function for "what infra am I committing to?"
8. DNS records set in Cloudflare DNS dashboard.
9. Sid<>Ercan email worker tenant alignment (15-min slack).
10. Substack + Luma API endpoint verification (one curl each).

### Phase 1 — D1 schema + ingestion (week 2)

**Exit criterion**: `h1f-core` D1 live with all 3 tables. All 5 backfill scripts succeed end-to-end on staging data. Hono server deletion decided.

#### Phase 1 Step 0: Hono server vs Pages Functions decision
Confirm: kill `server/` directory. Migrate the one live endpoint (`/api/proxy` for tech-stack analyzer) to a Pages Function. Pages-Functions-only as the canonical surface.

#### D1 schema (corrected):

```sql
CREATE TABLE people (
  id TEXT PRIMARY KEY,                     -- UUID v4
  phone TEXT,                              -- E.164, NULL if email-only source
  email TEXT,                              -- NULL if phone-only source
  full_name TEXT,
  visa_status TEXT,
  source TEXT NOT NULL,                    -- 'tally:D4qGoX' | 'firestore:members' | 'whatsapp:<group>' | 'substack' | 'luma' | 'manual'
  created_at TIMESTAMP NOT NULL,           -- preserves historical timestamps from backfill
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

CREATE UNIQUE INDEX idx_people_phone ON people(phone) WHERE phone IS NOT NULL;
CREATE UNIQUE INDEX idx_people_email ON people(email) WHERE email IS NOT NULL;

CREATE TABLE enrollments (
  id TEXT PRIMARY KEY,                     -- UUID v4
  person_id TEXT NOT NULL REFERENCES people(id),
  program TEXT NOT NULL,                   -- 'launch_club' | 'win_club' | 'serotte_handoff' | 'tough_love' | 'whatsapp_community' | 'substack' | 'luma_event'
  cohort TEXT NOT NULL DEFAULT '',         -- 'C1'..'C5', event_name, '' for none (NOT NULL so unique index works)
  status TEXT NOT NULL,                    -- 'applied' | 'paid' | 'pending' | 'active' | 'completed' | 'churned' | 'refunded'
  payment_method TEXT,                     -- 'venmo' | 'zelle' | 'stripe' | 'free' | NULL
  amount_cents INTEGER,                    -- 0 for free programs
  applied_at TIMESTAMP NOT NULL,           -- preserves historical
  paid_at TIMESTAMP,
  churned_at TIMESTAMP,                    -- set when status flips to churned (Substack/Luma cron)
  metadata_json TEXT CHECK (metadata_json IS NULL OR json_valid(metadata_json))
);

CREATE UNIQUE INDEX idx_enrollments_unique ON enrollments(person_id, program, cohort);
CREATE INDEX idx_enrollments_program_status_person ON enrollments(program, status, person_id);
CREATE INDEX idx_enrollments_person ON enrollments(person_id);

CREATE TABLE form_submissions_raw (
  id TEXT PRIMARY KEY,
  form_source TEXT NOT NULL,               -- 'tally:D4qGoX' | 'native:serotte-v2'
  submitted_at TIMESTAMP NOT NULL,
  person_id TEXT NOT NULL REFERENCES people(id),  -- NOT NULL: dedup is synchronous at insert
  payload_json TEXT NOT NULL CHECK (json_valid(payload_json))
);

CREATE INDEX idx_submissions_form ON form_submissions_raw(form_source, submitted_at);
```

**Schema correctness highlights vs v1**:
- Partial UNIQUE indexes on `(phone)` and `(email)` correctly enforce "unique-when-present" (column-level UNIQUE doesn't).
- `enrollments` has `UNIQUE (person_id, program, cohort)` — prevents duplicate enrollments from form replay/network retry.
- `cohort` is `NOT NULL DEFAULT ''` so the unique index works (NULL handling in SQLite makes mixed NULL/non-NULL cohort + same person+program a uniqueness hole).
- `metadata_json` and `payload_json` have `CHECK (json_valid())` — malformed payloads rejected at insert, not silently accepted.
- `created_at` and `applied_at` are `NOT NULL` (no default) — backfill scripts MUST supply historical timestamps; native form intake supplies `CURRENT_TIMESTAMP` explicitly.
- `idx_enrollments_program_status_person` covers OKR query join pattern (program filter + status filter + person_id join column for index-only join).
- `churned_at` field added — Substack/Luma cron flips status to churned and stamps timestamp.

#### Backfill scripts (idempotent, parallel-runnable):
- `scripts/backfill-tally.ts` — reads CSVs, dedupes by phone (then email), inserts people + enrollments + raw rows.
- `scripts/backfill-firestore.ts` — reads JSON dump, **only collections marked KEEP** (per Phase 0 step 5), merges into people by phone match.
- `scripts/backfill-whatsapp.ts` — reads exported CSVs per group, dedupes, creates ONE WA enrollment per person with `metadata_json.whatsapp_groups[]` populated.
- `scripts/backfill-substack.ts` — fetches subscriber list via Substack API, upserts by email.
- `scripts/backfill-luma.ts` — fetches event attendees via Luma API, upserts by email.

**Idempotency rule**: every script uses upsert keyed on `COALESCE(phone, email)`. Two-pass within each script: (1) match on phone if present, (2) match on email if phone unmatched, (3) admin queue if both present and they collide.

#### Live cron Worker:
- `workers/external-sync` — single Worker. Multiple cron triggers in `wrangler.toml`:
  ```toml
  [triggers]
  crons = ["0 6 * * *", "15 6 * * *"]
  ```
  Worker dispatches on schedule name to Substack handler vs Luma handler.

#### EB-1A scoring extraction (preparation for v2 frontend rewrite):
- Extract scoring logic from `client/src/pages/tools/EB1AQualifier.tsx` to `client/src/lib/eb1a-scoring.ts` as pure function module (no React deps). Existing component imports the module. v2 HTML page will import the same module. Reuse, don't retype.

### Phase 2 — Native Serotte form intake (week 3, v1 only)

**Exit criterion**: Serotte handoff lives at `/programs/serotte-handoff`, posts to D1, renders thank-you page, Tally `D4qGoX` paused.

1. Build `/programs/serotte-handoff` as a React route in the existing client/ app. Match current aesthetic.
2. Pages Function `functions/api/forms/serotte.ts` — sync handler per architecture above.
3. Email integration: enqueue welcome via Ercan's worker OR `gmail-sender` per Phase 0 fallback.
4. **Per-form rollback gate**: Tally form `D4qGoX` is PAUSED (not deleted). If native form bug eats submissions, re-enable Tally as fallback.
5. Thank-you page acknowledges submission immediately. If email automation isn't ready (gmail-sender fallback only), thank-you page sets expectation: "Sid will reply within 24h."

### Phase 5 — Firestore decommission (week 4, v1)

**Exit criterion**: 0 firebase imports in codebase, Firestore project shut down. **30-day soak period mirroring Tally pattern.**

1. **Day 0 (Phase 5 start)**: Strip 8 firebase imports from `client/`. Replace with no-ops or D1-backed stubs. (Public pages don't depend on firebase post-Phase 2 renovation; this is residue.)
2. **Day 1**: Set Firestore rules to read-only-for-Sid: `allow read: if request.auth.token.email == 'sid@trialanderror.ai'; allow write: if false;`. Wait 30 days.
3. **Day 30**: Confirm R2 backup exists. Delete Firestore collections via console.
4. Cancel Firebase project billing in GCP console.

### Phase 6 — Native LC pipeline form + remaining migrations (v2, separate sprint)

Out of v1 scope. v2 covers: Launch Club application native form, full HTML rewrite, Tally decommission (30-day soak), Stripe payment integration if Serotte productization gate hits.

---

## Decisions Held for Sid (divergent /sharpen findings)

These weren't applied because they conflict with explicit Sid pivots from /interview or are Sid-only judgment calls:

1. **Full React kill (R10 of /interview)** — /sharpen Efficiency H1 argued the actual cost driver is Tailwind + firebase + react-router (not React itself). A smaller cut (strip Tailwind + firebase + router, keep React) gets 90% of the win for 20% of the work. Sid's R10 answer was unequivocal "Full rewrite — kill React entirely." **Spec v2 defers full React kill to v2 sprint** (frontend rewrite). When v2 starts, Sid can re-validate: full kill or surgical strip?
2. **Dedup inline vs nightly job** — Quality H4 argues sync-resolve at insert (simpler hot path). Efficiency M5 argues insert-first, dedupe-job nightly (cleaner separation). Spec v2 picks **sync inline** for v1 (simpler at <100/mo volume). Revisit at scale or first slow-form complaint.
3. **3-week vs 6-week vs 12-week timeline** — Efficiency M6 argued v1 (Phase 0+1+2-Serotte-only+5) = 3-4 weeks. Original spec implied 6 weeks total. Spec v2 commits to **3-4 week v1**, separate v2 sprint for everything else. Sid validates timeline before kickoff.

---

## Open Questions (resolved or escalated)

| # | Question | Status |
|---|---|---|
| 1 | Ercan's RAI email worker timeline | **Phase 0 exit criterion** (Sid confirms tenant alignment) |
| 2 | Substack API subscribers list endpoint | **Phase 0 exit criterion** (verify full-list pull) |
| 3 | Luma API auth + scope | **Phase 0 exit criterion** (verify full-list pull) |
| 4 | WIN CLUB form kill or rebuild | **Phase 0 exit criterion** (Sid decides; defaults to kill if no answer) |
| 5 | `data/growth_hacks.db` content | **Phase 0 step** (inspect schema, archive, nuke) |
| 6 | Theme system in plain HTML | **Deferred to v2** (frontend rewrite) |
| 7 | EB-1A vanilla JS port | **Resolved**: Phase 1 extracts scoring as pure module, port lands in v2 |
| 8 | Backup retention | **Resolved**: indefinite, R2 cold storage |
| 9 | Substack double-write (newsletter vs email worker) | **Resolved**: Substack stays as newsletter platform; our worker is transactional only |
| 10 | Domain SPF/DKIM/DMARC | **Phase 0 exit criterion** (DNS lead time matters) |

---

## Success Metric (v1)

**Single OKR**: *Sid can answer "who in my orbit hasn't been touched in 60 days?" via one D1 query, returning rows from all 5 sources (WhatsApp, Substack, Luma, Tally backfill, Firestore-KEEP backfill) in <2 seconds.*

**Secondary**:
- **$0/mo direct SaaS spend** on data layer (Tally $25-50 → paused not yet cancelled in v1; full $0 hits in v2). Honest accounting note: T&E shared email worker has its own cost share distributed across T&E.
- Form submission to enrollment row latency: <2s.
- Firestore decommissioned within v1 (5 weeks of Phase 0 start).
- Zero data loss vs current state.

---

## Non-goals

- Becoming a CRM (Attio is the CRM for B2B).
- Real-time anything (daily cron + sync form intake is enough).
- Replacing Substack as newsletter platform (Substack stays; we just sync subscribers down).
- Replacing Tally as form builder for non-h1b T&E sites.
- Open-sourcing.
- Member self-serve in v1.
- Payment processing in v1.

---

## Handoff

**Spec is complete (v2). Open new Claude Code session and pass this file as context.**

Phase 0 can run in current Atlas session — audit-only, no code changes. Phases 1+ should run in fresh `wake-code` session with this spec loaded.

**First action**: 25 uncommitted file deletions (Apr 14 reorg residue) + new docs land as 2 clean commits, NO push. Then start Phase 0.

---

## Lineage

- **v1** — May 5, 2026 11:00 AM. /interview spec mode, 15 rounds.
- **v2** — May 5, 2026 12:30 PM. /sharpen 3-agent adversarial review caught 6 HIGH + 11 MEDIUM convergent issues. Major fixes: unified D1 (v1 had 2-DB split that broke OKR), corrected schema uniqueness (v1 column-UNIQUE didn't enforce claim), Firestore 30-day soak mirror (v1 was asymmetric with Tally), full-list cron pulls with churn detection (v1 was upsert-only, lost unsubscribes), Open Questions 1+4+10 promoted to Phase 0 exit criteria, single cron Worker with staggered triggers (v1 had 3 separate Workers competing), EB-1A scoring extracted as pure module before frontend rewrite, v1 rescoped to Phase 0+1+2(Serotte-only)+5 with v2 covering remaining migrations.
