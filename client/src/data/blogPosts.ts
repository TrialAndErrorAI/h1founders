export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content?: string
  date: string
  readTime: number
  tags: string[]
  views?: number
  isViral?: boolean
  substackUrl?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'escape-h1b-matrix',
    title: '15 Years in the US. Still 60 Days from Deportation.',
    excerpt: 'The viral LinkedIn post that started a movement. How I realized the H1B system was designed to keep us enslaved.',
    date: '2024-03-15',
    readTime: 8,
    tags: ['H1B', 'Immigration', 'Viral', 'Origin Story'],
    views: 125000,
    isViral: true,
    substackUrl: 'https://h1bfounders.substack.com/p/escape-h1b-matrix'
  },
  {
    id: 'eb1a-truth',
    title: 'The EB1-A Truth No Immigration Lawyer Will Tell You',
    excerpt: 'You don\'t need a Nobel Prize. You need $1M revenue and the balls to self-sponsor.',
    date: '2024-04-20',
    readTime: 12,
    tags: ['EB1-A', 'Green Card', 'Self-Sponsorship'],
    views: 85000,
    isViral: true
  },
  {
    id: 'bootstrap-to-freedom',
    title: 'How I Bootstrapped to $3M ARR While on H1B',
    excerpt: 'The exact playbook: side project → profitable SaaS → self-sponsored green card.',
    date: '2024-05-10',
    readTime: 15,
    tags: ['Bootstrap', 'SaaS', 'Revenue', 'Strategy'],
    views: 67000,
    isViral: true
  },
  {
    id: 'banking-guide',
    title: 'The Immigrant Founder\'s Guide to US Banking',
    excerpt: 'Which banks actually work with H1B founders. Spoiler: Not many.',
    date: '2024-06-05',
    readTime: 10,
    tags: ['Banking', 'Practical', 'Guide'],
    views: 45000
  },
  {
    id: 'delaware-c-corp',
    title: 'Why Delaware C-Corp is the Only Structure That Matters',
    excerpt: 'Stop overthinking. Here\'s the 30-minute incorporation process.',
    date: '2024-06-18',
    readTime: 7,
    tags: ['Incorporation', 'Legal', 'Guide'],
    views: 38000
  },
  {
    id: 'first-100k',
    title: 'From 0 to $100K ARR in 6 Months',
    excerpt: 'The unglamorous truth about finding product-market fit on a visa.',
    date: '2024-07-02',
    readTime: 11,
    tags: ['Revenue', 'Growth', 'PMF'],
    views: 52000
  },
  {
    id: 'eb2-trap',
    title: 'The EB2 Trap: Why Indians Will Wait Until 2175',
    excerpt: 'The math doesn\'t lie. Your great-great-grandchildren might get your green card.',
    date: '2024-07-15',
    readTime: 9,
    tags: ['EB2', 'Immigration', 'Reality Check'],
    views: 71000,
    isViral: true
  },
  {
    id: 'lawyers-dont-want',
    title: '5 Things Immigration Lawyers Don\'t Want You to Know',
    excerpt: 'Why they push EB2 when EB1-A is achievable. Follow the money.',
    date: '2024-08-01',
    readTime: 8,
    tags: ['Legal', 'EB1-A', 'Truth'],
    views: 44000
  },
  {
    id: 'opt-to-h1b',
    title: 'The OPT to H1B to Founder Pipeline',
    excerpt: 'How to use your 3-year OPT window to build a business that sponsors you.',
    date: '2024-08-14',
    readTime: 13,
    tags: ['OPT', 'H1B', 'Strategy'],
    views: 31000
  },
  {
    id: 'community-power',
    title: 'Why 1,400 Founders Changed Everything',
    excerpt: 'The network effect of immigrant founders supporting each other.',
    date: '2024-08-28',
    readTime: 6,
    tags: ['Community', 'Network', 'Movement'],
    views: 28000
  },
  {
    id: 'revenue-milestones',
    title: 'The Only 3 Revenue Milestones That Matter for EB1-A',
    excerpt: '$100K proves concept. $500K proves traction. $1M proves extraordinary.',
    date: '2024-09-10',
    readTime: 10,
    tags: ['Revenue', 'EB1-A', 'Milestones'],
    views: 59000
  },
  {
    id: 'side-project-myth',
    title: 'The "Side Project" Myth That Keeps You Enslaved',
    excerpt: 'Your employer owns everything you build. Unless you know this one trick.',
    date: '2024-09-20',
    readTime: 7,
    tags: ['Legal', 'Side Project', 'IP'],
    views: 41000
  },
  {
    id: 'fundraising-visa',
    title: 'Why I Said No to $2M in VC Money',
    excerpt: 'VCs and visa restrictions don\'t mix. Bootstrap or die.',
    date: '2024-10-05',
    readTime: 11,
    tags: ['Fundraising', 'VC', 'Bootstrap'],
    views: 36000
  },
  {
    id: 'hiring-first-employee',
    title: 'Hiring Your First Employee as an H1B Founder',
    excerpt: 'The legal gymnastics required and why it\'s worth it.',
    date: '2024-10-18',
    readTime: 9,
    tags: ['Hiring', 'Legal', 'Growth'],
    views: 27000
  },
  {
    id: 'extraordinary-ability',
    title: 'Redefining "Extraordinary Ability" for the USCIS',
    excerpt: 'It\'s not about being extraordinary. It\'s about proving it on paper.',
    date: '2024-11-01',
    readTime: 14,
    tags: ['EB1-A', 'USCIS', 'Strategy'],
    views: 48000
  },
  {
    id: 'failed-three-times',
    title: 'I Failed 3 Startups Before This One Worked',
    excerpt: 'The failures that taught me how to build a visa-sponsoring business.',
    date: '2024-11-15',
    readTime: 12,
    tags: ['Failure', 'Learning', 'Persistence'],
    views: 33000
  },
  {
    id: 'sales-without-ssn',
    title: 'How to Sell B2B Without a Real SSN',
    excerpt: 'The workarounds for background checks, credit checks, and enterprise sales.',
    date: '2024-11-28',
    readTime: 8,
    tags: ['Sales', 'B2B', 'Practical'],
    views: 29000
  },
  {
    id: 'december-deadline',
    title: 'Why December is the Best Month to Start',
    excerpt: 'Everyone\'s distracted. Perfect time to build in stealth.',
    date: '2024-12-10',
    readTime: 5,
    tags: ['Strategy', 'Timing', 'Motivation'],
    views: 24000
  },
  {
    id: '2024-recap',
    title: '2024: The Year 1,400 Founders Woke Up',
    excerpt: 'From a LinkedIn rant to a movement. What we built together.',
    date: '2024-12-28',
    readTime: 10,
    tags: ['Year in Review', 'Community', 'Growth'],
    views: 51000
  },
  {
    id: '2025-predictions',
    title: '2025: The Year of the Immigrant Founder',
    excerpt: 'Why the next 12 months will see an explosion of H1B entrepreneurs.',
    date: '2025-01-10',
    readTime: 8,
    tags: ['Predictions', 'Trends', 'Future'],
    views: 42000
  }
]

export const getTopPosts = (limit: number = 5): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
}

export const getViralPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.isViral)
}

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag))
}

export const getRecentPosts = (limit: number = 10): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase()
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}