import {
  DocumentTextIcon,
  CalendarIcon,
  LightBulbIcon,
  SpeakerWaveIcon,
  MegaphoneIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  BookmarkIcon,
  StarIcon,
  ScaleIcon
} from '@heroicons/react/20/solid'

export type ContentType = 'STORY' | 'EVENT' | 'GUIDE' | 'TOOL' | 'WISDOM' | 'SUBSTACK' | 'ANNOUNCEMENT'
export type StatusType = 'OFFICIAL' | 'PINNED' | 'FEATURED' | 'LEGAL'

// Content type normalization function
function normalizeContentType(type: string): ContentType {
  const typeUpper = type.toUpperCase()
  
  // Handle legacy content types
  const typeMapping: Record<string, ContentType> = {
    'KNOWLEDGE': 'WISDOM',
    'RESOURCE': 'GUIDE',
    'PROPHECY': 'ANNOUNCEMENT'
  }
  
  // Return mapped type or original if it exists in config
  return (typeMapping[typeUpper] as ContentType) || (typeUpper as ContentType)
}

interface ContentBadgeProps {
  type: ContentType | string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

interface StatusBadgeProps {
  type: StatusType
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const contentTypeConfig = {
  STORY: {
    icon: DocumentTextIcon,
    label: 'Story',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30'
  },
  EVENT: {
    icon: CalendarIcon,
    label: 'Event',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30'
  },
  GUIDE: {
    icon: DocumentTextIcon,
    label: 'Guide',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/30'
  },
  TOOL: {
    icon: WrenchScrewdriverIcon,
    label: 'Tool',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30'
  },
  WISDOM: {
    icon: LightBulbIcon,
    label: 'Wisdom',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30'
  },
  SUBSTACK: {
    icon: SpeakerWaveIcon,
    label: 'Article',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'border-indigo-400/30'
  },
  ANNOUNCEMENT: {
    icon: MegaphoneIcon,
    label: 'News',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/30'
  }
}

const statusTypeConfig = {
  OFFICIAL: {
    icon: CheckBadgeIcon,
    label: 'Official',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/30'
  },
  PINNED: {
    icon: BookmarkIcon,
    label: 'Pinned',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30'
  },
  FEATURED: {
    icon: StarIcon,
    label: 'Featured',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/30'
  },
  LEGAL: {
    icon: ScaleIcon,
    label: 'Legal',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30'
  }
}

const sizeClasses = {
  sm: {
    container: 'px-2 py-1 text-xs',
    icon: 'h-3 w-3',
    gap: 'gap-1'
  },
  md: {
    container: 'px-2.5 py-1.5 text-sm',
    icon: 'h-4 w-4',
    gap: 'gap-1.5'
  },
  lg: {
    container: 'px-3 py-2 text-base',
    icon: 'h-5 w-5',
    gap: 'gap-2'
  }
}

export function ContentBadge({ 
  type, 
  size = 'sm', 
  showLabel = false, 
  className = '' 
}: ContentBadgeProps) {
  // Normalize content type (handle lowercase and legacy types)
  const normalizedType = normalizeContentType(type)
  const config = contentTypeConfig[normalizedType]
  const sizes = sizeClasses[size]
  
  // Handle unknown content types gracefully
  if (!config) {
    console.warn(`Unknown content type: ${type} (normalized: ${normalizedType})`)
    return null
  }
  
  const IconComponent = config.icon
  
  return (
    <div
      className={`
        inline-flex items-center rounded-full border font-mono font-medium
        ${sizes.container} ${sizes.gap}
        ${config.color} ${config.bgColor} ${config.borderColor}
        ${className}
      `}
      title={config.label}
    >
      <IconComponent className={sizes.icon} />
      {showLabel && <span>{config.label}</span>}
    </div>
  )
}

export function StatusBadge({ 
  type, 
  size = 'sm', 
  showLabel = false, 
  className = '' 
}: StatusBadgeProps) {
  const config = statusTypeConfig[type]
  const sizes = sizeClasses[size]
  
  // Handle unknown status types gracefully
  if (!config) {
    console.warn(`Unknown status type: ${type}`)
    return null
  }
  
  const IconComponent = config.icon
  
  return (
    <div
      className={`
        inline-flex items-center rounded-full border font-mono font-medium
        ${sizes.container} ${sizes.gap}
        ${config.color} ${config.bgColor} ${config.borderColor}
        ${className}
      `}
      title={config.label}
    >
      <IconComponent className={sizes.icon} />
      {showLabel && <span>{config.label}</span>}
    </div>
  )
}

export default ContentBadge