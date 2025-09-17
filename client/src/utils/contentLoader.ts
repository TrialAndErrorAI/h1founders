/**
 * Content Loader for Bundled Content
 * Loads content from build-time generated index
 */

import type { Thread, ForumCategory } from '../types/forum.types'
import { canAccessCategory } from '../data/forumCategories'

// This will be generated at build time
let contentIndex: any = null

// Lazy load content index
async function loadContentIndex() {
  if (contentIndex) return contentIndex

  try {
    // Dynamic import of the generated content index
    const module = await import('../data/contentIndex.json')
    contentIndex = module.default || module
    console.log('✅ Content index loaded:', contentIndex?.totalFiles, 'files')
    return contentIndex
  } catch (error) {
    console.warn('Content index not found, using empty content')
    return { threads: [], categories: {}, totalFiles: 0 }
  }
}

/**
 * Get all content threads
 */
export async function getAllContentThreads(): Promise<Thread[]> {
  const index = await loadContentIndex()
  if (!index.threads || !Array.isArray(index.threads)) {
    console.warn('❌ No threads found in content index')
    return []
  }

  // Categories in content already match ForumCategory enum values
  console.log(`📚 Loaded ${index.threads.length} content threads with categories:`)
  index.threads.forEach((t: any) => console.log(`  - ${t.title} (${t.category})`))

  return index.threads
}

/**
 * Get content threads by category
 */
export async function getContentThreadsByCategory(category: ForumCategory): Promise<Thread[]> {
  const allThreads = await getAllContentThreads()
  return allThreads.filter((thread: Thread) => thread.category === category)
}

/**
 * Get pinned content threads
 */
export async function getPinnedContentThreads(): Promise<Thread[]> {
  const index = await loadContentIndex()
  return (index.threads || []).filter((thread: Thread) => thread.isPinned)
}

/**
 * Get featured content threads
 */
export async function getFeaturedContentThreads(): Promise<Thread[]> {
  const index = await loadContentIndex()
  return (index.threads || []).filter((thread: Thread) => thread.featured)
}

/**
 * Get content thread by ID
 */
export async function getContentThreadById(id: string): Promise<Thread | undefined> {
  const index = await loadContentIndex()
  return (index.threads || []).find((thread: Thread) => thread.id === id) || undefined
}

/**
 * Search content threads
 */
export async function searchContentThreads(query: string): Promise<Thread[]> {
  const index = await loadContentIndex()
  const searchTerm = query.toLowerCase()
  
  return (index.threads || []).filter((thread: Thread) => 
    thread.title.toLowerCase().includes(searchTerm) ||
    thread.content.toLowerCase().includes(searchTerm) ||
    thread.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

/**
 * Get content statistics
 */
export async function getContentStats() {
  const index = await loadContentIndex()
  return {
    totalThreads: index.totalFiles || 0,
    categories: index.categories || {},
    lastGenerated: index.generated
  }
}

/**
 * Merge content threads with forum threads
 * This combines static content with dynamic user-generated threads
 */
export async function mergeWithForumThreads(forumThreads: Thread[]): Promise<Thread[]> {
  const contentThreads = await getAllContentThreads()
  
  // Combine arrays and sort by priority
  const allThreads = [...contentThreads, ...forumThreads]
  
  // Sort: Pinned → Featured → Official → Recent
  return allThreads.sort((a, b) => {
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

/**
 * Filter content by badge requirements AND category access control
 */
export function filterContentByBadge(threads: Thread[], userBadge: string, isPaidMember?: boolean): Thread[] {
  const badgeHierarchy = [
    'BLUE_PILL', 'UNPLUGGED', 'FREED_MIND', 'NEO', 'MORPHEUS', 'THE_ORACLE', 'THE_ARCHITECT'
  ]

  const userLevel = badgeHierarchy.indexOf(userBadge)

  return threads.filter(thread => {
    // First check category-level access
    if (!canAccessCategory(thread.category, userBadge, isPaidMember || false)) {
      return false
    }

    // Then check thread-level badge requirements
    if (!thread.badges || thread.badges.length === 0) return true

    // Check if user has required badge level
    return thread.badges.some((requiredBadge: string) => {
      const requiredLevel = badgeHierarchy.indexOf(requiredBadge)
      return userLevel >= requiredLevel
    })
  })
}