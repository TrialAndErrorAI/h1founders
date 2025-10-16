-- Pattern Language Database Schema
-- Purpose: Track coaching patterns with automatic status promotion and usage counting
-- Architecture: Hybrid (DB for metadata/counts, filesystem for content)

-- Main patterns table: Single source of truth for pattern metadata
CREATE TABLE IF NOT EXISTS patterns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,                    -- URL-safe identifier (e.g., 'weekend-discipline')
    name TEXT NOT NULL,                           -- Human-readable name
    category TEXT NOT NULL CHECK (category IN ('diagnostic', 'mindset', 'tactical', 'accountability', 'metaphor')),
    status TEXT NOT NULL DEFAULT 'emerging' CHECK (status IN ('validated', 'emerging', 'experimental')),
    file_path TEXT NOT NULL,                      -- Relative path from project root
    times_used INTEGER DEFAULT 0,                 -- Auto-incremented by trigger
    first_discovered_date TEXT NOT NULL,          -- ISO date when first extracted
    first_discovered_session_type TEXT,           -- 'win_club' or 'tough_love'
    first_discovered_session_id INTEGER,          -- Reference to session in respective table
    last_used_date TEXT,                          -- Most recent usage (updated by trigger)
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
) STRICT;

-- Pattern usage tracking: Record each time a pattern is used in a session
CREATE TABLE IF NOT EXISTS pattern_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pattern_id INTEGER NOT NULL,
    session_type TEXT NOT NULL CHECK (session_type IN ('win_club', 'tough_love')),
    session_id INTEGER,                           -- FK to win_club_sessions or tough_love_sessions
    client_name TEXT,                             -- Denormalized for quick queries
    session_date TEXT NOT NULL,                   -- ISO date of session
    outcome TEXT CHECK (outcome IN ('breakthrough', 'landed', 'neutral', 'missed')),
    notes TEXT,                                   -- Context about this specific usage
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pattern_id) REFERENCES patterns(id) ON DELETE CASCADE
) STRICT;

-- Pattern relationships: How patterns connect to each other
CREATE TABLE IF NOT EXISTS pattern_relationships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_pattern_id INTEGER NOT NULL,
    to_pattern_id INTEGER NOT NULL,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN (
        'prerequisite',     -- From must be understood before To
        'builds_on',        -- To extends or deepens From
        'combines_with',    -- Patterns work together
        'alternative_to',   -- Different approaches to same problem
        'sequence',         -- From typically comes before To in coaching flow
        'reinforces'        -- Patterns strengthen each other
    )),
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_pattern_id) REFERENCES patterns(id) ON DELETE CASCADE,
    FOREIGN KEY (to_pattern_id) REFERENCES patterns(id) ON DELETE CASCADE,
    UNIQUE(from_pattern_id, to_pattern_id, relationship_type)
) STRICT;

-- Pattern sequences: Named multi-pattern coaching flows
CREATE TABLE IF NOT EXISTS pattern_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    use_case TEXT,                                -- When to use this sequence
    times_used INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
) STRICT;

-- Steps in each sequence
CREATE TABLE IF NOT EXISTS pattern_sequence_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence_id INTEGER NOT NULL,
    pattern_id INTEGER NOT NULL,
    step_order INTEGER NOT NULL,                  -- Position in sequence (1, 2, 3...)
    transition_notes TEXT,                        -- How to move from this step to next
    FOREIGN KEY (sequence_id) REFERENCES pattern_sequences(id) ON DELETE CASCADE,
    FOREIGN KEY (pattern_id) REFERENCES patterns(id) ON DELETE CASCADE,
    UNIQUE(sequence_id, step_order)
) STRICT;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_patterns_category ON patterns(category);
CREATE INDEX IF NOT EXISTS idx_patterns_status ON patterns(status);
CREATE INDEX IF NOT EXISTS idx_patterns_times_used ON patterns(times_used DESC);
CREATE INDEX IF NOT EXISTS idx_pattern_usage_pattern_id ON pattern_usage(pattern_id);
CREATE INDEX IF NOT EXISTS idx_pattern_usage_session ON pattern_usage(session_type, session_id);
CREATE INDEX IF NOT EXISTS idx_pattern_relationships_from ON pattern_relationships(from_pattern_id);
CREATE INDEX IF NOT EXISTS idx_pattern_relationships_to ON pattern_relationships(to_pattern_id);

-- TRIGGER: Auto-promote pattern status when usage threshold reached
-- emerging → validated at 2 uses (proven across sessions)
CREATE TRIGGER IF NOT EXISTS pattern_status_promotion
AFTER UPDATE OF times_used ON patterns
WHEN NEW.times_used >= 2 AND NEW.status = 'emerging'
BEGIN
    UPDATE patterns
    SET status = 'validated',
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- TRIGGER: Auto-increment usage count and update last_used_date
CREATE TRIGGER IF NOT EXISTS pattern_usage_increment
AFTER INSERT ON pattern_usage
BEGIN
    UPDATE patterns
    SET times_used = times_used + 1,
        last_used_date = NEW.session_date,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.pattern_id;
END;
