import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = '/' }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="terminal-text matrix-glow text-xl mb-2">AUTHENTICATING...</div>
          <div className="text-accent text-sm animate-pulse">Verifying credentials</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}