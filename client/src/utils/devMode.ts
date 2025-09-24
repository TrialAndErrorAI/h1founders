/**
 * Dev Mode Utilities
 * Centralized dev mode detection and management
 * Only works on localhost for local development
 */

// Check if we're in development mode on localhost
export const isDevMode = (): boolean => {
  return window.location.hostname === 'localhost' && import.meta.env.DEV
}

// Check if user should have admin access (dev mode OR authenticated as Sid)
export const hasAdminAccess = (userEmail?: string | null): boolean => {
  if (isDevMode()) return true
  return userEmail === 'sid@h1founders.com'
}

// Check if user should have WIN CLUB coach access
export const hasCoachAccess = (userEmail?: string | null): boolean => {
  if (isDevMode()) return true
  return userEmail === 'sid@h1founders.com'
}

// Dev mode banner component props
export const getDevModeBanner = () => {
  if (!isDevMode()) return null

  return {
    show: true,
    message: '🚧 DEV MODE - LOCALHOST ONLY',
    links: [
      { href: '/win-club/coach', label: 'WIN CLUB Coach →' },
      { href: '/admin', label: 'Admin Panel →' },
      { href: '/forum', label: 'Forum →' }
    ]
  }
}

// Clean up any old dev mode artifacts from localStorage
export const cleanupOldDevArtifacts = () => {
  if (typeof window !== 'undefined') {
    // Remove old dev admin flag - no longer needed
    localStorage.removeItem('h1founders-dev-admin')
  }
}