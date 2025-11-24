// Launch Club Program Dashboard
import { Link } from 'react-router-dom'
import launchClubData from '../../data/launchClubData.json'

export default function Dashboard() {
  const cohortId = launchClubData.activeCohort
  const cohort = (launchClubData.cohorts as Record<string, typeof launchClubData.cohorts.c1>)[cohortId]
  const tasks = launchClubData.tasks
  const milestones = launchClubData.milestones

  // Calculate stats
  const totalFounders = cohort.founders.length
  const totalTasks = tasks.length

  // Count completions per milestone
  const getTasksForMilestone = (milestoneId: string) =>
    tasks.filter(t => t.milestoneId === milestoneId)

  const getMilestoneCompletions = (milestoneId: string) => {
    const milestoneTasks = getTasksForMilestone(milestoneId)
    return cohort.founders.filter(f => {
      const completedTasks = f.completedTasks as string[]
      const completed = milestoneTasks.filter(t => completedTasks.includes(t.id)).length
      return completed === milestoneTasks.length
    }).length
  }

  // Overall progress
  const totalCompletions = cohort.founders.reduce((sum, f) => sum + f.completedTasks.length, 0)
  const maxCompletions = totalFounders * totalTasks
  const overallProgress = maxCompletions > 0 ? Math.round((totalCompletions / maxCompletions) * 100) : 0

  // Next call
  const now = new Date()
  const nextCall = launchClubData.schedule.calls.find(c => new Date(c.date) >= now)

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold terminal-text mb-2">Dashboard</h1>
        <p className="text-foreground-secondary font-mono text-sm">
          {cohort.name} • {totalFounders} founders • {overallProgress}% complete
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/launch-club/program/path"
          className="bg-accent/20 border border-accent rounded-lg p-6 hover:bg-accent/30 transition-colors"
        >
          <div className="text-2xl mb-2">🛤️</div>
          <h3 className="font-bold text-foreground mb-1">The Path</h3>
          <p className="text-sm text-foreground-secondary">
            See all founders journeying through milestones
          </p>
        </Link>

        <Link
          to="/launch-club/program/schedule"
          className="bg-secondary/50 border border-border rounded-lg p-6 hover:bg-secondary/70 transition-colors"
        >
          <div className="text-2xl mb-2">📅</div>
          <h3 className="font-bold text-foreground mb-1">Schedule</h3>
          <p className="text-sm text-foreground-secondary">
            Call times and guest speakers
          </p>
        </Link>
      </div>

      {/* Milestone Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-bold terminal-text mb-4">Milestone Progress</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-secondary/30 border border-border rounded-lg p-4 text-center"
            >
              <div className="text-2xl mb-2">{milestone.icon}</div>
              <div className="text-2xl font-mono text-accent">
                {getMilestoneCompletions(milestone.id)}/{totalFounders}
              </div>
              <div className="text-xs text-foreground-secondary">{milestone.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Call */}
      {nextCall && (
        <div className="mb-8">
          <h2 className="text-lg font-bold terminal-text mb-4">Next Call</h2>
          <div className="bg-secondary/30 border border-border rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📞</div>
              <div>
                <div className="font-medium text-foreground">
                  {new Date(nextCall.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })} at {nextCall.time}
                </div>
                <div className="text-sm text-foreground-secondary">{nextCall.notes}</div>
                {nextCall.guest && (
                  <div className="text-sm text-accent mt-1">Guest: {nextCall.guest}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support */}
      <div className="text-center py-6 border-t border-border">
        <p className="text-sm text-foreground-tertiary">
          Questions? sid@h1founders.com
        </p>
      </div>
    </div>
  )
}
