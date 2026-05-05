# H1Founders Machine Tracker

## Action List

### P0 — CF-Native Migration (Sid-blocked items)
- [ ] **Firestore export — DEFERRED** (May 5). `firebase` CLI not installed. Two paths to resurrect later: (A) `npx firebase-tools login` then `npx firebase-tools firestore:export gs://...` (needs GCS bucket + billing), OR (B) firebase-admin SDK script with service account key dumped to `data/migration/firestore/` (no bucket, no billing — recommended). Spec at `code/docs/spec_cf-native-migration.md`. Phase 0 exit criterion #1.

### P0 — Next (Apr 25-28)
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
- **Apr 17, 2026 (Fri)**: WIN CLUB Portal v0 shipped. Private R2 bucket `winclub` + Cloudflare Worker gate at **winclub.h1bfounders.com** + Basic Auth per member + custom domain with auto-SSL. First artifact = Khasim's Jackson Spalding tape review (4,000-word magazine HTML, TALKER + Recap Protocol frameworks cited verbatim from Winning by Design Books 3 & 5). Architecture extracted to `winclub/ARCHITECTURE.md` + reusable template at `winclub/portal/templates/tape-review.html` + ops playbooks at `winclub/portal/ops/`. Cabinet review convergence: ship artifact IF Khasim pulls + kill productization/tier talk + build redact-and-share step before tape review #2. Full review saved to `docs/cabinet-reviews/2026-04-17_winclub-v0.md`. The portal IS the $497/mo retention strategy — artifacts members can re-read between Friday calls. Not a SaaS, not a product tier system — delivery plumbing for artifacts Sid writes anyway.
- **Apr 14, 2026 (Tue, monster session)**: WIN CLUB subproject fully reorganized + validated. Built `/winclub:cabinet` skill (4-lens consciousness roundtable: AI Sid + Rogers + Berne + Deida). Mined Harshdeep Chunk A (Oct 1-10 onboarding, 4 sessions) — surfaced 9 NEW pattern candidates including 2 first-ever MEET patterns. Cabinet converged on identity-preservation diagnosis. DB extracted to markdown + archived. Calendar-validated all coaching: 40 1:1 bookings (36+ unique), 64 WIN CLUB events, 5 Tough Love delivered. Transcript sync recovered 12 NEW transcripts including 3 NEW 1:1 customers (Huseyin, Zeenath, Varun). Q2 WIN CLUB pitch roster ready (44 prospects). Helped Harshdeep with Anthropic interview answer (lede burial fix).
- **Apr 13, 2026**: Khasim SPI demo prep shipped for Jackson's Holdings pitch (1 PM today). Full sales framework (SPI from Book 3 + Book 5) distilled to 6-question cheat sheet. WhatsApp + doc format. Also drafted generalized SPI Substack post for H1B Founders community.
- **Apr 10, 2026**: Saurabh arc shipped ("life-changing" — but Sid self-scored 6/10). Harshdeep arc FAILED (4/10, emasculated). Both = protocol lessons. Sub-project reorg shipped (coaching/winclub split). Transcript sync completed (180 files). Arc Protocol v1 built, then immediately improved 3x from failures (verify-before-narrate, missing-key-moment veto, engagement-mode signal). 3 WhatsApp exports mined. Khasim Q2-2 revealed he SHIPPED a product + pitching Monday.
- **Apr 8, 2026**: H1B Founders Live Ep 1 shipped. Raj Gupta. 55 min. Cutroom skill born. 8 clips extracted. Show protocol formalized. Lawyer carousel. 5-hour monster session.
- **Apr 7, 2026**: Substack post shipped — "I Read the Actual Immigration Law." First post in 60 days.
