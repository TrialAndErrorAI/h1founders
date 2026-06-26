import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

// Brand palette — terminal/operator aesthetic
const BRAND = {
  bg: '#0d0d0d',
  mobileBg: '#111111',
  border: '#30363d',
  blueBorder: '#1d6fbb',
  green: '#39d353',
  muted: '#8b949e',
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ backgroundColor: BRAND.bg, borderBottom: `1px solid ${BRAND.blueBorder}` }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">

          {/* Left: macOS traffic-light dots + wordmark */}
          <div className="flex items-center gap-4">
            {/* Traffic-light dots — hidden on tiny viewports */}
            <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
            </div>

            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-1 group">
              <span
                className="font-mono text-xl font-bold tracking-tight select-none"
                style={{ color: BRAND.green }}
              >
                H1B FOUNDERS
              </span>
              <span
                className="font-mono text-base animate-pulse"
                style={{ color: BRAND.green, opacity: 0.5 }}
              >
                _
              </span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const isActive = !item.external && location.pathname.startsWith(item.href)

              return item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm transition-colors duration-150"
                  style={{ color: BRAND.muted }}
                  onMouseEnter={e => (e.currentTarget.style.color = BRAND.green)}
                  onMouseLeave={e => (e.currentTarget.style.color = BRAND.muted)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="font-mono text-sm transition-colors duration-150"
                  style={{ color: isActive ? BRAND.green : BRAND.muted }}
                  onMouseEnter={e => (e.currentTarget.style.color = BRAND.green)}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? BRAND.green : BRAND.muted)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors"
              style={{ color: BRAND.muted }}
              aria-label="Open menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current transform transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transform transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: BRAND.mobileBg, borderColor: BRAND.border }}
        >
          <div className="px-3 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = !item.external && location.pathname.startsWith(item.href)

              return item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 font-mono text-sm"
                  style={{ color: BRAND.muted }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 font-mono text-sm"
                  style={{ color: isActive ? BRAND.green : BRAND.muted }}
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
