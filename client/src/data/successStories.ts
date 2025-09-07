export interface Timeline {
  date: string
  event: string
  type: 'visa' | 'business' | 'milestone'
}

export interface Metrics {
  label: string
  before: string | number
  after: string | number
  unit?: string
}

export interface SuccessStory {
  id: string
  name: string
  photo?: string
  tagline: string
  currentRole: string
  company: string
  linkedIn?: string
  twitter?: string
  
  // Visa Journey
  visaPath: string // "H1B → EB1-A", "F1 → OPT → EB1-A", etc.
  greenCardDate?: string
  timeToGreenCard: string // "18 months", "2 years", etc.
  
  // Business Metrics
  revenue: string
  employees: number
  funding: string // "Bootstrapped", "$2M seed", etc.
  industry: string
  
  // Story Details
  excerpt: string
  fullStory?: string
  challenges: string[]
  breakthroughs: string[]
  
  // Transformation Metrics
  metrics: Metrics[]
  
  // Timeline
  timeline: Timeline[]
  
  // Advice
  topAdvice: string
  
  // Meta
  featured: boolean
  videoUrl?: string
  publishDate: string
}

export const successStories: SuccessStory[] = [
  {
    id: 'sid-sarasvati',
    name: 'Sid Sarasvati',
    tagline: 'The Original Red Pill Taker',
    currentRole: 'Founder & CEO',
    company: 'Trial & Error Labs',
    linkedIn: 'https://linkedin.com/in/sidsarasvati',
    twitter: '@sidjustice_',
    
    visaPath: 'H1B → EB1-A',
    greenCardDate: '2023-11-15',
    timeToGreenCard: '18 months',
    
    revenue: '$3M+ ARR',
    employees: 12,
    funding: 'Bootstrapped',
    industry: 'SaaS / AI',
    
    excerpt: 'From 15 years on H1B to green card in 18 months. Built RenovateAI to $3M ARR with $0 funding.',
    
    challenges: [
      '15 years stuck on H1B',
      '60-day deportation deadline after layoff',
      'Lawyers said EB2 = 150 year wait',
      'Banks wouldn\'t open business accounts'
    ],
    
    breakthroughs: [
      'Discovered self-sponsorship loophole',
      'Hit $100K revenue in 6 months',
      'Qualified for EB1-A with bootstrap revenue',
      'Started movement of 1,400+ founders'
    ],
    
    metrics: [
      { label: 'Visa Wait Time', before: '150 years (EB2)', after: '18 months (EB1-A)' },
      { label: 'Annual Revenue', before: '$0', after: '$3,000,000+' },
      { label: 'Freedom Level', before: 'Corporate slave', after: 'Complete autonomy' },
      { label: 'Deportation Risk', before: '60 days', after: 'Permanent resident' }
    ],
    
    timeline: [
      { date: '2008', event: 'Arrived in US on F1', type: 'visa' },
      { date: '2010', event: 'Started H1B journey', type: 'visa' },
      { date: '2022', event: 'Laid off - 60 day clock starts', type: 'visa' },
      { date: '2022', event: 'Started RenovateAI', type: 'business' },
      { date: '2023', event: 'Hit $1M ARR', type: 'milestone' },
      { date: '2023', event: 'EB1-A approved', type: 'visa' },
      { date: '2024', event: 'Launched H1Founders movement', type: 'milestone' }
    ],
    
    topAdvice: 'Stop waiting for permission. The system has loopholes. Bootstrap to $1M and self-sponsor.',
    
    featured: true,
    publishDate: '2024-03-15'
  },
  
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    tagline: 'From Big Tech to Big Exit',
    currentRole: 'Founder',
    company: 'DataSync AI',
    
    visaPath: 'L1 → H1B → EB1-A',
    timeToGreenCard: '14 months',
    
    revenue: '$5M ARR',
    employees: 25,
    funding: 'Bootstrapped → $2M seed',
    industry: 'Data Infrastructure',
    
    excerpt: 'Left Google at 32. Built data infrastructure startup to $5M ARR. Got EB1-A through startup achievements.',
    
    challenges: [
      'L1 transfer restrictions',
      'Couldn\'t raise VC on H1B',
      'Indian EB2 = lifetime wait',
      'Imposter syndrome as female founder'
    ],
    
    breakthroughs: [
      'First customer paid $50K upfront',
      'Published 3 technical papers',
      'Won TechCrunch Disrupt',
      'Self-sponsored through own company'
    ],
    
    metrics: [
      { label: 'Salary at Google', before: '$450,000', after: '$5M equity value' },
      { label: 'Work Hours', before: '60/week', after: '80/week (but mine)' },
      { label: 'Patents Filed', before: '0', after: '4' },
      { label: 'Media Features', before: '0', after: '12+' }
    ],
    
    timeline: [
      { date: '2019', event: 'L1 transfer from India', type: 'visa' },
      { date: '2020', event: 'Switched to H1B', type: 'visa' },
      { date: '2021', event: 'Started DataSync nights/weekends', type: 'business' },
      { date: '2022', event: 'Quit Google, went full-time', type: 'milestone' },
      { date: '2023', event: '$5M ARR milestone', type: 'milestone' },
      { date: '2024', event: 'Green card approved', type: 'visa' }
    ],
    
    topAdvice: 'Your technical expertise + business success = extraordinary ability. Document everything.',
    
    featured: true,
    publishDate: '2024-06-20'
  },
  
  {
    id: 'carlos-rodriguez',
    name: 'Carlos Rodriguez',
    tagline: 'The Fintech Revolutionary',
    currentRole: 'Co-founder & CTO',
    company: 'PayBridge',
    
    visaPath: 'F1 → OPT → H1B → EB1-A',
    timeToGreenCard: '24 months',
    
    revenue: '$8M ARR',
    employees: 40,
    funding: '$3M seed',
    industry: 'Fintech',
    
    excerpt: 'Mexican founder who built cross-border payments platform. From OPT to green card in 2 years.',
    
    challenges: [
      'OPT expiring in 12 months',
      'H1B lottery = 20% chance',
      'Mexican EB2 = 25 years',
      'Banks wouldn\'t work with immigrant founder'
    ],
    
    breakthroughs: [
      'Found US co-founder for banking',
      'Won H1B lottery (lucky)',
      'Processed $100M in payments Year 1',
      'EB1-A approved based on fintech innovation'
    ],
    
    metrics: [
      { label: 'Payment Volume', before: '$0', after: '$500M/year' },
      { label: 'Countries Served', before: '0', after: '15' },
      { label: 'Team Size', before: '1', after: '40' },
      { label: 'Visa Certainty', before: '20% (lottery)', after: '100% (green card)' }
    ],
    
    timeline: [
      { date: '2018', event: 'MS in Computer Science', type: 'visa' },
      { date: '2019', event: 'Started on OPT', type: 'visa' },
      { date: '2020', event: 'Founded PayBridge', type: 'business' },
      { date: '2021', event: 'Won H1B lottery', type: 'visa' },
      { date: '2022', event: 'Raised $3M seed', type: 'milestone' },
      { date: '2023', event: 'EB1-A approved', type: 'visa' }
    ],
    
    topAdvice: 'Use your OPT time wisely. Build fast, get revenue, document impact. Don\'t rely on lottery.',
    
    featured: false,
    publishDate: '2024-07-15'
  },
  
  {
    id: 'anna-chen',
    name: 'Anna Chen',
    tagline: 'The Healthcare Disruptor',
    currentRole: 'Founder & CEO',
    company: 'HealthBridge AI',
    
    visaPath: 'J1 → H1B → EB1-A',
    timeToGreenCard: '20 months',
    
    revenue: '$2.5M ARR',
    employees: 18,
    funding: 'Bootstrapped',
    industry: 'Healthcare Tech',
    
    excerpt: 'Chinese founder who transformed patient care with AI. From J1 research to startup success.',
    
    challenges: [
      'J1 two-year home residency requirement',
      'Chinese EB2 = 5+ years',
      'HIPAA compliance as immigrant',
      'No credit history for business'
    ],
    
    breakthroughs: [
      'Got J1 waiver through startup',
      'First hospital contract = $500K',
      'Published in Nature Medicine',
      'Speaking at major conferences'
    ],
    
    metrics: [
      { label: 'Research Papers', before: '2', after: '8 published' },
      { label: 'Patients Impacted', before: '0', after: '50,000+' },
      { label: 'Hospital Clients', before: '0', after: '12' },
      { label: 'Awards Won', before: '1', after: '6' }
    ],
    
    timeline: [
      { date: '2019', event: 'J1 Research at Stanford', type: 'visa' },
      { date: '2020', event: 'Started HealthBridge as side project', type: 'business' },
      { date: '2021', event: 'J1 waiver approved', type: 'visa' },
      { date: '2022', event: 'First hospital deployment', type: 'milestone' },
      { date: '2023', event: 'EB1-A filed with premium', type: 'visa' },
      { date: '2024', event: 'Green card in hand', type: 'visa' }
    ],
    
    topAdvice: 'Academic credentials + business impact = powerful EB1-A case. Leverage your research.',
    
    featured: true,
    publishDate: '2024-08-10'
  },
  
  {
    id: 'raj-patel',
    name: 'Raj Patel',
    tagline: 'The Bootstrap King',
    currentRole: 'Solo Founder',
    company: 'DevTools Pro',
    
    visaPath: 'H1B → EB1-A',
    timeToGreenCard: '16 months',
    
    revenue: '$1.2M ARR',
    employees: 0,
    funding: 'Bootstrapped',
    industry: 'Developer Tools',
    
    excerpt: 'Solo founder who built dev tools empire. Zero employees, $100K MRR, complete freedom.',
    
    challenges: [
      'Fired during COVID',
      '60 days to find new job',
      'Indian EB2 = never',
      'Wife on H4, couldn\'t work'
    ],
    
    breakthroughs: [
      'Built product in 60 days',
      'First customer day 61',
      '$10K MRR in 6 months',
      'Wife got H4 EAD through startup'
    ],
    
    metrics: [
      { label: 'Monthly Revenue', before: '$0', after: '$100,000' },
      { label: 'Customers', before: '0', after: '5,000+' },
      { label: 'Work Location', before: 'Office', after: 'Anywhere' },
      { label: 'Stress Level', before: '10/10', after: '3/10' }
    ],
    
    timeline: [
      { date: '2020', event: 'Laid off from Amazon', type: 'visa' },
      { date: '2020', event: '60-day clock starts', type: 'visa' },
      { date: '2020', event: 'Launched DevTools Pro', type: 'business' },
      { date: '2021', event: 'Hit $50K MRR', type: 'milestone' },
      { date: '2022', event: 'Filed EB1-A', type: 'visa' },
      { date: '2023', event: 'Green card approved', type: 'visa' }
    ],
    
    topAdvice: 'You don\'t need a team or funding. You need customers and revenue. That\'s extraordinary.',
    
    featured: false,
    publishDate: '2024-09-05'
  },
  
  {
    id: 'maria-gonzalez',
    name: 'Maria Gonzalez',
    tagline: 'The EdTech Pioneer',
    currentRole: 'Founder & CEO',
    company: 'LearnPath',
    
    visaPath: 'TN → H1B → EB1-A',
    timeToGreenCard: '22 months',
    
    revenue: '$4M ARR',
    employees: 30,
    funding: '$1.5M seed',
    industry: 'Education Tech',
    
    excerpt: 'Brazilian founder revolutionizing online education. From teaching to tech in record time.',
    
    challenges: [
      'TN visa restrictions',
      'Couldn\'t incorporate on TN',
      'Brazilian EB2 = 3 years',
      'No technical background'
    ],
    
    breakthroughs: [
      'Learned to code in 6 months',
      'Built MVP solo',
      '10,000 users in Year 1',
      'Featured in Forbes 30 under 30'
    ],
    
    metrics: [
      { label: 'Students Served', before: '30/class', after: '100,000+' },
      { label: 'Course Completion', before: '40%', after: '85%' },
      { label: 'Annual Income', before: '$65K', after: '$4M revenue' },
      { label: 'Impact Scale', before: '1 classroom', after: '50 countries' }
    ],
    
    timeline: [
      { date: '2019', event: 'TN visa as teacher', type: 'visa' },
      { date: '2020', event: 'Switched to H1B', type: 'visa' },
      { date: '2021', event: 'Launched LearnPath', type: 'business' },
      { date: '2022', event: 'Forbes recognition', type: 'milestone' },
      { date: '2023', event: 'EB1-A approved', type: 'visa' }
    ],
    
    topAdvice: 'Non-technical founders can build tech companies. Your domain expertise is your superpower.',
    
    featured: false,
    publishDate: '2024-10-12'
  }
]

export const getFeaturedStories = (): SuccessStory[] => {
  return successStories.filter(story => story.featured)
}

export const getStoriesByIndustry = (industry: string): SuccessStory[] => {
  return successStories.filter(story => 
    story.industry.toLowerCase().includes(industry.toLowerCase())
  )
}

export const getStoriesByVisaPath = (visa: string): SuccessStory[] => {
  return successStories.filter(story => 
    story.visaPath.includes(visa)
  )
}