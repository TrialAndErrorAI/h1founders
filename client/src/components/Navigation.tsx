import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavItem {
  name: string
  href: string
  status: 'LIVE' | 'SOON' | 'LOCKED'
  count?: number
  notify?: boolean
  requiresAuth?: boolean
}

const navigation: NavItem[] = [
  { name: 'TOOLS', href: '/tools', status: 'LIVE', count: 2 },
  { name: 'RESOURCES', href: '/resources', status: 'SOON', notify: true },
  { name: 'STORIES', href: '/stories', status: 'SOON', notify: true },
  { name: 'EVENTS', href: '/events', status: 'SOON', notify: true },
  { name: 'NETWORK', href: '/network', status: 'LOCKED', requiresAuth: true },
  { name: 'ACADEMY', href: '/academy', status: 'SOON', notify: true }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'text-green-400'
      case 'SOON':
        return 'text-yellow-400'
      case 'LOCKED':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusBadge = (item: NavItem) => {
    if (item.status === 'LIVE' && item.count) {
      return <span className="text-green-400 text-xs ml-2">({item.count})</span>
    }
    if (item.status === 'SOON') {
      return <span className="text-yellow-400 text-xs ml-2">[SOON]</span>
    }
    if (item.status === 'LOCKED') {
      return <span className="text-red-400 text-xs ml-2">[🔒]</span>
    }
    return null
  }

  return (
    <nav className="border-b border-gray-800 sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="terminal-text font-mono text-xl font-bold matrix-glow">
                H1FOUNDERS/
              </span>
              <span className="text-gray-500 font-mono text-sm animate-pulse">_</span>
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
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-green-400'}
                      ${!isActive && !isDisabled ? 'text-gray-300' : ''}
                    `}
                    onClick={(e) => {
                      if (isDisabled && item.status !== 'LOCKED') {
                        e.preventDefault()
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
              
              {/* Terminal Easter Egg (hidden) */}
              <button
                className="text-gray-800 hover:text-gray-600 font-mono text-sm"
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
              className="text-gray-300 hover:text-green-400 p-2"
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
        <div className="md:hidden border-t border-gray-800">
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
                    ${isActive ? 'terminal-text matrix-glow' : 'text-gray-300'}
                    ${isDisabled ? 'opacity-50' : ''}
                  `}
                  onClick={(e) => {
                    if (isDisabled && item.status !== 'LOCKED') {
                      e.preventDefault()
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