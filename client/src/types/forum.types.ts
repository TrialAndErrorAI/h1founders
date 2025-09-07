export enum BadgeLevel {
  BLUE_PILL = 'BLUE_PILL',
  UNPLUGGED = 'UNPLUGGED',
  FREED_MIND = 'FREED_MIND',
  NEO = 'NEO',
  MORPHEUS = 'MORPHEUS',
  ORACLE = 'ORACLE',
  ARCHITECT = 'ARCHITECT'
}

export enum ThreadType {
  QUESTION = 'QUESTION',
  VICTORY = 'VICTORY',
  WARNING = 'WARNING',
  RESOURCE = 'RESOURCE',
  INTRODUCTION = 'INTRODUCTION',
  PROPHECY = 'PROPHECY'
}

export enum ForumCategory {
  THE_CONSTRUCT = 'THE_CONSTRUCT',
  THE_MATRIX = 'THE_MATRIX',
  THE_REAL_WORLD = 'THE_REAL_WORLD',
  ZION = 'ZION',
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
  specialRole?: string
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
}