import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getContentThreadById } from '../../utils/contentLoader'
import { forumService } from '../../services/forumService'
import { useAuth } from '../../contexts/AuthContext'
import { getCategoryName, getCategoryIcon } from '../../data/forumCategories'
import { ThreadType, BadgeLevel } from '../../types/forum.types'
import BadgeDisplay from '../../components/badges/BadgeDisplay'
import PostCard from '../../components/forum/PostCard'
import { ContentBadge, StatusBadge } from '../../components/badges/ContentBadge'
import type { ContentType } from '../../components/badges/ContentBadge'
import ReplyForm from '../../components/forum/ReplyForm'
import MarkdownRenderer from '../../utils/markdownRenderer'

export default function ForumThread() {
  const { threadId } = useParams<{ threadId: string }>()
  const navigate = useNavigate()
  const [thread, setThread] = useState<any>(null)
  const [firestoreDocId, setFirestoreDocId] = useState<string | null>(null) // Track actual Firestore doc ID
  const [posts, setPosts] = useState<any[]>([])
  const [replyContent, setReplyContent] = useState('')
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const hasIncrementedView = useRef(false)

  // Get current user from auth context
  const { user, profile } = useAuth()

  useEffect(() => {
    // Load thread and replies
    async function loadThread() {
      if (!threadId) return
      setIsLoading(true)

      try {
        // First try to load from Firestore
        const firestoreThread = await forumService.getThread(threadId)

        if (firestoreThread) {
          // Transform Firestore thread to match expected format
          const transformedThread = {
            ...firestoreThread,
            author: {
              id: firestoreThread.authorId || 'atlas-system',
              name: firestoreThread.authorName || '@sid',
              badge: firestoreThread.authorBadge || 'THE_ARCHITECT',
              avatar: '👤',
              subLevel: 1,
              joinedDate: new Date().toISOString()
            },
            type: (firestoreThread as any).contentType || 'RESOURCE',
            views: firestoreThread.views || 0,
            replies: firestoreThread.replyCount || 0,
            createdAt: firestoreThread.createdAt?.toDate ? firestoreThread.createdAt.toDate().toISOString() : new Date().toISOString(),
            updatedAt: firestoreThread.lastReplyAt?.toDate ? firestoreThread.lastReplyAt.toDate().toISOString() : new Date().toISOString()
          }
          setThread(transformedThread)
          setFirestoreDocId(firestoreThread.id || threadId) // Store the actual Firestore doc ID
          // Load replies for Firestore thread using the actual doc ID
          const replies = await forumService.getReplies(firestoreThread.id || threadId)
          // Transform replies to match Post structure expected by PostCard
          const transformedReplies = replies.map(reply => ({
            ...reply,
            createdAt: reply.createdAt?.toDate ? reply.createdAt.toDate().toISOString() : new Date().toISOString(),
            author: {
              id: reply.authorId,
              name: reply.authorName || 'Anonymous',
              badge: reply.authorBadge || BadgeLevel.BLUE_PILL,
              avatar: '👤',
              subLevel: 1,
              joinedDate: new Date().toISOString()
            }
          }))
          setPosts(transformedReplies)
        } else {
          // Fall back to content system
          const contentThread = await getContentThreadById(threadId)
          if (contentThread) {
            setThread(contentThread)
            setPosts([]) // Content threads don't have replies initially
          } else {
            setThread(null)
          }
        }
      } catch (error) {
        console.error('Error loading thread:', error)
        // Try content system as fallback
        const contentThread = await getContentThreadById(threadId)
        setThread(contentThread)
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    loadThread()

    // Increment view count (only once per session)
    if (threadId && !hasIncrementedView.current) {
      hasIncrementedView.current = true
      forumService.incrementViewCount(threadId)
    }

    // Set up real-time subscription for replies if it's a Firestore thread
    let unsubscribe: (() => void) | undefined

    if (firestoreDocId || threadId) {
      // Subscribe to real-time updates using the actual Firestore doc ID
      const docId = firestoreDocId || threadId
      if (docId) {
        unsubscribe = forumService.subscribeToReplies(docId, (replies) => {
        // Transform replies to match Post structure expected by PostCard
        const transformedReplies = replies.map(reply => ({
          ...reply,
          createdAt: reply.createdAt?.toDate ? reply.createdAt.toDate().toISOString() : new Date().toISOString(),
          author: {
            id: reply.authorId,
            name: reply.authorName || 'Anonymous',
            badge: reply.authorBadge || BadgeLevel.BLUE_PILL,
            avatar: '👤',
            subLevel: 1,
            joinedDate: new Date().toISOString()
          }
        }))
        setPosts(transformedReplies)
        })
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [threadId])
  
  // ESC key navigation - go back to forum
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle ESC if not focused on input/textarea
      if (event.key === 'Escape') {
        const activeElement = document.activeElement
        const isInputFocused = activeElement && (
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.hasAttribute('contenteditable')
        )
        
        if (!isInputFocused) {
          navigate('/forum')
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-green-400 font-mono animate-pulse">Loading thread...</p>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-500 font-mono">Thread not found</p>
      </div>
    )
  }

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
    
  // Using professional ContentBadge component instead of emoji badges

  const handleReply = async () => {
    if (!replyContent.trim() || !user || !threadId) {
      console.error('Missing required data for reply:', {
        hasContent: !!replyContent.trim(),
        hasUser: !!user,
        hasThreadId: !!threadId
      })
      return
    }

    try {
      // Get author name - fallback through multiple options
      const authorName = profile?.username ||
                        profile?.phone ||
                        user.phoneNumber ||
                        user.email?.split('@')[0] ||
                        'Anonymous'

      // Create reply in Firestore using actual doc ID
      await forumService.createReply(
        firestoreDocId || threadId, // Use Firestore doc ID if available
        replyContent,
        {
          uid: user.uid,
          name: authorName,
          badge: (profile?.matrixLevel as BadgeLevel) || BadgeLevel.BLUE_PILL
        }
      )

      // Real-time subscription will update the replies list
      setReplyContent('')
      setShowReplyForm(false)
    } catch (error: any) {
      console.error('Error creating reply:', error)
      // Show user-friendly error message
      const errorMessage = error?.message?.includes('Missing or insufficient permissions')
        ? 'You must be signed in to reply. Please sign in and try again.'
        : error?.message?.includes('network')
          ? 'Network error. Please check your connection and try again.'
          : error?.message?.includes('not found')
            ? 'This thread no longer exists.'
            : 'Failed to post reply. Please try again.'

      alert(errorMessage)
    } finally {
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm font-mono text-gray-500">
          <Link to="/forum" className="hover:text-green-400 transition-colors">
            Forum
          </Link>
          <span>/</span>
          <Link 
            to={`/forum?category=${thread.category}`} 
            className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1"
          >
            {getCategoryIcon(thread.category)} {getCategoryName(thread.category)}
          </Link>
          <span>/</span>
          <span className="text-gray-300 truncate">{thread.title.slice(0, 30)}...</span>
        </div>

        {/* Thread Header */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {thread.isPinned && (
                <StatusBadge type="PINNED" size="md" showLabel />
              )}
              {(thread as any).isOfficial && (
                <StatusBadge type="OFFICIAL" size="md" showLabel />
              )}
              {(thread as any).contentType && (
                <ContentBadge type={(thread as any).contentType as ContentType} size="md" showLabel />
              )}
              <span className={`${getTypeConfig(thread.type).color} text-2xl`}>
                {getTypeConfig(thread.type).icon}
              </span>
            </div>
            {thread.isLocked && (
              <span className="px-2 py-1 bg-red-900/50 border border-red-800 rounded text-xs font-mono text-red-400">
                🔒 LOCKED
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            {thread.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{thread.author.avatar || '👤'}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{thread.author.name}</span>
                  <BadgeDisplay 
                    level={thread.author.badge} 
                    subLevel={thread.author.subLevel}
                    specialRole={thread.author.specialRole}
                    size="sm" 
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(thread.createdAt).toLocaleDateString()} at {new Date(thread.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          <MarkdownRenderer 
            content={thread.content}
            isContentThread={!!(thread as any).contentType}
          />

          {thread.tags && thread.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {thread.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-800 text-sm text-gray-500 font-mono">
            <span>👁 {thread.views} views</span>
            <span>💬 {thread.replies} replies</span>
            {thread.aiParticipated && (
              <span className="text-purple-400">🤖 AI Participated</span>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4 mb-6">
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onVote={(postId, voteType) => {
                  // Handle voting logic here
                  console.log('Vote:', postId, voteType)
                }}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 font-mono">No replies yet. Be the first to respond!</p>
            </div>
          )}
        </div>

        {/* Reply Section */}
        {!thread.isLocked && (
          <div className="mt-8">
            {user ? (
              showReplyForm ? (
                <ReplyForm
                  value={replyContent}
                  onChange={setReplyContent}
                  onSubmit={handleReply}
                  onCancel={() => {
                    setShowReplyForm(false)
                    setReplyContent('')
                  }}
                  currentUser={{
                    id: user.uid,
                    name: profile?.username || user.phoneNumber || 'Anonymous',
                    badge: (profile?.matrixLevel as BadgeLevel) || BadgeLevel.BLUE_PILL,
                    avatar: '👤',
                    joinedDate: new Date().toISOString()
                  }}
                />
              ) : (
                <button
                  onClick={() => setShowReplyForm(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-800 rounded-lg text-gray-500 font-mono text-sm hover:border-green-400 hover:text-green-400 transition-all duration-200"
                >
                  + Add Reply
                </button>
              )
            ) : (
              <Link
                to="/network"
                className="block w-full py-3 border-2 border-dashed border-gray-800 rounded-lg text-center text-gray-500 font-mono text-sm hover:border-green-400 hover:text-green-400 transition-all duration-200"
              >
                🔒 Sign in to reply
              </Link>
            )}
          </div>
        )}

        {thread.isLocked && (
          <div className="mt-8 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-red-400 font-mono text-sm text-center">
              🔒 This thread is locked. No new replies allowed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}