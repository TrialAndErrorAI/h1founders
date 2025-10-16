-- Growth Hacks Database Schema
-- Tracks usage of all growth hack tools on H1Founders platform

-- Tech Stack Analyses
CREATE TABLE IF NOT EXISTS tech_stack_analyses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tech_stack_json TEXT NOT NULL,  -- JSON of detected technologies
  total_technologies INTEGER NOT NULL,
  user_ip TEXT,                    -- Optional: Track unique users (hashed)
  user_agent TEXT,                 -- Optional: Track browser/device
  session_id TEXT                  -- Optional: Track sessions
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_url ON tech_stack_analyses(url);
CREATE INDEX IF NOT EXISTS idx_analyzed_at ON tech_stack_analyses(analyzed_at);
CREATE INDEX IF NOT EXISTS idx_session_id ON tech_stack_analyses(session_id);

-- Growth Hack Tools Metadata
CREATE TABLE IF NOT EXISTS growth_hack_tools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_name TEXT UNIQUE NOT NULL,
  tool_slug TEXT UNIQUE NOT NULL,
  description TEXT,
  launch_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'deprecated', 'beta')),
  usage_count INTEGER DEFAULT 0,
  last_used TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Tech Stack Analyzer
INSERT OR IGNORE INTO growth_hack_tools (tool_name, tool_slug, description, launch_date, status)
VALUES (
  'Tech Stack Analyzer',
  'tech-stack-analyzer',
  'Spy on competitors. See what they''re built with - frameworks, analytics, hosting, and more.',
  '2025-10-16',
  'active'
);

-- Analytics summary view
CREATE VIEW IF NOT EXISTS tech_stack_daily_stats AS
SELECT
  DATE(analyzed_at) as date,
  COUNT(*) as total_analyses,
  COUNT(DISTINCT url) as unique_urls,
  COUNT(DISTINCT session_id) as unique_sessions,
  AVG(total_technologies) as avg_tech_per_site
FROM tech_stack_analyses
GROUP BY DATE(analyzed_at)
ORDER BY date DESC;

-- Popular URLs analyzed
CREATE VIEW IF NOT EXISTS popular_analyzed_urls AS
SELECT
  url,
  COUNT(*) as analysis_count,
  MAX(analyzed_at) as last_analyzed,
  AVG(total_technologies) as avg_tech_detected
FROM tech_stack_analyses
GROUP BY url
ORDER BY analysis_count DESC
LIMIT 50;
