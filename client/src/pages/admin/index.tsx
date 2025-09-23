import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { formatDistanceToNow } from 'date-fns'
import { db } from '../../lib/firebase'
import { useAuth } from '../../contexts/AuthContext'
import { BadgeLevel } from '../../types/forum.types'
import { ChevronUpIcon, ChevronDownIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

// SECURITY: Only Sid can access admin panel
const ADMIN_UID = 'QViviOX79DXnrE9pViXAfcGqTcx2'

const BADGE_LEVELS = [
  BadgeLevel.BLUE_PILL,
  BadgeLevel.UNPLUGGED,
  BadgeLevel.FREED_MIND,
  BadgeLevel.NEO,
  BadgeLevel.MORPHEUS,
  BadgeLevel.ORACLE,
  BadgeLevel.THE_ARCHITECT
]

interface UserData {
  uid: string
  username?: string
  phone: string
  matrixLevel?: BadgeLevel
  badge?: BadgeLevel
  createdAt: any
  isWhatsappMember?: boolean
  isVerified?: boolean
  lastActive?: any
}

export default function AdminPanel() {
  const { user: currentUser } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [newBadge, setNewBadge] = useState<BadgeLevel | ''>('')

  // Security check - redirect if not Sid (BYPASS for localhost development)
  const isDevelopment = window.location.hostname === 'localhost'
  useEffect(() => {
    if (!isDevelopment && (!currentUser || currentUser.uid !== ADMIN_UID)) {
      navigate('/')
    }
  }, [currentUser, navigate, isDevelopment])

  // Fetch all users
  useEffect(() => {
    if (!isDevelopment && currentUser?.uid !== ADMIN_UID) return

    const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as UserData[]
      setUsers(userData)
      setLoading(false)
    })

    return unsubscribe
  }, [currentUser])

  // Update user badge
  const updateUserBadge = async (userId: string, badge: BadgeLevel) => {
    try {
      await updateDoc(doc(db, 'members', userId), {
        matrixLevel: badge,
        badge: badge, // Some users have 'badge', some have 'matrixLevel'
        lastUpdated: serverTimestamp(),
        updatedBy: 'ADMIN'
      })
      toast.success(`Badge updated to ${badge}`)
      setSelectedUser(null)
      setNewBadge('')
    } catch (error) {
      console.error('Error updating badge:', error)
      toast.error('Failed to update badge')
    }
  }

  // Filter users based on search
  const filteredUsers = users.filter(user => {
    const search = searchTerm.toLowerCase()
    return user.phone?.includes(search) ||
           user.username?.toLowerCase().includes(search) ||
           user.uid.toLowerCase().includes(search)
  })

  // Calculate stats
  const todaySignups = users.filter(user => {
    if (!user.createdAt) return false
    const created = user.createdAt.toDate ? user.createdAt.toDate() : new Date(user.createdAt)
    const today = new Date()
    return created.toDateString() === today.toDateString()
  }).length

  const lastSignup = users[0]?.createdAt ?
    formatDistanceToNow(users[0].createdAt.toDate ? users[0].createdAt.toDate() : new Date(users[0].createdAt), { addSuffix: true }) :
    'N/A'

  // Don't render if not admin (unless in development)
  if (!isDevelopment && (!currentUser || currentUser.uid !== ADMIN_UID)) {
    return null
  }

  // Hide phone number partially
  const hidePhone = (phone: string) => {
    if (!phone) return 'No phone'
    return phone.slice(0, 5) + '***' + phone.slice(-4)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="border border-accent p-4 mb-6">
          <h1 className="text-2xl font-mono text-accent mb-2">
            ADMIN PANEL {isDevelopment && <span className="text-yellow-400 text-sm">[DEV MODE]</span>}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-accent" />
              <span>{users.length} users</span>
            </div>
            <div className="text-green-400">+{todaySignups} today</div>
            <div className="text-foreground-tertiary">Last: {lastSignup}</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by phone, username, or UID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-background border border-accent text-foreground placeholder-foreground-tertiary focus:outline-none focus:border-green-400"
          />
        </div>

        {/* User List */}
        {loading ? (
          <div className="text-center py-8 text-accent">Loading users...</div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const currentBadge = user.matrixLevel || user.badge || BadgeLevel.UNPLUGGED
              const joinedAgo = user.createdAt ?
                formatDistanceToNow(user.createdAt.toDate ? user.createdAt.toDate() : new Date(user.createdAt), { addSuffix: true }) :
                'Unknown'

              return (
                <div key={user.uid} className="border border-accent p-4">
                  {/* User Info */}
                  <div className="mb-3">
                    <div className="font-mono text-lg">
                      {user.username ? `@${user.username}` : `User #${user.uid.slice(0, 8)}`}
                    </div>
                    <div className="text-sm text-foreground-tertiary">{hidePhone(user.phone)}</div>
                    <div className="text-xs text-foreground-tertiary mt-1">UID: {user.uid}</div>
                  </div>

                  {/* Badge & Status */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-accent font-mono">{currentBadge}</span>
                    {user.isWhatsappMember && (
                      <span className="text-xs bg-green-900 text-green-400 px-2 py-1 rounded">WhatsApp ✓</span>
                    )}
                    {user.isVerified && (
                      <span className="text-xs bg-blue-900 text-blue-400 px-2 py-1 rounded">Verified</span>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="text-xs text-foreground-tertiary mb-3">
                    Joined: {joinedAgo}
                  </div>

                  {/* Actions */}
                  {selectedUser === user.uid ? (
                    <div className="flex gap-2">
                      <select
                        value={newBadge}
                        onChange={(e) => setNewBadge(e.target.value as BadgeLevel)}
                        className="flex-1 p-2 bg-background border border-accent text-foreground"
                      >
                        <option value="">Select new badge...</option>
                        {BADGE_LEVELS.map(level => (
                          <option key={level} value={level} disabled={level === currentBadge}>
                            {level} {level === currentBadge ? '(current)' : ''}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => newBadge && updateUserBadge(user.uid, newBadge)}
                        disabled={!newBadge}
                        className="px-4 py-2 bg-accent text-black font-mono disabled:opacity-50"
                      >
                        SAVE
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(null)
                          setNewBadge('')
                        }}
                        className="px-4 py-2 border border-accent text-accent font-mono"
                      >
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      {currentBadge !== BadgeLevel.THE_ARCHITECT && (
                        <button
                          onClick={() => setSelectedUser(user.uid)}
                          className="flex items-center gap-1 px-3 py-2 border border-accent text-accent font-mono hover:bg-accent hover:text-black transition-colors"
                        >
                          <ChevronUpIcon className="w-4 h-4" />
                          PROMOTE
                        </button>
                      )}
                      {currentBadge !== BadgeLevel.UNPLUGGED && (
                        <button
                          onClick={() => setSelectedUser(user.uid)}
                          className="flex items-center gap-1 px-3 py-2 border border-red-pill text-red-pill font-mono hover:bg-red-pill hover:text-black transition-colors"
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                          DEMOTE
                        </button>
                      )}
                      {currentBadge === BadgeLevel.THE_ARCHITECT && (
                        <div className="px-3 py-2 text-foreground-tertiary font-mono">
                          [Already highest level]
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}