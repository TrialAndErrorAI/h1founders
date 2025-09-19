import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

interface NavItem {
  name: string
  href: string
  status: 'LIVE' | 'SOON' | 'LOCKED'
  count?: number
  notify?: boolean
  requiresAuth?: boolean
}

const ENABLE_PARTNERSHIPS = import.meta.env.VITE_ENABLE_PARTNERSHIPS === 'true'

const baseNavigation: NavItem[] = [
  { name: 'FORUM', href: '/forum', status: 'LIVE', count: 7 },
  { name: 'TOOLS', href: '/tools', status: 'LIVE', count: 2 },
  { name: 'COACHING', href: '/coaching', status: 'LIVE' }
  // Removed SOON items for cleaner navigation
  // Network section hidden - access through member login only
]

const navigation = ENABLE_PARTNERSHIPS 
  ? [...baseNavigation, { name: 'PARTNERS', href: '/partners', status: 'LIVE' as const }]
  : baseNavigation

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'text-accent'
      case 'SOON':
        return 'text-yellow-400'
      case 'LOCKED':
        return 'text-red-pill'
      default:
        return 'text-foreground-tertiary'
    }
  }

  const getStatusBadge = (item: NavItem) => {
    if (item.status === 'LIVE' && item.count) {
      return <span className="text-accent text-xs ml-2">({item.count})</span>
    }
    if (item.status === 'SOON') {
      return <span className="text-yellow-400 text-xs ml-2">[SOON]</span>
    }
    if (item.status === 'LOCKED') {
      return <span className="text-red-pill text-xs ml-2">[🔒]</span>
    }
    return null
  }

  return (
    <nav className="border-b sticky top-0 z-50 backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="terminal-text font-mono text-xl font-bold matrix-glow">
                H1FOUNDERS/
              </span>
              <span className="text-foreground-tertiary font-mono text-sm animate-pulse">_</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href)
                const isDisabled = item.status !== 'LIVE'
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      font-mono text-sm transition-all duration-200
                      ${isActive ? 'terminal-text matrix-glow' : ''}
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-accent'}
                      ${!isActive && !isDisabled ? 'text-foreground-secondary' : ''}
                    `}
                    onClick={(e) => {
                      if (isDisabled && item.status !== 'LOCKED') {
                        e.preventDefault()
                        return
                      }
                    }}
                  >
                    <span className="flex items-center">
                      {item.name}
                      {getStatusBadge(item)}
                    </span>
                  </Link>
                )
              })}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Terminal Easter Egg (hidden) */}
              <button
                className="text-foreground hover:text-foreground-tertiary font-mono text-sm"
                onClick={() => console.log('Welcome to the Matrix...')}
              >
                TERMINAL
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground-secondary hover:text-accent p-2"
            >
              <span className="sr-only">Open menu</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current transform transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transform transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href)
              const isDisabled = item.status !== 'LIVE'
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    block px-3 py-2 font-mono text-sm
                    ${isActive ? 'terminal-text matrix-glow' : 'text-foreground-secondary'}
                    ${isDisabled ? 'opacity-50' : ''}
                  `}
                  onClick={(e) => {
                    if (isDisabled && item.status !== 'LOCKED') {
                      e.preventDefault()
                      return
                    }

                    setIsOpen(false)
                  }}
                >
                  <span className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className={getStatusColor(item.status)}>
                      {item.status === 'LIVE' && item.count && `(${item.count})`}
                      {item.status === 'SOON' && 'SOON'}
                      {item.status === 'LOCKED' && '🔒'}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}