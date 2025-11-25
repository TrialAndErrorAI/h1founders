// The Path - Founders journeying toward freedom
import { useState } from 'react'
import { useLaunchClubData, type Founder, type Task, type Milestone } from '../../hooks/useLaunchClubData'

// Calculate progress percentage for a founder
function getFounderProgress(founder: Founder, tasks: Task[]): number {
  const requiredTasks = tasks.filter(t => t.is_required)
  if (requiredTasks.length === 0) return 0
  return (founder.completedTasks.length / requiredTasks.length) * 100
}

// Collapsible founder row
function FounderRow({ founder, tasks, milestones, isExpanded, onToggle }: {
  founder: Founder
  tasks: Task[]
  milestones: Milestone[]
  isExpanded: boolean
  onToggle: () => void
}) {
  const requiredTasks = tasks.filter(t => t.is_required)
  const progress = getFounderProgress(founder, tasks)
  const completedCount = founder.completedTasks.length
  const totalCount = requiredTasks.length

  // Group tasks by milestone for display
  const tasksByMilestone = milestones.map(milestone => ({
    milestone,
    tasks: tasks
      .filter(t => t.milestone_id === milestone.id && t.is_required)
      .sort((a, b) => a.display_order - b.display_order)
  }))

  return (
    <div className="border-b border-border/50 last:border-0">
      {/* Clickable header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 py-3 px-2 hover:bg-tertiary/50 transition-colors text-left"
      >
        {/* Expand/collapse indicator */}
        <span className="text-foreground-tertiary text-sm w-4">
          {isExpanded ? '▼' : '▶'}
        </span>

        {/* Founder avatar and name */}
        <div className="flex items-center gap-2 w-32 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-accent font-mono text-xs">{founder.avatar_initials}</span>
          </div>
          <span className="text-sm font-medium text-foreground truncate">{founder.name}</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1">
          <div className="h-3 bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent/60 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress stats */}
        <div className="text-right flex-shrink-0 w-24">
          <span className="text-sm font-mono text-foreground-secondary">
            {Math.round(progress)}% <span className="text-foreground-tertiary">({completedCount}/{totalCount})</span>
          </span>
        </div>
      </button>

      {/* Expanded task list */}
      {isExpanded && (
        <div className="pl-14 pr-4 pb-4 bg-tertiary/30">
          {tasksByMilestone.map(({ milestone, tasks: milestoneTasks }) => (
            <div key={milestone.id} className="mb-4 last:mb-0">
              {/* Milestone header */}
              <div className="flex items-center gap-2 mb-2">
                <span>{milestone.icon}</span>
                <span className="text-sm font-medium text-foreground">{milestone.name}</span>
              </div>

              {/* Task list */}
              <ul className="space-y-1 pl-6">
                {milestoneTasks.map(task => {
                  const isCompleted = founder.completedTasks.includes(task.id)
                  return (
                    <li key={task.id} className="flex items-center gap-2 text-sm">
                      <span className={isCompleted ? 'text-accent' : 'text-foreground-tertiary'}>
                        {isCompleted ? '✓' : '○'}
                      </span>
                      <span className={isCompleted ? 'text-foreground' : 'text-foreground-secondary'}>
                        {task.name}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Path() {
  const { data, loading, error } = useLaunchClubData('C1')
  const [expandedFounders, setExpandedFounders] = useState<Set<number>>(new Set())

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary/50 rounded w-32 mb-4"></div>
          <div className="h-4 bg-secondary/30 rounded w-64 mb-8"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-14 bg-secondary/30 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-8">
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

  const { milestones, tasks, founders } = data
  const sortedMilestones = [...milestones].sort((a, b) => a.week_number - b.week_number)
  const requiredTasks = tasks.filter(t => t.is_required)

  // Sort founders by progress (leaders first)
  const sortedFounders = [...founders].sort((a, b) => {
    const aProgress = getFounderProgress(a, tasks)
    const bProgress = getFounderProgress(b, tasks)
    return bProgress - aProgress
  })

  const toggleFounder = (founderId: number) => {
    setExpandedFounders(prev => {
      const next = new Set(prev)
      if (next.has(founderId)) {
        next.delete(founderId)
      } else {
        next.add(founderId)
      }
      return next
    })
  }

  // Expand/collapse all
  const expandAll = () => {
    setExpandedFounders(new Set(sortedFounders.map(f => f.id)))
  }

  const collapseAll = () => {
    setExpandedFounders(new Set())
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold terminal-text mb-2">The Path</h1>
        <p className="text-foreground-secondary font-mono text-sm">
          {founders.length} founders journeying through {sortedMilestones.length} milestones
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={expandAll}
          className="text-xs text-foreground-secondary hover:text-accent transition-colors font-mono"
        >
          Expand All
        </button>
        <span className="text-foreground-tertiary">|</span>
        <button
          onClick={collapseAll}
          className="text-xs text-foreground-secondary hover:text-accent transition-colors font-mono"
        >
          Collapse All
        </button>
      </div>

      {/* Founder list */}
      <div className="bg-secondary/30 border border-border rounded-lg">
        {sortedFounders.map((founder) => (
          <FounderRow
            key={founder.id}
            founder={founder}
            tasks={tasks}
            milestones={sortedMilestones}
            isExpanded={expandedFounders.has(founder.id)}
            onToggle={() => toggleFounder(founder.id)}
          />
        ))}
      </div>

      {/* Milestone stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sortedMilestones.map((milestone) => {
          const milestoneTasks = requiredTasks.filter(t => t.milestone_id === milestone.id)
          const completed = founders.filter(f => {
            return milestoneTasks.every(t => f.completedTasks.includes(t.id))
          }).length

          return (
            <div
              key={milestone.id}
              className="bg-secondary/30 border border-border rounded-lg p-4 text-center"
            >
              <div className="text-lg mb-1">{milestone.icon}</div>
              <div className="text-2xl font-mono text-accent">
                {completed}/{founders.length}
              </div>
              <div className="text-xs text-foreground-tertiary">completed</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
