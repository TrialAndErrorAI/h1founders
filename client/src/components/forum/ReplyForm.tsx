import { User } from '../../types/forum.types'
import BadgeDisplay from '../badges/BadgeDisplay'

interface ReplyFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
  currentUser: User | null
}

export default function ReplyForm({ value, onChange, onSubmit, onCancel, currentUser }: ReplyFormProps) {
  if (!currentUser) {
    return (
      <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
        <p className="text-gray-500 font-mono text-sm text-center">
          Please sign in to reply to this thread
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">{currentUser.avatar || '👤'}</div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{currentUser.name}</span>
            <BadgeDisplay 
              level={currentUser.badge} 
              subLevel={currentUser.subLevel}
              specialRole={currentUser.specialRole}
              size="sm" 
            />
          </div>
          <p className="text-xs text-gray-500 font-mono">Replying as {currentUser.badge}</p>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your wisdom... (Markdown supported)"
        className="w-full h-32 px-4 py-3 bg-black border border-gray-800 rounded-lg text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-green-400 transition-colors resize-none"
        autoFocus
      />

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500 font-mono">
          Tip: Be constructive. Help others escape the Matrix.
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-400 font-mono text-sm hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!value.trim()}
            className={`px-4 py-2 rounded font-mono text-sm transition-all duration-200 ${
              value.trim()
                ? 'bg-green-400 text-black hover:bg-green-500'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            Post Reply
          </button>
        </div>
      </div>
    </div>
  )
}