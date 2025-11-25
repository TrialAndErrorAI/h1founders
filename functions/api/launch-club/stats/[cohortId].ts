/**
 * GET /api/launch-club/stats/:cohortId
 * Screenshot-friendly stats for a cohort
 */

interface Env {
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context
  const cohortId = params.cohortId as string

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

    return new Response(JSON.stringify({
      success: true,
      data: stats.results
    }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Launch Club stats error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
