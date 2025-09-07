import { useState } from 'react'
import EmailCapture from '../../components/EmailCapture'

export default function Network() {
  const [showUnlock, setShowUnlock] = useState(false)

  return (
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
                <span>Member directory with 1,400+ immigrant founders</span>
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
            {!showUnlock ? (
              <>
                <button
                  onClick={() => setShowUnlock(true)}
                  className="red-pill-button px-8 py-3 text-lg font-semibold rounded-lg font-mono"
                >
                  REQUEST_ACCESS()
                </button>
                <p className="text-gray-500 font-mono text-sm">
                  // Community members get instant access
                </p>
              </>
            ) : (
              <div className="bg-black border border-gray-800 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-mono text-white mb-2">// Join the waitlist</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Network access launching soon for community members.
                </p>
                <EmailCapture 
                  placeholder="founder@startup.com"
                  buttonText="JOIN_WAITLIST()"
                  context="network-access"
                />
              </div>
            )}
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
  )
}