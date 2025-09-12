import { useState } from 'react'
import { Post, BadgeLevel } from '../../types/forum.types'
import BadgeDisplay from '../badges/BadgeDisplay'
import VoteButtons from './VoteButtons'

interface PostCardProps {
  post: Post
  onVote: (postId: string, voteType: 'up' | 'down') => void
}

export default function PostCard({ post, onVote }: PostCardProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      setUserVote(null)
    } else {
      setUserVote(voteType)
      onVote(post.id, voteType)
    }
  }

  return (
    <div className={`bg-gray-900/30 border rounded-lg p-5 transition-all duration-200 ${
      post.isSolution 
        ? 'border-green-400 shadow-lg shadow-green-400/20 bg-green-900/10' 
        : post.isAIGenerated
        ? 'border-purple-400 shadow-lg shadow-purple-400/10 bg-purple-900/10'
        : 'border-gray-800'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-1 flex-shrink-0">{post.author.avatar || '👤'}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-white whitespace-nowrap">
                {post.author.name}
              </span>
              <BadgeDisplay 
                level={post.author.badge} 
                subLevel={post.author.subLevel}
                specialRole={post.author.specialRole}
                size="sm" 
              />
              {post.isAIGenerated && (
                <span className="px-2 py-0.5 bg-purple-900/50 border border-purple-800 rounded text-xs font-mono text-purple-400">
                  🤖 AI Oracle
                </span>
              )}
              {post.isSolution && (
                <span className="px-2 py-0.5 bg-green-900/50 border border-green-800 rounded text-xs font-mono text-green-400">
                  ✓ Solution
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 font-mono">
              {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
              {post.updatedAt && ' (edited)'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`prose prose-invert max-w-none mb-4 ${
        post.author.badge === BadgeLevel.THE_ARCHITECT ? 'text-green-300' : 'text-gray-300'
      }`}>
        <p className="whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <VoteButtons
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          userVote={userVote}
          onVote={handleVote}
        />
        
        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
          {post.author.isModerator && (
            <span className="text-orange-400">⚔️ Moderator</span>
          )}
          {post.author.isOracle && !post.isAIGenerated && (
            <span className="text-purple-400">🔮 Oracle</span>
          )}
        </div>
      </div>
    </div>
  )
}