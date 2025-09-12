import { BadgeLevel, BadgeConfig } from '../types/forum.types'

export const badgeConfigs: BadgeConfig[] = [
  {
    level: BadgeLevel.BLUE_PILL,
    name: 'Blue Pill',
    description: 'Still in the system - believes they need permission',
    icon: '⚪',
    color: '#1e3a8a',
    glowColor: 'rgba(30, 58, 138, 0.5)',
    requirements: ['New arrival to the community']
  },
  {
    level: BadgeLevel.UNPLUGGED,
    name: 'Unplugged',
    description: 'Starting to see - questioning everything',
    icon: '🟡',
    color: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.5)',
    subLevels: 2,
    requirements: [
      'Level 1: Join community, introduce yourself',
      'Level 2: Active explorer'
    ],
    pricing: [
      {
        fromLevel: 'Blue Pill',
        price: 0,
        program: 'Join community (FREE)'
      }
    ]
  },
  {
    level: BadgeLevel.FREED_MIND,
    name: 'Freed Mind',
    description: 'Escaped the Matrix - taking action (WhatsApp members start here)',
    icon: '🔵',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    subLevels: 3,
    requirements: [
      'Level 1: Taking action on your freedom',
      'Level 2: Company formed',
      'Level 3: Company formed + first revenue'
    ],
    pricing: [
      {
        fromLevel: 'Unplugged',
        price: 97,
        program: '"Can I Start?" course'
      },
      {
        fromLevel: 'Freed Mind L1',
        price: 197,
        program: 'Company formation package'
      },
      {
        fromLevel: 'Freed Mind L2',
        price: 297,
        program: 'First customer program'
      }
    ]
  },
  {
    level: BadgeLevel.NEO,
    name: 'Neo',
    description: 'The Awakened One - self-sponsored and profitable',
    icon: '🟢',
    color: '#00ff41',
    glowColor: 'rgba(0, 255, 65, 0.5)',
    subLevels: 5,
    requirements: [
      'Level 1: First revenue ($10K+ earned)',
      'Level 2: Self-sponsored (EB1/O1 achieved)',
      'Level 3: Profitable ($100K+ revenue)',
      'Level 4: Revenue machine ($250K+ revenue)',
      'Level 5: Scaled founder ($500K+ revenue)'
    ],
    pricing: [
      {
        fromLevel: 'Freed Mind L3',
        price: 497,
        program: 'First $10K coaching'
      },
      {
        fromLevel: 'Neo L1',
        price: 997,
        program: 'Self-sponsorship strategy'
      },
      {
        fromLevel: 'Neo L2',
        price: 1997,
        program: '$100K Blueprint'
      },
      {
        fromLevel: 'Neo L3',
        price: 2997,
        program: 'Scale to $250K'
      },
      {
        fromLevel: 'Neo L4',
        price: 4997,
        program: 'Half-million retreat'
      }
    ]
  },
  {
    level: BadgeLevel.MORPHEUS,
    name: 'Morpheus',
    description: 'Teacher who frees others - FREE Oracle Chamber access',
    icon: '⚡',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    subLevels: 3,
    requirements: [
      'Level 1: Emerging teacher (10+ freed)',
      'Level 2: Senior guide (50+ freed)',
      'Level 3: Master teacher (100+ freed)'
    ],
    pricing: [
      {
        fromLevel: 'Neo L5',
        price: 9997,
        program: 'Empire Builder program'
      }
    ]
  },
  {
    level: BadgeLevel.ORACLE,
    name: 'Oracle',
    description: 'Builder of communities - sees what others need',
    icon: '🟣',
    color: '#9333ea',
    glowColor: 'rgba(147, 51, 234, 0.5)',
    requirements: ['Hand-picked by the Architect', 'Builds and nurtures the community']
  },
  {
    level: BadgeLevel.THE_ARCHITECT,
    name: 'The Architect',
    description: 'Creator of the system - Sid',
    icon: '🔴',
    color: '#ff073a',
    glowColor: 'rgba(255, 7, 58, 0.5)',
    requirements: ['The one who started it all']
  }
]

export const specialRoles = {
  ORACLE_ASSISTANT: {
    name: "Oracle's Assistant",
    icon: '🔮',
    description: 'Sees what others need - Manisha',
    color: '#c084fc'
  },
  SENTINEL: {
    name: 'Sentinel',
    icon: '⚔️',
    description: 'Forum moderator',
    color: '#f97316'
  },
  AGENT_SMITH: {
    name: 'Agent Smith',
    icon: '🔍',
    description: 'AI detection for misinformation',
    color: '#dc2626'
  },
  THE_TWINS: {
    name: 'The Twins',
    icon: '🎭',
    description: 'Content curators',
    color: '#0891b2'
  }
}

export function getBadgeConfig(level: BadgeLevel): BadgeConfig | undefined {
  return badgeConfigs.find(config => config.level === level)
}

export function getBadgeColor(level: BadgeLevel): string {
  const config = getBadgeConfig(level)
  return config?.color || '#64748b'
}

export function getBadgeIcon(level: BadgeLevel, subLevel?: number): string {
  const config = getBadgeConfig(level)
  if (!config) return '❓'
  
  if (subLevel && config.subLevels) {
    return `${config.icon}${subLevel}`
  }
  
  return config.icon
}

export function getBadgeName(level: BadgeLevel, subLevel?: number): string {
  const config = getBadgeConfig(level)
  if (!config) return 'Unknown'
  
  if (subLevel && config.subLevels) {
    return `${config.name} L${subLevel}`
  }
  
  return config.name
}