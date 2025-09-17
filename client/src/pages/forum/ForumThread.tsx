import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getContentThreadById } from '../../utils/contentLoader'
import { useAuth } from '../../contexts/AuthContext'
import { getCategoryName, getCategoryIcon } from '../../data/forumCategories'
import { ThreadType } from '../../types/forum.types'
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
  const [posts, setPosts] = useState<any[]>([])
  const [replyContent, setReplyContent] = useState('')
  const [showReplyForm, setShowReplyForm] = useState(false)

  // Get current user from auth context
  const { user, profile } = useAuth()

  useEffect(() => {
    // Load thread from content system
    async function loadThread() {
      if (!threadId) return

      const foundThread = await getContentThreadById(threadId)

      setThread(foundThread)
      setPosts([]) // Content threads don't have replies initially
    }

    loadThread()
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

  const handleReply = () => {
    if (!replyContent.trim() || !currentUser) return

    const newPost = {
      id: `post-${Date.now()}`,
      threadId: thread.id,
      author: currentUser,
      content: replyContent,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0
    }

    setPosts([...posts, newPost])
    setReplyContent('')
    setShowReplyForm(false)
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
              {thread.tags.map(tag => (
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
            {showReplyForm ? (
              <ReplyForm
                value={replyContent}
                onChange={setReplyContent}
                onSubmit={handleReply}
                onCancel={() => {
                  setShowReplyForm(false)
                  setReplyContent('')
                }}
                currentUser={currentUser || null}
              />
            ) : (
              <button
                onClick={() => setShowReplyForm(true)}
                className="w-full py-3 border-2 border-dashed border-gray-800 rounded-lg text-gray-500 font-mono text-sm hover:border-green-400 hover:text-green-400 transition-all duration-200"
              >
                + Add Reply
              </button>
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