import { useState, useEffect } from 'react'
import { blogPosts, getTopPosts, getViralPosts, searchPosts, BlogPost } from '../../data/blogPosts'
import EmailCapture from '../../components/EmailCapture'

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>(blogPosts)
  const [showViralOnly, setShowViralOnly] = useState(false)

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).sort()
  const viralPosts = getViralPosts()
  const topPosts = getTopPosts(3)

  useEffect(() => {
    let filtered = blogPosts

    if (searchQuery) {
      filtered = searchPosts(searchQuery)
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    if (showViralOnly) {
      filtered = filtered.filter(post => post.isViral)
    }

    setDisplayPosts(filtered)
  }, [searchQuery, selectedTag, showViralOnly])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatViews = (views?: number) => {
    if (!views) return ''
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K views`
    return `${views} views`
  }

  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="terminal-prompt mb-2"></div>
          <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
            RESOURCES/SUBSTACK_ARCHIVE
          </h1>
          <p className="text-gray-400 text-lg">
            50+ posts from the newsletter that started a movement. 600+ subscribers. 50% open rate.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="terminal-text font-mono">search$</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowViralOnly(!showViralOnly)}
              className={`px-4 py-2 font-mono text-sm rounded-lg border transition-all ${
                showViralOnly 
                  ? 'bg-red-500 text-white border-red-500' 
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
              }`}
            >
              🔥 VIRAL_ONLY ({viralPosts.length})
            </button>
            
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="px-4 py-2 font-mono text-sm rounded-lg bg-green-500/20 text-green-400 border border-green-500/30"
              >
                {selectedTag} ✕
              </button>
            )}
          </div>

          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 font-mono text-xs rounded transition-all ${
                  tag === selectedTag
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-900 text-gray-500 border border-gray-800 hover:border-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Results Count */}
            <div className="mb-6">
              <p className="font-mono text-sm text-gray-500">
                // Showing {displayPosts.length} of {blogPosts.length} posts
              </p>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {displayPosts.map(post => (
                <article
                  key={post.id}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-400/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="font-mono">{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                      {post.views && (
                        <>
                          <span>•</span>
                          <span className="text-green-400">{formatViews(post.views)}</span>
                        </>
                      )}
                    </div>
                    {post.isViral && (
                      <span className="text-red-500 text-sm">🔥 VIRAL</span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="text-green-400 font-mono text-sm group-hover:translate-x-2 transition-transform">
                      READ →
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {displayPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 font-mono">
                  // No posts found. Try a different search.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Email Signup */}
            <div className="bg-gradient-to-r from-red-900/20 to-transparent border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-mono text-red-400 mb-2">// JOIN 600+ FOUNDERS</h3>
              <p className="text-gray-300 text-sm mb-4">
                Get weekly insights on escaping H1B slavery.
              </p>
              <EmailCapture
                placeholder="founder@startup.com"
                buttonText="SUBSCRIBE()"
                context="substack-sidebar"
              />
            </div>

            {/* Most Popular */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-mono text-green-400 mb-4">// MOST POPULAR</h3>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-start space-x-3">
                    <span className="text-green-400 font-mono text-lg">
                      {index + 1}.
                    </span>
                    <div>
                      <h4 className="text-white text-sm font-semibold hover:text-green-400 cursor-pointer transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">
                        {formatViews(post.views)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-mono text-green-400 mb-4">// STATS</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Posts</span>
                  <span className="text-white font-mono">{blogPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Viral Posts</span>
                  <span className="text-red-400 font-mono">{viralPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Views</span>
                  <span className="text-green-400 font-mono">
                    {formatViews(blogPosts.reduce((sum, post) => sum + (post.views || 0), 0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Read Time</span>
                  <span className="text-white font-mono">
                    {Math.round(blogPosts.reduce((sum, post) => sum + post.readTime, 0) / blogPosts.length)} min
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black border border-green-400/30 rounded-lg p-6 text-center">
              <h3 className="text-lg font-mono text-white mb-2">
                Ready to escape?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Check if you qualify for EB1-A
              </p>
              <a
                href="/tools/eb1a-qualifier"
                className="inline-block red-pill-button px-6 py-2 font-mono text-sm font-semibold rounded-lg"
              >
                TAKE_QUIZ()
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}