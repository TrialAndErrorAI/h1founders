# Spec: h1bfounders.com HTML Rewrite + admin.h1bfounders.com (v2)

**Status**: Spec ready for execution
**Source interview**: 6 rounds, May 5, 2026 ~5:00 PM ET (Sid + Atlas)
**Mode**: spec-first → fresh `/wake-code` session executes from this doc
**Sister specs**: `spec_cf-native-migration.md` (Phase 1 backfill — already LIVE on production D1)

---

## Problem

Three pains in current Vite+React `client/`:
1. **AI-citation invisible** — GPTBot/Claude/Perplexity don't execute JS. JS-rendered React = 0 AI-assistant citations for "EB-1A self-evaluation" / "H1B startup paths" queries.
2. **AI-dev-friction** — 5 routes scattered across React component tree; flat HTML+JS easier for Atlas to navigate in single sessions.
3. **No admin surface** — 1,097 people / 1,155 enrollments live in production D1 (Phase 1 backfill), no UI to view.

Resolution: pre-rendered static HTML (AI-bot legible) + separate admin app on subdomain behind CF Access.

## Users

- **Public**: H1B founders + visa-holders researching paths (organic search + AI citations) — primary surface is h1bfounders.com.
- **Admin**: Sid (sid@trialanderror.ai) — sole user behind CF Access policy on admin.h1bfounders.com. Allowlist is exactly that one email; extending to Ercan or other team members is a one-line policy edit later.

## Scope (in)

### Public site (h1bfounders.com)

- 4 routes ported to static HTML: `/`, `/programs`, `/live`, `/join`
- 1 interactive route: `/tools/eb1a-qualifier` (vanilla JS — see EB-1A note below for module path reconciliation)
- 4 legacy redirects preserved: `/offerings`, `/coaching`, `/launch-club`, `/newsletter`
- Tally form embeds stay as `<iframe>` in v2 of THIS spec. **Sequencing**: if `spec_cf-native-migration.md` Phase 2 (Serotte native form at `/programs/serotte-handoff`) ships first, the Serotte iframe in `/programs` is replaced inline at that point — html-rewrite spec doesn't gate on it.
- Tailwind via CDN, version pinned (no Vite, no PostCSS pipeline)

### Admin app (admin.h1bfounders.com)

- Separate CF Pages project (`h1f-admin`), same repo workspace at `admin/`, same D1 binding
- CF Access Zero Trust policy on the subdomain: Google SSO, allowlist `sid@trialanderror.ai`
- Routes (no `/admin` prefix — subdomain IS the namespace):
  - `/` — dashboard (totals + recent signups)
  - `/people` — paginated table + search by name/phone/email + filter by source
  - `/enrollments` — filter by program/cohort/status
  - `/forms` — `form_submissions_raw` audit log
- Server-rendered HTML via Pages Functions: each route is a Function that queries D1 → emits HTML inline → returns. Tiny vanilla JS for client-side filter on already-loaded rows. Zero `/api/admin/*` JSON endpoints in v1; the routes ARE the API.

### Build pipeline

- One source: `src/site.html` with `<template id="route-name">` blocks per route
- `scripts/build-site.ts` (~50-line Bun script): reads source, splits per route, emits `public/{index,programs,live,join,tools/eb1a-qualifier}.html`
- **Turbo task registration**: add `build:site` to `turbo.json` with `inputs: ["src/site.html", "scripts/build-site.ts"]` and `outputs: ["public/**"]` so the monorepo build graph stays sound until `client/` workspace deletion
- Run pre-deploy via `bun run build:site` (or `turbo build:site`)
- This is a preprocessor, NOT a bundler — no transpilation, no module resolution, just string-split-and-write

### Cleanup (this sprint)

- **Commit 0 (FIRST, before any v2 work)**: delete forum code — `client/src/components/forum/`, `client/src/types/forum.types.ts`, `client/src/components/Community.tsx`, contentParser forum branches. Verified dead — zero references in `App.tsx` routes. 5-min commit. Removes risk surface for entire build window.
- Delete `client/` workspace entirely after parity gate passes (cutover commit). Removes Vite + React + 4 workspace packages.
- Delete `shared/` workspace at same cutover commit — unused after `client/` and `server/` removal. (`server/` Hono kill is owned by `spec_cf-native-migration.md` Phase 1 Step 0.)
- Existing Pages Functions (`/api/proxy`, `/api/track`, `/api/launch-club`) NOT touched in this sprint (audit deferred per R3).

## Scope (out)

- Native form replacements for Tally — owned by `spec_cf-native-migration.md` Phase 2 (Serotte) / future v3 (LC pipeline)
- New EB-1A criteria, scoring changes, content additions — port-as-is, no rework
- Multi-user admin (other team members) — single-email allowlist v1
- Admin write operations (mark-paid, manual-add-person, CSV export) — read-only v1, additive in v2 admin sprint
- Custom analytics — `/api/track` audit deferred
- Forum migration — dies in commit 0, doesn't re-emerge
- **Visual identity refresh** — locked to **port-as-is in v2**. NO new components, NO layout restructure, NO new color palette. Permitted only: copy/text edits if Atlas notices an obvious typo or factual stale, Tailwind class swaps if a 1-for-1 equivalent reads cleaner. Visual refresh is a v3 sprint with its own design spec.

## Approach

### Architecture (validated by web search May 5)

```
                                       ┌─ public/index.html
                                       ├─ public/programs.html
src/site.html  ──[bun build-site]──►   ├─ public/live.html
(1 source)                             ├─ public/join.html
                                       └─ public/tools/eb1a-qualifier.html

CF Pages project 'h1founders'                ┌─ src/eb1a-scoring.js
  output dir: public/                        │  (pure function module,
  custom domain: h1bfounders.com             │   imported by qualifier.html)
  D1 binding: h1f-tech-stack                 └─ public/_redirects
  (binding kept for /api/proxy etc)             (legacy URL → new mapping)


admin/                                  CF Pages project 'h1f-admin'
├─ functions/                             output dir: admin/dist (or just admin/)
│  ├─ index.ts          (dashboard)       custom domain: admin.h1bfounders.com
│  ├─ people.ts         (table)           CF Access policy:
│  ├─ enrollments.ts    (filter)            Google SSO, allowlist sid@trialanderror.ai
│  └─ forms.ts          (audit log)       D1 binding: same h1f-tech-stack
└─ static/                                  (CF supports same D1 → multiple Pages projects)
   └─ admin.css         (shared style)
```

### EB-1A Qualifier port (vanilla JS)

**Reconciliation with sister spec**: `spec_cf-native-migration.md` Phase 1 already mandated extraction of EB-1A scoring to `client/src/lib/eb1a-scoring.ts` (pure-function module, no React deps). This spec consumes that work — does NOT re-extract.

**If sister-spec extraction has shipped**: import `client/src/lib/eb1a-scoring.ts` directly into `src/eb1a-qualifier.js` (a thin wrapper that handles form submit + DOM render). At cutover commit, MOVE the file to `src/eb1a-scoring.ts` (or `.js` after compilation) so it survives `client/` deletion.

**If sister-spec extraction has NOT shipped yet**: this sprint becomes the extraction — do it once, place at `src/eb1a-scoring.js` (final location), and update sister-spec's Phase 1 step to mark the work done. No double-extraction.

Path that survives both specs: `src/eb1a-scoring.js` (or `.ts`). Kill the React file at cutover. Single source of truth.

Steps:
1. Form HTML lives in `src/site.html` template `eb1a-qualifier`
2. `src/eb1a-scoring.js` exports `scoreSubmission(answers) → {totalPoints, criteria, verdict}`
3. `src/eb1a-qualifier.js` imports + binds form submit → renders result inline
4. No D1 write in v1 (deferred). v2 admin sprint may add lead capture.

### Admin render pattern (server-side via Pages Function)

Example `admin/functions/people.ts`:

```typescript
import type { PersonRow } from '../../scripts/_lib/migration-types'
import { renderTablePage } from './_render'

export const onRequestGet: PagesFunction<{DB: D1Database}> = async ({env, request}) => {
  const url = new URL(request.url)
  const search = url.searchParams.get('q') ?? ''
  const limit = 50
  const offset = parseInt(url.searchParams.get('offset') ?? '0')

  const stmt = search
    ? env.DB.prepare('SELECT * FROM people WHERE phone LIKE ?1 OR email LIKE ?1 OR full_name LIKE ?1 ORDER BY created_at DESC LIMIT ?2 OFFSET ?3').bind(`%${search}%`, limit, offset)
    : env.DB.prepare('SELECT * FROM people ORDER BY created_at DESC LIMIT ?1 OFFSET ?2').bind(limit, offset)
  const {results} = await stmt.all<PersonRow>()

  return new Response(renderTablePage('People', PEOPLE_COLUMNS, results, url.searchParams), {
    headers: {'content-type': 'text/html; charset=utf-8'},
  })
}
```

**Type reuse**: import row types (`PersonRow`, `EnrollmentRow`, `RawSubmissionRow`) from `scripts/_lib/migration-types.ts` (canonical, written during Phase 1 backfill). Admin must NOT redefine these.

**Render helper signature** (declared once, used by all 4 admin routes):
```typescript
function renderTablePage(title: string, columns: ColumnDef[], rows: any[], queryParams: URLSearchParams): string
```
`queryParams: URLSearchParams` keeps the contract flexible — routes own their param parsing. No typed options bags that balloon as routes diverge.

**v1 architecture choice**: query + render colocate in the same Pages Function (no service layer abstraction). v2 admin sprint extracts a query layer if route count grows past ~6.

**Index-aware queries**:
- `/people` search uses `LIKE '%query%'` — full-table scan (B-tree leading `%` defeats `idx_people_phone` / `idx_people_email`). Acceptable at 1,097 rows (~2ms). Revisit at >10K rows or migrate to FTS5.
- `/enrollments` filters compose left-to-right on `idx_enrollments_program_status_person`: program-only ✓ index, program+status ✓ index, status-only or cohort-only = full scan. Acceptable at 1,155 rows.
- `/forms` queries on `idx_submissions_form` (form_source, submitted_at) — covers the common "show recent submissions for form X" path.

**Unknown admin route**: serve CF Pages default 404. No custom 404 page in v1.

### Cutover sequence

**Commit 0 (BEFORE any v2 work)**: delete forum code (5 min, see Cleanup section).

1. Build new public site to `public/`, deploy as preview (`pages_branch=v2-html` or similar)
2. Smoke-test all 5 routes + 4 legacy redirects on the preview URL — Atlas runs the binary parity gates listed under Success Metric below
3. Switch CF Pages production to v2 branch (or merge v2 to master + redeploy)
4. **CONFIGURE CF ACCESS POLICY FIRST** on `admin.h1bfounders.com` — Sid logs into CF Zero Trust dashboard, creates policy: Application = `admin.h1bfounders.com`, Action = Allow, Include = "Email is `sid@trialanderror.ai`", default rule = Block. Verify policy active (visit subdomain in incognito → expect Google sign-in prompt + 403 if not allowlisted).
5. NOW deploy admin app: build `admin/`, deploy `h1f-admin` Pages project, attach `admin.h1bfounders.com` custom domain. The Access policy from step 4 was already in place when DNS resolved → **zero PII exposure window**.
6. Verify admin dashboard + 3 tables load correctly for sid@trialanderror.ai; verify deny works for any other email.
7. **Delete `client/` + `shared/` workspaces entirely** — same commit. Removes React/Vite + dead forum-code residue (already nuked in commit 0) + unused shared types.
8. Document in EXECUTION.md what shipped + what's still on Tally.

**Why CF Access first**: between step 5 and policy config, `admin.h1bfounders.com` would publicly serve D1 contents (1,097 PII rows) to the open internet. Reordering eliminates that window.

## Open Questions

- **What pages should /tools/eb1a-qualifier link to or from?** — current React app may have implicit nav; check during port.
- **Tailwind CDN version pin** — pin to specific 3.x at port time.
- **Admin pagination size** — 50 default OK, or different per table?
- **Empty-state UX** for admin pages with 0 rows post-filter — generic message OK?

All execution-time judgment, not architecture forks. (Visual scope removed from this list — locked port-as-is in Scope Out.)

## Success Metric

**Hard gates** (binary, must pass):
1. h1bfounders.com loads all 4 public pages + EB-1A working in production
2. All 4 legacy redirects (`/offerings` → `/programs` etc.) still work
3. EB-1A scoring produces same output as React version for ≥3 representative test cases (same point math, same verdict band)
4. admin.h1bfounders.com loads, blocks non-allowlist emails (Sid tries from incognito → 403), serves dashboard + 3 tables to sid@trialanderror.ai
5. `client/` and `shared/` directories deleted; forum code grep returns zero matches

**Parity gates** (binary, Atlas-runnable — no human judgment):
1. Lighthouse score ≥95 on desktop for ALL 5 public routes (free with pre-render)
2. `curl -s https://h1bfounders.com/programs | grep -i "launch club"` returns content (AI-crawler legibility test — view-source shows real text, not blank shell)
3. Admin tables render <500ms server-side for 1,097 rows (measured via `wrangler tail` or browser devtools)
4. No broken images: `curl --head` every `<img src>` in built HTML, expect 200s
5. All `<a href>` to internal routes resolve to a 200 in built `public/`

## Non-goals

- Build a CMS, blog system, or content management UI
- Add new public routes
- Replace any Tally forms with native versions
- Add analytics or tracking
- Make admin multi-user
- Add admin write operations
- Migrate `/api/proxy` (tech-stack analyzer) or `/api/launch-club` to new patterns
- Visual refresh — port-as-is, v3 sprint owns design language work
- Add EB-1A lead capture to D1 (deferred to v3)

---

## Handoff

Spec written to `code/docs/spec_html-rewrite-v2.md`. Open new `/wake-code h1bfounders` session and pass this file as context. /interview's job is done.

**Commit sequence** (binding for the cutover-safety reordering, flexible on titles):

0. `chore: delete forum code (dead since launch — never routed)` — kill `client/src/components/forum/`, `forum.types.ts`, `Community.tsx`, contentParser forum bits BEFORE v2 work
1. `feat(site): src/site.html source + scripts/build-site.ts + public/ output for /, /programs, /live, /join`
2. `feat(site): EB-1A Qualifier port (vanilla JS, src/eb1a-scoring.{js,ts} canonical)`
3. `feat(admin): h1f-admin CF Pages project — dashboard + people + enrollments + forms (server-rendered)`
4. **`chore: configure CF Access policy on admin.h1bfounders.com BEFORE custom domain attach`** — Sid manual step, document the dashboard config in commit message
5. `feat(admin): attach admin.h1bfounders.com custom domain` — DNS goes live AFTER policy
6. Cutover commit: delete `client/` + `shared/`, switch CF Pages production output

Each code commit gets `/simplify` per Phase 2.5. Each `CLAUDE.md` edit (if any) gets `/sharpen` per Phase 2.6.

---

## /sharpen pass — May 5, 2026 ~5:45 PM ET

Three adversarial review agents (Reuse / Quality / Efficiency) caught **3 HIGH + 8 MEDIUM** convergent issues. All applied:
- Cross-spec contradictions reconciled (D1 name `h1f-tech-stack`, EB-1A extraction single canonical path)
- Phantom `h1b-coo` agent stripped (didn't exist), replaced with binary Atlas-runnable parity gates
- Cutover reordered: CF Access policy BEFORE custom domain (eliminates PII exposure window)
- Forum cleanup moved to commit 0 (was step 8, lingered in prod for entire build window)
- Visual scope locked port-as-is (was "license to improve" hand-wave)
- Type reuse declared (admin imports `PersonRow`/`EnrollmentRow` from `scripts/_lib/migration-types.ts`)
- Render helper signature declared (`renderTablePage(title, columns, rows, URLSearchParams)`)
- Index-aware query notes added (LIKE search full-scan acknowledged; `idx_enrollments_program_status_person` left-prefix usage documented)
- Lighthouse gate tightened to all 5 routes (was 2)
- Turbo task registration documented for `build:site`
- 404 handler one-liner added (CF Pages default)

**Note on D1 name**: sister `spec_cf-native-migration.md` v2 still references rename to `h1f-core` (CF doesn't support rename via API/CLI — discovery May 5 mid-Phase-1). Sister spec gets a corresponding update in next session: drop rename language, document `h1f-tech-stack` as final name.
