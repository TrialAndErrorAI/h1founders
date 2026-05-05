# Field Map — Source → D1 Migration

**Phase 0 deliverable, /sharpen Reuse + Quality lens output.**
**Status**: scaffold (May 5, 2026). Filled in as backfills run.

Maps every field across 5 source systems to the unified D1 `people` + `enrollments` + `form_submissions_raw` schema.

---

## Identity Resolution Rule (HARD CONSTRAINT)

Every source row resolves to ONE `people.id` via this 2-pass algorithm:

```
1. If row has phone:
     match person where people.phone = row.phone  → person_id resolved
   else if row has email:
     match person where people.email = row.email  → person_id resolved
   else:
     ERROR — row has no identity, log to admin queue, do not insert

2. If row has BOTH phone AND email:
     - phone match found AND email match found AND they're DIFFERENT person_ids
       → CONFLICT, log to dedup queue, do not auto-merge
     - phone match found AND email match found AND same person_id
       → no-op, person already exists
     - phone match found AND email unmatched
       → UPDATE existing person SET email = row.email (if NULL today)
     - phone unmatched AND email match found
       → UPDATE existing person SET phone = row.phone (if NULL today)
     - both unmatched
       → INSERT new person with both
```

`created_at` on backfill rows MUST preserve historical timestamp. NEVER use `CURRENT_TIMESTAMP` for backfilled data.

---

## Source 1: Tally (10 forms, ~77 submissions)

### Form `D4qGoX` — Serotte Handoff (3 submissions)

| Tally Field | D1 Target | Notes |
|---|---|---|
| `Submitted at` | `enrollments.applied_at` + `form_submissions_raw.submitted_at` | ISO timestamp |
| `Full Name` | `people.full_name` | |
| `Email` | `people.email` | identity key #2 |
| `Phone` | `people.phone` | E.164 — VALIDATE FORMAT, fix `+1...` if missing |
| `Payment Status` | `enrollments.status` ('paid' if Venmo/Zelle), `enrollments.payment_method` ('venmo'/'zelle') | |
| `Link to your business prepared sheet` | `enrollments.metadata_json.biz_prep_sheet_url` | Optional |
| `Do you want to free enroll in LC C2 (Starts Dec 16th)?` | DROP — Unpublished question, stale | |
| (full row) | `form_submissions_raw.payload_json` | Audit trail |

**Enrollment row constants for this form**:
- `program = 'serotte_handoff'`
- `cohort = ''` (none)
- `payment_method = 'venmo' | 'zelle'`
- `amount_cents = 50000` (pre-Apr 26: $500) or `75000` (post-Apr 26: $750) — INFER FROM submission date

### Form `pbx9Y1` — Launch Club Pipeline (48 submissions)

| Tally Field | D1 Target | Notes |
|---|---|---|
| `Submitted at` | `enrollments.applied_at` + raw | |
| `Full Name` | `people.full_name` | |
| `Email` | `people.email` | |
| `Phone` | `people.phone` | |
| `Current Visa Status` | `people.visa_status` | E.g. 'H1B', 'F1', 'OPT', etc. |
| `Where are you in your journey?` | `enrollments.metadata_json.journey_stage` | E.g. 'Idea (not started)', 'Prototype' |
| `What's your biggest blocker?` | `enrollments.metadata_json.biggest_blocker` | |
| `Which cohort?` | `enrollments.cohort` | 'C3 - January 2026' → 'C3' (NORMALIZE) |
| `Have you already incorporated?` | `enrollments.metadata_json.incorporated` | Unpublished — preserve historical |
| `Which US State?` | `enrollments.metadata_json.us_state` | Unpublished — preserve historical |
| (full row) | `form_submissions_raw.payload_json` | |

**Enrollment row constants**:
- `program = 'launch_club'`
- `status = 'applied'` (paid status arrives later if cohort onboarding completes)
- `amount_cents = 0` (intake form, payment elsewhere)

### Cohort Onboarding Forms (LCC1, LCC2, C3, C4)

All produce `enrollments` rows with `program='launch_club'`, `status='active'`, and the matching `cohort` code. Person identity resolves via phone → email; if no match in `people` from prior pipeline form, INSERT is fine — UNIQUE indexes catch dupes.

Three near-identical sub-shapes:

**Shape A: LCC1 (`KYQN27`, 11 subs) + LCC2 (`7Rl0A2`, 6 subs)** — 13 fields

| Tally Field | D1 Target | Notes |
|---|---|---|
| `Submitted at` | `enrollments.applied_at` + raw | Existing pipeline row's status flips to 'active' via UPSERT |
| `Full Name` | `people.full_name` | |
| `Email` | `people.email` | |
| `Phone` | `people.phone` | |
| `Payment Status` | `enrollments.payment_method` | 'venmo' / 'zelle' classifier |
| `Current Visa Status` | `people.visa_status` | E.g. 'H1B', 'F1' |
| `Where are you in your journey?` | `enrollments.metadata_json.journey_stage` | |
| `Current Entity Status` | `enrollments.metadata_json.entity_status` | E.g. 'LLC formed', 'Not yet' |
| `Preferred State for Incorporation` | `enrollments.metadata_json.preferred_state` | E.g. 'Delaware' |
| `Preferred Entity Type` | `enrollments.metadata_json.preferred_entity_type` | E.g. 'C-Corp', 'LLC' |
| `Specific Legal Questions for Attorney (Optional)` | `enrollments.metadata_json.legal_questions` | |
| `What do you want to launch in 4 weeks?` | `enrollments.metadata_json.launch_goal` | |
| `Delaware` | `enrollments.metadata_json.delaware_followup` | Free-text follow-up to state question |
| `What's your biggest blocker?` | `enrollments.metadata_json.biggest_blocker` | |
| (full row) | `form_submissions_raw.payload_json` | |

**Shape B: C3 (`aQOWVq`, 4 subs)** — 12 fields, payment + visa-tailoring questions reworded

| Tally Field | D1 Target | Notes |
|---|---|---|
| `Submitted at`, `Full Name`, `Email`, `Phone` | (same as Shape A) | |
| `What are you paying today?` | `enrollments.metadata_json.payment_amount_self_reported` | Free-text amount |
| `Payment Confirmed` | `enrollments.payment_method` + `enrollments.status` | 'Yes' → status='active', classify venmo/zelle from text |
| `Current Entity Status` | (same) | |
| `What do you want to launch in 3 weeks?` | `enrollments.metadata_json.launch_goal` | C3 was 3-week sprint, not 4 |
| `We'll tailor guidance based on your visa` | `people.visa_status` | Reworded prompt for visa info |
| `Where are you in your journey?` | (same) | |
| `What's your biggest blocker?` | (same) | |
| `Preferred State for Incorporation`, `Preferred Entity Type` | (same) | |
| `Specific Legal Questions for Attorney` | (same) | |

**Shape C: C4 (`LZPK1y`, 5 subs)** — 7 fields, slimmest

| Tally Field | D1 Target | Notes |
|---|---|---|
| `Submitted at`, `Full Name`, `Email`, `Phone` | (same) | |
| `What are you paying today?` | (same as Shape B) | |
| `Payment Confirmed` | (same as Shape B) | |
| `Current Entity Status` | (same) | |
| `What do you want to launch in 3 weeks?` | (same) | |

C4 dropped journey/blocker/state/entity-type/legal-questions — leaner intake, presumably because Sid screens those during the LC pipeline (`pbx9Y1`) instead of duplicating at onboarding time.

**Backfill behavior**: `scripts/backfill-tally.ts` already handles all three shapes via title-regex lookups. Cohort code is `LITERAL` per form (KYQN27→C1, 7Rl0A2→C2, aQOWVq→C3, LZPK1y→C4). Verified May 5, 2026 — 26 active enrollments produced from 26 cohort onboarding submissions, no skips.

### Form `VLY4NE` — LC C5 Onboarding (0 submissions)
### Form `ODQagK` — LCC1 v2 Onboarding (0 submissions)
### Form `KYx92V` — WIN CLUB Application (0 submissions)
### Form `b59yv1` — Founder Demo (Draft, never published)

Empty forms — no rows to backfill. Decision pending (per Phase 0 exit criterion #7) on whether to keep WIN CLUB form alive for v2.

---

## Source 2: Firestore (`h1founders` project)

Per Phase 0 exit criterion #5, per-collection KEEP/ARCHIVE-ONLY/DROP decision required before backfill. Defaults:

| Collection | Default | Field Map | Notes |
|---|---|---|---|
| `members` | KEEP | TBD | Phone-auth user accounts. Likely overlaps Tally. Dedup on phone. |
| `unclaimed` | ARCHIVE-ONLY | — | Pre-claim member stubs. Probably not load-bearing. |
| `forum_threads` | ARCHIVE-ONLY | — | Killed Apr 7. R2 cold archive only. |
| `forum_replies` | ARCHIVE-ONLY | — | Same. |
| (other collections discovered in dump) | TBD | — | Fill in after `firebase firestore:export` lands. |

---

## Source 3: WhatsApp (1,081 members across 18 groups)

Manual CSV export per group. Each CSV has columns:

| WhatsApp Field | D1 Target | Notes |
|---|---|---|
| `Phone Number` | `people.phone` | E.164 |
| `Name` (display name) | `people.full_name` | May be nickname or first-name only |
| (group context — added by Atlas during ingestion) | `enrollments.metadata_json.whatsapp_groups[]` | Append group name per WA group person belongs to |

**Enrollment row** (one per person, regardless of group count):
- `program = 'whatsapp_community'`
- `cohort = ''`
- `status = 'active'`
- `payment_method = 'free'`
- `amount_cents = 0`
- `metadata_json.whatsapp_groups = [<group1>, <group2>, ...]` array of group names person is in
- `applied_at = <export_timestamp>` (best-effort; WA doesn't expose join dates)

**18 groups to export** (per CLAUDE.md):
1. Announcements
2. H1 Founders (Main Group) — 999 members
3. AI + VibeCoding 🔥
4. SaaS Sales
5. Start a Business
6. First $10K Club
7. News & Chatter
8. Book Club
9. Join This First
10. Day1 CPT
11. Body & Mind
12. Biotechnology | H1 Community
13. Stocks (Don't join this) — DEAD, skip
14. WIN CLUB - PUBLIC
15. Launch Club Cohort 1 (Nov 2025)
16. Launch Club Cohort 2 (Dec 2025)
17. Launch Club C3 (Jan 2026)
18. Launch Club C4 (Feb 2026)

---

## Source 4: Substack (community.h1bfounders.com, 800+ subscribers)

Endpoint TBD — Phase 0 step 10 verifies full-list pull is supported. `substack-api` skill has publish endpoints; subscriber-list endpoint requires verification. Likely:

| Substack Field | D1 Target | Notes |
|---|---|---|
| `email` | `people.email` | identity key |
| `name` | `people.full_name` | Often missing |
| `subscribed_at` | `enrollments.applied_at` | Historical |
| `is_paid_subscriber` | `enrollments.amount_cents` | If paid tier exists; currently free-only |
| (subscriber status) | `enrollments.status` | 'active' or 'churned' (via cron full-list diff) |

**Enrollment row constants**:
- `program = 'substack'`
- `cohort = ''`
- `payment_method = 'free'` (currently)
- `amount_cents = 0`

---

## Source 5: Luma (event attendees, count unknown)

Endpoint TBD — Phase 0 step 10 verifies. Luma host-side API for attendee lists exists but auth + scope to confirm.

| Luma Field | D1 Target | Notes |
|---|---|---|
| `email` | `people.email` | |
| `name` | `people.full_name` | |
| `registered_at` | `enrollments.applied_at` | Per event |
| `event_name` | `enrollments.cohort` | E.g. 'H1B Founders Live Ep 1' |
| `event_date` | `enrollments.metadata_json.event_date` | |

**Enrollment row constants**:
- `program = 'luma_event'`
- `cohort = <event_name>` (one enrollment row per event person attended)
- `payment_method = 'free'`
- `amount_cents = 0`

---

## Open Questions (filled in Phase 0/1)

- [ ] Tally cohort-onboarding forms (LCC1/LCC2/C3/C4): exact field schemas after CSV inspection.
- [ ] Firestore `members` collection: which fields are load-bearing? Schema dump after `firebase firestore:export`.
- [ ] Firestore other collections discovered in dump.
- [ ] Substack API endpoint + auth shape — confirm via `substack-api` skill.
- [ ] Luma API endpoint + auth shape — write `cdp/domain-skills/luma/` if API blocks.
- [ ] WhatsApp CSV header format — confirm by exporting one group as test.
