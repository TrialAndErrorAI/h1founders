import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { MATRIX_BADGES, SPECIAL_BADGES } from '../utils/badges'

export default function Dashboard() {
  const { user, profile, logout, updateProfile } = useAuth()
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  if (!user) {
    // Redirect to login if not authenticated
    window.location.href = '/network'
    return null
  }

  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
              FOUNDER_DASHBOARD
            </h1>
            <p className="text-gray-400 font-mono">
              // Welcome back, {profile?.name || profile?.phone || 'founder'}
            </p>
            {profile && (
              <div className="mt-2 flex items-center space-x-2">
                {/* Matrix Level Badge */}
                <span className="px-2 py-1 bg-gray-800 border border-gray-600 text-gray-300 rounded text-xs font-mono">
                  {MATRIX_BADGES[profile.matrixLevel].emoji} {MATRIX_BADGES[profile.matrixLevel].title}
                </span>
                
                {/* Special Badges */}
                {profile.specialBadges.map(badge => (
                  <span key={badge} className="px-2 py-1 bg-yellow-900/20 border border-yellow-500 text-yellow-400 rounded text-xs font-mono">
                    {SPECIAL_BADGES[badge].emoji} {SPECIAL_BADGES[badge].title}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg font-mono hover:bg-gray-700 transition-colors"
            >
              HOME()
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-900/20 border border-red-500 text-red-400 rounded-lg font-mono hover:bg-red-900/30 transition-colors"
            >
              DISCONNECT()
            </button>
          </div>
        </div>

        {/* Profile Status Alert */}
        {profile && !profile.profileComplete && (
          <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4 mb-8">
            <p className="text-yellow-400 font-mono">
              ⚠️ Complete your anonymous profile setup.
              <button 
                onClick={async () => {
                  setIsUpdatingProfile(true)
                  try {
                    await updateProfile({ profileComplete: true })
                  } catch (error) {
                    console.error('Error updating profile:', error)
                  }
                  setIsUpdatingProfile(false)
                }}
                disabled={isUpdatingProfile}
                className="ml-2 underline hover:text-yellow-300 disabled:opacity-50"
              >
                {isUpdatingProfile ? 'Updating...' : 'Setup username & badge →'}
              </button>
            </p>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Forum Access */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-mono text-green-400">FORUM_ACCESS</h2>
              <span className="text-green-400 text-sm font-mono">LIVE</span>
            </div>
            <p className="text-gray-300 font-mono mb-6">
              // Anonymous discussions with vetted founders
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Matrix Level:</span>
                <span className="text-green-400 font-mono">
                  {profile ? `${MATRIX_BADGES[profile.matrixLevel].emoji} ${MATRIX_BADGES[profile.matrixLevel].title}` : 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Username:</span>
                <span className="text-gray-300 font-mono">
                  @{profile?.username || 'anonymous_founder'}
                </span>
              </div>
              {profile?.specialBadges.includes('VERIFIED') && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Special Status:</span>
                  <span className="text-yellow-400 font-mono">
                    ✅ Verified Member
                  </span>
                </div>
              )}
            </div>
            <Link
              to="/forum"
              className="red-pill-button px-6 py-3 rounded-lg font-mono block text-center"
            >
              ENTER_FORUM()
            </Link>
          </div>

          {/* Tools Access */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-mono text-green-400">TOOLS_ACCESS</h2>
              <span className="text-green-400 text-sm font-mono">LIVE</span>
            </div>
            <p className="text-gray-300 font-mono mb-6">
              // Exclusive calculators and analyzers
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-400 mr-3">→</span>
                <span className="text-gray-300">Salary Explorer (Updated Weekly)</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-3">→</span>
                <span className="text-gray-300">EB1-A Qualifier Assessment</span>
              </div>
            </div>
            <Link
              to="/tools"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-mono transition-colors block text-center"
            >
              USE_TOOLS()
            </Link>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
          <h2 className="text-xl font-mono text-yellow-400 mb-4">COMING_SOON</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="text-gray-300 font-mono mb-2">RESOURCES</h3>
              <p className="text-gray-500">Curated founder content library</p>
            </div>
            <div>
              <h3 className="text-gray-300 font-mono mb-2">STORIES</h3>
              <p className="text-gray-500">Founder transformation narratives</p>
            </div>
            <div>
              <h3 className="text-gray-300 font-mono mb-2">COACHING</h3>
              <p className="text-gray-500">1-on-1 tough love sessions</p>
            </div>
          </div>
        </div>

        {/* Community Stats (No exact numbers) */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 font-mono text-sm">
            // Part of {profile?.isWhatsappMember ? 'original WhatsApp' : 'growing'} founder community
          </p>
        </div>
      </div>
    </div>
  )
}