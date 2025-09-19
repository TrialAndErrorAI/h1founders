import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import SponsorBanner from './SponsorBanner'
import LaunchBanner from './LaunchBanner'

const ENABLE_PARTNERSHIPS = import.meta.env.VITE_ENABLE_PARTNERSHIPS === 'true'

export default function Layout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <LaunchBanner />
      {ENABLE_PARTNERSHIPS && <SponsorBanner />}
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer className="text-center py-4 text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
        H1Founders v{__APP_VERSION__} • {new Date().toLocaleDateString()}
      </footer>
    </div>
  )
}