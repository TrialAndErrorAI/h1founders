import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import LaunchBanner from './LaunchBanner'

export default function Layout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <LaunchBanner />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer className="text-center py-4 text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
        H1B Founders {'\u00B7'} {new Date().getFullYear()}
      </footer>
    </div>
  )
}
