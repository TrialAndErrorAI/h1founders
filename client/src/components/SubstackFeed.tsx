import { useState, useEffect } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface SubstackPost {
  title: string
  link: string
  pubDate: string
  description: string
}

export default function SubstackFeed() {
  const [posts, setPosts] = useState<SubstackPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Using RSS2JSON service for CORS-free RSS fetching
    const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://community.h1bfounders.com/feed'

    fetch(RSS_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok' && data.items) {
          const latestPosts = data.items.slice(0, 3).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            }),
            description: item.description.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
          }))
          setPosts(latestPosts)
        } else {
          throw new Error('Failed to load posts')
        }
      })
      .catch(err => {
        console.error('RSS fetch error:', err)
        setError('Unable to load latest posts')
        // Fallback to static content
        setPosts([
          {
            title: "Trump's $100K H1B Proclamation: What It Actually Means",
            link: "https://community.h1bfounders.com/p/trumps-100k-h1b-proclamation-what",
            pubDate: "Sep 20",
            description: "Stop panicking. A $100,000 payment for H1B petitions starting September 21, 2025. Most H1B holders already in the US are NOT affected..."
          }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Latest from Substack
        </h2>
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        Latest Analysis
      </h2>
      {error && (
        <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>{error}</p>
      )}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <a
            key={index}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded hover:border-accent transition-colors group"
            style={{ borderColor: 'var(--border-primary)' }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold mb-2 group-hover:text-accent transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {post.title}
                </h3>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {post.description}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  {post.pubDate}
                </p>
              </div>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mt-1 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-tertiary)' }} />
            </div>
          </a>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a
          href="https://community.h1bfounders.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline text-sm font-mono"
        >
          View all posts on Substack →
        </a>
      </div>
    </div>
  )
}