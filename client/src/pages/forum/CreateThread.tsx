import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { forumCategories, canAccessCategory as checkCategoryAccess } from '../../data/forumCategories'
import { useAuth } from '../../contexts/AuthContext'
import { ForumCategory, ThreadType, BadgeLevel } from '../../types/forum.types'
import BadgeDisplay from '../../components/badges/BadgeDisplay'

export default function CreateThread() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<ForumCategory>(ForumCategory.THE_CONSTRUCT)
  const [type, setType] = useState<ThreadType>(ThreadType.QUESTION)
  const [tags, setTags] = useState('')

  const threadTypes = [
    { value: ThreadType.QUESTION, label: 'Question', icon: '❓', description: 'Seeking answers' },
    { value: ThreadType.VICTORY, label: 'Victory', icon: '🎉', description: 'Share your wins' },
    { value: ThreadType.WARNING, label: 'Warning', icon: '🚨', description: 'Alert the community' },
    { value: ThreadType.RESOURCE, label: 'Resource', icon: '📊', description: 'Share tools/templates' },
    { value: ThreadType.INTRODUCTION, label: 'Introduction', icon: '👋', description: 'Introduce yourself' },
  ]

  // Only Architect can post prophecies
  if (profile?.matrixLevel === BadgeLevel.THE_ARCHITECT) {
    threadTypes.push({ 
      value: ThreadType.PROPHECY, 
      label: 'Prophecy', 
      icon: '🔮', 
      description: 'Predict the future' 
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    // In real app, this would create the thread via API
    console.log('Creating thread:', {
      title,
      content,
      category,
      type,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    })

    // Navigate to the new thread (mock navigation)
    navigate('/forum')
  }

  const canAccessCategory = (cat: ForumCategory) => {
    if (!currentUser) return true
    return checkCategoryAccess(cat, currentUser.badge, currentUser.isPaidMember || false)
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-mono mb-4">Please sign in to create a thread</p>
          <Link to="/forum" className="text-green-400 hover:underline font-mono text-sm">
            ← Back to Forum
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/forum" className="inline-flex items-center text-gray-400 hover:text-green-400 font-mono text-sm mb-4 transition-colors">
            ← Back to Forum
          </Link>
          <h1 className="text-3xl font-bold terminal-text matrix-glow">
            CREATE NEW THREAD
          </h1>
          <p className="mt-2 text-gray-400 font-mono text-sm">
            Share your wisdom with the community
          </p>
        </div>

        {/* User Info */}
        <div className="mb-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{currentUser.avatar || '👤'}</div>
            <div>
              <p className="text-sm text-gray-400 font-mono">Posting as</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{currentUser.name}</span>
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
            <label className="block text-sm font-mono text-gray-400 mb-2">
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
                      ? 'border-green-400 bg-green-400/10'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{threadType.icon}</div>
                  <div className="font-mono text-sm text-white">{threadType.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{threadType.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ForumCategory)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-green-400 transition-colors"
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
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question or topic?"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-green-400 transition-colors"
              maxLength={200}
            />
            <p className="mt-1 text-xs text-gray-500 font-mono">
              {title.length}/200 characters
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, experiences, or questions... (Markdown supported)"
              className="w-full h-64 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-green-400 transition-colors resize-none"
            />
            <p className="mt-1 text-xs text-gray-500 font-mono">
              Markdown formatting supported. Be detailed and specific.
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Tags (optional)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="h1b, visa, startup, eb1a (comma separated)"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-green-400 transition-colors"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-6">
            <Link
              to="/forum"
              className="px-6 py-2 text-gray-400 font-mono text-sm hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className={`px-6 py-2 rounded font-mono text-sm transition-all duration-200 ${
                title.trim() && content.trim()
                  ? 'bg-green-400 text-black hover:bg-green-500'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              Create Thread
            </button>
          </div>
        </form>

        {/* Guidelines */}
        <div className="mt-12 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
          <h3 className="text-sm font-mono text-gray-400 mb-3">Community Guidelines</h3>
          <ul className="space-y-2 text-xs text-gray-500 font-mono">
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