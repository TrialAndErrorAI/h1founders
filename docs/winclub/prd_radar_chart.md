# PRD: WIN CLUB Radar Chart & Dashboard

**Created**: September 30, 2025
**Target**: Q1 2026 (after Q4 cohort completes)
**Priority**: HIGH - Core transformation proof system

## The Vision

Visual proof of transformation - like Tiago Forte's BASB Snapshot that showed Sid going from 30% → 57%.

**The Power**: Founders SEE their growth on a 12-point radar chart. Undeniable visual proof.

## Inspiration: BASB Snapshot

Reference: `/Users/sid/Downloads/BASB  {Stage} Snapshot for Sid sidsarasvati@gmail.com.pdf`

**What made it powerful:**
- Radar chart showing 12 dimensions
- Before (hollow) vs After (filled) overlaid
- Visual expansion = immediate impact
- Overall score: 30% → 57% (almost 2x growth)
- Professional, clean design

## WIN CLUB CODE Framework

**12 Dimensions across 4 pillars:**

### CREATE (Technical Execution)
1. AI Coding Skill
2. Systems Thinking
3. Metrics Mastery

### OWN (Identity/Mindset)
4. Self-Accountability
5. Decision Speed
6. Learning Velocity

### DRIVE (Market/Revenue)
7. Market Understanding
8. Growth Execution
9. Focus/Fail Fast

### ENERGIZE (Health/Foundation)
10. Physical Health
11. Mental Practice
12. Energy Management

**Scale**: 1-10 on each dimension

## User Flow

### Phase 1: Baseline (Oct 1, 2025)
1. Founder receives Google Form link
2. Rates self 1-10 on all 12 dimensions
3. Data stored in coaching_crm.db
4. Sid can view baseline before sessions

### Phase 2: Sessions (Oct-Dec 2025)
1. 20 min sessions, 2x/week (Wed/Fri)
2. Read.ai records transcripts
3. Sid adds session notes
4. Progress tracked over time

### Phase 3: Final (Dec 19, 2025)
1. Founder completes same scorecard
2. System generates radar chart automatically
3. Shows Before vs After overlay
4. Calculates overall improvement percentage
5. Exports as image for testimonial

## Technical Requirements

### Database Schema

```sql
-- New table for CODE scorecards
CREATE TABLE code_scorecards (
    id INTEGER PRIMARY KEY,
    client_id INTEGER,
    assessment_type TEXT, -- 'baseline' or 'final'
    assessment_date DATE,

    -- CREATE scores
    ai_coding_skill INTEGER,
    systems_thinking INTEGER,
    metrics_mastery INTEGER,

    -- OWN scores
    self_accountability INTEGER,
    decision_speed INTEGER,
    learning_velocity INTEGER,

    -- DRIVE scores
    market_understanding INTEGER,
    growth_execution INTEGER,
    focus_fail_fast INTEGER,

    -- ENERGIZE scores
    physical_health INTEGER,
    mental_practice INTEGER,
    energy_management INTEGER,

    overall_score REAL, -- calculated average
    created_at TIMESTAMP,

    FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

### Radar Chart Component

**Tech Stack**:
- Chart.js or Recharts (React)
- 12-point radar/spider chart
- Overlay baseline (hollow/outline) vs final (filled/solid)
- Color: Matrix green theme

**Data Format**:
```typescript
interface CodeScorecard {
  clientId: number;
  name: string;
  baseline: {
    create: [number, number, number]; // AI, Systems, Metrics
    own: [number, number, number];    // Accountability, Decision, Learning
    drive: [number, number, number];  // Market, Growth, Focus
    energize: [number, number, number]; // Physical, Mental, Energy
    overall: number;
  };
  final: {
    // same structure
  };
  improvement: number; // percentage
}
```

### Features Needed

**1. WIN CLUB Dashboard** (`/win-club/coach`)
- List all members with baseline scores
- Quick view before each session
- Session history + notes
- Link to Read.ai transcripts

**2. Radar Chart Generator** (`/win-club/member/[id]`)
- Visual comparison (baseline vs final)
- Exportable as PNG
- Shareable link for testimonials

**3. Google Form Integration**
- Manual for Q4 2025 (Sid enters data)
- Automated for Q1 2026 (API integration)

**4. Session Notes**
- Simple text area per session
- Read.ai transcript link storage
- Key insights/breakthroughs

**5. Dec 19 Auto-Report**
- Generate radar chart
- Calculate improvement %
- Email to member with visual
- "You went from X% → Y%"

## Success Metrics

**For Q4 2025 Cohort:**
- 3 baseline scorecards collected (Oct 1)
- 3 final scorecards collected (Dec 19)
- 3 radar charts generated
- Visual proof of transformation
- 23 total sessions (holiday-adjusted)

**For Platform:**
- < 2 min to view member baseline before session
- < 30 sec to generate radar chart
- Testimonial-ready export

## Timeline

**Q4 2025 (Manual):**
- Oct 1: Baseline via Google Form
- Oct-Dec: Sessions tracked manually (23 sessions total)
- Dec 19: Final via Google Form (final session before holidays)
- Jan 2026: Manually create radar charts

**Q1 2026 (Automated):**
- Build WIN CLUB dashboard
- Build radar chart generator
- Integrate Google Form → DB
- Test with Q1 cohort

## Design Notes

**Keep it simple:**
- Professional, not flashy
- Matrix green theme
- Focus on the transformation
- Make the visual do the work

**Inspiration**: BASB Snapshot PDF (that green → filled overlay is perfect)

---

*This becomes the testimonial engine. Visual proof > text claims.*

*Created: September 30, 2025 - Q4 2025 cohort prep*
