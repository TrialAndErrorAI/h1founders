import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { METRICS } from '../data/metrics'

interface NavItem {
  name: string
  href: string
  external?: boolean
}

const navigation: NavItem[] = [
  { name: 'PROGRAMS', href: '/programs' },
  { name: 'LIVE', href: '/live' },
  { name: 'NEWSLETTER', href: METRICS.substackUrl, external: true },
  { name: 'JOIN', href: '/join' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="border-b sticky top-0 z-50 backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="terminal-text font-mono text-xl font-bold matrix-glow">
                H1BFOUNDERS/
              </span>
              <span className="text-foreground-tertiary font-mono text-sm animate-pulse">_</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigation.map((item) => {
                const isActive = !item.external && location.pathname.startsWith(item.href)

                return item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm transition-all duration-200 text-foreground-secondary hover:text-accent"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      font-mono text-sm transition-all duration-200
                      ${isActive ? 'terminal-text matrix-glow' : 'text-foreground-secondary hover:text-accent'}
                    `}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* Theme Toggle */}
              <ThemeToggle />
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
              const isActive = !item.external && location.pathname.startsWith(item.href)

              return item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 font-mono text-sm text-foreground-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    block px-3 py-2 font-mono text-sm
                    ${isActive ? 'terminal-text matrix-glow' : 'text-foreground-secondary'}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
