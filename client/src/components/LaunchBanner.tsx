import { useAuth } from '../contexts/AuthContext'

export default function LaunchBanner() {
  const { user } = useAuth()

  // Hide banner only if user is authenticated
  if (user) return null

  return (
    <div className="bg-gradient-to-r from-red-900/50 to-green-900/50 border-b border-accent/30 px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex-shrink-0">
            <span className="text-2xl">🚀</span>
          </div>
          <div className="text-center flex-1">
            <p className="font-mono text-accent text-sm sm:text-base">
              <span className="font-bold">LAUNCH WEEK:</span> Existing WhatsApp members can now claim their profiles!
              <span className="hidden sm:inline ml-2">
                // Join 781 verified founders in the Matrix
              </span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => window.location.href = '/network'}
              className="bg-green-400 hover:bg-green-300 text-foreground px-4 py-1 rounded font-mono text-sm font-bold transition-colors"
            >
              CLAIM_NOW()
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}