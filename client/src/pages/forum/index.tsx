import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { forumCategories, canAccessCategory } from '../../data/forumCategories'
import { mockThreads } from '../../data/mockThreads'
import { mergeWithForumThreads, filterContentByBadge } from '../../utils/contentLoader'
import { ForumCategory, ThreadType, BadgeLevel } from '../../types/forum.types'
import BadgeDisplay from '../../components/badges/BadgeDisplay'
import ProgressionLevel from '../../components/badges/ProgressionLevel'
import { ContentBadge, StatusBadge } from '../../components/badges/ContentBadge'
import type { ContentType } from '../../components/badges/ContentBadge'
import { MATRIX_BADGES } from '../../utils/badges'

export default function Forum() {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | null>(
    (searchParams.get('category') as ForumCategory) || null
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [allThreads, setAllThreads] = useState(mockThreads)
  const [loading, setLoading] = useState(true)
  const { user, profile, logout } = useAuth()
  
  // Load content threads on mount
  useEffect(() => {
    async function loadContent() {
      try {
        const mergedThreads = await mergeWithForumThreads(mockThreads)
        // Filter by user badge level - anonymous users get BLUE_PILL access
        const filteredByBadge = profile
          ? filterContentByBadge(mergedThreads, profile.matrixLevel, profile.isPaidMember)
          : filterContentByBadge(mergedThreads, BadgeLevel.BLUE_PILL, false)
        setAllThreads(filteredByBadge)
      } catch (error) {
        console.warn('Failed to load content, using mock data:', error)
        setAllThreads(mockThreads)
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [profile])
  
  // Update selected category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category') as ForumCategory
    setSelectedCategory(categoryParam || null)
  }, [searchParams])
  
  // Use real auth or fall back to mock for display purposes
  const currentUser = profile && profile.matrixLevel ? {
    id: profile.uid,
    name: profile.username || '@anonymous_founder',
    badge: profile.matrixLevel as BadgeLevel, // Direct mapping since enum values match
    subLevel: profile.isWhatsappMember ? 2 : 1, // WhatsApp OGs start at L2
    avatar: MATRIX_BADGES[profile.matrixLevel].emoji,
    isPaidMember: profile.isPaidMember || false
  } : null
  
  const filteredThreads = allThreads.filter(thread => {
    const matchesCategory = !selectedCategory || thread.category === selectedCategory
    const matchesSearch = !searchQuery || 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const threadTypeConfig = {
    [ThreadType.QUESTION]: { icon: '❓', color: 'text-blue-400' },
    [ThreadType.VICTORY]: { icon: '🎉', color: 'text-green-400' },
    [ThreadType.WARNING]: { icon: '🚨', color: 'text-red-400' },
    [ThreadType.RESOURCE]: { icon: '📊', color: 'text-purple-400' },
    [ThreadType.INTRODUCTION]: { icon: '👋', color: 'text-yellow-400' },
    [ThreadType.PROPHECY]: { icon: '🔮', color: 'text-pink-400' }
  }

  const getTypeConfig = (type: ThreadType) => 
    threadTypeConfig[type] || { icon: '📝', color: 'text-gray-400' }
  
  // Using professional ContentBadge component instead of emojis

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold terminal-text matrix-glow">
                THE MATRIX FORUM
              </h1>
              <p className="mt-2 text-gray-400 font-mono text-sm">
                Where minds are freed and empires are built
              </p>
            </div>
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/forum/create"
                  className="inline-flex items-center px-4 py-2 border-2 border-green-400 text-green-400 rounded font-mono text-sm hover:bg-green-400 hover:text-black transition-all duration-200"
                >
                  <span className="mr-2">+</span>
                  NEW THREAD
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-900/20 border border-red-500 text-red-400 rounded font-mono text-sm hover:bg-red-900/30 transition-colors"
                >
                  DISCONNECT()
                </button>
              </div>
            ) : (
              <Link
                to="/network"
                className="red-pill-button px-6 py-3 rounded-lg font-mono text-sm"
              >
                JOIN_TO_POST()
              </Link>
            )}
          </div>

          {/* Auth CTA Banner for Anonymous Users */}
          {!user && (
            <div className="mt-6 bg-gradient-to-r from-red-900/30 to-green-900/30 border border-green-400/40 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-mono text-green-400 mb-2">
                    VIEWING_AS_ANONYMOUS()
                  </h3>
                  <p className="text-gray-300 font-mono text-sm">
                    // Join 781 verified founders to participate in discussions
                  </p>
                  <p className="text-gray-400 font-mono text-xs mt-1">
                    Browsing enabled - profiles shown as preview of your experience
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    to="/network"
                    className="red-pill-button px-6 py-3 rounded-lg font-mono"
                  >
                    TAKE_RED_PILL()
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* User Progress Card */}
          {currentUser && (
            <div className="mt-6 p-4 sm:p-5 border border-gray-800 rounded-lg bg-gray-900/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-3xl flex-shrink-0">{currentUser.avatar || '👤'}</div>
                  <div>
                    <p className="font-mono text-xs sm:text-sm text-gray-400">Welcome back,</p>
                    <p className="font-bold text-white text-sm sm:text-base">{currentUser.name}</p>
                  </div>
                </div>
                <ProgressionLevel
                  currentLevel={currentUser.badge}
                  currentSubLevel={currentUser.subLevel}
                  showProgress={true}
                  className="w-full lg:max-w-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search threads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-green-400 transition-colors"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-200 ${
                !selectedCategory
                  ? 'bg-green-400 text-black shadow-md shadow-green-400/30'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-green-400'
              }`}
            >
              ALL CATEGORIES
            </button>
            {forumCategories.map(category => {
              const hasAccess = currentUser ? canAccessCategory(category.id, currentUser.badge, currentUser.isPaidMember || false) : canAccessCategory(category.id, BadgeLevel.BLUE_PILL, false)
              const isLocked = !hasAccess
              
              return (
                <button
                  key={category.id}
                  onClick={() => !isLocked && setSelectedCategory(category.id)}
                  disabled={isLocked}
                  className={`px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-green-400 text-black shadow-md shadow-green-400/30'
                      : isLocked
                      ? 'bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed opacity-50'
                      : category.isPremium
                      ? 'bg-gray-900 text-gray-400 border border-yellow-600/50 hover:border-yellow-400 hover:shadow-md hover:shadow-yellow-400/20'
                      : category.hybridAccess
                      ? 'bg-gray-900 text-gray-400 border border-purple-600/50 hover:border-purple-400 hover:shadow-md hover:shadow-purple-400/20'
                      : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-green-400'
                  }`}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  <span>{category.name}</span>
                  {category.isPremium && <span className="ml-1 text-yellow-400">💎</span>}
                  {category.hybridAccess && <span className="ml-1 text-purple-400">⚡</span>}
                  {isLocked && <span className="ml-1">🔒</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Thread List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-mono">Loading content...</p>
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-mono">No threads found</p>
            </div>
          ) : (
            filteredThreads.map(thread => (
              <Link
                key={thread.id}
                to={`/forum/thread/${thread.id}`}
                className="block p-5 bg-gray-900/30 border border-gray-800 rounded-lg hover:border-green-400 hover:bg-gray-900/50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                        {thread.isPinned && (
                          <StatusBadge type="PINNED" size="sm" />
                        )}
                        {(thread as any).isOfficial && (
                          <StatusBadge type="OFFICIAL" size="sm" />
                        )}
                        {(thread as any).contentType && (
                          <ContentBadge type={(thread as any).contentType as ContentType} size="sm" />
                        )}
                        <span className={`${getTypeConfig(thread.type).color} text-lg`} title={thread.type}>
                          {getTypeConfig(thread.type).icon}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors text-base leading-tight">
                        {thread.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {thread.content}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-mono">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-600">by</span>
                        <BadgeDisplay 
                          level={thread.author.badge} 
                          subLevel={thread.author.subLevel}
                          specialRole={thread.author.specialRole}
                          size="sm" 
                          showName={true}
                        />
                        <span className="text-gray-300 font-medium">{thread.author.name}</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <span className="opacity-70">👁</span> {thread.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="opacity-70">💬</span> {thread.replies}
                      </span>
                      {thread.aiParticipated && (
                        <span className="text-purple-400 flex items-center gap-1">
                          <span>🤖</span> AI Participated
                        </span>
                      )}
                      {thread.lastReply && (
                        <span className="text-gray-600">
                          Last: {new Date(thread.lastReply.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {thread.tags && thread.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {thread.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full text-xs font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Forum Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-400">{allThreads.length}</p>
            <p className="text-xs text-gray-500 font-mono mt-1">Active Threads</p>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-400">156</p>
            <p className="text-xs text-gray-500 font-mono mt-1">Daily Posts</p>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-400">781</p>
            <p className="text-xs text-gray-500 font-mono mt-1">Active Members</p>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <p className="text-2xl font-bold text-yellow-400">42</p>
            <p className="text-xs text-gray-500 font-mono mt-1">Morpheus Teachers</p>
          </div>
        </div>
      </div>
    </div>
  )
}