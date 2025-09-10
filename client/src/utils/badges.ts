export type MatrixLevel = 
  | 'BLUE_PILL'      // ⚪ Still in the system (new members)
  | 'UNPLUGGED'      // 🟡 Starting to see (default for new auth)
  | 'FREED_MIND'     // 🔵 Escaped the Matrix (active forum user)
  | 'NEO'            // 🟢 Awakened, self-sponsored (has business)
  | 'MORPHEUS'       // ⚡ Teachers who free others (helps community)
  | 'THE_ORACLE'     // 🟣 Builds own communities (creates content)
  | 'THE_ARCHITECT'  // 🔴 Sid only

export interface BadgeInfo {
  level: MatrixLevel
  emoji: string
  title: string
  description: string
  requirements: string[]
}

export const MATRIX_BADGES: Record<MatrixLevel, BadgeInfo> = {
  'BLUE_PILL': {
    level: 'BLUE_PILL',
    emoji: '⚪',
    title: 'Blue Pill',
    description: 'Still in the system',
    requirements: ['New to the community', 'Browsing but not engaged']
  },
  'UNPLUGGED': {
    level: 'UNPLUGGED', 
    emoji: '🟡',
    title: 'Unplugged',
    description: 'Starting to see',
    requirements: ['Created account', 'Verified phone/email', 'Joined discussions']
  },
  'FREED_MIND': {
    level: 'FREED_MIND',
    emoji: '🔵', 
    title: 'Freed Mind',
    description: 'Escaped the Matrix',
    requirements: ['Active forum participation', '10+ helpful posts', 'Community contributor']
  },
  'NEO': {
    level: 'NEO',
    emoji: '🟢',
    title: 'Neo',
    description: 'Awakened, self-sponsored',
    requirements: ['Has own business', 'Self-sponsoring visa', 'Proven revenue']
  },
  'MORPHEUS': {
    level: 'MORPHEUS',
    emoji: '⚡',
    title: 'Morpheus', 
    description: 'Teachers who free others',
    requirements: ['Mentors other founders', 'Creates educational content', 'Hosts events']
  },
  'THE_ORACLE': {
    level: 'THE_ORACLE',
    emoji: '🟣',
    title: 'The Oracle',
    description: 'Builds own communities',
    requirements: ['Has own community/audience', 'Creates original content', 'Industry influence']
  },
  'THE_ARCHITECT': {
    level: 'THE_ARCHITECT',
    emoji: '🔴',
    title: 'The Architect', 
    description: 'Designer of the Matrix',
    requirements: ['Sid Sarasvati only', 'Platform creator', 'Community architect']
  }
}

export type SpecialStatus = 'VERIFIED' | 'CLUB_MEMBER' | 'TOP_CONTRIBUTOR'

export interface SpecialBadge {
  status: SpecialStatus
  emoji: string
  title: string
  description: string
}

export const SPECIAL_BADGES: Record<SpecialStatus, SpecialBadge> = {
  'VERIFIED': {
    status: 'VERIFIED',
    emoji: '✅',
    title: 'Verified',
    description: 'Verified community member'
  },
  'CLUB_MEMBER': {
    status: 'CLUB_MEMBER', 
    emoji: '💎',
    title: 'Club Member',
    description: 'Premium H1 Club member'
  },
  'TOP_CONTRIBUTOR': {
    status: 'TOP_CONTRIBUTOR',
    emoji: '🏆', 
    title: 'Top Contributor',
    description: 'Recognized for exceptional contributions'
  }
}

/**
 * Get default badge level for new users
 */
export function getDefaultBadgeLevel(_isWhatsappMember: boolean = false): MatrixLevel {
  // All new users start as UNPLUGGED (starting to see)
  return 'UNPLUGGED'
}

/**
 * Get special badges for a user
 */
export function getUserSpecialBadges(
  isWhatsappMember: boolean = false,
  isClubMember: boolean = false,
  isTopContributor: boolean = false
): SpecialStatus[] {
  const badges: SpecialStatus[] = []
  
  // WhatsApp members are automatically verified
  if (isWhatsappMember) {
    badges.push('VERIFIED')
  }
  
  if (isClubMember) {
    badges.push('CLUB_MEMBER')
  }
  
  if (isTopContributor) {
    badges.push('TOP_CONTRIBUTOR')
  }
  
  return badges
}

/**
 * Format badge display for UI
 */
export function formatBadgeDisplay(
  level: MatrixLevel, 
  specialBadges: SpecialStatus[] = []
): string {
  const mainBadge = MATRIX_BADGES[level]
  const special = specialBadges.map(s => SPECIAL_BADGES[s].emoji).join('')
  
  return `${mainBadge.emoji} ${special} ${mainBadge.title}`
}