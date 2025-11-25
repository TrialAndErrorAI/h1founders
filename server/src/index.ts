import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'

// Cloudflare D1 bindings
type Bindings = {
  DB: D1Database
  LAUNCH_CLUB_ADMIN_KEY?: string
}

// Simple admin auth middleware
const adminAuth = (adminKey: string | undefined) => {
  return async (c: any, next: () => Promise<void>) => {
    const providedKey = c.req.header('X-Admin-Key')
    // Allow if no key configured (dev mode) or key matches
    if (!adminKey || providedKey === adminKey) {
      await next()
    } else {
      return c.json({ error: 'Unauthorized' }, 401)
    }
  }
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', async (c) => {

  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true
  }

  return c.json(data, { status: 200 })
})

// Proxy endpoint - bypasses CORS restrictions
// Client sends: /api/proxy?url=https://example.com
// Server fetches URL (no CORS on server-to-server)
// Returns HTML to client for analysis
app.get('/api/proxy', async (c) => {
  try {
    const targetUrl = c.req.query('url')

    if (!targetUrl) {
      return c.json({ error: 'URL parameter required' }, 400)
    }

    // Validate URL format
    let url: URL
    try {
      url = new URL(targetUrl)
      if (!['http:', 'https:'].includes(url.protocol)) {
        return c.json({ error: 'Only HTTP(S) URLs allowed' }, 400)
      }
    } catch (e) {
      return c.json({ error: 'Invalid URL format' }, 400)
    }

    // Fetch the URL server-side (no CORS restrictions)
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'H1Founders-TechStack-Analyzer/1.0'
      }
    })

    if (!response.ok) {
      return c.json({
        error: `Failed to fetch: ${response.status} ${response.statusText}`
      }, 502) // Bad Gateway - upstream server error
    }

    // Return the HTML
    const html = await response.text()
    return c.text(html)

  } catch (error) {
    console.error('Proxy error:', error)
    return c.json({
      error: error instanceof Error ? error.message : 'Proxy request failed'
    }, 500)
  }
})

// Track tech stack analysis
app.post('/api/track/tech-stack', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { url, techStack, totalTechnologies, sessionId } = body

    // Get client info
    const userAgent = c.req.header('user-agent') || null

    // Insert analysis record (D1 uses async/await)
    const result = await db.prepare(`
      INSERT INTO analyses
      (url, tech_stack_json, total_technologies, session_id, user_agent)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      url,
      JSON.stringify(techStack),
      totalTechnologies,
      sessionId,
      userAgent
    ).run()

    return c.json({
      success: true,
      analysisId: result.meta.last_row_id
    })
  } catch (error) {
    console.error('Tracking error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get analytics summary
app.get('/api/analytics/tech-stack/summary', async (c) => {
  try {
    const db = c.env.DB

    const result = await db.prepare(`
      SELECT
        COUNT(*) as total_analyses,
        COUNT(DISTINCT url) as unique_urls,
        COUNT(DISTINCT session_id) as unique_sessions
      FROM analyses
    `).first()

    return c.json({ success: true, data: result })
  } catch (error) {
    console.error('Analytics error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// =============================================================================
// LAUNCH CLUB API
// =============================================================================

// GET /api/launch-club/cohort/:id - Get cohort with all founders and progress
app.get('/api/launch-club/cohort/:id', async (c) => {
  try {
    const db = c.env.DB
    const cohortId = c.req.param('id')

    // Get cohort
    const cohort = await db.prepare(`
      SELECT * FROM launch_club_cohorts WHERE id = ? OR short_name = ?
    `).bind(cohortId, cohortId).first()

    if (!cohort) {
      return c.json({ error: 'Cohort not found' }, 404)
    }

    // Get milestones
    const milestones = await db.prepare(`
      SELECT * FROM launch_club_milestones ORDER BY week_number
    `).all()

    // Get tasks
    const tasks = await db.prepare(`
      SELECT * FROM launch_club_tasks WHERE is_active = 1 ORDER BY milestone_id, display_order
    `).all()

    // Get founders with progress
    const founders = await db.prepare(`
      SELECT
        f.*,
        GROUP_CONCAT(p.task_id) as completed_task_ids
      FROM launch_club_founders f
      LEFT JOIN launch_club_progress p ON f.id = p.founder_id
      WHERE f.cohort_id = ? AND f.status = 'active'
      GROUP BY f.id
      ORDER BY f.name
    `).bind(cohort.id).all()

    // Transform founders to include completedTasks array
    const foundersWithProgress = founders.results.map((f: any) => ({
      ...f,
      completedTasks: f.completed_task_ids
        ? f.completed_task_ids.split(',').map(Number)
        : []
    }))

    return c.json({
      success: true,
      data: {
        cohort,
        milestones: milestones.results,
        tasks: tasks.results,
        founders: foundersWithProgress
      }
    })
  } catch (error) {
    console.error('Launch Club cohort error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// GET /api/launch-club/tasks - Get all tasks (for admin reference)
app.get('/api/launch-club/tasks', async (c) => {
  try {
    const db = c.env.DB

    const tasks = await db.prepare(`
      SELECT t.*, m.name as milestone_name, m.week_number
      FROM launch_club_tasks t
      JOIN launch_club_milestones m ON t.milestone_id = m.id
      WHERE t.is_active = 1
      ORDER BY m.week_number, t.display_order
    `).all()

    return c.json({ success: true, data: tasks.results })
  } catch (error) {
    console.error('Launch Club tasks error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// POST /api/launch-club/progress - Toggle task completion (admin only)
app.post('/api/launch-club/progress', adminAuth(undefined), async (c) => {
  try {
    const db = c.env.DB
    const adminKey = c.env.LAUNCH_CLUB_ADMIN_KEY

    // Check admin auth
    const providedKey = c.req.header('X-Admin-Key')
    if (adminKey && providedKey !== adminKey) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const body = await c.req.json()
    const { founderId, taskId, completed } = body

    if (!founderId || !taskId || completed === undefined) {
      return c.json({ error: 'founderId, taskId, and completed required' }, 400)
    }

    if (completed) {
      // Add progress record
      await db.prepare(`
        INSERT OR IGNORE INTO launch_club_progress (founder_id, task_id, completed_by)
        VALUES (?, ?, 'sid')
      `).bind(founderId, taskId).run()
    } else {
      // Remove progress record
      await db.prepare(`
        DELETE FROM launch_club_progress WHERE founder_id = ? AND task_id = ?
      `).bind(founderId, taskId).run()
    }

    return c.json({ success: true, founderId, taskId, completed })
  } catch (error) {
    console.error('Launch Club progress error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// PUT /api/launch-club/founder/:id/progress - Bulk update founder progress (admin only)
app.put('/api/launch-club/founder/:id/progress', async (c) => {
  try {
    const db = c.env.DB
    const adminKey = c.env.LAUNCH_CLUB_ADMIN_KEY

    // Check admin auth
    const providedKey = c.req.header('X-Admin-Key')
    if (adminKey && providedKey !== adminKey) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const founderId = c.req.param('id')
    const body = await c.req.json()
    const { completedTasks } = body

    if (!Array.isArray(completedTasks)) {
      return c.json({ error: 'completedTasks array required' }, 400)
    }

    // Clear existing progress
    await db.prepare(`
      DELETE FROM launch_club_progress WHERE founder_id = ?
    `).bind(founderId).run()

    // Add new progress records
    if (completedTasks.length > 0) {
      const placeholders = completedTasks.map(() => '(?, ?, ?)').join(', ')
      const values = completedTasks.flatMap(taskId => [founderId, taskId, 'sid'])

      await db.prepare(`
        INSERT INTO launch_club_progress (founder_id, task_id, completed_by)
        VALUES ${placeholders}
      `).bind(...values).run()
    }

    return c.json({ success: true, founderId, completedTasks })
  } catch (error) {
    console.error('Launch Club bulk progress error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// GET /api/launch-club/stats/:cohortId - Screenshot-friendly stats
app.get('/api/launch-club/stats/:cohortId', async (c) => {
  try {
    const db = c.env.DB
    const cohortId = c.req.param('cohortId')

    const stats = await db.prepare(`
      SELECT
        t.name as task_name,
        t.milestone_id,
        COUNT(DISTINCT p.founder_id) as completed_count,
        (SELECT COUNT(*) FROM launch_club_founders WHERE cohort_id = ? AND status = 'active') as total_founders
      FROM launch_club_tasks t
      LEFT JOIN launch_club_progress p ON t.id = p.task_id
      LEFT JOIN launch_club_founders f ON p.founder_id = f.id AND f.cohort_id = ?
      WHERE t.is_active = 1
      GROUP BY t.id
      ORDER BY t.milestone_id, t.display_order
    `).bind(cohortId, cohortId).all()

    return c.json({ success: true, data: stats.results })
  } catch (error) {
    console.error('Launch Club stats error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

export default app
