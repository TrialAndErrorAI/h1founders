interface VoteButtonsProps {
  upvotes: number
  downvotes: number
  userVote: 'up' | 'down' | null
  onVote: (voteType: 'up' | 'down') => void
}

export default function VoteButtons({ upvotes, downvotes, userVote, onVote }: VoteButtonsProps) {
  const netVotes = upvotes - downvotes
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onVote('up')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-200 ${
          userVote === 'up'
            ? 'bg-green-400 text-black shadow-md shadow-green-400/30'
            : 'bg-gray-800/70 text-gray-400 hover:bg-gray-700 hover:text-green-400'
        }`}
      >
        <span>▲</span>
        <span className="font-medium">{upvotes}</span>
      </button>
      
      <button
        onClick={() => onVote('down')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-200 ${
          userVote === 'down'
            ? 'bg-red-400 text-black shadow-md shadow-red-400/30'
            : 'bg-gray-800/70 text-gray-400 hover:bg-gray-700 hover:text-red-400'
        }`}
      >
        <span>▼</span>
        <span className="font-medium">{downvotes}</span>
      </button>

      <span className={`text-xs font-mono ml-3 px-2 py-1 rounded ${
        netVotes > 0 ? 'text-green-400 bg-green-900/20' : 
        netVotes < 0 ? 'text-red-400 bg-red-900/20' : 
        'text-gray-500 bg-gray-800/30'
      }`}>
        Net: {netVotes > 0 ? '+' : ''}{netVotes}
      </span>
    </div>
  )
}