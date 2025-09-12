export enum BadgeLevel {
  BLUE_PILL = 'BLUE_PILL',
  UNPLUGGED = 'UNPLUGGED',
  FREED_MIND = 'FREED_MIND',
  NEO = 'NEO',
  MORPHEUS = 'MORPHEUS',
  ORACLE = 'ORACLE',
  THE_ARCHITECT = 'THE_ARCHITECT'
}

export enum SpecialRole {
  GUARDIAN = '⚔️ Guardian',       // Paid team (Manisha) - full mod powers
  SENTINEL = '🛡️ Sentinel',       // Trusted volunteers - flag/hide
  WATCHER = '📡 Watcher',         // Active members - can report
  AI_ORACLE = '🔮 The Oracle'     // ATLAS AI participation
}

export enum ThreadType {
  QUESTION = 'QUESTION',
  VICTORY = 'VICTORY',
  WARNING = 'WARNING',
  RESOURCE = 'RESOURCE',
  INTRODUCTION = 'INTRODUCTION',
  PROPHECY = 'PROPHECY'
}

export enum ContentType {
  STORY = 'STORY',
  EVENT = 'EVENT',
  GUIDE = 'GUIDE',
  TOOL = 'TOOL',
  WISDOM = 'WISDOM',
  SUBSTACK = 'SUBSTACK',
  ANNOUNCEMENT = 'ANNOUNCEMENT'
}

export enum ForumCategory {
  THE_CONSTRUCT = 'THE_CONSTRUCT',
  THE_MATRIX = 'THE_MATRIX',
  THE_REAL_WORLD = 'THE_REAL_WORLD',
  CLUB_H1 = 'CLUB_H1',  // Changed from ZION
  ORACLE_CHAMBER = 'ORACLE_CHAMBER'
}

export interface BadgeConfig {
  level: BadgeLevel
  name: string
  description: string
  icon: string
  color: string
  glowColor: string
  subLevels?: number
  requirements?: string[]
  pricing?: {
    fromLevel?: string
    price: number
    program: string
  }[]
}

export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  badge: BadgeLevel
  subLevel?: number
  joinedDate: string
  isAI?: boolean
  isOracle?: boolean
  isModerator?: boolean
  specialRole?: SpecialRole
  isPaidMember?: boolean  // Club H1 status
  clubH1JoinedAt?: string
  avatar?: string
  company?: string
  location?: string
  visaType?: string
}

export interface Thread {
  id: string
  title: string
  category: ForumCategory
  type: ThreadType
  author: User
  content: string
  createdAt: string
  updatedAt: string
  views: number
  replies: number
  lastReply?: {
    author: User
    createdAt: string
  }
  isPinned?: boolean
  isLocked?: boolean
  aiParticipated?: boolean
  tags?: string[]
}

export interface Post {
  id: string
  threadId: string
  author: User
  content: string
  createdAt: string
  updatedAt?: string
  upvotes: number
  downvotes: number
  isAIGenerated?: boolean
  isSolution?: boolean
  editHistory?: {
    editedAt: string
    previousContent: string
  }[]
}

export interface ForumCategoryConfig {
  id: ForumCategory
  name: string
  description: string
  icon: string
  subCategories?: {
    name: string
    description: string
    slug: string
  }[]
  requiredBadge?: BadgeLevel
  isPremium?: boolean        // NEW: Club H1 premium section
  monthlyPrice?: number      // NEW: Pricing for premium sections
  hybridAccess?: boolean     // NEW: Oracle Chamber hybrid access
}