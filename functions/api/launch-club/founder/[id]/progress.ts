/**
 * PUT /api/launch-club/founder/:id/progress
 * Bulk update founder progress (admin only)
 */

interface Env {
  DB: D1Database
  LAUNCH_CLUB_ADMIN_KEY?: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context
  const founderId = params.id as string

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    'Content-Type': 'application/json',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'PUT') {
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

    const body = await request.json() as { completedTasks: number[] }
    const { completedTasks } = body

    if (!Array.isArray(completedTasks)) {
      return new Response(JSON.stringify({ error: 'completedTasks array required' }), {
        status: 400,
        headers: corsHeaders,
      })
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

    return new Response(JSON.stringify({
      success: true,
      founderId,
      completedTasks
    }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Launch Club bulk progress error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
