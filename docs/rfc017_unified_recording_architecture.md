# RFC 017: Unified Recording & Content Architecture
**Author**: ATLAS
**Created**: October 1, 2025
**Status**: Proposed - Awaiting NEXUS Review
**Priority**: HIGH - Session 1 data needs proper home
**Implementation**: Database migration (non-destructive)

## Executive Summary

We have 4 content types that all need recording/transcript/analysis infrastructure:
1. **1:1 Coaching** - One-off paid sessions ($185)
2. **WIN CLUB** - Recurring mentorship (2x/week, $497/mo)
3. **Tough Love** - Free public coaching episodes
4. **Lightning Talks** - Presentations/workshops (future)

Current database schema uses generic names (`sessions`, `check_ins`) that blur these distinctions. This RFC proposes a clean, AI-first architecture that:
- Separates content types clearly
- Unifies recording/transcript infrastructure
- Enables the "founder intelligence platform" vision from Tough Love PRD
- Supports RFC016's member portal features

## Problem Statement

### Current Schema Issues

**Confusing names:**
- `sessions` - Could be anything (actually 1:1 coaching)
- `check_ins` - WIN CLUB specific but missing recording fields
- `tough_love_candidates` - Has transcript_stored flag but no actual transcript

**Missing infrastructure:**
- WIN CLUB sessions can't store transcripts (will have 23 sessions × 3 members = 69 recordings)
- Tough Love transcripts not captured in DB
- No unified approach for Lightning Talks
- AI analysis stored per-table instead of unified

**The Reality:**
We just recorded Session #1 with Harshdeep. Where does the transcript go? `check_ins` table has no transcript fields. We're about to have 69 WIN CLUB sessions with nowhere to put the gold (transcripts + Sid's notes).

## Proposed Solution

### 1. Rename Tables for Clarity

```sql
-- Old → New
sessions → coaching_sessions_1on1
check_ins → win_club_sessions
tough_love_candidates → tough_love_sessions
```

**Why:** Names match reality. No confusion about what data lives where.

### 2. Create Unified Recording Infrastructure

```sql
-- NEW: Universal recording storage
CREATE TABLE session_recordings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_type TEXT NOT NULL,             -- 'coaching_1on1', 'win_club', 'tough_love', 'lightning_talk'
    session_id INTEGER NOT NULL,            -- FK to respective session table

    -- Recording data
    recording_url TEXT,                     -- Video file URL (GCS/Cloudflare)
    transcript_url TEXT,                    -- Read.ai or transcript service URL
    transcript_text TEXT,                   -- Full raw transcript (AI gold)
    duration_minutes INTEGER,
    recorded_at TIMESTAMP,

    -- Platform features (RFC016 + Tough Love PRD)
    video_thumbnail_url TEXT,               -- For video player
    playback_position INTEGER DEFAULT 0,    -- Resume watching
    view_count INTEGER DEFAULT 0,           -- Analytics

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NEW: Unified analysis (Sid's capture + AI extraction)
CREATE TABLE session_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recording_id INTEGER NOT NULL,

    -- Sid's CAPTURE (raw signals)
    sid_raw_notes TEXT,                     -- Exactly as written with #tags
    energy_level INTEGER,                   -- 1-10 gut read
    key_signals TEXT,                       -- Comma-separated: "cart_before_horse,visa_fear"
    homework_assigned TEXT,
    homework_completed BOOLEAN,

    -- AI extraction (one function call away)
    ai_summary TEXT,                        -- High-level takeaways
    ai_patterns JSON,                       -- {"excuses": [...], "breakthroughs": [...], "themes": [...]}
    ai_quotes JSON,                         -- [{"speaker": "name", "quote": "...", "timestamp": "12:45", "theme": "fear"}]
    ai_emotional_arc JSON,                  -- Mood tracking through session

    analyzed_at TIMESTAMP,
    FOREIGN KEY (recording_id) REFERENCES session_recordings(id)
);
```

### 3. Add Recording Support to WIN CLUB Sessions

```sql
-- Enhance existing check_ins table (now win_club_sessions)
ALTER TABLE check_ins ADD COLUMN recording_captured BOOLEAN DEFAULT 0;
ALTER TABLE check_ins ADD COLUMN prep_notes TEXT;           -- Sid's pre-session prep
ALTER TABLE check_ins ADD COLUMN post_session_summary TEXT; -- Quick capture after call
```

**Why not add transcript directly?**
- Recordings table is the source of truth
- Multiple content types share same infrastructure
- Easier to query across all content: "Show me all sessions where someone mentioned 'imposter syndrome'"

### 4. Create Lightning Talks Table (Future)

```sql
CREATE TABLE lightning_talk_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    speaker_name TEXT,
    speaker_id INTEGER,                     -- FK to clients if internal
    talk_title TEXT NOT NULL,
    talk_date DATE,
    duration_minutes INTEGER,
    description TEXT,
    target_audience TEXT,                   -- 'founders', 'developers', 'all'
    slides_url TEXT,
    published BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Technical Design

### Content Type → Table Mapping

```
coaching_1on1 sessions → coaching_sessions_1on1
                      ↓
                session_recordings → session_analysis
                      ↑
win_club sessions → win_club_sessions
                      ↑
tough_love episodes → tough_love_sessions
                      ↑
lightning talks → lightning_talk_sessions
```

### Query Patterns (AI-First Design)

**Example 1: Get all Harshdeep WIN CLUB recordings**
```sql
SELECT
    sr.*,
    sa.sid_raw_notes,
    sa.ai_patterns,
    wcs.session_number,
    wcs.scheduled_date
FROM session_recordings sr
JOIN win_club_sessions wcs ON sr.session_id = wcs.id AND sr.session_type = 'win_club'
LEFT JOIN session_analysis sa ON sr.id = sa.recording_id
WHERE wcs.client_id = 9  -- Harshdeep
ORDER BY wcs.scheduled_date;
```

**Example 2: Find all sessions with #metadssucks pattern**
```sql
SELECT
    sr.session_type,
    sr.session_id,
    sa.sid_raw_notes,
    sa.key_signals
FROM session_analysis sa
JOIN session_recordings sr ON sa.recording_id = sr.id
WHERE sa.key_signals LIKE '%metadssucks%';
```

**Example 3: AI pattern mining across ALL content types**
```sql
SELECT
    sr.session_type,
    COUNT(*) as session_count,
    json_extract(sa.ai_patterns, '$.excuses') as common_excuses
FROM session_analysis sa
JOIN session_recordings sr ON sa.recording_id = sr.id
WHERE sa.ai_patterns IS NOT NULL
GROUP BY sr.session_type;
```

**Example 4: Tough Love "Founder Intelligence Platform"**
```sql
-- Find all sessions where founders showed "imposter syndrome" pattern
SELECT
    tls.name as founder_name,
    tls.episode_number,
    sr.recording_url,
    sa.ai_quotes
FROM tough_love_sessions tls
JOIN session_recordings sr ON sr.session_id = tls.id AND sr.session_type = 'tough_love'
JOIN session_analysis sa ON sa.recording_id = sr.id
WHERE json_extract(sa.ai_patterns, '$.themes') LIKE '%imposter_syndrome%';
```

### Data Flow

**Session happens:**
1. Create record in specific table (`win_club_sessions`, etc)
2. Upload recording → Store in `session_recordings` with session_type + session_id
3. Transcript arrives → Update `session_recordings.transcript_text`
4. Sid adds notes → Insert into `session_analysis.sid_raw_notes`
5. AI processes → Update `session_analysis.ai_*` fields

**Platform displays:**
- RFC016 member portal queries `win_club_sessions` + joins to `session_recordings`
- Tough Love episode page queries `tough_love_sessions` + joins to `session_recordings`
- Same video player component works for all content types

## Migration Plan

### Phase 1: Rename Tables (Non-Destructive)

```sql
-- Backup first
.backup coaching_crm_backup_20251001.db

-- Rename existing tables
ALTER TABLE sessions RENAME TO coaching_sessions_1on1;
ALTER TABLE check_ins RENAME TO win_club_sessions;
ALTER TABLE tough_love_candidates RENAME TO tough_love_sessions;

-- Verify data integrity
SELECT COUNT(*) FROM coaching_sessions_1on1;
SELECT COUNT(*) FROM win_club_sessions;
SELECT COUNT(*) FROM tough_love_sessions;
```

### Phase 2: Create New Infrastructure

```sql
-- Create unified recording table
CREATE TABLE session_recordings (...);

-- Create unified analysis table
CREATE TABLE session_analysis (...);

-- Enhance WIN CLUB sessions
ALTER TABLE win_club_sessions ADD COLUMN recording_captured BOOLEAN DEFAULT 0;
ALTER TABLE win_club_sessions ADD COLUMN prep_notes TEXT;
ALTER TABLE win_club_sessions ADD COLUMN post_session_summary TEXT;
```

### Phase 3: Insert First Session Data

```sql
-- Harshdeep Session #1 (already happened)
INSERT INTO session_recordings (
    session_type,
    session_id,
    transcript_text,
    duration_minutes,
    recorded_at
) VALUES (
    'win_club',
    (SELECT id FROM win_club_sessions WHERE client_id = 9 AND session_number = 1),
    [transcript from file],
    24,
    '2025-10-01 17:00:00'
);

-- Sid's notes + analysis
INSERT INTO session_analysis (
    recording_id,
    sid_raw_notes,
    energy_level,
    key_signals,
    homework_assigned
) VALUES (
    last_insert_rowid(),
    [Sid's notes],
    7,
    'cart_before_horse,visa_fear,too_casual,typical,metadssucks',
    'Weekly planning sheet'
);
```

### Phase 4: Update Application Code

**Before:**
```javascript
// Confusing
db.query('SELECT * FROM sessions WHERE client_id = ?')
db.query('SELECT * FROM check_ins WHERE client_id = ?')
```

**After:**
```javascript
// Clear intent
db.query('SELECT * FROM coaching_sessions_1on1 WHERE client_id = ?')
db.query('SELECT * FROM win_club_sessions WHERE client_id = ?')

// Unified recording access
db.query(`
    SELECT sr.*, sa.*
    FROM session_recordings sr
    LEFT JOIN session_analysis sa ON sr.id = sa.recording_id
    WHERE sr.session_type = ? AND sr.session_id = ?
`)
```

## Integration with Existing Architecture

### RFC016 (WIN CLUB Platform)
**Member Portal can now query:**
- Session history from `win_club_sessions`
- Full transcripts from `session_recordings`
- Sid's feedback from `session_analysis.sid_raw_notes`
- AI insights from `session_analysis.ai_patterns`

### Tough Love PRD (Founder Intelligence)
**Pattern database becomes reality:**
- 500+ sessions all in unified `session_recordings`
- AI analysis standardized across all content
- Cross-content queries: "Show me all founders who struggled with pricing"
- Predictive engine possible: Pattern X in session 3 predicts breakthrough in session 8

### Firestore Schema (Public Platform)
**No conflicts:**
- coaching_crm.db = Internal source of truth
- Firestore = Public-facing data (forum, members)
- Platform pulls from CRM when ready (API layer)

## Benefits

### 1. Clarity
- Table names match reality
- No confusion about where data lives
- New developers understand immediately

### 2. Scalability
- Lightning talks slot right in (same recording infrastructure)
- Future content types (webinars, workshops) follow same pattern
- Unified video player for all content

### 3. AI-First
- All transcripts in one queryable system
- Pattern recognition across ALL coaching (not per-type)
- Sid's #tags become searchable signals
- JSON fields for flexible AI insights

### 4. Data Moat
- Every session adds to intelligence
- Cross-pollination: WIN CLUB insights inform Tough Love content
- Predictive power grows with each recording

### 5. Platform-Ready
- RFC016 member portal has data it needs
- Tough Love "theater" experience can pull from same DB
- Same infrastructure powers all features

## Success Metrics

**Immediate:**
- ✅ Migration completes without data loss
- ✅ Harshdeep Session #1 properly stored
- ✅ Next 68 WIN CLUB sessions have clear home

**30 Days:**
- 69 WIN CLUB recordings captured
- Sid's notes captured for 100% of sessions
- Zero confusion about where to store new content types

**90 Days:**
- AI pattern extraction working
- RFC016 member portal launched (pulls from this DB)
- Tough Love episodes using same infrastructure

**1 Year:**
- 200+ sessions across all types
- Pattern recognition providing insights
- Platform features powered by unified data

## Risks & Mitigations

**Risk:** Migration breaks existing queries
**Mitigation:** Test all queries after rename, keep backup

**Risk:** Too much complexity for simple use case
**Mitigation:** Start with manual population, automate later

**Risk:** Firestore vs SQLite confusion
**Mitigation:** Clear documentation of what lives where

## Implementation Checklist

**Before Migration:**
- [ ] Review all queries in codebase that reference old table names
- [ ] Create backup of coaching_crm.db
- [ ] NEXUS approval on schema design

**Migration Day:**
- [ ] Execute Phase 1 (rename tables)
- [ ] Execute Phase 2 (create new tables)
- [ ] Execute Phase 3 (insert Session #1 data)
- [ ] Verify data integrity

**Post-Migration:**
- [ ] Update documentation
- [ ] Test all queries
- [ ] Update any dashboards/reports
- [ ] Insert Session #2 and #3 data (Saurabh, Khasim)

## Open Questions for NEXUS

1. **Recording storage**: Use Cloudflare R2 or Google Cloud Storage for video files?
2. **Transcript service**: Continue with Read.ai or explore alternatives?
3. **AI analysis timing**: Extract on-demand or batch process nightly?
4. **Platform API**: When RFC016 member portal launches, REST API or direct DB queries?
5. **Firestore sync**: Should any of this eventually sync to Firestore for public platform?

## Conclusion

This migration sets up H1Founders for:
- Clean separation of coaching content types
- Unified recording infrastructure (all 4 types)
- AI-first pattern recognition
- Platform features (RFC016 member portal)
- Long-term "founder intelligence" vision (Tough Love PRD)

The current schema worked for early stage. With WIN CLUB launching (69 sessions incoming), Tough Love expanding, and platform features planned, we need proper architecture.

**Recommendation:** Execute Phase 1-3 this week. Harshdeep Session #1 is waiting for a proper home.

---

**Next Steps:**
1. NEXUS reviews and approves
2. Execute migration (30 minutes)
3. Insert Session #1 data
4. Sessions #2 and #3 go into clean schema
5. Build confidence with 3 sessions before scaling

**Remember:** This isn't over-engineering. We're about to capture 69 WIN CLUB sessions in 11 weeks. They need a proper home.

---

*RFC Status: Awaiting NEXUS Review*
*Author: ATLAS*
*Date: October 1, 2025*
