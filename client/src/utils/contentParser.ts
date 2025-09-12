/**
 * Content Parser for Markdown Files with Frontmatter
 * Reads markdown content from /content directory and converts to forum posts
 */

export interface ContentFrontmatter {
  id: string
  title: string
  author: string
  category: string
  subcategory?: string
  contentType: 'STORY' | 'EVENT' | 'GUIDE' | 'TOOL' | 'WISDOM' | 'SUBSTACK' | 'ANNOUNCEMENT'
  isPinned?: boolean
  isOfficial?: boolean
  featured?: boolean
  badges?: string[]  // Required badge levels to view
  tags?: string[]
  createdAt: string
  updatedAt?: string
  views?: number
  sourceUrl?: string  // For imported content
  eventDate?: string  // For events
  toolEmbed?: string  // For embedded tools
}

export interface ParsedContent {
  frontmatter: ContentFrontmatter
  content: string
  excerpt?: string
}

/**
 * Parse markdown file with frontmatter
 * Format expected:
 * ---
 * key: value
 * ---
 * # Markdown content
 */
export function parseMarkdownWithFrontmatter(rawContent: string): ParsedContent {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = rawContent.match(frontmatterRegex)
  
  if (!match) {
    throw new Error('Invalid markdown format: missing frontmatter')
  }
  
  const [, frontmatterStr, content] = match
  
  // Parse YAML-like frontmatter (simple implementation)
  const frontmatter: any = {}
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      // Handle arrays [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim()] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim())
      } 
      // Handle booleans
      else if (value === 'true' || value === 'false') {
        frontmatter[key.trim()] = value === 'true'
      }
      // Handle numbers
      else if (!isNaN(Number(value))) {
        frontmatter[key.trim()] = Number(value)
      }
      // Handle strings (remove quotes if present)
      else {
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '')
      }
    }
  })
  
  // Generate excerpt (first paragraph or 200 chars)
  const firstParagraph = content.split('\n\n')[0]
  const excerpt = firstParagraph.length > 200 
    ? firstParagraph.substring(0, 200) + '...'
    : firstParagraph
  
  return {
    frontmatter: frontmatter as ContentFrontmatter,
    content: content.trim(),
    excerpt: excerpt.replace(/[#*_]/g, '') // Remove markdown formatting
  }
}

/**
 * Convert parsed content to forum thread format
 */
export function contentToThread(parsed: ParsedContent): any {
  const { frontmatter, content } = parsed
  
  return {
    id: frontmatter.id,
    title: frontmatter.title,
    category: frontmatter.category,
    type: mapContentTypeToThreadType(frontmatter.contentType),
    author: {
      id: frontmatter.author,
      username: frontmatter.author,
      badge: frontmatter.isOfficial ? 'THE_ARCHITECT' : 'FREED_MIND',
      isVerified: frontmatter.isOfficial
    },
    content: content,
    createdAt: frontmatter.createdAt,
    updatedAt: frontmatter.updatedAt || frontmatter.createdAt,
    views: frontmatter.views || 0,
    replies: 0,
    isPinned: frontmatter.isPinned || false,
    isLocked: false,
    tags: frontmatter.tags || [],
    // Extended fields for content
    contentType: frontmatter.contentType,
    isOfficial: frontmatter.isOfficial || false,
    sourceUrl: frontmatter.sourceUrl,
    eventDate: frontmatter.eventDate,
    toolEmbed: frontmatter.toolEmbed,
    featured: frontmatter.featured || false
  }
}

/**
 * Map content types to existing thread types
 */
function mapContentTypeToThreadType(contentType: string): string {
  const mapping: Record<string, string> = {
    'STORY': 'VICTORY',
    'EVENT': 'PROPHECY',
    'GUIDE': 'RESOURCE',
    'TOOL': 'RESOURCE',
    'WISDOM': 'WARNING',
    'SUBSTACK': 'RESOURCE',
    'ANNOUNCEMENT': 'PROPHECY'
  }
  return mapping[contentType] || 'RESOURCE'
}

/**
 * Load all content from a directory
 * In production, this would fetch from a server endpoint
 * For now, we'll have a static import system
 */
export async function loadContentFromDirectory(category: string): Promise<ParsedContent[]> {
  // This will be replaced with actual file loading
  // For now, return empty array
  // In practice, you'd have a build script that generates an index
  return []
}

/**
 * Get content badge emoji
 */
export function getContentTypeBadge(contentType: string): string {
  const badges: Record<string, string> = {
    'STORY': '📖',
    'EVENT': '📅',
    'GUIDE': '📚',
    'TOOL': '🛠️',
    'WISDOM': '💡',
    'SUBSTACK': '📝',
    'ANNOUNCEMENT': '📢'
  }
  return badges[contentType] || '📄'
}

/**
 * Sort threads with content rules:
 * 1. Pinned first
 * 2. Featured second
 * 3. Official third
 * 4. Recent activity
 */
export function sortContentThreads(threads: any[]): any[] {
  return threads.sort((a, b) => {
    // Pinned always first
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    // Featured second
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    
    // Official third
    if (a.isOfficial && !b.isOfficial) return -1
    if (!a.isOfficial && b.isOfficial) return 1
    
    // Then by date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}