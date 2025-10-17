/**
 * Cloudflare Pages Function: Track Tech Stack Analyzer usage
 *
 * Stores analysis results in D1 database for analytics
 */

interface TrackingRequest {
  url: string
  techStack: Record<string, string[]>
  totalTechnologies: number
  sessionId: string
}

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST required' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = (await context.request.json()) as TrackingRequest
    const { url, techStack, totalTechnologies, sessionId } = body

    if (!url || !sessionId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get user agent from headers
    const userAgent = context.request.headers.get('user-agent') || null

    // Insert into D1 database
    const db = context.env.DB as D1Database
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

    return new Response(JSON.stringify({
      success: true,
      analysisId: result.meta.last_row_id,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Tracking error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
