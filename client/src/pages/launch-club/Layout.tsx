// Launch Club Program Layout with Sidebar
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function LaunchClubLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
