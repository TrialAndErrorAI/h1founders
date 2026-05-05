# CF-Native Migration — Execution Handoff

**Status**: Phase 0 ~70% complete (Atlas-actionable items shipped, Sid-blocked items pending)
**Source spec**: `docs/spec_cf-native-migration.md` v2 (sharpened)
**Handoff date**: Tue May 5, 2026 ~3:00 PM EDT
**Why this doc**: Session context full, fresh `/wake-code h1bfounders` session resumes from here

---

## TL;DR for next session

```
DONE: Tally JSON × 10 forms, WhatsApp 1084/1088 phones, growth_hacks.db archived,
      field-map.md scaffold, wrangler.target.toml scaffold, gitignore PII

BLOCKED ON SID: Firestore export (firebase CLI not installed),
                Substack/Luma API tokens, Ercan email worker alignment,
                WIN CLUB form decision, DNS records, GitHub deploy gate

NEXT TO RUN: scripts/backfill-tally.ts skeleton (Atlas, no blockers),
             then Phase 0 exit criteria 1, 9, 10 (Sid actions)
```

---

## Phase 0 Exit Criteria — Status

| # | Criterion | Status | Owner | Notes |
|---|---|---|---|---|
| 1 | Firestore JSON dump in R2 | ⏳ BLOCKED | Sid | `firebase` CLI not installed; recommend firebase-admin SDK script with service account JSON, not GCS bucket. See "Firestore" section below |
| 2 | Tally CSV/JSON bundle in R2 | ✅ DONE (local) | Atlas | All 10 forms × 77 submissions captured as JSON via `api.tally.so` direct fetch. Files at `data/migration/tally/*.json` (gitignored PII). R2 upload deferred until bucket created (Phase 1 step) |
| 3 | WhatsApp export complete | ✅ DONE | Atlas | Community-level capture via /cdp: 1,088 of 1,098 members, 1,084 with phones (99.6% — gap-filled from Mac Contacts SQLite). Subgroup affiliations skipped per Sid (v2). Files at `data/migration/whatsapp/community-1098-enriched.csv` |
| 4 | `field-map.md` mapping all source fields | ✅ DONE (scaffold) | Atlas | `data/migration/field-map.md` — Tally forms D4qGoX + pbx9Y1 mapped exhaustively, cohort onboarding TBD until inspection in Phase 1 |
| 5 | Per-collection Firestore decision | ⏳ DEPENDS ON #1 | Sid | After dump lands, Sid + Atlas review per-collection KEEP/ARCHIVE-ONLY/DROP. Forum collections default ARCHIVE-ONLY |
| 6 | Sid ↔ Ercan email worker alignment | ⏳ BLOCKED | Sid | 15-min Slack confirming h1b becomes second tenant of T&E shared email worker. Fallback: `gmail-sender` skill (already exists) |
| 7 | WIN CLUB form decision | ⏳ BLOCKED | Sid | Kill (WhatsApp-only intake reality, 0 historic submissions) or rebuild native? Default: kill if no answer by Phase 2 step 3 |
| 8 | DNS SPF/DKIM/DMARC for h1bfounders.com | ⏳ BLOCKED | Sid | Cloudflare DNS dashboard. Lead time matters (DNS propagation slow), do NOT defer to Phase 4 |
| 9 | growth_hacks.db inspected + archived | ✅ DONE | Atlas | 1 row of `growth_hack_tools`, 0 analyses. No load-bearing data. Archived to `data/migration/archives/growth_hacks.{db.bak,schema-and-data.sql}`. Safe to nuke `data/growth_hacks.db` from repo on Sid's say-so |
| 10 | Substack + Luma API endpoints verified | ⏳ BLOCKED | Sid | Need API tokens (keychain). Substack-api skill covers publish endpoints only — subscriber-list endpoint requires verification curl. Luma API auth + scope unconfirmed |
| 11 | Backup retention written | ✅ DONE | Atlas | Indefinite, R2 cold storage, ~$0.0036/mo at <100MB |

---

## What's in the repo (commits, no push)

```
1c185e3  feat(migration): Phase 0 scaffolds — field-map + wrangler target + PII gitignore
96f7f81  docs: CF-native migration spec v2 + cabinet review + machine tracker
ef3f123  chore: clean up Apr 14 WIN CLUB reorg residue
f11927f  migration: Phase 0 receipts — WA spec update, tally-forms intel, Firestore deferred
```

**4 commits ahead of origin/master.** Live users on h1bfounders.com — DO NOT PUSH without Sid's explicit approval.

---

## File Inventory

### Design artifacts (committed)

| File | Purpose |
|---|---|
| `docs/spec_cf-native-migration.md` | v2 architecture spec, sharpened, with Decisions Held for Sid |
| `docs/EXECUTION.md` | This file — execution handoff |
| `docs/h1f-machine-tracker.md` | Project tracker (CF-native migration P0 row added) |
| `docs/cabinet-reviews/2026-04-17_winclub-v0.md` | Apr 17 winclub cabinet review (surfaced from inbox triage) |
| `data/migration/field-map.md` | Source fields → D1 column mapping, identity resolution rule |
| `data/migration/.gitignore` | PII guard — actual data never commits, only design docs |
| `wrangler.target.toml` | Post-migration wrangler config (NOT live — `wrangler.toml` still binds h1f-tech-stack) |

### Migration data (gitignored, local + Atlas-readable)

| Path | Contents | Size |
|---|---|---|
| `data/migration/tally/D4qGoX_serotte-handoff.json` | 3 Serotte submissions | ~10K |
| `data/migration/tally/pbx9Y1_launch-club-pipeline.json` | 48 LC pipeline applications | ~100K |
| `data/migration/tally/{LZPK1y,aQOWVq,7Rl0A2,KYQN27}_*.json` | 26 cohort onboarding submissions across 4 forms | ~70K |
| `data/migration/tally/{VLY4NE,KYx92V,b59yv1,ODQagK}_*.json` | 4 empty forms (LC C5, WIN CLUB, Founder Demo draft, LCC1 v2) | small |
| `data/migration/whatsapp/community-1098.json` | Raw /cdp capture, 1,088 members | 115K |
| `data/migration/whatsapp/community-1098.csv` | CSV: name, phone_e164, phone_raw, description | 45K |
| `data/migration/whatsapp/community-1098-enriched.csv` | **CANONICAL** — gap-filled from Mac Contacts | 47K |
| `data/migration/whatsapp/.mac-contacts.csv` | Mac Contacts.app bulk export, intermediate | ~50K |
| `data/migration/archives/growth_hacks.{db.bak,schema-and-data.sql}` | Pre-nuke archive | 40K |

### Domain skills updated (cross-session reusable, dotfiles)

| Skill | Update |
|---|---|
| `~/.claude/skills/cdp/domain-skills/tally/forms-and-submissions.md` | Discovery: real API at `api.tally.so/forms/<ID>/submissions?page=N&filter=all`. CSV download URL is HTML wrapper, useless. |
| `~/.claude/skills/cdp/domain-skills/whatsapp/member-extraction.md` | Working recipe: open `[data-animate-modal-body="true"]`, find virtualizer scroll container (sh > ch + 100), scroll incrementally, dedupe by `title` key. ~90s for 1,098 members. |
| `~/.claude/skills/cdp/SKILL.md` | New "Window sizing" section — `Browser.setWindowBounds` for offscreen elements. Born from WA "View all" button being hidden at 1280px width |
| `~/.claude/skills/cdp/catches.md` | Logged: tally HTML wrapper trap, WA Web phone-hiding for saved contacts |

---

## Discoveries (for next session — these reshape execution)

### The schema rescope (already in spec v2)
- ❌ ~~Two D1s (`h1f-core` + `h1f-tech-stack`)~~ → ✅ ONE D1 unified `h1f-core` (rename existing, keep ID `e60bb36e-ec6c-483a-97a5-67b63404f55b`)
- ❌ ~~Column-level UNIQUE on phone/email~~ → ✅ Partial UNIQUE INDEX with `WHERE col IS NOT NULL`
- ❌ ~~No idempotency~~ → ✅ `UNIQUE (person_id, program, cohort)` on enrollments
- ❌ ~~Substack/Luma upsert-only cron~~ → ✅ Full-list pull with churn detection (flips status='churned' for missing)
- ❌ ~~Phase 5 Firestore no soak~~ → ✅ 30-day soak mirroring Tally pattern

### v1 rescope
- v1 = Phase 0 + Phase 1 + Phase 2 (Serotte ONLY) + Phase 5 (Firestore decommission). 3-4 weeks.
- v2 = remaining native forms + frontend HTML rewrite + Tally decommission. Separate sprint.

### WhatsApp data acquisition
- Confirmed via /cdp: phone for unsaved contacts (~95% of community) lives in row text, regex-extractable
- Saved-contact phones hidden by WA UI (privacy by design) — recoverable via Mac Contacts SQLite (`AddressBook-v22.abcddb`) join by name
- Final coverage: 1,084 / 1,088 = 99.6%
- 4 unmatched: "You" (Sid), "Umer Naeem" (saved differently), 2 ambiguous duplicates

### Hono server vs Pages Functions decision
- Codebase has BOTH (`server/src/index.ts` + `functions/api/*`)
- Phase 1 Step 0 picks Pages Functions, kills `server/`. Migration of one live endpoint (`/api/proxy` for tech-stack analyzer) to a Pages Function

### Email infrastructure
- Primary: Reuse Ercan's RAI email worker (T&E shared infra, in development for Loops replacement)
- Fallback (HARD CUTOFF if Ercan delays past Phase 4 start): `gmail-sender` skill (already exists at `~/.claude/skills/gmail-sender/`)

---

## Sid Action Queue (in priority order)

1. **Firestore export decision** — Option A (firebase-tools CLI + GCS bucket) or Option B (firebase-admin SDK + service account JSON, recommended)
2. **Slack Ercan** — confirm h1bfounders becomes second tenant of T&E email worker
3. **WIN CLUB form decision** — kill or rebuild for v2?
4. **Substack + Luma API tokens** — find/create, drop in keychain as `substack-api-token` + `luma-api-token`
5. **DNS records** — set SPF/DKIM/DMARC for h1bfounders.com via CF dashboard. Lead time = days
6. **Push approval** — review the 4 commits ahead of master, decide push timing (none of them touch live code, all docs + data scaffolds)

---

## Atlas Action Queue (next session, no blockers)

1. **Write `scripts/backfill-tally.ts`** — TypeScript script that reads `data/migration/tally/*.json`, dedupes by phone (then email), inserts to D1. Can write the skeleton without D1 live; tests against fixture data
2. **Write `scripts/backfill-whatsapp.ts`** — reads `community-1098-enriched.csv`, creates one `people` row per member + one `enrollments` row with `program='whatsapp_community'`
3. **Inspect cohort onboarding form schemas** — open the 4 cohort JSONs, fill out the "TBD" sections in `data/migration/field-map.md`
4. **Verify Substack/Luma full-list endpoints** (after Sid drops API tokens) — single curl each
5. **Once Firestore dump lands** — write `scripts/backfill-firestore.ts`, surface per-collection KEEP/ARCHIVE/DROP table to Sid

---

## /wake-code resume protocol

```bash
/wake-code h1bfounders
```

The new session will:
1. Read `code/CLAUDE.md` (project identity, deployment rules)
2. Read `code/MEMORY.md` (note: stale Apr 14, use git log for current truth)
3. Read `code/NOW.md` (note: very stale Nov 25 2025, IGNORE)
4. **Read this file** (`docs/EXECUTION.md`) — the actual current state
5. Read `docs/spec_cf-native-migration.md` v2 — the architecture
6. `git log --oneline -10` — confirm 4 commits ahead, no new pushes
7. Continue from Atlas Action Queue or wait for Sid Action Queue items to land

---

## Known landmines / DO NOT REPEAT

1. **Tally CSV download URL returns HTML, not CSV.** Use `api.tally.so` directly. Domain skill captures this.
2. **WhatsApp Web's `data-scraped` attribute (floriandiud script) breaks under virtualization** — same DOM nodes recycled with new content. Custom dedup by `title` key required.
3. **`firebase` CLI is NOT installed** — `npx firebase` fails because the package is `firebase-tools`. Fix: `npx firebase-tools` OR firebase-admin SDK script (preferred — no GCS bucket).
4. **`screenshot()` helper returns 9 bytes**, not base64. Use `cdp("Page.captureScreenshot", format="png")["data"]` directly.
5. **AppleScript on Contacts.app iterates 617 contacts slowly** (>30s, hangs). Use SQLite directly: `~/Library/Application Support/AddressBook/Sources/.../AddressBook-v22.abcddb` → `ZABCDPHONENUMBER` joined to `ZABCDRECORD`.
6. **`switch_tab()` only sticks within current heredoc** — colocate switch + work + verification in one heredoc.
7. **Window narrow viewport hides "View all" buttons** — use `Browser.setWindowBounds` to resize before clicking offscreen elements.

---

*Built across one session, May 5, 2026. Ready for fresh-context resume.*
