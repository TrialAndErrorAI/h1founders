# H1Founders Machine Tracker

## Action List

### P0 — CF-Native Migration

**🎯 Phase 1 Backfill: LIVE on production D1 (May 5, 2026 ~4:45 PM ET)**

Production `h1f-tech-stack` D1 (ID `e60bb36e-...`) now contains:
- 1,097 people (100% E.164 phone, 56 with email)
- 1,155 enrollments (1,084 WA + 71 launch_club + 3 serotte)
- 77 form_submissions_raw (Tally audit trail)
- 8 indexes (2 partial UNIQUE on phone+email, idempotency UNIQUE on enrollments, OKR query covering)
- Coexists cleanly with existing `launch_club_*` + `analyses` tables (additive, no destructive changes)

**Atlas-side complete (May 5)**:
- ✅ Spec v2 sharpened
- ✅ `migrations/0001_init.sql` applied to production D1
- ✅ `backfill-tally.ts` (56 people / 71 enrollments / 77 raw)
- ✅ `backfill-whatsapp.ts` (1,084 people / 1,084 enrollments)
- ✅ `merge-fixtures.ts` cross-source dedup (43 Tally↔WA overlaps, 1,097 canonical)
- ✅ `insert-to-d1.ts` emits `d1-load.sql` (926 KB), applied via `wrangler d1 execute --remote --file=`
- ✅ `_lib/{migration-types,normalize}.ts` shared
- ✅ Note: D1 rename to `h1f-core` abandoned — CF D1 doesn't support rename via API/CLI. DB stays `h1f-tech-stack` name on CF, new tables coexist additively.

**Sid-blocked (next phase)** — Friday May 8 schedule reminder fires for items 1, 3 (`_schedule/2026-05-08_unblock-migration-tasks.md`):
- [ ] **Firestore export** — `firebase` CLI not installed. Path B recommended: firebase-admin SDK script with service account JSON, dumps to `data/migration/firestore/`. Phase 0 exit criterion #1. Once dumped, Atlas writes backfill-firestore.ts + re-runs merge → load.
- [x] ~~Push approval~~ — DONE May 5. 8 commits pushed to `origin/master` cleanly.
- [ ] **Substack + Luma API tokens** — drop in keychain as `substack-api-token` / `luma-api-token`. Then Atlas writes backfill-substack.ts + backfill-luma.ts + cron Worker.
- [ ] **DNS records** — SPF/DKIM/DMARC for h1bfounders.com via CF dashboard. Lead time = days, schedule before Phase 4.
- [ ] **WIN CLUB form decision** — kill (0 historic submissions, WhatsApp-only intake reality) or rebuild for v2?
- [ ] **Ercan email worker alignment** — 15-min Slack confirming h1b becomes 2nd tenant. Fallback: `gmail-sender` skill.

### P0 — HTML Rewrite v2 (NEW — May 5, 2026)

**Spec ready, execution-ready** — `code/docs/spec_html-rewrite-v2.md` (243 lines, post-/sharpen)

- [ ] **Execute html-rewrite-v2 spec** — `/wake-code h1bfounders`, read spec, run commit sequence:
  1. Commit 0: delete forum code (5 min — never routed in App.tsx, dead since launch)
  2. Build src/site.html source + scripts/build-site.ts → public/{4 routes}
  3. EB-1A Qualifier port (vanilla JS, src/eb1a-scoring.{js,ts} canonical)
  4. h1f-admin CF Pages project (server-rendered HTML via Pages Functions)
  5. **Sid manual**: Configure CF Access policy on admin.h1bfounders.com BEFORE custom domain attach (allowlist `sid@trialanderror.ai`, CF Zero Trust dashboard)
  6. Attach admin.h1bfounders.com custom domain
  7. Cutover: delete `client/` + `shared/`, switch CF Pages production output
- [ ] **Sister-spec drift cleanup** (~5 min) — `code/docs/spec_cf-native-migration.md` still says rename DB to `h1f-core`. Drop rename language, document `h1f-tech-stack` as final name (CF doesn't support D1 rename via API/CLI).

### P0 — H1B Live Ep 2 (Khasim, Fri May 15 12:30 PM ET) — NEW May 12-13, 2026

**Confirmed via Khasim WA exchange May 12 10:59 PM → 11:56 PM ET (initial 12 PM), updated May 13 to 12:30 PM ET. Fri May 15 12:30 PM ET LOCKED.** Khasim brings both WIN CLUB foundation arc + instantdashboard product story (pilot with Jackson Spalding meeting Justin Wed). Plan + cue card + promo copy drafted at `h1blive/ep2-khasim-plan.md`, `ep2-cue-card.md`, `ep2-promo-copy.md` (worktree `h1b-ep2-khasim`).

- [x] ~~Send Khasim prep questions~~ — KILLED. Sid redoing full script + plan Thu morning.
- [x] ~~Create Substack Live event~~ — DONE Wed May 13. Live #201440 (recreation after #201322 killed by X-exit; logged as CRITICAL catch).
- [x] ~~Create Luma event~~ — DONE Wed May 13. RSVP at https://luma.com/tm5a7n5o, full constellation cover, cabinet-clean description.
- [x] ~~Generate cover image~~ — DONE Wed May 13. **CONSTELLATION HERO** picked over mic + barbell (community-as-stars, openai-imagegen V2). Canonical at h1blive/ep2-cover.png + ep2-cover-square.png.
- [x] ~~Send Khasim 6 prep questions~~ — Sid handled live without formal prep questions. Pre-show alignment via FaceTime per Ercan tier protocol.
- [x] ~~WhatsApp Announcements + Main Group teaser~~ — DONE Fri May 15 post-show (~4:30 PM ET). Sid posted across multiple H1F Network groups manually (Announcements + Main Group + WIN CLUB-PUBLIC). Reactions inbound by 4:36 PM.
- [x] ~~Substack post — short announcement~~ — Pivoted to post-show metadata wire-up instead (subtitle + show notes + LC/WIN CLUB Tally CTAs). All landed live by ~5 PM ET.
- [x] ~~DM 11 C5 waitlist sign-ups Live invite~~ — N/A in show-day flow. C5 conversion watch continues separately.
- [x] ~~Fri May 15 11:30 AM cue card / Substack Live Chrome setup / pre-call~~ — Cue card shipped at `h1blive/ep2-cue-card.md` (drafted 12:18 PM, 10 min pre-show). Show ran 12:30-1:30 PM. Title aired as **"Foundation Over Tactics"** (pivoted from planned PROCESS anchor). 5 likes, 55 views, 5% opened in first 2 hours. Khasim's "Wall Street charisma" line landed at 25:25.

**Fri May 15 ship summary (~3.5h across show + post-show):**
- Ep 2 LIVE on Substack: https://community.h1bfounders.com/p/h1b-founders-live-ep-2-foundation
- Transcript archived: `winclub/khasim/transcripts/2026-05-15_h1blive-ep2.json` (900 segs, 826K, speaker-diarized)
- Cue card + debrief + clips manifest (6 clips identified) + WhatsApp drafts + Substack metadata source all committed (`1708a5fde`)
- Substack body wired via /cdp: subtitle + 8-bullet show notes + LC C5 Tally CTA + WIN CLUB Tally CTA + privacy edits applied (baby name + pilot $ amount stripped from external)
- New auto-memory `feedback_khasim_privacy_markers.md` — external surfaces strip Musa + specific pilot $ amounts; internal substrate keeps with PRIVACY headers
- `cdp/domain-skills/substack/publish-mechanics.md` enriched: "Update-Already-Published Post" recipe + race-condition rule + safe API republish path (`POST /publish` with `send:false`)
- **NEW INBOUND LC LEAD**: `+1 (608) 960-3498` WhatsApp 3:54 PM ("wondering for the launch club"). Sid responded same-day.
- Khasim's Canada signal sharpened on-air: he disclosed publicly he ALREADY APPLIED for Canadian PR (past tense). Tracks with Q2-3 audit Apr 17 disclosure (planned July move). Q2-4 must open here.

**Wed May 13 ship summary (~7h focus block):**
- Luma event live, constellation cover (openai-imagegen Concept C from 14 variants reviewed), cabinet-rewrite description (AI Sid + H1 COO flagged + applied)
- Substack Live #201440 scheduled, calendar-blast OFF (Sid toggled off pre-click)
- Khasim ($5K Jackson Spalding pilot) + Harshdeep ($303K CoreWeave) WIN intel captured at h1blive/ep2-wins-intel.md (Harshdeep marked PRIVATE per Sid)
- WIN CLUB inbox dropped at winclub/_inbox/2026-05-13_two-wins-same-week-khasim-harshdeep.md
- 6 group announcement drafts at h1blive/ep2-wa-announcements.md (First $10K Club bowtie callback = highest-leverage)
- 5 WA unread queue drafts ready at h1blive/ep2-wa-response-triage.md (P0 = +1-980 ready-to-pay lead)
- New cdp domain skills: luma/ (4 files) + substack/schedule-live-event.md + substack/_README.md + substack/catches.md (cooldown /sharpen pass shipped 5 fixes)
- Cover variants archived at h1blive/_cover-variants/ (14 non-canonical files moved from h1blive root)
- Cue card + plan flagged "v1, REDO THURSDAY" — don't ship from those

### P0 — C5 Cohort Conversion Watch (May 13-27) — DEFERRED TO MAY 27, 2 PAID

**Wed May 20 → ship-or-slide gate pivoted to 1-week DEFER (May 20 → May 27 start).** Trigger: Ankit Gupta (paying C5 lead) asked Tue May 19 8:57 PM ET for travel-conflict defer. Sid confirmed defer with Puneet (already-paid) 9:53 AM ET; Puneet OK May 27. New cohort start: **Wed May 27, 6 PM ET, 3 weeks.**

**Tally form architecture clarified (May 20)** — see `~/.claude/.../memory/reference_lc_tally_forms_split.md`:
- **pbx9Y1** = generic top-of-funnel LC interest (community broadcast, WhatsApp groups)
- **VLY4NE** = C5-specific onboarding form where members PAY + COMMIT
- Previous tracker treated VLY4NE as broken — incorrect. Both forms intentional, different funnel stages.

**PAID + LOCKED FOR MAY 27 (VLY4NE-confirmed):**
- ✅ Puneet Pahuja (+1-720-937-1793) — paid May 19 via VLY4NE, defer confirmed May 20 10:01 AM
- ✅ Ankit Gupta (+1-518-334-8953) — paid May 20 4:49 PM via VLY4NE, "Thank you Sid for moving it to next week"

**Wed May 20 session shipped (~7h, ~17 humans touched):**
- ✅ Substack C3 post UPDATED + republished web-only (no email refire) — title now "Launch Club C5 starts Wed May 27 - here's what we actually cover", body dates updated (Wed May 27 + "Cohort 5: May 27 - June 17, 2026"), C4-Feb/C5-March stale refs removed, testimonial wall (`testimonial.to/h1-founders/all`) inserted. URL: `community.h1bfounders.com/p/launch-club-c3-starts-wednesday-heres`
- ✅ Reframed broadcast posted to 3 WA groups (Main, First $10K, Start a Business) — CREDITOR voice with WHY ("With one person traveling, I am starting the cohort next week instead"), drops "Same content" content-justification
- ✅ Individual defer DMs sent to all C5-tagged pbx9Y1 sign-ups: Srinivas, Palani, Parechay, Narmada, Shruthi, Swamy, Ravi (7 humans)
- ✅ Net-new LC leads discovered + pitched in WA deep-scan: +1-980-248-8343 (Serotte-started, 41-day unreplied), Naveen +1-408-940-5002 (had VLY4NE reaction, May 12 pitched), +1-331-269-9788 (immigration climate call ask), +1-248-238-4344 (acquiring biz), Siddhesh +1-469-664-4324 (idea-stage validation Q)
- ✅ Curriculum-page-on-h1bfounders.com inbox item filed at `_inbox/2026-05-20_lc-curriculum-page-on-site.md` — every 3rd cohort lead asks "how is it structured?", evergreen page would close that question without Sid hand-typing

**OUT (won't be in C5):**
- ❌ Abhijeet (+1-646-243-2350) — opted out 10:28 AM ("will have to sit out of the seminar this time"). Sid sent warm close.
- ❌ Srinivas Chippagiri — opted out (Sid wrote "Good luck Srinivas, hope you find the community helpful" 4:07 PM)
- ❌ Vinayak Shenoy — chose Future cohort on May 7 re-fill (per pbx9Y1 data)
- ❌ Sumit Saurabh (+1-608) — pivoted to WIN CLUB Fri Ep 2 path

**Live signals — next 6 days:**
- 🟡 Palani Ravindran — replied 4:36 PM ("Thanks a lot Sid. Will go through those") after Sid sent Substack + testimonial links. Decision pending.
- 🟡 5 just-pitched humans (silent post-pitch, may bite)
- 🟡 5 defer-notice silent (Parechay, Narmada, Shruthi, Swamy, Ravi)
- 🟡 3 WA group broadcast inbound potential
- 🔵 25 past 1:1 email blast (May 19 Tue 1 AM) — 0 responses, doctrine: silence is the answer, no chase

- [ ] **Watch VLY4NE for new commits over next 6 days** — currently 2. Each new fill = paid lock-in.
- [ ] **Wed May 27 6 PM ET — Cohort kickoff** — send cohort WhatsApp group invite to paid members closer to start
- [ ] **Wed May 27 morning** — final gate check (no slide planned; cohort viable at 2 already, any extra is upside)

### P0 — WhatsApp Sweep Pattern Validation (May 13-20)

- [ ] **Run /sharpen cooldown on /wa:sweep + sister skills ~30 min after first real fire** per Ship-Then-Self-Sharpen rule. First fire = next time `/wa:sweep tally:<FORM>` is invoked (likely C6 prep or B2B port).
- [ ] **Move Mentor-Voice Defaults out of `auto-type-nudge.md` into a dedicated voice profile file** — /sharpen Lens 3 H2 held for design thought. Voice section in caller-context is currently intentional; revisit if /wa:sweep needs multiple voice profiles.
- [ ] **B2B port** — when ready to use /wa:sweep for B2B outreach (not LC), build cohort-config abstraction layer (acknowledged H1B-coupling in v0.5 scope).

### P0 — Next (Apr 25-28) — STALE, NEEDS GROOM
- [ ] **Send Serotte handoff to (541) 602-8288** — Mon Apr 27 AM. Cold lead, self-sponsored H1B, spouse running biz with 2025 revenue (qualified ✅). Sid promised "checklist tomorrow" Sun 9:50 PM. Send V1 template from `coaching/serotte-handoff.md`. **First fire** of the new $750 productized handoff. Log buyer reaction (paid? balked? scope creep?) to validate $750 anchor — need 5 reps before productizing per P3.
- [ ] **Harshdeep Q1-11 debrief capture** — Coaching session happened Fri Apr 24 ~5:35-7 PM. Content NOT in Atlas memory. Next session: run `/transcript-sync` OR ask Sid for 5-bullet summary before Chunk E mining begins. Without this, Q1-11 becomes the missing chunk in the corpus.
- [ ] **Coreweave offer watch** — Expected Monday Apr 28 per recruiter. If offer lands clean: ship arc-v2 to Harshdeep (cal reminder Sat 7:53 PM). If offer falls through or lowballed: Chunk E opens on leverage-under-pressure material instead of arc-v2 integration.
- [ ] **Harshdeep CLAUDE.md numbering fix** — off-by-5 vs DB. Add 6 missing sessions (Oct 31 / Nov 14 / Nov 26 / Feb 20 / Mar 20 / Apr 10) to arc table at `winclub/harshdeep/CLAUDE.md:70-74`. ~15 min cleanup.
- [ ] **Pattern Language catalog expansion** — Chunks B + C + D surfaced 31 PUSH + 12 MEET candidates. Run `pattern-sync` to regenerate INDEX.md after inserting. ~30-45 min. Start with highest-portability: Political Correct Mind Virus (B), Fake Offer Leverage (C), Ego Dial (D), Ask What You Expected (D — grandfather MEET).
- [ ] **Q1-10 transcript duplicate** — delete `2026-04-17_winclub_harshdeep-26Q1-10.txt` (keep `2026-04-17_h1f-winclub_harshdeep_q1-10.txt` per naming convention). 30-sec cleanup.
- [ ] **Vladimir Gusev / ImmCore reply watch** — Day 3 of 7-day ghost window. DM sent Apr 21 ~3:50 PM asking for attorney of record. No reply as of Apr 24 4 PM. Archive at Day 7 (Apr 28) if still silent.
- [ ] **Khasim JS Call 3 follow-through** — Monday email sequence (Email A to Justin, Email B to Shelby Tuesday) drafted in tape review at portal. Verify Khasim sends pre-review drafts to Sid Sunday night before hitting actual send. Call 3 success criterion = ONE pricing shape agreed to by Justin+Shelby by end of call.
- [ ] **Verify "Peak Metrics" vs "PeakMetrix" naming** with Khasim on Monday (tape review uses "Peak Metrics"; his Apr 13 prep doc says "PeakMetrix")
- [ ] **Q2 WIN CLUB pitch** — Roster ready at `coaching/1on1-customers.md` (44 prospects). Draft pitch when ready.
- [ ] Post Ep 1 clips to X + LinkedIn — 8 clips at ~/Downloads/h1b-ep1-clips/
- [ ] Verify podcast auto-published (Apple + Spotify) — overdue since Apr 8
- [ ] **Q2 WIN CLUB pitch** — Roster ready at `coaching/1on1-customers.md` (39 unique humans + 5 Tough Love alumni = 44 prospects). Tier 1 = 4 repeat-bookers (Abidemi, Akshay K, Prasanna, Siva T) + 13 recent 2026 sessions. Draft pitch when ready.
- [ ] Post Ep 1 clips to X + LinkedIn — 8 clips at ~/Downloads/h1b-ep1-clips/. Post to H1Founders LI page + @sidjustice_ X
- [ ] Verify podcast auto-published (Apple Podcasts + Spotify) — overdue since Apr 8

### Completed Apr 24, 2026 PM — Harshdeep Arc v2
- [x] **Harshdeep Arc v2 mining COMPLETE** — 4 chunk mines + unified synthesis. Total ~970 lines structured arc material from ~680 min transcript corpus.
  - Chunk B (S5-S8, Oct 17 – Nov 7): `arc-mines/chunk-b-oct17-nov7-2025.md` (183 lines) — vocabulary chapter.
  - Chunk C (S9-S13, Nov 14 – Feb 20): `arc-mines/chunk-c-nov-feb-2026.md` (203 lines) — strategy chapter.
  - Chunk D (S14-S17, Mar 13 – Apr 17): `arc-mines/chunk-d-mar-apr-2026.md` (234 lines) — offer + repair chapter. MEET category born.
  - Arc v2 synthesis: `arc-v2-oct2025-apr2026.md` (204 lines) — three epochs, 11-wound tracking table, 10 highest-leverage moves, cabinet verdict.
- [x] **Harshdeep coaching Q1-11 held** — Fri Apr 24 5:35-~7 PM. Sid surfaced Apr 17 "What did you expect?" move live. Content pending transcript sync.
- [x] **Calendar reminder scheduled** — Sat Apr 25 7:53 PM ET for arc-v2 WhatsApp delivery (holds if Coreweave pending).

### Completed Apr 24, 2026 AM
- [x] **Khasim JS Call 2 tape review shipped to portal** — `winclub.h1bfounders.com/khasim/jackson-spalding-call-2-review-apr24`. 10 missed moves analyzed, two-email sequence to Shelby (the real champion, not Justin), Scope Gate framework named, Hilton PARLA homework assigned. Shared with Khasim before the 4 PM session. Wrangler upload via `CLOUDFLARE_ACCOUNT_ID=... npx wrangler r2 object put` (CF MCP disconnected this session).
- [x] **Redact-and-share workflow shipped** — Gate `ARCHITECTURE.md:184` CLOSED. Protocol at `winclub/redact-and-share.md` (87 lines after sharpen). Command at `.claude/commands/h1b/winclub-drop.md` (159 lines, 3-agent parallel adversarial review: privacy + AI Sid voice + bowtie-ae teaching). Ledger at `winclub/public-drops.md`. First drop shipped: `scope-gate` lesson.
- [x] **/sharpen pass on both protocol + command** — 6 adversarial agents parallel. Caught 70% doc duplication, AI-tells list duplication, privacy veto-all + unresolvable-split HALT branches missing, lesson_tag provenance, centrifuge metaphor 3x. Protocol 180→87 lines (-52%), command 188→159 lines.
- [x] **Khasim tape review pull-test path skipped** — Apr 17 plan said send "got thoughts on JS demo, write them up or just talk?" BEFORE portal ship. Sid went direct (shared URL pre-session). Not a process violation — Sid's call, trust the sanctuary. Documenting the skip for future reference.

### Completed Apr 14, 2026
- [x] **Khasim Jackson's Holdings demo** — Mon Apr 13, 1 PM (done)
- [x] **WIN CLUB subproject reorg** — Patterns moved code/→winclub/. DB extracted to markdown. Tough Love + 1:1 split. Stale duplicates deleted. Three-artifact flow established (Mine/Pattern/Arc). MEET category added to Pattern Language.
- [x] **`/winclub:cabinet` skill built** — 4 seats: AI Sid, Carl Rogers, Eric Berne, David Deida. 6 modes (gut-check/meet-or-push/stuck/edge/mine/full). Agent files: winclub-{rogers,berne,deida}.md
- [x] **Calendar validation of all coaching numbers** — 40 1:1 bookings (36+ unique), 64 WIN CLUB events, 5 Tough Love DELIVERED (was 4 candidates in DB)
- [x] **DB archived** to `winclub/_archive/db/coaching_crm_ARCHIVED_2026-04-14.db` + README
- [x] **Transcript sync** — 12 NEW transcripts captured via 2 browser-readai runs. Filed to project + iCloud
- [x] **3 NEW 1:1 customers discovered** — Huseyin Altinisik (11/24), Zeenath Fatima (11/25), Varun Prakash Vegi (11/26) — not in calendar audit
- [x] **5 Tough Love delivered** confirmed via T&E calendar (Akshyae, Rana, Gaurav, Vikram, Shikshit). Series stopped Oct 17, 2025
- [x] **Harshdeep Anthropic interview help** — sent structural reorder via WhatsApp Apr 13 evening

### P1 — This Month
- [ ] **Monthly Community Digest (`digest/` sub-project)** — Scaffolded Apr 21. Pattern cloned from Shreyas Doshi's Product Sense Club monthly digest. 10-section template (Announcements / Member Opportunities / Wins / From Sid / Resources / Group of the Month / Community MVPs / Chat Highlights / H1B Founders Live Recap / What's Next). v1 ship target = Q1 2026 recap (late April) OR April-only (decision pending). Capture layer: `digest/raw/2026-04_raw.md` (seed with Khasim ship, Ep 1 Raj, 1,081 milestone, 18 groups, WIN CLUB, Serotte LC integration). v2 = `h1b:monthly-digest` skill for May onward. See `digest/CLAUDE.md` + `digest/PLAN.md`.
- [ ] **SPI Framework Substack post** — Part of **SaaS Sales Series** on H1B Founders Substack. Draft ready at `h1b-content/spi-framework-substack-draft.md`. Needs AI Sid + Sierra review. Publish same week as Khasim demo outcome for authenticity hook. First post in a multi-part sales education series for immigrant founders
- [ ] **Content seed: coaching style reveal** — "I don't coach the same way, each person forces a different version of me." Parked, draft exists. First public reveal of WIN CLUB as private mentorship
- [ ] **Arc Protocol per-call mining** — rebuild approach: mine each call individually, build arcs bottom-up. Protocol doc at `winclub/arc-protocol.md` has lessons + Phase 3.5 forcing function
- [ ] Add cal.com coaching embed to h1bfounders.com/coaching — code task (`/wake-code`)
- [ ] H1B Founders Live logo redesign — Nano Banana
- [ ] WIN CLUB Q1 retro — pricing decision ($497 or raise?), member arcs review
- [ ] Launch Club C5 planning (Q2)
- [ ] Rohit — Wed 7:30 PM CST. CREDITOR: watch, don't act
- [ ] SEO summary post: "How Raj Self-Sponsored His H1B (Step by Step)"

### P3 — Future Products (Ideas, not now)
- [ ] **Serotte Warm Handoff as a productized offer** — Born Apr 26, 2026 after pricing cabinet ($750 cold / $300 LC alum landed). Currently ad-hoc via WhatsApp + Tally form D4qGoX. Template + product spec at `coaching/serotte-handoff.md`. Could fill LC pause gap as passive revenue: 2-4 sales/mo × $750 = $1.5-3K/mo without 1:1 time cost. **Build trigger:** 5 paying cold customers at $750 with no scope creep + Serotte alignment confirmed. Then: standalone landing page on h1bfounders.com, Stripe checkout, email automation (payment → checklist + Serotte intro auto-fired). NOT short-term — validate scope first via ad-hoc flow.
- [ ] **Tape Review as a product** — externalize bowtie + SPI + TALKER + Recap Protocol as a Cloudflare Worker agent with simple UI. User uploads call transcript → agent returns structured tape review (deal position, what they did right, what they missed with timestamps, the N moves to deploy on next call). Born Apr 17, 2026 from Khasim's JS demo review (`winclub/khasim/jackson-spalding-demo-review-apr16.md`) — the format generalizes. Could be: free tool for H1B Founders community → SaaS upsell → enterprise sales coaching tier. NOT short-term. Captures it before the seed gets lost.

### P2 — Backlog
- [ ] Coaching page overhaul (WIN CLUB + Launch Club + cal.com scheduling)
- [ ] Ep 2 guest selection — bring Raj back at 6mo? Or new guest?
- [ ] Video course for Launch Club (scale beyond live cohorts)
- [ ] Khasim arc drop — deferred to May/June. Needs Q2 sessions to accumulate. Phase 1 mining said WAIT (correct). Q2-2 showed product shipped + pitching = arc IS forming now
- [ ] Saurabh deeper arc mining — scored 6/10. Q4+Q1 had more depth. Need per-call mining protocol applied to his transcripts

### Completed (Apr 8-13)
- [x] Host Ep 1 with Raj — SHIPPED 12:00-12:55 PM ET
- [x] Publish recording on Substack
- [x] WhatsApp recap — sent 1:47 PM
- [x] Review Substack clips — Top 3 identified
- [x] Update Substack episode art
- [x] ffmpeg clip protocol built + tested — 8/8 clips
- [x] Show protocol formalized — h1blive/show-protocol.md
- [x] Compliment deflection pattern — MEMORY.md
- [x] Lawyer carousel — 6 slides
- [x] Connect YouTube to Substack
- [x] Saurabh Arc v3.1 shipped — "life-changing" reaction (6/10 self-score)
- [x] Sub-project reorg — coaching/winclub split, member folders, 57 transcripts organized
- [x] Transcript sync — 180 files in iCloud corpus, 4 browser-readai agents
- [x] Arc Protocol built — then rebuilt after Harshdeep failure
- [x] Khasim SPI demo prep shipped — WhatsApp + full doc
- [x] 3 member CLAUDE.mds created (saurabh, harshdeep, khasim)
- [x] 4 mining reports generated (H transcript, H WhatsApp, K transcript, K WhatsApp)

## Wins Log
- **May 9, 2026 (Sat) — LC C5 Outreach Round + Gurjeet H1B**: Gurjeet got self-sponsored H1B approved through his own C-corp (LC C3 alum, Jan 2026 cohort). Community thread organically named the "Welcome to the club" identity (Raj Gupta). LC 5 announcement sent to Main Group + Announcements (May 7). LC form: 9 unique C5 sign-ups (Parechay, Puneet, Ankit, Narmada, Shruthi, Swamy, Sumit, Vinayak, Ravi — including 4-month-stale Jan signup Ravi V.). All 9 personalized DMs sent today via WhatsApp Web. Sumit replied mid-round questioning LC value vs his already-formed C-corp; Sid responded with concurrent-H1B + Serotte handoff value-stack. Born from session: `~/.claude/commands/cdp-learn.md` (teach-probe-capture meta-protocol), `~/.claude/skills/cdp/domain-skills/whatsapp/{new-chat,catches}.md` (WA Web automation recipe + catches ledger). Manish S in Main Group surfaced the limiting-belief-trap pattern ("I'll repeat my doubt until someone concedes") — Sid called it out CREDITOR-style, multiple members landed in support, candidate Substack post material. C5 starts week of May 18.
- **May 6, 2026 (Wed) 🏆 WIN CLUB WIN**: Harshdeep closed Coreweave WRITTEN offer — $190K (Microsoft) → $290K Y1 total comp (~50% jump). $165K base + 15% bonus + $375K RSU/4yr + 401K match. Manager flying to Seattle to close him. Closes 6-month coaching arc (Oct 17 2025 → today): leetcode + spreadsheet → resume to 9/10 → behavioral interview surgery → declined HouseWhisper Mar 13 (no leverage move) → Coreweave director round Apr 24 → today's negotiation final-mile call (joining-bonus surgical script). Today's call surfaced 5 new MEET-category coaching patterns (chess-victory-point / coach-withdrawal-graduation / this-is-not-India / last-girlfriend-projection / courtship-acceptance) + tactical joining-bonus script. **Strategic thesis surfaced**: productize Behavioral Interview + Offer Negotiation as separate coaching track — Harshdeep's arc is the proof. Podcast next week = public writeup vehicle. Full receipts: `winclub/harshdeep/wins/2026-05-06_coreweave-offer-closed.md`. Thesis breadcrumb: `_inbox/2026-05-06_harshdeep-win-and-new-coaching-track.md`.
- **Apr 17, 2026 (Fri)**: WIN CLUB Portal v0 shipped. Private R2 bucket `winclub` + Cloudflare Worker gate at **winclub.h1bfounders.com** + Basic Auth per member + custom domain with auto-SSL. First artifact = Khasim's Jackson Spalding tape review (4,000-word magazine HTML, TALKER + Recap Protocol frameworks cited verbatim from Winning by Design Books 3 & 5). Architecture extracted to `winclub/ARCHITECTURE.md` + reusable template at `winclub/portal/templates/tape-review.html` + ops playbooks at `winclub/portal/ops/`. Cabinet review convergence: ship artifact IF Khasim pulls + kill productization/tier talk + build redact-and-share step before tape review #2. Full review saved to `docs/cabinet-reviews/2026-04-17_winclub-v0.md`. The portal IS the $497/mo retention strategy — artifacts members can re-read between Friday calls. Not a SaaS, not a product tier system — delivery plumbing for artifacts Sid writes anyway.
- **Apr 14, 2026 (Tue, monster session)**: WIN CLUB subproject fully reorganized + validated. Built `/winclub:cabinet` skill (4-lens consciousness roundtable: AI Sid + Rogers + Berne + Deida). Mined Harshdeep Chunk A (Oct 1-10 onboarding, 4 sessions) — surfaced 9 NEW pattern candidates including 2 first-ever MEET patterns. Cabinet converged on identity-preservation diagnosis. DB extracted to markdown + archived. Calendar-validated all coaching: 40 1:1 bookings (36+ unique), 64 WIN CLUB events, 5 Tough Love delivered. Transcript sync recovered 12 NEW transcripts including 3 NEW 1:1 customers (Huseyin, Zeenath, Varun). Q2 WIN CLUB pitch roster ready (44 prospects). Helped Harshdeep with Anthropic interview answer (lede burial fix).
- **Apr 13, 2026**: Khasim SPI demo prep shipped for Jackson's Holdings pitch (1 PM today). Full sales framework (SPI from Book 3 + Book 5) distilled to 6-question cheat sheet. WhatsApp + doc format. Also drafted generalized SPI Substack post for H1B Founders community.
- **Apr 10, 2026**: Saurabh arc shipped ("life-changing" — but Sid self-scored 6/10). Harshdeep arc FAILED (4/10, emasculated). Both = protocol lessons. Sub-project reorg shipped (coaching/winclub split). Transcript sync completed (180 files). Arc Protocol v1 built, then immediately improved 3x from failures (verify-before-narrate, missing-key-moment veto, engagement-mode signal). 3 WhatsApp exports mined. Khasim Q2-2 revealed he SHIPPED a product + pitching Monday.
- **Apr 8, 2026**: H1B Founders Live Ep 1 shipped. Raj Gupta. 55 min. Cutroom skill born. 8 clips extracted. Show protocol formalized. Lawyer carousel. 5-hour monster session.
- **Apr 7, 2026**: Substack post shipped — "I Read the Actual Immigration Law." First post in 60 days.
