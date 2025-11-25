/**
 * GET /api/launch-club/tasks
 * Returns all active tasks with milestone info
 */

interface Env {
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const db = env.DB

    const tasks = await db.prepare(`
      SELECT t.*, m.name as milestone_name, m.week_number
      FROM launch_club_tasks t
      JOIN launch_club_milestones m ON t.milestone_id = m.id
      WHERE t.is_active = 1
      ORDER BY m.week_number, t.display_order
    `).all()

    return new Response(JSON.stringify({
      success: true,
      data: tasks.results
    }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Launch Club tasks error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
