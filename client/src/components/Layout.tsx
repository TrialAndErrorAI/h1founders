import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import SponsorBanner from './SponsorBanner'

const ENABLE_PARTNERSHIPS = import.meta.env.VITE_ENABLE_PARTNERSHIPS === 'true'

export default function Layout() {
  return (
    <div className="min-h-screen bg-black">
      {ENABLE_PARTNERSHIPS && <SponsorBanner />}
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}