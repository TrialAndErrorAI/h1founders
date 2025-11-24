import { useAuth } from '../contexts/AuthContext'

export default function LaunchBanner() {
  const { user } = useAuth()

  // Hide banner only if user is authenticated
  if (user) return null

  return (
    <div className="bg-gradient-to-r from-red-900/50 to-green-900/50 border-b border-accent/30 px-3 py-2 sm:px-4 sm:py-3 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Mobile layout - stacked */}
        <div className="sm:hidden flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <p className="font-mono text-accent text-xs">
              <span className="font-bold">LAUNCH CLUB C2</span> - Dec 16
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/launch-club'}
            className="bg-green-400 hover:bg-green-300 text-foreground px-3 py-1 rounded font-mono text-xs font-bold transition-colors"
          >
            5 SPOTS
          </button>
        </div>

        {/* Desktop layout - horizontal */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-shrink-0">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="text-center flex-1">
              <p className="font-mono text-accent text-sm lg:text-base">
                <span className="font-bold">LAUNCH CLUB C2:</span> Attorney-ready in 3 weeks | Dec 16
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => window.location.href = '/launch-club'}
                className="bg-green-400 hover:bg-green-300 text-foreground px-4 py-1 rounded font-mono text-sm font-bold transition-colors whitespace-nowrap"
              >
                5_SPOTS()
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}