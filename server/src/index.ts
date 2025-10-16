import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import Database from 'better-sqlite3'
import path from 'path'

const app = new Hono()

app.use(cors())

// Initialize growth hacks database
const dbPath = path.join(__dirname, '../../data/growth_hacks.db')
const db = new Database(dbPath)

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
    const body = await c.req.json()
    const { url, techStack, totalTechnologies, sessionId } = body

    // Get client info
    const userAgent = c.req.header('user-agent') || null
    const userIp = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || null

    // Insert analysis record
    const stmt = db.prepare(`
      INSERT INTO tech_stack_analyses
      (url, tech_stack_json, total_technologies, user_ip, user_agent, session_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      url,
      JSON.stringify(techStack),
      totalTechnologies,
      userIp,
      userAgent,
      sessionId
    )

    // Update tool usage count
    const updateTool = db.prepare(`
      UPDATE growth_hack_tools
      SET usage_count = usage_count + 1,
          last_used = CURRENT_TIMESTAMP
      WHERE tool_slug = 'tech-stack-analyzer'
    `)
    updateTool.run()

    return c.json({
      success: true,
      analysisId: result.lastInsertRowid
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
    const stmt = db.prepare(`
      SELECT
        COUNT(*) as total_analyses,
        COUNT(DISTINCT url) as unique_urls,
        COUNT(DISTINCT session_id) as unique_sessions
      FROM tech_stack_analyses
    `)

    const summary = stmt.get()

    return c.json({ success: true, data: summary })
  } catch (error) {
    console.error('Analytics error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

export default app
