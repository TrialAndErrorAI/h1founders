/**
 * POST /api/launch-club/progress
 * Toggle task completion for a founder (admin only)
 */

interface Env {
  DB: D1Database
  LAUNCH_CLUB_ADMIN_KEY?: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    'Content-Type': 'application/json',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    const db = env.DB
    const adminKey = env.LAUNCH_CLUB_ADMIN_KEY

    // Check admin auth
    const providedKey = request.headers.get('X-Admin-Key')
    if (adminKey && providedKey !== adminKey) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    const body = await request.json() as { founderId: number; taskId: number; completed: boolean }
    const { founderId, taskId, completed } = body

    if (!founderId || !taskId || completed === undefined) {
      return new Response(JSON.stringify({ error: 'founderId, taskId, and completed required' }), {
        status: 400,
        headers: corsHeaders,
      })
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

    return new Response(JSON.stringify({
      success: true,
      founderId,
      taskId,
      completed
    }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Launch Club progress error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
