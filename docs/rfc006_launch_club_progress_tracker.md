# RFC 006: Launch Club Progress Tracker

**Status:** Draft
**Created:** Nov 23, 2025
**Author:** Atlas (H1Founders Project)
**Implements:** Visible accountability for H1B self-sponsorship artifact creation
**Cohort:** C1 (current, Week 3 = Nov 26) - C2 starts mid-December

---

## Problem Statement

**Current state:**
- Launch Club C1 running now (Week 3 call = Nov 26)
- 4-week sprint to create self-sponsorship artifacts
- Price: $997 (testing up to $2,500 for C2)
- Using Tally form checklist (one-time submission)
- No visibility into cohort progress
- No accountability mechanism between sessions

**Problem:**
- One-time checklist = no sense of momentum
- Founders can't see cohort progress (no social proof)
- Sid can't easily track who's blocked vs crushing it
- No screenshot-able wins for WhatsApp ("5 founders incorporated!")
- Can't identify who needs help before they fall behind

**Solution:**
Visual progress tracker showing cohort-wide artifact completion with:
- Milestone cards (Foundation → Infrastructure → Pitch Ready → Attorney Ready)
- Individual progress bars per founder
- Cohort stats ("6/8 founders have EIN")
- Real-time updates when tasks completed
- Mobile-friendly for founders to check off on phone

**What This Is NOT:**
- NOT coaching (that's WIN CLUB)
- NOT validation tracking (no "talked to customers")
- NOT revenue coaching (no "first sale")
- **JUST artifacts** - did you get the thing or not?

---

## The $997 Value Proposition

Launch Club delivers **artifacts**, not coaching:

| What You Get | Value If Done Separately |
|--------------|-------------------------|
| Delaware C-Corp setup guide | $500 (lawyer review) |
| EIN + DUNS walkthrough | $100 (accountant time) |
| Mercury/Gusto/Puzzle stack | $200 (research time) |
| Founder loan template | $500 (accountant advice) |
| Cap table template | $300 (lawyer template) |
| Pitch deck framework | $500 (consultant) |
| Cloudflare landing page | $200 (dev time) |
| Attorney-ready documentation | $1,000 (prep work) |
| **Total value** | **$3,300+** |

**Price: $997** (C1) → Testing $2,500 (C2)

**Tax savings angle:** First business expense = 30% deduction. $2,500 really costs $1,750.

Graduate to WIN CLUB ($497/mo) if you need actual coaching.

---

## Milestone Structure

### Week 1: Corporate Foundation 🏛️
*"Your company exists on paper"*

| Task | Artifact | Why It Matters |
|------|----------|----------------|
| Form Delaware C-Corp (or LLC) | Certificate of incorporation | Legal entity for H1B sponsorship |
| Get EIN from IRS | SS-4 confirmation letter | Required for everything else |
| Get DUNS number | DUNS registration | Government contracts, credibility |
| Set up registered agent | Service agreement | Legal compliance, privacy |

**Milestone complete when:** Certificate + EIN + DUNS in hand

### Week 2: Business Infrastructure 💰
*"Money can flow through your company"*

| Task | Artifact | Why It Matters |
|------|----------|----------------|
| Open Mercury bank account | Account number + debit card | Startup-friendly, no minimums |
| Set up Gusto payroll | Payroll dashboard active | H1B requires being on payroll |
| Connect Puzzle.io | Accounting connected | AI bookkeeping, tax-ready |
| Configure Mercury invoicing | First invoice created | Revenue-ready, no extra tools |
| Set up founder loan | Loan agreement + wire | Fund company without buying stock |

**Milestone complete when:** Can receive payment and pay yourself

**Founder loan:** Loan money TO your company (instead of capital contribution). Take it back as loan repayment (return of principal, not taxable).

### Week 3: Pitch Ready 📊
*"Investor and attorney materials complete"*

| Task | Artifact | Why It Matters |
|------|----------|----------------|
| Complete cap table | Spreadsheet with ownership % | Equity structure clear |
| Build pitch deck | 10-slide deck | Fundraising ready |
| Write business plan | 2-3 page document | Required for H1B petition |
| Prepare financial docs | Bank statements + projections | USCIS wants to see funds |

**Milestone complete when:** Can send to investor or attorney same day

### Week 4: Attorney Ready 🚀
*"Everything needed for H1B petition"*

| Task | Artifact | Why It Matters |
|------|----------|----------------|
| Purchase domain | Domain registration | Professional presence |
| Deploy Cloudflare landing page | Live URL | Proves real business |
| Prepare Product Hunt listing (optional) | Draft ready | Validation + publicity |
| Schedule attorney consultation | Calendar invite confirmed | Next step clear |

**Milestone complete when:** Ready for H1B filing conversation

**Note:** Product Hunt optional - not everyone wants publicity before H1B filing.

---

## Design Specification

### Page Structure

```
/launch-club/tracker

1. Hero Section
   - "Launch Club C1 Progress"
   - Cohort stats: "Week 3 | 5/8 at Milestone 2"
   - Sid's note: "You're building your escape vehicle"

2. Cohort Progress Grid (2x4 cards on desktop, stacks on mobile)
   - Each founder: Avatar/initials + name + progress bar
   - Progress bar: 4 segments (one per milestone)
   - Hover/tap: See which tasks complete
   - Sorted by: Most progress → Least progress

3. My Progress Panel (logged-in founder)
   - Current milestone expanded
   - Task checklist with checkboxes
   - "Mark Complete" button per task
   - Artifact upload optional (proof)

4. Milestone Legend
   - Week 1: Foundation 🏛️
   - Week 2: Infrastructure 💰
   - Week 3: Pitch Ready 📊
   - Week 4: Attorney Ready 🚀

5. Stats Bar (Screenshot-friendly)
   - "5 founders incorporated"
   - "8 EINs obtained"
   - "3 business loans approved"
   - Updates in real-time
```

### Visual Design

**Theme:** Matrix aesthetic (consistent with h1founders.com)

**Color System (THEME VARIABLES ONLY):**
```css
/* Use these, NEVER hardcode */
--background: dark
--foreground: primary text
--accent: green highlights
--border: subtle separators
```

**Milestone Colors:**
- Incomplete: `bg-secondary` with muted border
- In Progress: `bg-secondary` with `border-accent`
- Complete: `bg-secondary` with checkmark + glow effect

**Progress Bar:**
- 4 equal segments
- Empty: `bg-tertiary`
- Complete: `bg-accent` with subtle glow

**Typography:**
- Headers: Bold, terminal aesthetic
- Body: System font
- Stats: Monospace (`font-mono`)

**Responsive:**
- Desktop: 4-column founder grid
- Tablet: 2-column grid
- Mobile: 1-column stack, large tap targets

---

## Copy & Messaging

### Hero Section
```
H1 LAUNCH CLUB: COHORT 2
━━━━━━━━━━━━━━━━━━━━━━━

"You're not starting a business.
You're building your escape vehicle."

12 days remaining | 8 founders | 67% at Milestone 2
```

### Milestone Headers
```
MILESTONE 1: CORPORATE FOUNDATION
"Your company exists. That's not nothing."

MILESTONE 2: BUSINESS INFRASTRUCTURE
"Money can flow. You're real now."

MILESTONE 3: PITCH READY
"Investor or attorney - you're ready for both."

MILESTONE 4: ATTORNEY READY
"H1B petition materials complete. You graduated."
```

### Stats (Screenshot-friendly)
```
COHORT STATS
━━━━━━━━━━━━
5/8 incorporated
8/8 EIN obtained
3/8 business loan approved
2/8 attorney scheduled

// These numbers are proof. Share them.
```

### Empty State (No Progress Yet)
```
YOUR ESCAPE VEHICLE: NOT STARTED

The checklist is simple.
Getting it done is the hard part.
That's why you're here.

→ Start with Milestone 1
```

### Completion Celebration
```
MILESTONE 2 COMPLETE ✓

Money can flow through your company.
You're more real than 90% of "entrepreneurs."

Next: Pitch Ready materials.
```

---

## Technical Implementation

### Database Schema (SQLite - coaching_crm.db)

```sql
-- Cohorts
CREATE TABLE launch_club_cohorts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                    -- 'Cohort 2'
    start_date TEXT NOT NULL,              -- '2025-11-12'
    end_date TEXT,                         -- '2025-12-03'
    price INTEGER NOT NULL DEFAULT 997,
    status TEXT DEFAULT 'active',

    CHECK (start_date LIKE '____-__-__'),
    CHECK (status IN ('active', 'completed', 'cancelled'))
) STRICT;

-- Milestones (static, same for all cohorts)
CREATE TABLE launch_club_milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                    -- 'Corporate Foundation'
    week_number INTEGER NOT NULL,          -- 1, 2, 3, 4
    tagline TEXT,                          -- 'Your company exists on paper'
    icon TEXT,                             -- '🏛️'

    UNIQUE (week_number)
) STRICT;

-- Tasks within milestones
CREATE TABLE launch_club_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    milestone_id INTEGER NOT NULL,
    name TEXT NOT NULL,                    -- 'Get EIN from IRS'
    description TEXT,                      -- 'File SS-4 online'
    artifact TEXT,                         -- 'SS-4 confirmation letter'
    display_order INTEGER NOT NULL,

    FOREIGN KEY (milestone_id) REFERENCES launch_club_milestones(id)
) STRICT;

-- Founders in cohorts
CREATE TABLE launch_club_founders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cohort_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    firebase_uid TEXT,                     -- Link to auth if they have account
    avatar_url TEXT,
    joined_at TEXT DEFAULT (datetime('now')),

    FOREIGN KEY (cohort_id) REFERENCES launch_club_cohorts(id),
    UNIQUE (cohort_id, email)
) STRICT;

-- Progress tracking
CREATE TABLE launch_club_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    founder_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    notes TEXT,                            -- Optional notes

    FOREIGN KEY (founder_id) REFERENCES launch_club_founders(id),
    FOREIGN KEY (task_id) REFERENCES launch_club_tasks(id),
    UNIQUE (founder_id, task_id)
) STRICT;
```

### File Structure

```
client/src/
├── pages/
│   └── LaunchClubTracker.tsx          # Main dashboard
├── components/launch-club/
│   ├── CohortGrid.tsx                 # Founder progress cards
│   ├── FounderCard.tsx                # Individual founder progress
│   ├── MilestoneChecklist.tsx         # Task checklist for current founder
│   ├── ProgressBar.tsx                # 4-segment progress visualization
│   └── CohortStats.tsx                # Screenshot-friendly stats
└── hooks/
    └── useLaunchClubProgress.ts       # Data fetching + mutations

App.tsx
└── Add route: <Route path="launch-club/tracker" element={<LaunchClubTracker />} />
```

### API Endpoints

**Read Operations:**
```typescript
// Get cohort with all founders and progress
GET /api/launch-club/cohort/:cohortId

// Get current founder's progress
GET /api/launch-club/my-progress
```

**Write Operations:**
```typescript
// Mark task complete
POST /api/launch-club/complete-task
Body: { taskId: number }

// Unmark task (undo)
DELETE /api/launch-club/complete-task/:taskId
```

### Authentication & Control

**C1 (Small cohort - Sid-controlled):**
- Sid updates progress manually (edit database directly)
- No self-service for C1 (accountability through coach)
- Static display, founder names visible

**C2+ (Self-service):**
- Founders log in (Firebase auth)
- Mark own tasks complete
- Sid admin override available

**Privacy:** Names visible for accountability ("Sarah incorporated" > "Founder 3 incorporated")

---

## Success Metrics

### Primary (Launch Club effectiveness)
1. **Completion rate:** % of founders reaching Milestone 4
   - Target: 80%+ complete all milestones
   - Current baseline: Unknown (first tracked cohort)

2. **Artifact velocity:** Days to complete each milestone
   - Target: 7 days per milestone average
   - Flag founders > 10 days behind

3. **Business loan success:** % who get the $5K loan
   - Target: 60%+ approved
   - Track: Approval rate, denial reasons

### Secondary (Tracker engagement)
4. **Daily check-ins:** Founders logging in to update
   - Target: 70%+ check in 3x/week

5. **Screenshot shares:** Sid sharing stats to WhatsApp
   - Target: 2x/week during cohort

6. **WIN CLUB conversion:** Graduates who join coaching
   - Target: 30%+ convert to WIN CLUB or other tier

### Tracker-specific
7. **Mobile completion rate:** Tasks completed on mobile
   - Target: 50%+ (founders on-the-go)

8. **Time on page:** Engagement with dashboard
   - Target: < 2 min (fast check-in, not browsing)

---

## Open Questions

### Product Decisions (Need Sid Input)

1. **C2 founder list:** Who are the 8 founders? Need names + emails to seed.

2. **Privacy level:** Should founders see each other's names, or just "Founder 1, 2, 3..."?
   - **Recommendation:** Real names (accountability through visibility)

3. **Artifact upload:** Should founders upload proof (EIN letter, etc.)?
   - **Recommendation:** Optional (reduces friction, trust-based)

4. **Business loan trick:** What is this specifically? Need details to make task description helpful.

5. **Product Hunt listing:** Is this required or optional for graduation?
   - **Recommendation:** Optional (not everyone wants publicity)

### Technical Decisions

6. **Real-time updates:** WebSockets for live cohort view, or polling?
   - **Recommendation:** Polling every 30s (simpler, sufficient)

7. **Data storage:** SQLite (coaching_crm.db) or new D1 database?
   - **Recommendation:** SQLite (already have Git LFS, coaching CRM patterns)

8. **Invite flow:** How do founders join tracker?
   - Option A: Email with magic link
   - Option B: Sid manually adds to database
   - **Recommendation:** Option B for C2 (small cohort), build invite flow for C3

---

## Implementation Timeline

### Phase 1: Core (Day 1 - Today)
- [ ] Database schema created
- [ ] Seed milestones and tasks (static data)
- [ ] Seed C2 cohort with founders
- [ ] Basic dashboard UI (CohortGrid + FounderCard)

### Phase 2: Interactivity (Day 2)
- [ ] Login-gated founder view
- [ ] MilestoneChecklist with checkboxes
- [ ] Complete/uncomplete task mutations
- [ ] ProgressBar component

### Phase 3: Polish (Day 3)
- [ ] CohortStats component (screenshot-friendly)
- [ ] Matrix theme styling (use theme variables)
- [ ] Mobile responsive
- [ ] Deploy to production

### Phase 4: Admin (Week 2)
- [ ] Sid admin view (all cohorts)
- [ ] Add/remove founders
- [ ] Manual progress override
- [ ] Export stats to CSV

**Target:** MVP ready for Week 3 session (Nov 26)

---

## Rejected Alternatives

### 1. Notion/Coda shared doc
**Why rejected:** Not branded, no mobile app, can't customize UX

### 2. Tally form per week
**Why rejected:** No visibility into cohort progress, no real-time updates

### 3. Full coaching platform (like WIN CLUB dashboard)
**Why rejected:** Overengineered for $997 artifact tracking. Launch Club is simpler.

### 4. Anonymous progress ("Founder 1, 2, 3")
**Why rejected:** Accountability requires names. "Sarah incorporated" > "Founder 3 incorporated"

---

## Future Enhancements (Not MVP)

1. **Artifact gallery:** See other founders' pitch decks (with permission)
2. **Leaderboard:** "First to incorporate" recognition
3. **Streak tracking:** Days in a row with progress
4. **Email reminders:** "You're 3 days behind Milestone 2"
5. **Graduation certificate:** PDF for completing all milestones
6. **WIN CLUB upsell:** "Ready for coaching?" prompt at completion

---

## Approval Checklist

- [ ] Milestone structure approved (4 weeks, artifact-focused)
- [ ] Task list approved per milestone
- [ ] Copy/messaging approved (voice alignment)
- [ ] Technical approach approved (SQLite, React)
- [ ] Privacy decision made (names visible or not)
- [ ] C2 founder list provided
- [ ] Business loan trick documented
- [ ] Ready for implementation

---

**Status:** Awaiting Sid's review and answers to open questions.

---

*"$997 buys artifacts, not coaching. You get the kit. You build the vehicle."*
