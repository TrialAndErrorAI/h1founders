import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from '../../components/auth/AuthModal'

export default function Network() {
  const { user, profile } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isClaimingProfile, setIsClaimingProfile] = useState(false)

  // If user is authenticated, show the network directory
  if (user) {
    return (
      <div className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-7xl">
          {/* Authenticated Network View */}
          <div className="mb-12">
            <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
              NETWORK_DIRECTORY
            </h1>
            <p className="text-gray-400 font-mono">
              // Welcome back, {profile?.name || profile?.phone || 'founder'}
            </p>
          </div>

          {/* Profile Status */}
          {profile && !profile.profileComplete && (
            <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4 mb-8">
              <p className="text-yellow-400 font-mono">
                ⚠️ Your profile is incomplete. 
                <button className="ml-2 underline hover:text-yellow-300">
                  Complete it now
                </button>
              </p>
            </div>
          )}

          {/* Member Grid (Placeholder for now) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full" />
                  <div>
                    <div className="h-4 bg-gray-700 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-800 rounded w-32" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-800 rounded w-full" />
                  <div className="h-3 bg-gray-800 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 font-mono text-sm">
              // Full directory implementation coming soon
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Not authenticated - show locked screen
  return (
    <>
      <div className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Locked Screen */}
          <div className="text-center">
            {/* Lock Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500">
              <span className="text-4xl">🔒</span>
            </div>
            
            {/* Access Denied Message */}
            <div className="mb-12">
              <h1 className="text-4xl font-mono text-red-500 mb-4">
                ACCESS_DENIED
              </h1>
              <div className="font-mono text-gray-400 space-y-1">
                <p>// Authentication required</p>
                <p>// Members only section</p>
              </div>
            </div>

            {/* What's Inside */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8 text-left max-w-2xl mx-auto">
              <h2 className="text-xl font-mono text-green-400 mb-4">// What's inside:</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>Verified member directory of immigrant founders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>Direct connections via LinkedIn/Twitter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>Search by visa type, industry, and stage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>Co-founder matching and opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>Verified service provider recommendations</span>
                </li>
              </ul>
            </div>

            {/* Access Options */}
            <div className="space-y-4">
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsClaimingProfile(true)
                    setShowAuthModal(true)
                  }}
                  className="red-pill-button px-8 py-3 text-lg font-semibold rounded-lg font-mono block w-full max-w-md mx-auto"
                >
                  CLAIM_WHATSAPP_PROFILE()
                </button>
                <p className="text-gray-500 font-mono text-xs">
                  // For existing WhatsApp community members
                </p>
              </div>

              <div className="text-gray-400 font-mono text-sm my-4">
                --- OR ---
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsClaimingProfile(false)
                    setShowAuthModal(true)
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg font-semibold rounded-lg font-mono transition-colors block w-full max-w-md mx-auto"
                >
                  JOIN_AS_NEW_MEMBER()
                </button>
                <p className="text-gray-500 font-mono text-xs">
                  // New to the community? Start here
                </p>
              </div>
            </div>
          </div>

          {/* Matrix Easter Egg */}
          <div className="mt-24 text-center">
            <p className="text-gray-800 font-mono text-xs">
              // The Matrix has you...
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        isClaimingProfile={isClaimingProfile}
        onSuccess={() => {
          // User successfully authenticated, the component will re-render
          // showing the authenticated view
        }}
      />
    </>
  )
}