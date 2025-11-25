/**
 * GET /api/launch-club/cohort/:id
 * Returns cohort with milestones, tasks, and founders with progress
 */

interface Env {
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context
  const cohortId = params.id as string

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

    // Get cohort
    const cohort = await db.prepare(`
      SELECT * FROM launch_club_cohorts WHERE id = ? OR short_name = ?
    `).bind(cohortId, cohortId).first()

    if (!cohort) {
      return new Response(JSON.stringify({ error: 'Cohort not found' }), {
        status: 404,
        headers: corsHeaders,
      })
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

    return new Response(JSON.stringify({
      success: true,
      data: {
        cohort,
        milestones: milestones.results,
        tasks: tasks.results,
        founders: foundersWithProgress
      }
    }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Launch Club cohort error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
