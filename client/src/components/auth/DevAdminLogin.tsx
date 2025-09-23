import { useState } from 'react'
import toast from 'react-hot-toast'
import { KeyIcon } from '@heroicons/react/24/outline'

interface DevAdminLoginProps {
  onSuccess: () => void
}

export default function DevAdminLogin({ onSuccess }: DevAdminLoginProps) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Only show on localhost
  if (window.location.hostname !== 'localhost') {
    return null
  }

  const handleDevLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple hardcoded check for dev
    if (password !== 'matrix2025') {
      toast.error('Invalid admin password')
      return
    }

    setLoading(true)

    // For dev mode, we just mock the login
    // In production, you'd still need to use your real phone number
    setTimeout(() => {
      // Set a flag in localStorage to indicate dev admin mode
      localStorage.setItem('h1founders-dev-admin', 'true')
      toast.success('Dev admin mode activated!')
      onSuccess()

      // Reload to apply dev mode
      window.location.href = '/admin'
    }, 1000)
  }

  return (
    <div className="border-t border-yellow-400 mt-6 pt-6">
      <div className="text-xs text-yellow-400 mb-3 flex items-center gap-2">
        <KeyIcon className="w-4 h-4" />
        <span>DEVELOPMENT ADMIN ACCESS</span>
      </div>

      <form onSubmit={handleDevLogin} className="space-y-3">
        <div>
          <label className="block text-xs text-foreground-tertiary mb-1">
            Admin Password (localhost only)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password..."
            className="w-full p-3 bg-background border border-yellow-400 text-foreground rounded focus:outline-none focus:border-accent"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 bg-yellow-400 text-black font-mono font-bold rounded hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'AUTHENTICATING...' : 'ADMIN LOGIN'}
        </button>

        <div className="text-xs text-foreground-tertiary">
          <p>Email: admin@h1founders.local</p>
          <p>Password: matrix2025</p>
          <p className="mt-1 text-yellow-400">⚠️ Dev mode only - not available in production</p>
        </div>
      </form>
    </div>
  )
}