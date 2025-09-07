import { User, BadgeLevel } from '../types/forum.types'

export const mockUsers: User[] = [
  {
    id: 'sid',
    name: 'Sid Sarasvati',
    email: 'sid@h1founders.com',
    badge: BadgeLevel.ARCHITECT,
    joinedDate: '2024-03-01',
    company: 'H1Founders',
    location: 'Boston, MA',
    visaType: 'Citizen',
    avatar: '🔴'
  },
  {
    id: 'manisha',
    name: 'Manisha',
    email: 'manisha@h1founders.com',
    badge: BadgeLevel.ORACLE,
    joinedDate: '2024-03-15',
    specialRole: 'ORACLE_ASSISTANT',
    company: 'H1Founders',
    location: 'San Francisco, CA',
    visaType: 'Green Card',
    avatar: '🔮'
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    email: 'atlas@h1founders.com',
    badge: BadgeLevel.ORACLE,
    joinedDate: '2024-09-01',
    isAI: true,
    isOracle: true,
    company: 'The Matrix',
    location: 'Everywhere',
    avatar: '🤖'
  },
  {
    id: 'raj_neo',
    name: 'Raj Patel',
    email: 'raj@techstartup.com',
    badge: BadgeLevel.NEO,
    subLevel: 3,
    joinedDate: '2024-04-01',
    company: 'TechVenture Inc',
    location: 'San Francisco, CA',
    visaType: 'EB-1A',
    avatar: '🟢'
  },
  {
    id: 'priya_morpheus',
    name: 'Priya Sharma',
    email: 'priya@aicompany.com',
    badge: BadgeLevel.MORPHEUS,
    subLevel: 2,
    joinedDate: '2024-03-20',
    company: 'AI Solutions',
    location: 'Seattle, WA',
    visaType: 'O-1',
    avatar: '⚡'
  },
  {
    id: 'carlos_freed',
    name: 'Carlos Rodriguez',
    email: 'carlos@startup.com',
    badge: BadgeLevel.FREED_MIND,
    subLevel: 2,
    joinedDate: '2024-05-15',
    company: 'Just formed LLC',
    location: 'Austin, TX',
    visaType: 'H-1B',
    avatar: '🔵'
  },
  {
    id: 'lisa_unplugged',
    name: 'Lisa Chen',
    email: 'lisa@gmail.com',
    badge: BadgeLevel.UNPLUGGED,
    subLevel: 2,
    joinedDate: '2024-06-01',
    company: 'Still at FAANG',
    location: 'Mountain View, CA',
    visaType: 'H-1B',
    avatar: '🟡'
  },
  {
    id: 'ahmed_blue',
    name: 'Ahmed Hassan',
    email: 'ahmed@gmail.com',
    badge: BadgeLevel.BLUE_PILL,
    joinedDate: '2024-09-05',
    company: 'Big Corp',
    location: 'New York, NY',
    visaType: 'H-1B',
    avatar: '⚪'
  },
  {
    id: 'maria_neo',
    name: 'Maria Silva',
    email: 'maria@fintech.com',
    badge: BadgeLevel.NEO,
    subLevel: 5,
    joinedDate: '2024-03-10',
    company: 'FinTech Solutions',
    location: 'Miami, FL',
    visaType: 'EB-1A',
    avatar: '🟢'
  },
  {
    id: 'david_freed',
    name: 'David Kim',
    email: 'david@edtech.com',
    badge: BadgeLevel.FREED_MIND,
    subLevel: 3,
    joinedDate: '2024-07-01',
    company: 'EdTech Startup',
    location: 'Chicago, IL',
    visaType: 'H-1B',
    avatar: '🔵'
  },
  {
    id: 'sentinel_mod',
    name: 'Alex Wong',
    email: 'alex@h1founders.com',
    badge: BadgeLevel.NEO,
    subLevel: 1,
    joinedDate: '2024-04-15',
    specialRole: 'SENTINEL',
    isModerator: true,
    company: 'Security Startup',
    location: 'Denver, CO',
    visaType: 'O-1',
    avatar: '⚔️'
  }
]

export function getMockUser(id: string): User | undefined {
  return mockUsers.find(user => user.id === id)
}

export function getMockUsersByBadge(badge: BadgeLevel): User[] {
  return mockUsers.filter(user => user.badge === badge)
}