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
    id: ForumCategory.CLUB_H1,
    name: 'Club H1 💎',
    description: 'Premium inner circle for serious founders',
    icon: '💎',
    isPremium: true,
    monthlyPrice: 297,
    subCategories: [
      {
        name: 'Founder Stories',
        description: 'Real talk from the trenches',
        slug: 'founder-stories'
      },
      {
        name: 'Strategic Alliances',
        description: 'Co-founders & Partners',
        slug: 'strategic-alliances'
      },
      {
        name: 'Family Matters',
        description: 'Spouse & Kids navigation',
        slug: 'family-matters'
      },
      {
        name: 'The Inner Network',
        description: 'Verified founders only',
        slug: 'inner-network'
      }
    ]
  },
  {
    id: ForumCategory.ORACLE_CHAMBER,
    name: "Oracle's Chamber",
    description: 'Hybrid access - Morpheus+ or Club H1',
    icon: '🔮',
    requiredBadge: BadgeLevel.MORPHEUS,
    hybridAccess: true,  // NEW: Allows Club H1 members too
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
        description: 'Morpheus+ or Club H1',
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

export function canAccessCategory(
  category: ForumCategory, 
  userBadge: BadgeLevel, 
  isPaidMember?: boolean
): boolean {
  const config = getCategoryConfig(category)
  
  // Premium sections require Club H1 membership
  if (config?.isPremium && !isPaidMember) {
    return false
  }
  
  // No badge requirement = open access
  if (!config?.requiredBadge) return true
  
  // Hybrid access (Oracle Chamber): Morpheus+ OR Club H1 member
  if (config.hybridAccess && isPaidMember) {
    return true
  }
  
  // Standard badge hierarchy check
  const badgeLevels = Object.values(BadgeLevel)
  const requiredIndex = badgeLevels.indexOf(config.requiredBadge)
  const userIndex = badgeLevels.indexOf(userBadge)
  
  return userIndex >= requiredIndex
}