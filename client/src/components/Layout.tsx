import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import SponsorBanner from './SponsorBanner'
import LaunchBanner from './LaunchBanner'

const ENABLE_PARTNERSHIPS = import.meta.env.VITE_ENABLE_PARTNERSHIPS === 'true'

export default function Layout() {
  return (
    <div className="min-h-screen bg-black">
      <LaunchBanner />
      {ENABLE_PARTNERSHIPS && <SponsorBanner />}
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer className="text-center py-4 text-gray-600 text-xs font-mono">
        H1Founders v{__APP_VERSION__} • {new Date().toLocaleDateString()}
      </footer>
    </div>
  )
}