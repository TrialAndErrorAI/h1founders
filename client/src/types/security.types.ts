/**
 * Security-First Type Definitions
 * Prevents access control vulnerabilities by making insecure patterns impossible
 */

import { BadgeLevel } from './forum.types'

// SECURITY PRINCIPLE: Make access results explicit - no boolean ambiguity
export type AccessResult = 'GRANTED' | 'DENIED'

// SECURITY PRINCIPLE: Force explicit handling of authenticated vs anonymous users
export type UserContext = AuthenticatedUserContext | AnonymousUserContext

export interface AuthenticatedUserContext {
  type: 'authenticated'
  badge: BadgeLevel
  isPaidMember: boolean
  uid: string
}

export interface AnonymousUserContext {
  type: 'anonymous'
  badge: BadgeLevel.BLUE_PILL  // Anonymous users ALWAYS get most restrictive access
  isPaidMember: false          // Anonymous users can NEVER be paid members
}

// SECURITY PRINCIPLE: Explicit user context creation prevents implicit permissive defaults
export function createUserContext(user: any): UserContext {
  if (!user || !user.badge) {
    // SECURITY: Anonymous users explicitly get BLUE_PILL (most restrictive)
    return {
      type: 'anonymous',
      badge: BadgeLevel.BLUE_PILL,
      isPaidMember: false
    }
  }

  return {
    type: 'authenticated',
    badge: user.badge,
    isPaidMember: user.isPaidMember || false,
    uid: user.uid || user.id
  }
}

// SECURITY PRINCIPLE: Access check functions must return explicit results
export interface SecurityCheck {
  result: AccessResult
  reason: string
  userContext: UserContext
}