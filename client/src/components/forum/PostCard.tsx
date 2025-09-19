import { useState } from 'react'
import { Post, BadgeLevel } from '../../types/forum.types'
import BadgeDisplay from '../badges/BadgeDisplay'
import VoteButtons from './VoteButtons'
import {
  UserCircleIcon,
  CpuChipIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

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

  // Safeguard against missing author data
  if (!post || !post.author) {
    console.error('PostCard: Missing post or author data', post)
    return null
  }

  return (
    <div className={`bg-background-secondary/30 border rounded-lg p-5 transition-all duration-200 ${
      post.isSolution
        ? 'border-accent shadow-lg shadow-green-400/20 bg-green-900/10'
        : post.isAIGenerated
        ? 'border-purple-400 shadow-lg shadow-purple-400/10 bg-purple-900/10'
        : 'border-border'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex-shrink-0">
            {post.author?.avatar ? (
              <span className="text-2xl">{post.author.avatar}</span>
            ) : (
              <UserCircleIcon className="w-8 h-8 text-foreground-tertiary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-foreground whitespace-nowrap">
                {post.author?.name || 'Anonymous'}
              </span>
              <BadgeDisplay
                level={post.author?.badge || BadgeLevel.BLUE_PILL}
                subLevel={post.author?.subLevel || 1}
                specialRole={post.author?.specialRole}
                size="sm"
              />
              {post.isAIGenerated && (
                <span className="px-2 py-0.5 bg-purple-900/50 border border-purple-800 rounded text-xs font-mono text-purple-400 flex items-center gap-1">
                  <CpuChipIcon className="w-3 h-3" />
                  AI Oracle
                </span>
              )}
              {post.isSolution && (
                <span className="px-2 py-0.5 bg-green-900/50 border border-green-800 rounded text-xs font-mono text-accent flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3" />
                  Solution
                </span>
              )}
            </div>
            <p className="text-xs text-foreground-tertiary font-mono">
              {post.createdAt ? (
                `${new Date(post.createdAt).toLocaleDateString()} at ${new Date(post.createdAt).toLocaleTimeString()}`
              ) : (
                'Just now'
              )}
              {post.updatedAt && ' (edited)'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`prose prose-invert max-w-none mb-4 ${
        post.author?.badge === BadgeLevel.THE_ARCHITECT ? 'text-green-300' : 'text-foreground-secondary'
      }`}>
        <p className="whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <VoteButtons
          upvotes={post.upvotes || 0}
          downvotes={post.downvotes || 0}
          userVote={userVote}
          onVote={handleVote}
        />

        <div className="flex items-center gap-4 text-xs text-foreground-tertiary font-mono">
          {post.author?.isModerator && (
            <span className="text-orange-400 flex items-center gap-1">
              <ShieldCheckIcon className="w-3 h-3" />
              Moderator
            </span>
          )}
          {post.author?.isOracle && !post.isAIGenerated && (
            <span className="text-purple-400 flex items-center gap-1">
              <BeakerIcon className="w-3 h-3" />
              Oracle
            </span>
          )}
        </div>
      </div>
    </div>
  )
}