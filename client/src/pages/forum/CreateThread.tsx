import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { forumCategories, canAccessCategory as checkCategoryAccess } from '../../data/forumCategories'
import { forumService } from '../../services/forumService'
import { useAuth } from '../../contexts/AuthContext'
import { ForumCategory, ThreadType, BadgeLevel } from '../../types/forum.types'
import BadgeDisplay from '../../components/badges/BadgeDisplay'
import { MATRIX_BADGES } from '../../utils/badges'
import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  HandRaisedIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

export default function CreateThread() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<ForumCategory>(ForumCategory.THE_CONSTRUCT)
  const [type, setType] = useState<ThreadType>(ThreadType.QUESTION)
  const [tags, setTags] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Create currentUser from auth context
  const currentUser = user && profile ? {
    id: user.uid,
    name: profile.username || user.phoneNumber || 'Anonymous',
    badge: (profile.matrixLevel as unknown as BadgeLevel) || BadgeLevel.BLUE_PILL,
    subLevel: profile.isWhatsappMember ? 2 : 1,
    avatar: MATRIX_BADGES[profile.matrixLevel || BadgeLevel.BLUE_PILL].emoji,
    isPaidMember: profile.isPaidMember || false,
    specialRole: undefined
  } : null

  const threadTypes = [
    { value: ThreadType.QUESTION, label: 'Question', icon: QuestionMarkCircleIcon, description: 'Seeking answers' },
    { value: ThreadType.VICTORY, label: 'Victory', icon: SparklesIcon, description: 'Share your wins' },
    { value: ThreadType.WARNING, label: 'Warning', icon: ExclamationTriangleIcon, description: 'Alert the community' },
    { value: ThreadType.RESOURCE, label: 'Resource', icon: ChartBarIcon, description: 'Share tools/templates' },
    { value: ThreadType.INTRODUCTION, label: 'Introduction', icon: HandRaisedIcon, description: 'Introduce yourself' },
  ]

  // Only Architect can post prophecies
  if (profile?.matrixLevel === BadgeLevel.THE_ARCHITECT) {
    threadTypes.push({
      value: ThreadType.PROPHECY,
      label: 'Prophecy',
      icon: BeakerIcon,
      description: 'Predict the future'
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !user || !profile) return

    setIsSubmitting(true)
    try {
      // Create thread in Firestore
      const threadId = await forumService.createThread(
        title,
        content,
        category,
        {
          uid: user.uid,
          name: profile.username || user.phoneNumber || 'Anonymous',
          badge: (profile.matrixLevel as unknown as BadgeLevel) || BadgeLevel.BLUE_PILL
        },
        type // Pass the selected thread type
      )

      // Navigate to the new thread
      navigate(`/forum/thread/${threadId}`)
    } catch (error) {
      console.error('Error creating thread:', error)
      // Show user-friendly error message
      const errorMessage = error instanceof Error
        ? error.message.includes('Missing or insufficient permissions')
          ? 'You must be signed in to create a thread. Please sign in and try again.'
          : error.message.includes('network')
            ? 'Network error. Please check your connection and try again.'
            : `Failed to create thread: ${error.message}`
        : 'An unexpected error occurred. Please try again.'

      alert(errorMessage)
      setIsSubmitting(false)
    }
  }

  const canAccessCategory = (cat: ForumCategory) => {
    if (!currentUser) return true
    return checkCategoryAccess(cat, currentUser.badge, currentUser.isPaidMember || false)
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground-tertiary font-mono mb-4">Please sign in to create a thread</p>
          <Link to="/forum" className="text-accent hover:underline font-mono text-sm">
            ← Back to Forum
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/forum" className="inline-flex items-center text-foreground-tertiary hover:text-accent font-mono text-sm mb-4 transition-colors">
            ← Back to Forum
          </Link>
          <h1 className="text-3xl font-bold terminal-text matrix-glow">
            CREATE NEW THREAD
          </h1>
          <p className="mt-2 text-foreground-tertiary font-mono text-sm">
            Share your wisdom with the community
          </p>
        </div>

        {/* User Info */}
        <div className="mb-6 p-4 bg-background-secondary/50 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            {currentUser.avatar ? (
              <div className="text-2xl">{currentUser.avatar}</div>
            ) : (
              <UserCircleIcon className="w-8 h-8 text-foreground-tertiary" />
            )}
            <div>
              <p className="text-sm text-foreground-tertiary font-mono">Posting as</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{currentUser.name}</span>
                <BadgeDisplay 
                  level={currentUser.badge} 
                  subLevel={currentUser.subLevel}
                  specialRole={currentUser.specialRole}
                  size="sm" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thread Type */}
          <div>
            <label className="block text-sm font-mono text-foreground-tertiary mb-2">
              Thread Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {threadTypes.map(threadType => (
                <button
                  key={threadType.value}
                  type="button"
                  onClick={() => setType(threadType.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    type === threadType.value
                      ? 'border-accent bg-green-400/10'
                      : 'border-border hover:border-border'
                  }`}
                >
                  <div className="mb-1">
                    {(() => {
                      const Icon = threadType.icon;
                      return <Icon className="w-8 h-8 mx-auto" />;
                    })()}
                  </div>
                  <div className="font-mono text-sm text-foreground">{threadType.label}</div>
                  <div className="text-xs text-foreground-tertiary mt-1">{threadType.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-mono text-foreground-tertiary mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ForumCategory)}
              className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
            >
              {forumCategories.map(cat => {
                const locked = !canAccessCategory(cat.id)
                return (
                  <option 
                    key={cat.id} 
                    value={cat.id}
                    disabled={locked}
                  >
                    {cat.icon} {cat.name} {locked ? '(Locked - Requires ' + cat.requiredBadge + ')' : ''}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-mono text-foreground-tertiary mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question or topic?"
              className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
              maxLength={200}
            />
            <p className="mt-1 text-xs text-foreground-tertiary font-mono">
              {title.length}/200 characters
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-mono text-foreground-tertiary mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, experiences, or questions... (Markdown supported)"
              className="w-full h-64 px-4 py-3 bg-background-secondary border border-border rounded-lg text-foreground font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-accent transition-colors resize-none"
            />
            <p className="mt-1 text-xs text-foreground-tertiary font-mono">
              Markdown formatting supported. Be detailed and specific.
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-mono text-foreground-tertiary mb-2">
              Tags (optional)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="h1b, visa, startup, eb1a (comma separated)"
              className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-6">
            <Link
              to="/forum"
              className="px-6 py-2 text-foreground-tertiary font-mono text-sm hover:text-foreground transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim() || isSubmitting}
              className={`px-6 py-2 rounded font-mono text-sm transition-all duration-200 ${
                title.trim() && content.trim() && !isSubmitting
                  ? 'bg-green-400 text-foreground hover:bg-accent'
                  : 'bg-background-secondary text-foreground-tertiary cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Thread'}
            </button>
          </div>
        </form>

        {/* Guidelines */}
        <div className="mt-12 p-4 bg-background-secondary/50 border border-border rounded-lg">
          <h3 className="text-sm font-mono text-foreground-tertiary mb-3">Community Guidelines</h3>
          <ul className="space-y-2 text-xs text-foreground-tertiary font-mono">
            <li>• Be constructive and help others on their journey</li>
            <li>• Share real experiences and verified information</li>
            <li>• No legal advice - share experiences only</li>
            <li>• Tag appropriately to help others find your content</li>
            <li>• Respect all badge levels - we all started as Blue Pills</li>
          </ul>
        </div>
      </div>
    </div>
  )
}