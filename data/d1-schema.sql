-- D1 Schema for Tech Stack Analyzer
-- Simplified single-tool database

-- Tech Stack Analyses
CREATE TABLE IF NOT EXISTS analyses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tech_stack_json TEXT NOT NULL,
  total_technologies INTEGER NOT NULL,
  session_id TEXT,
  user_agent TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_url ON analyses(url);
CREATE INDEX IF NOT EXISTS idx_analyzed_at ON analyses(analyzed_at);
CREATE INDEX IF NOT EXISTS idx_session_id ON analyses(session_id);

-- Analytics views
CREATE VIEW IF NOT EXISTS daily_stats AS
SELECT
  DATE(analyzed_at) as date,
  COUNT(*) as total_analyses,
  COUNT(DISTINCT url) as unique_urls,
  COUNT(DISTINCT session_id) as unique_sessions,
  AVG(total_technologies) as avg_tech_per_site
FROM analyses
GROUP BY DATE(analyzed_at)
ORDER BY date DESC;

CREATE VIEW IF NOT EXISTS popular_urls AS
SELECT
  url,
  COUNT(*) as analysis_count,
  MAX(analyzed_at) as last_analyzed,
  AVG(total_technologies) as avg_tech_detected
FROM analyses
GROUP BY url
ORDER BY analysis_count DESC
LIMIT 50;
