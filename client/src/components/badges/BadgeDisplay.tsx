import { getBadgeConfig, specialRoles } from '../../data/badgeConfig'
import { BadgeLevel } from '../../types/forum.types'

interface BadgeDisplayProps {
  level: BadgeLevel
  subLevel?: number
  specialRole?: string
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
}

export default function BadgeDisplay({ 
  level, 
  subLevel, 
  specialRole,
  size = 'md', 
  showName = true,
  className = ''
}: BadgeDisplayProps) {
  const config = getBadgeConfig(level)
  if (!config) return null

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1.5',
    lg: 'text-base px-3 py-2'
  }

  const badgeName = subLevel && config.subLevels 
    ? `${config.name} L${subLevel}`
    : config.name

  const special = specialRole ? specialRoles[specialRole as keyof typeof specialRoles] : null

  return (
    <div className={`inline-flex items-center gap-1.5 flex-wrap ${className}`}>
      <span 
        className={`
          inline-flex items-center gap-1.5 rounded-full font-mono whitespace-nowrap
          ${sizeClasses[size]}
          border transition-all duration-300
        `}
        style={{
          borderColor: config.color,
          color: config.color,
          backgroundColor: `${config.color}15`,
          boxShadow: `0 0 8px ${config.glowColor}`
        }}
      >
        <span className="flex-shrink-0">{config.icon}</span>
        {showName && (
          <span className="font-medium">
            {badgeName}
          </span>
        )}
      </span>

      {special && (
        <span
          className={`
            inline-flex items-center gap-1 rounded-full font-mono whitespace-nowrap
            ${sizeClasses[size]}
            border transition-all duration-300
          `}
          style={{
            borderColor: special.color,
            color: special.color,
            backgroundColor: `${special.color}15`
          }}
        >
          <span className="flex-shrink-0">{special.icon}</span>
          {showName && <span className="font-medium text-xs">{special.name}</span>}
        </span>
      )}
    </div>
  )
}