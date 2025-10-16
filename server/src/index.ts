import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'

// Cloudflare D1 bindings
type Bindings = {
  DB: D1Database
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

export default app
