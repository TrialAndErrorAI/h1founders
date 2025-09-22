import { useEffect, useState } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface SubstackPost {
  title: string
  link: string
  pubDate: string
  description: string
  content: string
  guid: string
}

export default function Newsletter() {
  const [posts, setPosts] = useState<SubstackPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<string | null>(null)

  useEffect(() => {
    fetchSubstackFeed()
  }, [])

  const fetchSubstackFeed = async () => {
    try {
      const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://community.h1bfounders.com/feed'
      const response = await fetch(RSS_URL)
      const data = await response.json()

      if (data.status === 'ok' && data.items) {
        setPosts(data.items.slice(0, 10)) // Get latest 10 posts
        // Auto-select first post
        if (data.items.length > 0) {
          setSelectedPost(data.items[0].guid)
        }
      }
    } catch (error) {
      console.error('Error fetching Substack feed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPostId = (link: string) => {
    // Extract post slug from Substack URL for embedding
    const match = link.match(/\/p\/([^?]+)/)
    return match ? match[1] : null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header with Side Subscribe */}
      <div className="bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left: Title and Description */}
            <div className="flex-1">
              <h1 className="terminal-text text-3xl font-bold mb-2">./newsletter</h1>
              <p className="text-foreground-tertiary">
                Breaking H1B myths, one truth at a time
              </p>
            </div>

            {/* Right: Subscribe Widget (smaller, inline) */}
            <div className="lg:w-80">
              <iframe
                src="https://community.h1bfounders.com/embed"
                width="320"
                height="150"
                style={{
                  border: '1px solid #333',
                  background: 'white',
                  borderRadius: '8px',
                  width: '100%',
                  maxWidth: '320px'
                }}
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Post List */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h2 className="font-mono text-accent mb-4">// Recent Posts</h2>
              {loading ? (
                <div className="text-foreground-tertiary">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => (
                    <button
                      key={post.guid}
                      onClick={() => setSelectedPost(post.guid)}
                      className={`w-full text-left p-3 rounded border transition-all ${
                        selectedPost === post.guid
                          ? 'border-accent bg-background-secondary'
                          : 'border-border hover:border-foreground-tertiary'
                      }`}
                    >
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-foreground-tertiary">
                        {new Date(post.pubDate).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="lg:col-span-2">
            {selectedPost && posts.length > 0 ? (
              <div className="bg-background-secondary rounded-lg border border-border p-8">
                {(() => {
                  const post = posts.find(p => p.guid === selectedPost)
                  if (!post) return null

                  const postId = getPostId(post.link)

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                      <p className="text-foreground-tertiary mb-6">
                        {new Date(post.pubDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>

                      {/* Substack Embed */}
                      {postId && (
                        <div className="mb-6">
                          <iframe
                            src={`https://community.h1bfounders.com/embed/p/${postId}`}
                            width="100%"
                            height="800"
                            frameBorder="0"
                            scrolling="no"
                            className="rounded"
                          />
                        </div>
                      )}

                      {/* Fallback content if embed doesn't work */}
                      <div className="prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.description }} />
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-accent text-black px-6 py-2 rounded font-semibold hover:bg-green-400 transition-colors"
                        >
                          Read on Substack
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="bg-background-secondary rounded-lg border border-border p-8 text-center text-foreground-tertiary">
                Select a post to read
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}