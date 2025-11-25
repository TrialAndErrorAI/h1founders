/**
 * POST /api/launch-club/skip - Skip a task for a founder
 * DELETE /api/launch-club/skip - Unskip a task for a founder
 * Body: { founderId, taskId }
 */

interface Env {
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const db = env.DB
    const { founderId, taskId } = await request.json() as { founderId: number; taskId: number }

    if (!founderId || !taskId) {
      return new Response(JSON.stringify({ error: 'founderId and taskId required' }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    if (request.method === 'POST') {
      // Skip the task - remove from progress if exists, add to skipped
      await db.prepare(`DELETE FROM launch_club_progress WHERE founder_id = ? AND task_id = ?`)
        .bind(founderId, taskId).run()

      await db.prepare(`
        INSERT OR REPLACE INTO launch_club_skipped (founder_id, task_id) VALUES (?, ?)
      `).bind(founderId, taskId).run()

      return new Response(JSON.stringify({ success: true, action: 'skipped' }), {
        status: 200,
        headers: corsHeaders,
      })
    }

    if (request.method === 'DELETE') {
      // Unskip the task
      await db.prepare(`DELETE FROM launch_club_skipped WHERE founder_id = ? AND task_id = ?`)
        .bind(founderId, taskId).run()

      return new Response(JSON.stringify({ success: true, action: 'unskipped' }), {
        status: 200,
        headers: corsHeaders,
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Skip task error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
