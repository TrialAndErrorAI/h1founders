-- Launch Club Progress Tracker Schema
-- Designed for flexibility - tasks/artifacts will evolve
-- Created: Nov 23, 2025

-- Cohorts (C1, C2, etc.)
CREATE TABLE IF NOT EXISTS launch_club_cohorts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                    -- 'Cohort 1', 'Cohort 2'
    short_name TEXT NOT NULL,              -- 'C1', 'C2'
    start_date TEXT NOT NULL,              -- '2025-11-12'
    end_date TEXT,                         -- '2025-12-03'
    price INTEGER NOT NULL DEFAULT 997,    -- Can go up to 2500
    status TEXT DEFAULT 'active',
    notes TEXT,                            -- Flexible notes field
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    CHECK (start_date LIKE '____-__-__'),
    CHECK (end_date IS NULL OR end_date LIKE '____-__-__'),
    CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
    CHECK (price >= 0)
) STRICT;

-- Milestones (static structure, but descriptions can evolve)
CREATE TABLE IF NOT EXISTS launch_club_milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                    -- 'Corporate Foundation'
    week_number INTEGER NOT NULL,          -- 1, 2, 3, 4
    tagline TEXT,                          -- 'Your company exists on paper'
    icon TEXT,                             -- '🏛️'
    description TEXT,                      -- Longer description if needed

    UNIQUE (week_number)
) STRICT;

-- Tasks within milestones (flexible - can add/remove/reorder)
CREATE TABLE IF NOT EXISTS launch_club_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    milestone_id INTEGER NOT NULL,
    name TEXT NOT NULL,                    -- 'Get EIN from IRS'
    description TEXT,                      -- 'File SS-4 online, takes 5 min'
    artifact TEXT,                         -- 'SS-4 confirmation letter'
    display_order INTEGER NOT NULL,
    is_required INTEGER NOT NULL DEFAULT 1, -- 1 = required, 0 = optional
    is_active INTEGER NOT NULL DEFAULT 1,   -- Soft delete for evolution
    notes TEXT,                            -- Additional guidance

    FOREIGN KEY (milestone_id) REFERENCES launch_club_milestones(id),
    CHECK (is_required IN (0, 1)),
    CHECK (is_active IN (0, 1))
) STRICT;

-- Founders in cohorts
CREATE TABLE IF NOT EXISTS launch_club_founders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cohort_id INTEGER NOT NULL,
    name TEXT NOT NULL,                    -- 'Sarah' (first name sufficient)
    email TEXT,                            -- Optional for C1
    firebase_uid TEXT,                     -- Link to auth if they have account
    avatar_initials TEXT,                  -- 'SK' for display
    status TEXT DEFAULT 'active',
    joined_at TEXT DEFAULT (datetime('now')),
    notes TEXT,                            -- Sid's notes on this founder

    FOREIGN KEY (cohort_id) REFERENCES launch_club_cohorts(id),
    CHECK (status IN ('active', 'dropped', 'graduated', 'paused'))
) STRICT;

-- Progress tracking (the core - when did founder complete task)
CREATE TABLE IF NOT EXISTS launch_club_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    founder_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_by TEXT DEFAULT 'sid',       -- 'sid' or 'self' (for C2+)
    notes TEXT,                            -- Optional notes on completion
    artifact_url TEXT,                     -- Optional proof/upload

    FOREIGN KEY (founder_id) REFERENCES launch_club_founders(id),
    FOREIGN KEY (task_id) REFERENCES launch_club_tasks(id),
    UNIQUE (founder_id, task_id)
) STRICT;

-- Seed milestones (static structure)
INSERT OR IGNORE INTO launch_club_milestones (week_number, name, tagline, icon) VALUES
(1, 'Corporate Foundation', 'Your company exists on paper', '🏛️'),
(2, 'Business Infrastructure', 'Money can flow through your company', '💰'),
(3, 'Pitch Ready', 'Investor and attorney materials complete', '📊'),
(4, 'Attorney Ready', 'Everything needed for H1B petition', '🚀');

-- Seed tasks for Week 1: Corporate Foundation
INSERT OR IGNORE INTO launch_club_tasks (milestone_id, name, description, artifact, display_order, is_required) VALUES
(1, 'Form Delaware C-Corp or LLC', 'Use Stripe Atlas, Clerky, or lawyer', 'Certificate of incorporation', 1, 1),
(1, 'Get EIN from IRS', 'File SS-4 online - takes 5 minutes', 'SS-4 confirmation letter', 2, 1),
(1, 'Get DUNS number', 'Register at dnb.com - free', 'DUNS registration', 3, 1),
(1, 'Set up registered agent', 'Required for Delaware corps', 'Service agreement', 4, 1);

-- Seed tasks for Week 2: Business Infrastructure
INSERT OR IGNORE INTO launch_club_tasks (milestone_id, name, description, artifact, display_order, is_required) VALUES
(2, 'Open Mercury bank account', 'Startup-friendly, no minimums', 'Account number', 1, 1),
(2, 'Set up Gusto payroll', '$30-40/month for full-time employee', 'Payroll dashboard active', 2, 1),
(2, 'Connect Puzzle.io', 'AI-based accounting', 'Accounting connected', 3, 1),
(2, 'Configure Mercury invoicing', 'Revenue-ready, no extra tools', 'First invoice created', 4, 1),
(2, 'Set up founder loan', 'Loan TO company (not stock purchase)', 'Loan agreement + wire', 5, 1);

-- Seed tasks for Week 3: Pitch Ready
INSERT OR IGNORE INTO launch_club_tasks (milestone_id, name, description, artifact, display_order, is_required) VALUES
(3, 'Complete cap table', 'Ownership percentages clear', 'Cap table spreadsheet', 1, 1),
(3, 'Build pitch deck', '10-slide deck for fundraising', 'Pitch deck file', 2, 1),
(3, 'Write business plan', '2-3 pages for H1B petition', 'Business plan document', 3, 1),
(3, 'Prepare financial documentation', 'Bank statements + projections', 'Financial package', 4, 1);

-- Seed tasks for Week 4: Attorney Ready
INSERT OR IGNORE INTO launch_club_tasks (milestone_id, name, description, artifact, display_order, is_required) VALUES
(4, 'Purchase domain', 'Professional web presence', 'Domain registration', 1, 1),
(4, 'Deploy Cloudflare landing page', 'Proves real business activity', 'Live URL', 2, 1),
(4, 'Prepare Product Hunt listing', 'Validation + publicity', 'Draft listing', 3, 0),  -- Optional
(4, 'Schedule attorney consultation', 'Next step after Launch Club', 'Calendar invite', 4, 1);

-- Seed C1 cohort (founders to be added by Sid)
INSERT OR IGNORE INTO launch_club_cohorts (name, short_name, start_date, end_date, price, status, notes) VALUES
('Cohort 1', 'C1', '2025-11-12', '2025-12-03', 997, 'active', 'First cohort - Week 3 call Nov 26');

-- Helpful views

-- View: Founder progress summary
CREATE VIEW IF NOT EXISTS v_founder_progress AS
SELECT
    f.id AS founder_id,
    f.name AS founder_name,
    c.short_name AS cohort,
    COUNT(p.id) AS tasks_completed,
    (SELECT COUNT(*) FROM launch_club_tasks WHERE is_active = 1 AND is_required = 1) AS total_required,
    ROUND(COUNT(p.id) * 100.0 / (SELECT COUNT(*) FROM launch_club_tasks WHERE is_active = 1 AND is_required = 1), 1) AS percent_complete
FROM launch_club_founders f
JOIN launch_club_cohorts c ON f.cohort_id = c.id
LEFT JOIN launch_club_progress p ON f.id = p.founder_id
WHERE f.status = 'active'
GROUP BY f.id;

-- View: Cohort stats (for screenshots)
CREATE VIEW IF NOT EXISTS v_cohort_stats AS
SELECT
    c.short_name AS cohort,
    COUNT(DISTINCT f.id) AS total_founders,
    t.name AS task_name,
    COUNT(DISTINCT p.founder_id) AS completed_count
FROM launch_club_cohorts c
JOIN launch_club_founders f ON f.cohort_id = c.id AND f.status = 'active'
CROSS JOIN launch_club_tasks t
LEFT JOIN launch_club_progress p ON p.task_id = t.id AND p.founder_id = f.id
WHERE t.is_active = 1
GROUP BY c.id, t.id
ORDER BY t.milestone_id, t.display_order;

-- Example queries for the UI:

-- Get all founders with their milestone progress
-- SELECT f.name, f.avatar_initials,
--        SUM(CASE WHEN t.milestone_id = 1 AND p.id IS NOT NULL THEN 1 ELSE 0 END) AS m1_done,
--        SUM(CASE WHEN t.milestone_id = 2 AND p.id IS NOT NULL THEN 1 ELSE 0 END) AS m2_done,
--        SUM(CASE WHEN t.milestone_id = 3 AND p.id IS NOT NULL THEN 1 ELSE 0 END) AS m3_done,
--        SUM(CASE WHEN t.milestone_id = 4 AND p.id IS NOT NULL THEN 1 ELSE 0 END) AS m4_done
-- FROM launch_club_founders f
-- CROSS JOIN launch_club_tasks t
-- LEFT JOIN launch_club_progress p ON p.founder_id = f.id AND p.task_id = t.id
-- WHERE f.cohort_id = 1 AND f.status = 'active' AND t.is_active = 1
-- GROUP BY f.id;

-- Get cohort-wide stats ("5/8 incorporated")
-- SELECT t.name, COUNT(p.id) || '/' || COUNT(DISTINCT f.id) AS progress
-- FROM launch_club_tasks t
-- CROSS JOIN launch_club_founders f
-- LEFT JOIN launch_club_progress p ON p.task_id = t.id AND p.founder_id = f.id
-- WHERE f.cohort_id = 1 AND f.status = 'active' AND t.is_active = 1
-- GROUP BY t.id
-- ORDER BY t.milestone_id, t.display_order;
