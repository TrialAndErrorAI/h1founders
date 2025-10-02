-- ============================================================
-- H1Founders Coaching CRM - Protocol-Safe Migration
-- Date: October 1, 2025
-- Author: ATLAS
-- Backup: coaching_crm_backup_20251001.db
-- ============================================================

-- Pragmatic approach: Only essential fields, add more later as needed

BEGIN TRANSACTION;

-- ============================================================
-- 1. CREATE NEW TABLES (Protocol-Safe with STRICT mode)
-- ============================================================

-- Clients table (enhanced)
CREATE TABLE clients_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp_number TEXT,
    timezone TEXT NOT NULL DEFAULT 'America/New_York',
    first_session_date TEXT,
    total_sessions INTEGER NOT NULL DEFAULT 0,
    revenue_generated REAL NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    CHECK (email LIKE '%@%'),
    CHECK (total_sessions >= 0),
    CHECK (revenue_generated >= 0),
    CHECK (status IN ('active', 'inactive', 'churned', 'tough_love', 'vampire')),
    CHECK (first_session_date IS NULL OR first_session_date LIKE '____-__-__'),

    UNIQUE (email)
) STRICT;

-- 1:1 Coaching sessions (renamed from 'sessions')
CREATE TABLE coaching_sessions_1on1 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    session_date TEXT NOT NULL,
    session_time TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 45,
    price REAL NOT NULL DEFAULT 185,
    completed INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    CHECK (session_date LIKE '____-__-__'),
    CHECK (session_time IS NULL OR session_time LIKE '__:__'),
    CHECK (duration_minutes > 0 AND duration_minutes <= 240),
    CHECK (price >= 0),
    CHECK (completed IN (0, 1)),

    FOREIGN KEY (client_id) REFERENCES clients_new(id)
) STRICT;

-- WIN CLUB membership program
CREATE TABLE accountability_program_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'interested',
    slot TEXT,
    monthly_price REAL NOT NULL DEFAULT 497,
    start_date TEXT,
    end_date TEXT,
    check_in_days TEXT DEFAULT 'Wed,Fri',
    notes TEXT,

    CHECK (status IN ('interested', 'waitlist', 'active', 'paused', 'completed', 'churned')),
    CHECK (monthly_price >= 0),
    CHECK (start_date IS NULL OR start_date LIKE '____-__-__'),
    CHECK (end_date IS NULL OR end_date LIKE '____-__-__'),

    FOREIGN KEY (client_id) REFERENCES clients_new(id),
    UNIQUE (client_id)
) STRICT;

-- WIN CLUB sessions (enhanced from check_ins)
CREATE TABLE win_club_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    session_number INTEGER NOT NULL,
    scheduled_date TEXT NOT NULL,
    scheduled_time TEXT,
    actual_date TEXT,
    duration_minutes INTEGER DEFAULT 20,
    status TEXT NOT NULL DEFAULT 'scheduled',
    attended INTEGER DEFAULT 0,
    prep_notes TEXT,
    post_summary TEXT,
    goals_set TEXT,
    goals_completed TEXT,
    blockers TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    CHECK (session_number BETWEEN 1 AND 50),
    CHECK (scheduled_date LIKE '____-__-__'),
    CHECK (scheduled_time IS NULL OR scheduled_time LIKE '__:__'),
    CHECK (actual_date IS NULL OR actual_date LIKE '____-__-__'),
    CHECK (duration_minutes > 0 AND duration_minutes <= 120),
    CHECK (status IN ('scheduled', 'completed', 'no-show', 'rescheduled', 'cancelled')),
    CHECK (attended IN (0, 1)),

    FOREIGN KEY (client_id) REFERENCES clients_new(id),
    UNIQUE (client_id, session_number)
) STRICT;

-- Tough Love sessions
CREATE TABLE tough_love_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    session_date TEXT,
    episode_number INTEGER,
    status TEXT NOT NULL DEFAULT 'candidate',
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    CHECK (email LIKE '%@%'),
    CHECK (session_date IS NULL OR session_date LIKE '____-__-__'),
    CHECK (episode_number IS NULL OR episode_number > 0),
    CHECK (status IN ('candidate', 'scheduled', 'recorded', 'published', 'declined')),

    UNIQUE (email)
) STRICT;

-- Testimonials (enhanced)
CREATE TABLE testimonials_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    testimonial TEXT,
    rating INTEGER,
    date_received TEXT,
    public INTEGER DEFAULT 0,
    use_for TEXT,

    CHECK (rating IS NULL OR rating BETWEEN 1 AND 5),
    CHECK (public IN (0, 1)),
    CHECK (date_received IS NULL OR date_received LIKE '____-__-__'),

    FOREIGN KEY (client_id) REFERENCES clients_new(id)
) STRICT;

-- CODE scorecards (enhanced)
CREATE TABLE code_scorecards_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    assessment_type TEXT NOT NULL,
    assessment_date TEXT NOT NULL,

    -- CREATE pillar
    ai_coding_skill INTEGER,
    systems_thinking INTEGER,
    metrics_mastery INTEGER,

    -- OWN pillar
    self_accountability INTEGER,
    decision_speed INTEGER,
    learning_velocity INTEGER,

    -- DRIVE pillar
    market_understanding INTEGER,
    growth_execution INTEGER,
    focus_fail_fast INTEGER,

    -- ENERGIZE pillar
    physical_health INTEGER,
    mental_practice INTEGER,
    energy_management INTEGER,

    overall_score REAL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    CHECK (ai_coding_skill BETWEEN 1 AND 10),
    CHECK (systems_thinking BETWEEN 1 AND 10),
    CHECK (metrics_mastery BETWEEN 1 AND 10),
    CHECK (self_accountability BETWEEN 1 AND 10),
    CHECK (decision_speed BETWEEN 1 AND 10),
    CHECK (learning_velocity BETWEEN 1 AND 10),
    CHECK (market_understanding BETWEEN 1 AND 10),
    CHECK (growth_execution BETWEEN 1 AND 10),
    CHECK (focus_fail_fast BETWEEN 1 AND 10),
    CHECK (physical_health BETWEEN 1 AND 10),
    CHECK (mental_practice BETWEEN 1 AND 10),
    CHECK (energy_management BETWEEN 1 AND 10),
    CHECK (overall_score BETWEEN 1 AND 10),
    CHECK (assessment_type IN ('baseline', 'midpoint', 'final')),
    CHECK (assessment_date LIKE '____-__-__'),

    FOREIGN KEY (client_id) REFERENCES clients_new(id)
) STRICT;

-- ============================================================
-- NEW: Recording Infrastructure
-- ============================================================

-- Unified recording storage (pragmatic - add fields later as needed)
CREATE TABLE session_recordings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_type TEXT NOT NULL,
    session_id INTEGER NOT NULL,

    recording_url TEXT,
    transcript_text TEXT,
    duration_minutes INTEGER,
    recorded_at TEXT NOT NULL,

    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    CHECK (session_type IN ('coaching_1on1', 'win_club', 'tough_love')),
    CHECK (duration_minutes IS NULL OR duration_minutes > 0),
    CHECK (recorded_at LIKE '____-__-__ __:__:__'),

    UNIQUE (session_type, session_id)
) STRICT;

-- Session analysis (Sid's notes + AI)
CREATE TABLE session_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recording_id INTEGER NOT NULL,

    -- Sid's capture
    sid_raw_notes TEXT,
    energy_level INTEGER,
    key_signals TEXT,
    homework_assigned TEXT,
    homework_completed INTEGER DEFAULT 0,

    -- AI extraction
    ai_summary TEXT,
    ai_patterns TEXT,
    ai_quotes TEXT,

    analyzed_at TEXT,

    CHECK (energy_level IS NULL OR (energy_level BETWEEN 1 AND 10)),
    CHECK (homework_completed IN (0, 1)),
    CHECK (analyzed_at IS NULL OR analyzed_at LIKE '____-__-__ __:__:__'),

    FOREIGN KEY (recording_id) REFERENCES session_recordings(id) ON DELETE CASCADE,
    UNIQUE (recording_id)
) STRICT;

-- ============================================================
-- 2. MIGRATE EXISTING DATA
-- ============================================================

-- Migrate clients (19 records)
INSERT INTO clients_new
    (id, name, email, whatsapp_number, timezone, first_session_date,
     total_sessions, revenue_generated, status, created_at)
SELECT
    id, name, email, whatsapp_number,
    COALESCE(timezone, 'America/New_York'),
    first_session_date, total_sessions, revenue_generated, status, created_at
FROM clients;

-- Migrate 1:1 sessions (20 records)
INSERT INTO coaching_sessions_1on1
    (id, client_id, session_date, session_time, duration_minutes,
     price, completed, notes)
SELECT
    id, client_id, session_date, session_time,
    COALESCE(duration_minutes, 45),
    COALESCE(price, 185),
    COALESCE(completed, 1),
    key_insights
FROM sessions;

-- Migrate accountability program (3 records)
INSERT INTO accountability_program_new
SELECT * FROM accountability_program;

-- WIN CLUB sessions table is new - no migration needed (0 records in check_ins)

-- Migrate Tough Love (4 records)
INSERT INTO tough_love_sessions
    (id, name, email, session_date, episode_number, notes, created_at)
SELECT
    id, name, email, session_date, episode_number, notes,
    COALESCE(datetime('now'), datetime('now'))
FROM tough_love_candidates;

-- Migrate testimonials
INSERT INTO testimonials_new
SELECT * FROM testimonials;

-- Migrate CODE scorecards (3 records)
INSERT INTO code_scorecards_new
SELECT * FROM code_scorecards;

-- ============================================================
-- 3. DROP OLD TABLES
-- ============================================================

DROP TABLE sessions;
DROP TABLE check_ins;
DROP TABLE tough_love_candidates;
DROP TABLE clients;
DROP TABLE accountability_program;
DROP TABLE testimonials;
DROP TABLE code_scorecards;

-- ============================================================
-- 4. RENAME NEW TABLES
-- ============================================================

ALTER TABLE clients_new RENAME TO clients;
ALTER TABLE accountability_program_new RENAME TO accountability_program;
ALTER TABLE testimonials_new RENAME TO testimonials;
ALTER TABLE code_scorecards_new RENAME TO code_scorecards;

-- ============================================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX idx_recordings_session ON session_recordings(session_type, session_id);
CREATE INDEX idx_analysis_recording ON session_analysis(recording_id);
CREATE INDEX idx_winclub_client ON win_club_sessions(client_id);
CREATE INDEX idx_1on1_client ON coaching_sessions_1on1(client_id);
CREATE INDEX idx_recordings_date ON session_recordings(recorded_at);

COMMIT;

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

.print "=== Migration Complete ==="
.print ""
.print "Record counts:"

SELECT 'clients' as table_name, COUNT(*) as count FROM clients
UNION ALL
SELECT 'coaching_sessions_1on1', COUNT(*) FROM coaching_sessions_1on1
UNION ALL
SELECT 'accountability_program', COUNT(*) FROM accountability_program
UNION ALL
SELECT 'win_club_sessions', COUNT(*) FROM win_club_sessions
UNION ALL
SELECT 'tough_love_sessions', COUNT(*) FROM tough_love_sessions
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'code_scorecards', COUNT(*) FROM code_scorecards
UNION ALL
SELECT 'session_recordings', COUNT(*) FROM session_recordings
UNION ALL
SELECT 'session_analysis', COUNT(*) FROM session_analysis;
