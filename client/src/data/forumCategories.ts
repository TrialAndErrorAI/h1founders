import { ForumCategory, ForumCategoryConfig, BadgeLevel } from '../types/forum.types'

export const forumCategories: ForumCategoryConfig[] = [
  {
    id: ForumCategory.THE_CONSTRUCT,
    name: 'The Construct',
    description: 'Training ground for new minds',
    icon: '📋',
    subCategories: [
      {
        name: 'Orientation',
        description: 'Welcome to the Real World',
        slug: 'orientation'
      },
      {
        name: 'Choosing Your Pill',
        description: 'H1B vs Freedom',
        slug: 'choosing-pill'
      },
      {
        name: 'First Steps',
        description: 'Unplugging from Corporate',
        slug: 'first-steps'
      }
    ]
  },
  {
    id: ForumCategory.THE_MATRIX,
    name: 'The Matrix',
    description: 'Navigate the system while you escape',
    icon: '🏢',
    subCategories: [
      {
        name: 'Corporate Slavery',
        description: 'Surviving H1B',
        slug: 'corporate-slavery'
      },
      {
        name: 'Visa Labyrinth',
        description: 'H1B, O1, EB1 Paths',
        slug: 'visa-labyrinth'
      },
      {
        name: '60-Day Countdown',
        description: 'Grace Period Survival',
        slug: '60-day-countdown'
      },
      {
        name: 'Border Runs',
        description: 'Travel & Stamping',
        slug: 'border-runs'
      }
    ]
  },
  {
    id: ForumCategory.THE_REAL_WORLD,
    name: 'The Real World',
    description: 'Building your freedom',
    icon: '🏗️',
    subCategories: [
      {
        name: 'Building Your Ship',
        description: 'Company Formation',
        slug: 'building-ship'
      },
      {
        name: 'Generate Resources',
        description: 'Revenue & Fundraising',
        slug: 'generate-resources'
      },
      {
        name: 'Scaling Reality',
        description: 'Growth & Hiring',
        slug: 'scaling-reality'
      },
      {
        name: 'System Integration',
        description: 'Banking & Legal',
        slug: 'system-integration'
      }
    ]
  },
  {
    id: ForumCategory.ZION,
    name: 'Zion',
    description: 'The free community',
    icon: '🌍',
    subCategories: [
      {
        name: 'War Stories',
        description: 'Success & Failures',
        slug: 'war-stories'
      },
      {
        name: 'The Alliance',
        description: 'Co-founders & Partners',
        slug: 'alliance'
      },
      {
        name: 'The Families',
        description: 'Spouse & Kids',
        slug: 'families'
      },
      {
        name: 'The Network',
        description: 'Global Founders',
        slug: 'network'
      }
    ]
  },
  {
    id: ForumCategory.ORACLE_CHAMBER,
    name: "Oracle's Chamber",
    description: 'Special access - Neo+ only',
    icon: '🔮',
    requiredBadge: BadgeLevel.NEO,
    subCategories: [
      {
        name: 'Prophecies',
        description: "Sid's Predictions",
        slug: 'prophecies'
      },
      {
        name: 'Sacred Texts',
        description: 'Exclusive Guides',
        slug: 'sacred-texts'
      },
      {
        name: 'Master Classes',
        description: 'Neo+ Only',
        slug: 'master-classes'
      },
      {
        name: 'The Keymaker',
        description: 'Special Opportunities',
        slug: 'keymaker'
      }
    ]
  }
]

export function getCategoryConfig(id: ForumCategory): ForumCategoryConfig | undefined {
  return forumCategories.find(cat => cat.id === id)
}

export function getCategoryName(id: ForumCategory): string {
  const config = getCategoryConfig(id)
  return config?.name || 'Unknown Category'
}

export function getCategoryIcon(id: ForumCategory): string {
  const config = getCategoryConfig(id)
  return config?.icon || '❓'
}

export function canAccessCategory(category: ForumCategory, userBadge: BadgeLevel): boolean {
  const config = getCategoryConfig(category)
  if (!config?.requiredBadge) return true
  
  const badgeLevels = Object.values(BadgeLevel)
  const requiredIndex = badgeLevels.indexOf(config.requiredBadge)
  const userIndex = badgeLevels.indexOf(userBadge)
  
  return userIndex >= requiredIndex
}