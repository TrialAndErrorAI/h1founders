// Launch Club Schedule - Call dates and guests
import launchClubData from '../../data/launchClubData.json'

export default function Schedule() {
  const cohortId = launchClubData.activeCohort
  const cohort = (launchClubData.cohorts as Record<string, typeof launchClubData.cohorts.c1>)[cohortId]
  const calls = launchClubData.schedule.calls
  const now = new Date()

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold terminal-text mb-2">Schedule</h1>
        <p className="text-foreground-secondary font-mono text-sm">
          {cohort.name} • {calls.length} group calls
        </p>
      </div>

      {/* Calls */}
      <div className="space-y-4">
        {calls.map((call, index) => {
          const callDate = new Date(call.date)
          const isPast = callDate < now
          const isNext = !isPast && (index === 0 || new Date(calls[index - 1].date) < now)

          return (
            <div
              key={call.date}
              className={`border rounded-lg p-6 ${
                isNext
                  ? 'border-accent bg-accent/10'
                  : isPast
                  ? 'border-border/50 bg-secondary/20 opacity-60'
                  : 'border-border bg-secondary/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-foreground">
                    {callDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-foreground-secondary">{call.time}</div>
                </div>
                {isNext && (
                  <span className="text-xs font-mono bg-accent/20 text-accent px-2 py-1 rounded">
                    NEXT
                  </span>
                )}
                {isPast && (
                  <span className="text-xs font-mono text-foreground-tertiary">
                    ✓
                  </span>
                )}
              </div>

              <div className="text-sm text-foreground-secondary mb-2">
                {call.type}: {call.notes}
              </div>

              {call.guest && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                  <span className="text-accent">👨‍💼</span>
                  <div>
                    <div className="text-sm font-medium text-foreground">Guest Speaker</div>
                    <div className="text-sm text-accent">{call.guest}</div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Contact */}
      <div className="mt-8 text-center py-6 border-t border-border">
        <p className="text-sm text-foreground-tertiary mb-2">
          Can't make a call? Let us know
        </p>
        <p className="text-accent font-mono">sid@h1founders.com</p>
      </div>
    </div>
  )
}
