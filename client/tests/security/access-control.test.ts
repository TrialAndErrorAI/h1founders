/**
 * CRITICAL SECURITY TESTS
 * These tests MUST pass before any deployment
 * Prevents anonymous users from accessing premium content
 */

import { test, expect } from '@playwright/test'
import { canAccessCategory, checkCategoryAccess } from '../../src/data/forumCategories'
import { createUserContext } from '../../src/types/security.types'
import { ForumCategory, BadgeLevel } from '../../src/types/forum.types'

test.describe('CRITICAL: Anonymous User Security', () => {
  test('Anonymous users cannot access CLUB_H1 category', () => {
    const access = canAccessCategory(ForumCategory.CLUB_H1, BadgeLevel.BLUE_PILL, false)
    expect(access).toBe(false) // MUST be false - no exceptions
  })

  test('Anonymous users cannot access ORACLE_CHAMBER category', () => {
    const access = canAccessCategory(ForumCategory.ORACLE_CHAMBER, BadgeLevel.BLUE_PILL, false)
    expect(access).toBe(false) // MUST be false - no exceptions
  })

  test('Anonymous users can only access public categories', () => {
    const publicCategories = [
      ForumCategory.THE_CONSTRUCT,
      ForumCategory.THE_MATRIX,
      ForumCategory.THE_REAL_WORLD
    ]

    publicCategories.forEach(category => {
      const access = canAccessCategory(category, BadgeLevel.BLUE_PILL, false)
      expect(access).toBe(true) // Public categories should be accessible
    })
  })

  test('SECURITY: createUserContext handles null user safely', () => {
    const context = createUserContext(null)
    expect(context.type).toBe('anonymous')
    expect(context.badge).toBe(BadgeLevel.BLUE_PILL)
    expect(context.isPaidMember).toBe(false)
  })

  test('SECURITY: createUserContext handles undefined user safely', () => {
    const context = createUserContext(undefined)
    expect(context.type).toBe('anonymous')
    expect(context.badge).toBe(BadgeLevel.BLUE_PILL)
    expect(context.isPaidMember).toBe(false)
  })

  test('SECURITY: checkCategoryAccess provides explicit results', () => {
    const result = checkCategoryAccess(ForumCategory.CLUB_H1, null)
    expect(result.result).toBe('DENIED')
    expect(result.reason).toContain('Premium category requires Club H1 membership')
    expect(result.userContext.type).toBe('anonymous')
  })
})

test.describe('CRITICAL: Premium Content Protection', () => {
  test('CLUB_H1 requires paid membership regardless of badge level', () => {
    // Even THE_ARCHITECT can't access CLUB_H1 without payment
    const access = canAccessCategory(ForumCategory.CLUB_H1, BadgeLevel.THE_ARCHITECT, false)
    expect(access).toBe(false)
  })

  test('ORACLE_CHAMBER requires either Morpheus badge OR paid membership', () => {
    // Morpheus+ can access without payment
    const morpheusAccess = canAccessCategory(ForumCategory.ORACLE_CHAMBER, BadgeLevel.MORPHEUS, false)
    expect(morpheusAccess).toBe(true)

    // Club H1 members can access with any badge
    const paidAccess = canAccessCategory(ForumCategory.ORACLE_CHAMBER, BadgeLevel.BLUE_PILL, true)
    expect(paidAccess).toBe(true)

    // Regular users without either requirement cannot access
    const noAccess = canAccessCategory(ForumCategory.ORACLE_CHAMBER, BadgeLevel.NEO, false)
    expect(noAccess).toBe(false)
  })

  test('Unknown categories are denied by default', () => {
    const access = canAccessCategory('UNKNOWN_CATEGORY' as ForumCategory, BadgeLevel.THE_ARCHITECT, true)
    expect(access).toBe(false)
  })
})

test.describe('CRITICAL: Badge Hierarchy Security', () => {
  test('Badge hierarchy is properly enforced for Oracle Chamber', () => {
    // Test each badge level against Oracle Chamber (requires Morpheus+)
    const testCases = [
      { badge: BadgeLevel.BLUE_PILL, expected: 'DENIED' },
      { badge: BadgeLevel.UNPLUGGED, expected: 'DENIED' },
      { badge: BadgeLevel.FREED_MIND, expected: 'DENIED' },
      { badge: BadgeLevel.NEO, expected: 'DENIED' },
      { badge: BadgeLevel.MORPHEUS, expected: 'GRANTED' },
      { badge: BadgeLevel.ORACLE, expected: 'GRANTED' },
      { badge: BadgeLevel.THE_ARCHITECT, expected: 'GRANTED' }
    ]

    testCases.forEach(({ badge, expected }) => {
      const result = checkCategoryAccess(ForumCategory.ORACLE_CHAMBER, {
        badge,
        isPaidMember: false,
        uid: 'test'
      })

      expect(result.result).toBe(expected)
      // Also log for debugging
      if (result.result !== expected) {
        console.log(`Badge ${badge}: Expected ${expected}, got ${result.result}. Reason: ${result.reason}`)
      }
    })
  })

  test('Badge hierarchy works for public categories', () => {
    // All badges should access public categories
    const allBadges = Object.values(BadgeLevel)

    allBadges.forEach(badge => {
      const result = checkCategoryAccess(ForumCategory.THE_CONSTRUCT, {
        badge,
        isPaidMember: false,
        uid: 'test'
      })
      expect(result.result).toBe('GRANTED')
    })
  })
})