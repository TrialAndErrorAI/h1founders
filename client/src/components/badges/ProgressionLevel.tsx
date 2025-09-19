import { BadgeLevel } from '../../types/forum.types'
import { badgeConfigs } from '../../data/badgeConfig'
import BadgeDisplay from './BadgeDisplay'

interface ProgressionLevelProps {
  currentLevel: BadgeLevel
  currentSubLevel?: number
  showProgress?: boolean
  className?: string
}

export default function ProgressionLevel({
  currentLevel,
  currentSubLevel,
  showProgress = false,
  className = ''
}: ProgressionLevelProps) {
  const currentIndex = badgeConfigs.findIndex(b => b.level === currentLevel)
  const currentConfig = badgeConfigs[currentIndex]
  const nextConfig = currentIndex < badgeConfigs.length - 1 ? badgeConfigs[currentIndex + 1] : null

  const progressPercentage = currentConfig?.subLevels && currentSubLevel
    ? (currentSubLevel / currentConfig.subLevels) * 100
    : 0

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <BadgeDisplay level={currentLevel} subLevel={currentSubLevel} size="md" />
          <p className="text-xs text-foreground-tertiary font-mono leading-relaxed">
            {currentConfig?.description}
          </p>
        </div>
      </div>

      {showProgress && currentConfig?.subLevels && currentSubLevel && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-foreground-tertiary font-mono">
            <span>Progress</span>
            <span>{currentSubLevel}/{currentConfig.subLevels}</span>
          </div>
          <div className="h-2 bg-background-secondary rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: currentConfig.color,
                boxShadow: `0 0 10px ${currentConfig.glowColor}`
              }}
            />
          </div>
        </div>
      )}

      {showProgress && nextConfig && (
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-tertiary font-mono">Next Level:</span>
            <BadgeDisplay level={nextConfig.level} size="sm" showName={true} />
          </div>
          {nextConfig.requirements && nextConfig.requirements[0] && (
            <p className="mt-2 text-xs text-foreground-tertiary italic">
              Requirement: {nextConfig.requirements[0]}
            </p>
          )}
        </div>
      )}

      {currentConfig?.requirements && currentConfig.requirements.length > 0 && (
        <div className="space-y-1 pt-3 border-t border-border">
          <p className="text-xs text-foreground-tertiary font-mono mb-2">Level Requirements:</p>
          {currentConfig.requirements.map((req, idx) => (
            <div 
              key={idx} 
              className={`text-xs font-mono flex items-start gap-2 ${
                currentSubLevel && idx < currentSubLevel ? 'text-accent' : 'text-foreground-tertiary'
              }`}
            >
              <span>{currentSubLevel && idx < currentSubLevel ? '✓' : '○'}</span>
              <span>{req}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}