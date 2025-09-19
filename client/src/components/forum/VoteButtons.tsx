interface VoteButtonsProps {
  upvotes: number
  downvotes: number
  userVote: 'up' | 'down' | null
  onVote: (voteType: 'up' | 'down') => void
}

export default function VoteButtons({ upvotes, downvotes, userVote, onVote }: VoteButtonsProps) {
  const safeUpvotes = upvotes || 0
  const safeDownvotes = downvotes || 0
  const netVotes = safeUpvotes - safeDownvotes
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onVote('up')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-200 ${
          userVote === 'up'
            ? 'bg-green-400 text-foreground shadow-md shadow-green-400/30'
            : 'bg-background-secondary/70 text-foreground-tertiary hover:bg-background-secondary hover:text-accent'
        }`}
      >
        <span>▲</span>
        <span className="font-medium">{safeUpvotes}</span>
      </button>
      
      <button
        onClick={() => onVote('down')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-200 ${
          userVote === 'down'
            ? 'bg-red-400 text-foreground shadow-md shadow-red-400/30'
            : 'bg-background-secondary/70 text-foreground-tertiary hover:bg-background-secondary hover:text-red-pill'
        }`}
      >
        <span>▼</span>
        <span className="font-medium">{safeDownvotes}</span>
      </button>

      <span className={`text-xs font-mono ml-3 px-2 py-1 rounded ${
        netVotes > 0 ? 'text-accent bg-green-900/20' : 
        netVotes < 0 ? 'text-red-pill bg-red-900/20' : 
        'text-foreground-tertiary bg-background-secondary/30'
      }`}>
        Net: {netVotes > 0 ? '+' : ''}{netVotes}
      </span>
    </div>
  )
}