export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: number // in minutes
  type: 'call' | 'workshop' | 'meetup' | 'webinar'
  isRecurring?: boolean
  recurringSchedule?: string
  registrationUrl?: string
  recordingUrl?: string
  attendees?: number
  maxAttendees?: number
  location?: string
  isPast: boolean
}

export const events: Event[] = [
  // Upcoming Events
  {
    id: 'weekly-office-hours',
    title: 'Weekly Office Hours with Sid',
    description: 'Open Q&A about H1B, EB1-A, and building while on visa. No topic off limits.',
    date: '2025-09-14',
    time: '18:00',
    duration: 60,
    type: 'call',
    isRecurring: true,
    recurringSchedule: 'Every Sunday at 6 PM EST',
    registrationUrl: '#',
    maxAttendees: 100,
    isPast: false
  },
  {
    id: 'eb1a-workshop-sep',
    title: 'EB1-A Profile Building Workshop',
    description: 'Deep dive into building extraordinary ability evidence. Real examples, templates included.',
    date: '2025-09-21',
    time: '14:00',
    duration: 120,
    type: 'workshop',
    registrationUrl: '#',
    attendees: 45,
    maxAttendees: 200,
    isPast: false
  },
  {
    id: 'sf-meetup-sep',
    title: 'San Francisco Founder Meetup',
    description: 'IRL networking for Bay Area immigrant founders. Hosted at a founder\'s office.',
    date: '2025-09-28',
    time: '17:00',
    duration: 180,
    type: 'meetup',
    location: 'San Francisco, CA',
    registrationUrl: '#',
    attendees: 32,
    maxAttendees: 50,
    isPast: false
  },
  {
    id: 'bootstrap-masterclass',
    title: 'Bootstrap to $1M ARR Masterclass',
    description: 'The exact playbook I used to hit $3M ARR with no funding.',
    date: '2025-10-05',
    time: '15:00',
    duration: 90,
    type: 'webinar',
    registrationUrl: '#',
    attendees: 128,
    maxAttendees: 500,
    isPast: false
  },
  {
    id: 'lawyer-qa-oct',
    title: 'Immigration Lawyer Q&A',
    description: 'Guest session with immigration attorney specializing in founder visas.',
    date: '2025-10-12',
    time: '19:00',
    duration: 75,
    type: 'call',
    registrationUrl: '#',
    attendees: 89,
    maxAttendees: 200,
    isPast: false
  },
  
  // Past Events (with recordings)
  {
    id: 'viral-post-story',
    title: 'The LinkedIn Post That Started Everything',
    description: 'Sid shares the story behind the viral post and how H1Founders began.',
    date: '2024-04-15',
    time: '18:00',
    duration: 45,
    type: 'webinar',
    recordingUrl: '#',
    attendees: 312,
    isPast: true
  },
  {
    id: 'first-100-members',
    title: 'Celebrating 100 WhatsApp Members',
    description: 'Community celebration call with success stories and lessons learned.',
    date: '2024-05-20',
    time: '19:00',
    duration: 60,
    type: 'call',
    recordingUrl: '#',
    attendees: 87,
    isPast: true
  },
  {
    id: 'eb1a-success-panel',
    title: 'EB1-A Success Stories Panel',
    description: '5 founders who got their green cards share their journeys.',
    date: '2024-07-10',
    time: '18:00',
    duration: 90,
    type: 'webinar',
    recordingUrl: '#',
    attendees: 456,
    isPast: true
  },
  {
    id: 'nyc-meetup-aug',
    title: 'NYC Immigrant Founder Meetup',
    description: 'First IRL meetup in New York. 40+ founders showed up.',
    date: '2024-08-25',
    time: '18:00',
    duration: 180,
    type: 'meetup',
    location: 'New York, NY',
    recordingUrl: '#',
    attendees: 42,
    isPast: true
  },
  {
    id: 'year-end-2024',
    title: '2024 Year-End Community Call',
    description: 'Reflecting on growth from 0 to 1,400 members in 9 months.',
    date: '2024-12-20',
    time: '19:00',
    duration: 60,
    type: 'call',
    recordingUrl: '#',
    attendees: 234,
    isPast: true
  }
]

export const getUpcomingEvents = (): Event[] => {
  return events.filter(event => !event.isPast)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const getPastEvents = (): Event[] => {
  return events.filter(event => event.isPast)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getEventsByType = (type: Event['type']): Event[] => {
  return events.filter(event => event.type === type)
}

export const getNextEvent = (): Event | null => {
  const upcoming = getUpcomingEvents()
  return upcoming.length > 0 ? upcoming[0] : null
}