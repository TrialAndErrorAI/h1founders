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
      'Level 2: Active explorer (WhatsApp OGs start here)'
    ]
  },
  {
    level: BadgeLevel.FREED_MIND,
    name: 'Freed Mind',
    description: 'Escaped the Matrix - taking action',
    icon: '🔵',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    subLevels: 3,
    requirements: [
      'Level 1: Taking action on your freedom',
      'Level 2: Company formed',
      'Level 3: Company formed + first revenue'
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
    ]
  },
  {
    level: BadgeLevel.MORPHEUS,
    name: 'Morpheus',
    description: 'Teacher who frees others',
    icon: '⚡',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    subLevels: 3,
    requirements: [
      'Level 1: Emerging teacher (10+ freed)',
      'Level 2: Senior guide (50+ freed)',
      'Level 3: Master teacher (100+ freed)'
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
    level: BadgeLevel.ARCHITECT,
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