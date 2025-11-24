// Launch Club Program Sidebar Navigation
import { NavLink } from 'react-router-dom'
import launchClubData from '../../data/launchClubData.json'

const navItems = [
  { path: '/launch-club/program', label: 'Dashboard', icon: '🏠' },
  { path: '/launch-club/program/path', label: 'The Path', icon: '🛤️' },
  { path: '/launch-club/program/schedule', label: 'Schedule', icon: '📅' },
]

export default function Sidebar() {
  const cohortId = launchClubData.activeCohort
  const cohort = (launchClubData.cohorts as Record<string, typeof launchClubData.cohorts.c1>)[cohortId]

  return (
    <aside className="w-64 bg-secondary/50 border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-bold terminal-text">Launch Club</h1>
        <p className="text-sm text-foreground-secondary font-mono">{cohort.name}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/launch-club/program'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'text-foreground-secondary hover:bg-tertiary hover:text-foreground'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-foreground-tertiary font-mono">
          <div>{cohort.founders.length} founders</div>
          <div>{launchClubData.milestones.length} milestones</div>
        </div>
      </div>
    </aside>
  )
}
