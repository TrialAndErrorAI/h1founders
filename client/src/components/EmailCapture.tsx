import { useState } from 'react'

interface EmailCaptureProps {
  placeholder?: string
  buttonText?: string
  onSuccess?: (email: string) => void
  context?: string
}

export default function EmailCapture({ 
  placeholder = "founder@startup.com",
  buttonText = "NOTIFY_ME()",
  onSuccess,
  context = "general"
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Invalid email address')
      return
    }

    setStatus('loading')
    
    // Store in localStorage for now
    try {
      const stored = localStorage.getItem('h1founders_emails') || '[]'
      const emails = JSON.parse(stored)
      const entry = {
        email,
        context,
        timestamp: new Date().toISOString()
      }
      emails.push(entry)
      localStorage.setItem('h1founders_emails', JSON.stringify(emails))
      
      setStatus('success')
      setMessage('// Welcome to Zion, founder')
      setEmail('')
      
      if (onSuccess) {
        onSuccess(email)
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to save. Try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 bg-background-secondary border rounded-lg font-mono text-sm
              placeholder-gray-600 transition-all duration-200
              ${status === 'success' ? 'border-accent text-accent' : ''}
              ${status === 'error' ? 'border-red-400' : 'border-border'}
              ${status === 'idle' ? 'focus:border-accent focus:outline-none focus:ring-1 focus:ring-green-400' : ''}
            `}
            disabled={status === 'loading' || status === 'success'}
          />
          {status === 'loading' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`
            px-6 py-3 font-mono text-sm font-semibold rounded-lg
            transition-all duration-200 whitespace-nowrap
            ${status === 'success' 
              ? 'bg-green-400 text-foreground' 
              : 'bg-red-600 hover:bg-red-700 text-foreground'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {status === 'success' ? '✓ SAVED' : buttonText}
        </button>
      </div>
      
      {message && (
        <p className={`
          mt-2 text-sm font-mono
          ${status === 'success' ? 'text-accent matrix-glow' : ''}
          ${status === 'error' ? 'text-red-pill' : ''}
        `}>
          {message}
        </p>
      )}
    </form>
  )
}