# Code Session State — Tue May 5, 2026 ~5:55 PM EDT

**Last Updated**: 2026-05-05 17:55 ET
**Branch**: master (clean tree, pushed to origin)

## Shutdown Reason

Two-machine session shipped: (1) Phase 1 CF-native migration LIVE on production D1, (2) HTML-rewrite v2 spec written + sharpened. Sid called close. Friday May 8 schedule reminder dropped for migration unblocks (Firestore + Substack + Luma tokens). Next session executes the html-rewrite-v2 spec.

## What We Shipped This Session (7 commits, all pushed)

```
018f4d5  spec(html-rewrite-v2): /sharpen pass — 3 HIGH + 8 MEDIUM caught and applied
1f5506b  docs: Phase 1 backfill LIVE — production D1 has 1,097 people / 1,155 enrollments / 77 raw
1c2b7f2  fix(migration): drop BEGIN/COMMIT from SQL emitter — D1 doesn't support them
448a5c3  tracker: CF-native migration P0 — Atlas-side complete, Sid-blocked items split out
0ad6658  feat(migration): D1 SQL emitter + raw-row remap in merger
d9fc113  feat(migration): D1 schema + cross-source merge preview
dbca327  feat(migration): Phase 1 backfill skeletons — Tally + WhatsApp
```

Pre-commit hook (`turbo test`) ran clean every commit.

## Production D1 (live now)

DB `h1f-tech-stack` (ID `e60bb36e-ec6c-483a-97a5-67b63404f55b`):
- 1,097 people (100% E.164 phone, 56 with email)
- 1,155 enrollments (1,084 WA active + 71 launch_club + 3 serotte paid)
- 77 form_submissions_raw (Tally audit trail)
- 8 indexes
- Coexists additively with existing launch_club_* + analyses tables

## Immediate Next Action

**START HERE**: Read `docs/spec_html-rewrite-v2.md` (243 lines, post-/sharpen). Execute commit 0 first:

```bash
# Commit 0 — delete dead forum code (5 min, removes risk surface)
rm -rf client/src/components/forum/
rm client/src/types/forum.types.ts
rm client/src/components/Community.tsx
# Plus contentParser forum branches — grep first
grep -rn "forum\|Community" client/src/utils/contentParser.ts
# Edit out forum branches
git add -A && git commit -m "chore: delete forum code (dead since launch — never routed)"
```

Then commit sequence per spec § /sharpen pass:
1. `feat(site): src/site.html source + scripts/build-site.ts + public/ output for /, /programs, /live, /join`
2. `feat(site): EB-1A Qualifier port (vanilla JS, src/eb1a-scoring.{js,ts} canonical)`
3. `feat(admin): h1f-admin CF Pages project — dashboard + people + enrollments + forms (server-rendered)`
4. **`chore: configure CF Access policy on admin.h1bfounders.com BEFORE custom domain`** — Sid manual step (CF Zero Trust dashboard, allowlist `sid@trialanderror.ai`)
5. `feat(admin): attach admin.h1bfounders.com custom domain` — DNS goes live AFTER policy
6. Cutover commit: delete `client/` + `shared/`, switch CF Pages production output

## Files to Read on Wake

- `docs/spec_html-rewrite-v2.md` — THE spec (post-/sharpen, execution-ready)
- `docs/EXECUTION.md` — Phase 1 LIVE state, known landmines (incl. PII landmine #0: never `head` fixture/SQL files)
- `docs/spec_cf-native-migration.md` — sister spec (still has stale rename language; flagged for next-session update — drop the `h1f-core` rename, document `h1f-tech-stack` as final)
- `scripts/_lib/migration-types.ts` — canonical row types (admin imports from here, NEVER redefine)
- `client/src/pages/tools/EB1AQualifier.tsx` — source for EB-1A scoring extraction
- `client/src/App.tsx` — current 5-route + 4-redirect structure to mirror in src/site.html
- `migrations/0001_init.sql` — applied schema (reference for admin SQL queries)
- `wrangler.toml` — current D1 binding config (h1f-admin Pages project gets parallel binding)

## Blockers

**This session (HTML rewrite + admin) has NO blockers** — go.

**Sister-spec drift** (5-min cleanup task next session):
- `docs/spec_cf-native-migration.md` still says rename DB to `h1f-core`. Drop rename language, document `h1f-tech-stack` as the final name (CF doesn't support D1 rename via API/CLI — discovery May 5).

**Sid-side, separate Friday May 8 schedule reminder** (NOT blocking next session):
- Firestore export (Path B: firebase-admin SDK service account JSON)
- Substack + Luma API tokens (keychain: `substack-api-token`, `luma-api-token`)
- DNS records (SPF/DKIM/DMARC for h1bfounders.com)
- WIN CLUB form decision · Ercan email worker alignment

Schedule file: `secondbrain-logseq/projects/h1bfounders/_schedule/2026-05-08_unblock-migration-tasks.md`

## Context & Decisions

**Why pure HTML + Bun preprocessor over pure SPA** (web-search-validated May 5):
- GPTBot/Claude/Perplexity don't execute JS (analysis of 500M+ GPTBot fetches showed zero JS execution)
- H1B Founders audience researches visa paths via AI assistants in 2026
- Pure SPA = 0 AI citations for high-intent queries like "EB-1A self-evaluation"
- Build-time pre-render: 1 source HTML for AI legibility + 5 static files for crawler legibility

**Why admin = separate CF Pages project (not /admin/* path)**:
- Sid's call: "small CF-native app architecture"
- Cleaner CF Access policy (subdomain-level, not path-level)
- Separate build/deploy lifecycle, easier to revoke admin access

**Why CF Access policy BEFORE custom domain**:
- Window between deploy and policy-active = open internet sees D1 PII
- /sharpen Quality lens caught this race condition
- Reorder eliminates the window entirely

**Why forum cleanup at commit 0 (not cutover step 8)**:
- Forum code never routed in App.tsx (verified via grep)
- Lingering in prod for entire build window = unnecessary risk surface
- 5-min commit, removes risk class

**Why D1 stays `h1f-tech-stack` (not `h1f-core` rename)**:
- CF D1 doesn't support rename via API or CLI (verified May 5)
- Existing DB has Phase 1 backfill data + 6 launch_club_* tables
- New tables coexist additively, sister spec language stale

**Why visual scope locked port-as-is**:
- "License to improve" was hand-wave that scope-drifts
- Visual refresh is a v3 sprint with own design spec
- v2 = stack swap, content + math identical

## Repo State

```
On branch master
nothing to commit, working tree clean
Your branch is up to date with 'origin/master'.
```

---
**Next wake**: `/wake-code h1bfounders` — loads MEMORY.md (now 1,325 lines incl. this session) + this NOW.md + git context. Read `docs/spec_html-rewrite-v2.md` FIRST, then start commit 0 (forum code deletion).
