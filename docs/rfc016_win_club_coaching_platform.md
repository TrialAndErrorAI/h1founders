# RFC 016: WIN CLUB Coaching Platform

**Author**: NEXUS (CPTO)
**Created**: September 23, 2025
**Status**: Draft
**Priority**: HIGH - Q4 cohort starting soon
**Implementation Time**: 8 hours for MVP

## Summary

Build an internal coaching platform for WIN CLUB that captures session data, tracks member progress, and creates a moat through accumulated coaching insights. Not a sales tool - this is for managing active cohorts and creating long-term value from session data.

## Problem Statement

Currently managing WIN CLUB would require:
- Manual tracking of 5 members × 2 sessions/week × 12 weeks = 120 sessions
- No systematic way to capture session transcripts (goldmine data)
- No member visibility into their progress
- No way to prep efficiently for each session
- Lost opportunity to build data moat from coaching insights

## Solution: Two-Sided Coaching Platform

### 1. SUPER COACH Dashboard (Sid's View)

**URL**: `/win-club/coach`

**Today's Sessions Widget**:
```typescript
interface SessionPrep {
  memberId: string;
  memberName: string;
  sessionNumber: number; // "Session 7 of 24"
  scheduledTime: Date;

  // Quick context
  lastSessionSummary: string;
  openActionItems: string[];
  currentRevenue: number;
  revenueChange: number; // +$2,000 since last week
  biggestBlocker: string;

  // Prep prompts
  questionsToAsk: string[]; // AI-generated based on patterns
  pushPoints: string[]; // Where to push them harder
}
```

**Member Progress Grid**:
```
┌─────────────────────────────────────────────────┐
│ Member    │ Revenue  │ Sessions │ Status        │
├───────────┼──────────┼──────────┼───────────────┤
│ Saurabh   │ $5K→$15K │ 12/24    │ 🚀 Crushing   │
│ Harshdeep │ $0→$3K   │ 11/24    │ ✅ On Track   │
│ Khasim    │ $2K→$2K  │ 10/24    │ ⚠️ Stuck      │
│ [New]     │ $0       │ 0/24     │ Starting 10/1 │
│ [New]     │ $0       │ 0/24     │ Starting 10/1 │
└─────────────────────────────────────────────────┘
```

**Session Management**:
- Click member → See all their data
- Add session notes in real-time
- Upload/paste transcript after session
- Mark action items complete/incomplete
- Track "wins" for social proof later

### 2. Member Portal

**URL**: `/win-club/member`

**Progress Dashboard**:
```typescript
interface MemberDashboard {
  // Hero metrics
  revenueGrowth: {
    start: number;
    current: number;
    percentChange: number;
    chart: ChartData; // Week-by-week progress
  };

  // Session tracking
  sessionsCompleted: number;
  sessionsRemaining: number;
  nextSession: Date;

  // Accountability
  actionItems: {
    completed: ActionItem[];
    pending: ActionItem[];
    overdue: ActionItem[];
  };

  // Wins & milestones
  wins: Win[]; // First customer, $10K month, etc.
}
```

**Session History**:
- View past session transcripts
- See Sid's notes and feedback
- Track what you committed to
- Review breakthrough moments

**AI Insights** (Future):
- "Members like you typically breakthrough at session 8"
- "Your blocker pattern matches Saurabh's - here's what worked"
- "Based on 50+ sessions, try this approach"

### 3. Transcript Capture System

**The Moat**: Every session becomes data

**Capture Methods**:
1. **Manual**: Sid pastes transcript after session
2. **Semi-Auto**: Upload Zoom/Meet recording → Transcribe
3. **Future**: Direct integration with recording tools

**Data Extraction**:
```typescript
interface SessionTranscript {
  id: string;
  memberId: string;
  sessionDate: Date;
  rawTranscript: string;

  // AI-extracted insights
  keyTakeaways: string[];
  blockers: string[];
  commitments: string[];
  breakthroughs: string[];

  // Sentiment analysis
  memberMood: 'frustrated' | 'motivated' | 'breakthrough';
  coachingStyle: 'push' | 'support' | 'challenge';
}
```

**Long-term Value**:
- Pattern recognition across all members
- Playbook generation from successful paths
- Predictive insights for new members
- Content/case studies from anonymized data

## Technical Implementation

### Phase 1: MVP for Q4 Cohort (4 hours)

**Quick & Dirty Dashboard**:
```typescript
// Simple React components
<CoachDashboard>
  <TodaysSessions />
  <MemberGrid />
  <QuickAddSession />
</CoachDashboard>

// Firestore structure
/win_club_members/{memberId}
  - name, email, phone
  - startRevenue, currentRevenue
  - biggestBlocker
  - cohortId

/win_club_sessions/{sessionId}
  - memberId
  - sessionNumber
  - date
  - notes
  - transcript
  - actionItems[]
```

### Phase 2: Member Portal (2 hours)

**Basic member view**:
- Login with existing H1Founders auth
- See their sessions and progress
- View action items
- Track revenue growth

### Phase 3: Transcript Intelligence (2 hours)

**Simple transcript handling**:
```typescript
async function processTranscript(text: string) {
  // Use Claude API to extract
  const insights = await claude.extract({
    prompt: "Extract key takeaways, blockers, and commitments",
    text: transcript
  });

  // Store structured data
  await saveSessionInsights(insights);
}
```

## Database Schema

```javascript
// Firestore collections
/win_club_cohorts/{cohortId}
  - name: "Q4 2025"
  - startDate: Date
  - members: string[]

/win_club_members/{userId}
  - profile:
    - name, email, linkedIn
    - business, website
  - metrics:
    - startRevenue, currentRevenue
    - startDate
  - cohortId

/win_club_sessions/{sessionId}
  - memberId
  - cohortId
  - sessionNumber
  - scheduledDate
  - completedDate
  - duration
  - notes (Sid's notes)
  - transcript
  - actionItems[]
  - insights (AI-extracted)

/win_club_action_items/{itemId}
  - memberId
  - sessionId
  - description
  - dueDate
  - status: 'pending' | 'completed' | 'dropped'
  - completedDate
```

## User Flows

### Sid's Pre-Session Flow
1. Open dashboard at 9am
2. See "2 sessions today: Saurabh 2pm, Harshdeep 4pm"
3. Click Saurabh → See last session summary, open items
4. Get AI suggestions: "Push on pricing - he's undercharging"
5. Conduct session with context

### Sid's Post-Session Flow
1. Session ends
2. Add quick notes while fresh
3. Paste transcript (from Otter.ai or manual)
4. Mark action items
5. Set focus for next session

### Member Flow
1. Get email: "Session summary ready"
2. Login to portal
3. See transcript, action items, progress
4. Work on action items
5. Update progress before next session

## Success Metrics

**Immediate (Q4 2025)**:
- All 5 members onboarded
- 100% session capture rate
- <5 min prep time per session
- Member portal usage >2x/week

**Long-term**:
- 500+ session transcripts by end 2026
- AI insights improving session outcomes
- 50% reduction in repeated advice
- Playbook emerges from patterns

## Implementation Checklist

### Day 1 (Before Cohort Starts)
- [ ] Create Firestore collections
- [ ] Build coach dashboard skeleton
- [ ] Add member CRUD operations
- [ ] Create session tracking

### Week 1
- [ ] Add transcript capture
- [ ] Build member portal
- [ ] Email notifications
- [ ] Basic charts

### Month 1
- [ ] AI insight extraction
- [ ] Pattern recognition
- [ ] Advanced analytics
- [ ] Mobile optimization

## The Moat Strategy

**Why This Creates Defensibility**:

1. **Data Accumulation**: Every session adds to the knowledge base
2. **Pattern Recognition**: See what actually works across founders
3. **Predictive Power**: Know when breakthroughs typically happen
4. **Personalization**: Tailor coaching based on similar member journeys
5. **Content Generation**: Real case studies and examples

**Future Possibilities**:
- "WIN CLUB AI Coach" trained on successful patterns
- Automated session prep based on member type
- Predictive interventions ("Members who struggle here benefit from...")
- Cohort matching based on compatibility
- Alumni network features

## Risks & Mitigations

**Risk**: Members uncomfortable with transcript storage
**Mitigation**: Clear consent, show value of insights, anonymization options

**Risk**: Too much manual work for Sid
**Mitigation**: Start simple, automate gradually, focus on high-value activities

**Risk**: Platform complexity hurts coaching quality
**Mitigation**: Coach dashboard is optional aid, not required. Keep it simple.

---

**Next Steps**:
1. Get Sid's input on must-have features for Q4
2. Build MVP coach dashboard (4 hours)
3. Add member portal (2 hours)
4. Test with mock data before Oct 1
5. Iterate based on actual usage

**Remember**: This is a coaching aid and data capture tool, not a distraction. Every feature should make sessions better or capture value for the future.