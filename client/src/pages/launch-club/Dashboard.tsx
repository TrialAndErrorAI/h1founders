// Launch Club Program Dashboard
import { Link } from 'react-router-dom'
import { useLaunchClubData, computeStats } from '../../hooks/useLaunchClubData'

export default function Dashboard() {
  const { data, loading, error } = useLaunchClubData('C1')
  const stats = computeStats(data)

  if (loading) {
    return (
      <div className="p-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary/50 rounded w-48 mb-4"></div>
          <div className="h-4 bg-secondary/30 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-secondary/30 rounded"></div>
            <div className="h-32 bg-secondary/30 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data || !stats) {
    return (
      <div className="p-8 max-w-4xl">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <h2 className="text-red-400 font-bold mb-2">Error Loading Data</h2>
          <p className="text-foreground-secondary">{error || 'Unknown error'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-accent text-background rounded hover:bg-accent/80"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const { cohort, milestones } = data
  const { totalFounders, overallProgress, milestoneStats } = stats

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
          {milestoneStats.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-secondary/30 border border-border rounded-lg p-4 text-center"
            >
              <div className="text-2xl mb-2">{milestone.icon}</div>
              <div className="text-2xl font-mono text-accent">
                {milestone.completedCount}/{totalFounders}
              </div>
              <div className="text-xs text-foreground-secondary">{milestone.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Call - using cohort dates */}
      <div className="mb-8">
        <h2 className="text-lg font-bold terminal-text mb-4">Cohort Info</h2>
        <div className="bg-secondary/30 border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="text-3xl">📅</div>
            <div>
              <div className="font-medium text-foreground">
                {new Date(cohort.start_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })} - {cohort.end_date ? new Date(cohort.end_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                }) : 'Ongoing'}
              </div>
              <div className="text-sm text-foreground-secondary">
                {cohort.notes || `${milestones.length} week program • ${stats.totalTasks} artifacts to create`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="text-center py-6 border-t border-border">
        <p className="text-sm text-foreground-tertiary">
          Questions? sid@h1founders.com
        </p>
      </div>
    </div>
  )
}
