import { Thread, Post, ForumCategory, ThreadType } from '../types/forum.types'
import { getMockUser } from './mockUsers'

export const mockThreads: Thread[] = [
  {
    id: 'thread-1',
    title: '🚨 URGENT: Lost job, 60-day clock started. What are my options?',
    category: ForumCategory.THE_MATRIX,
    type: ThreadType.WARNING,
    author: getMockUser('carlos_freed')!,
    content: `Just got laid off from my FAANG job. I have 60 days to find a new job or leave the country. I've been thinking about starting my own company but don't know if it's possible on H1B.

Has anyone successfully navigated this? I have about $50K saved up and an idea for a B2B SaaS product.

Please help - feeling lost and time is ticking.`,
    createdAt: '2024-09-06T10:00:00Z',
    updatedAt: '2024-09-06T15:30:00Z',
    views: 342,
    replies: 28,
    lastReply: {
      author: getMockUser('sid')!,
      createdAt: '2024-09-06T15:30:00Z'
    },
    isPinned: true,
    tags: ['60-day-grace', 'layoff', 'urgent']
  },
  {
    id: 'thread-2',
    title: '🎉 VICTORY: Just got my EB-1A approved in 14 months!',
    category: ForumCategory.CLUB_H1,
    type: ThreadType.VICTORY,
    author: getMockUser('raj_neo')!,
    content: `Brothers and sisters, I'm literally shaking as I write this. Just got the approval notice for my EB-1A!

Timeline:
- July 2023: Started preparing evidence
- September 2023: Filed I-140 (premium processing)
- October 2023: RFE received
- November 2023: RFE response submitted
- September 2024: APPROVED!

My profile:
- 3 patents
- 12 peer-reviewed publications
- $180K ARR from my startup
- Judge for 2 startup competitions

The key was showing extraordinary ability through my startup's traction. Happy to answer any questions!`,
    createdAt: '2024-09-05T18:00:00Z',
    updatedAt: '2024-09-06T12:00:00Z',
    views: 892,
    replies: 45,
    aiParticipated: true,
    tags: ['eb1a', 'success', 'timeline']
  },
  {
    id: 'thread-3',
    title: 'Can I angel invest while on H1B? Found an amazing opportunity',
    category: ForumCategory.THE_MATRIX,
    type: ThreadType.QUESTION,
    author: getMockUser('lisa_unplugged')!,
    content: `A friend is raising a seed round for their AI startup and offered me a chance to invest $25K. I'm on H1B with a stable job at Google.

Is this allowed? Would it jeopardize my visa status? I don't want to miss out but also can't risk my immigration status.

Anyone done this before?`,
    createdAt: '2024-09-06T08:00:00Z',
    updatedAt: '2024-09-06T14:00:00Z',
    views: 156,
    replies: 12,
    lastReply: {
      author: getMockUser('priya_morpheus')!,
      createdAt: '2024-09-06T14:00:00Z'
    },
    tags: ['h1b', 'investing', 'passive-income']
  },
  {
    id: 'thread-4',
    title: '📊 RESOURCE: Template for EB-1A evidence organization',
    category: ForumCategory.THE_REAL_WORLD,
    type: ThreadType.RESOURCE,
    author: getMockUser('priya_morpheus')!,
    content: `After helping 50+ founders with their EB-1A applications, I've created a comprehensive template for organizing your evidence.

The template includes:
- Evidence checklist for all 10 criteria
- Document naming convention
- RFE response framework
- Letter templates for recommenders

Download link: [template.h1founders.com/eb1a]

Remember: Organization is key. USCIS officers spend ~15 minutes on each case. Make it easy for them to say YES.

Please share your feedback and let me know if you need help using it!`,
    createdAt: '2024-09-04T16:00:00Z',
    updatedAt: '2024-09-05T10:00:00Z',
    views: 567,
    replies: 23,
    tags: ['eb1a', 'resources', 'template']
  },
  {
    id: 'thread-5',
    title: '🔮 PROPHECY: The H1B lottery will be replaced by 2026',
    category: ForumCategory.ORACLE_CHAMBER,
    type: ThreadType.PROPHECY,
    author: getMockUser('sid')!,
    content: `Mark my words: The H1B lottery system is dying and will be replaced by a merit-based system by 2026.

Here's what I'm seeing:
1. Fraud has reached unprecedented levels (780K registrations for 85K spots)
2. Big Tech is lobbying hard for change
3. USCIS is already testing wage-based selection

What this means for you:
- If you're waiting for the lottery: STOP. Start building NOW.
- Revenue and value creation will become the primary criteria
- Self-sponsored founders will have a massive advantage

The future belongs to builders, not lottery winners.

This is not speculation. This is what's coming. Prepare accordingly.`,
    createdAt: '2024-09-03T20:00:00Z',
    updatedAt: '2024-09-06T09:00:00Z',
    views: 1243,
    replies: 67,
    isPinned: true,
    tags: ['prophecy', 'h1b-reform', 'future']
  },
  {
    id: 'thread-6',
    title: 'New here - Indian on H1B, 150 year wait for GC. Is there hope?',
    category: ForumCategory.THE_CONSTRUCT,
    type: ThreadType.INTRODUCTION,
    author: getMockUser('ahmed_blue')!,
    content: `Hi everyone,

Just discovered this community through LinkedIn. I'm Ahmed, software engineer at Microsoft, been on H1B for 3 years.

My lawyer says the EB2 wait for India is 150+ years. I feel trapped. My manager won't support EB1 and I don't know if I can start a company.

Is there really a way out? Or should I just accept my fate?

Looking for some hope...`,
    createdAt: '2024-09-06T11:00:00Z',
    updatedAt: '2024-09-06T16:00:00Z',
    views: 89,
    replies: 15,
    lastReply: {
      author: getMockUser('manisha')!,
      createdAt: '2024-09-06T16:00:00Z'
    },
    tags: ['introduction', 'eb2-india', 'trapped']
  },
  {
    id: 'thread-7',
    title: 'Strategy: How I went from $0 to $300K ARR in 18 months',
    category: ForumCategory.THE_REAL_WORLD,
    type: ThreadType.RESOURCE,
    author: getMockUser('maria_neo')!,
    content: `Sharing my playbook for fellow founders:

Month 1-3: Research & Validation
- Talked to 200+ potential customers
- Built MVP in 2 weeks (no-code first)
- Got 5 beta users

Month 4-9: Product-Market Fit
- Iterated based on feedback
- Hired first contractor on Upwork
- Hit $10K MRR

Month 10-18: Scale
- Raised $500K from angels (all remote, no equity given to US persons)
- Hired 3 full-time engineers (all remote)
- Automated everything possible
- Now at $25K MRR ($300K ARR)

Key lessons:
1. Start before you're ready
2. Your H1B is an asset (global perspective)
3. Revenue solves all immigration problems

Full breakdown with numbers in the comments...`,
    createdAt: '2024-09-02T14:00:00Z',
    updatedAt: '2024-09-05T08:00:00Z',
    views: 723,
    replies: 52,
    aiParticipated: true,
    tags: ['strategy', 'revenue', 'growth']
  },
  {
    id: 'thread-8',
    title: 'Failed my first startup. Visa expires in 4 months. Do I give up?',
    category: ForumCategory.CLUB_H1,
    type: ThreadType.QUESTION,
    author: getMockUser('david_freed')!,
    content: `Brutal honesty time.

Quit my job 8 months ago to build an EdTech platform. Burned through $30K of savings. Have 3 customers paying $99/month. That's it.

My O-1 expires in 4 months. Can't afford a lawyer for renewal. Parents want me to come back to Korea.

Part of me wants to give up. Part of me knows I'm so close to breakthrough.

Has anyone been here? How did you push through?`,
    createdAt: '2024-09-05T22:00:00Z',
    updatedAt: '2024-09-06T10:00:00Z',
    views: 234,
    replies: 31,
    lastReply: {
      author: getMockUser('atlas')!,
      createdAt: '2024-09-06T10:00:00Z'
    },
    tags: ['failure', 'perseverance', 'visa-expiry']
  }
]

export const mockPosts: Record<string, Post[]> = {
  'thread-1': [
    {
      id: 'post-1-1',
      threadId: 'thread-1',
      author: getMockUser('priya_morpheus')!,
      content: `First, breathe. You have more options than you think.

Option 1: Start a company NOW. You can incorporate while on H1B (passive ownership is allowed).
Option 2: Find another job but negotiate for them to sponsor your green card immediately.
Option 3: Switch to O-1 if you have achievements.

I helped 10 people in your exact situation. DM me for a detailed action plan.`,
      createdAt: '2024-09-06T10:30:00Z',
      upvotes: 45,
      downvotes: 2
    },
    {
      id: 'post-1-2',
      threadId: 'thread-1',
      author: getMockUser('atlas')!,
      content: `Based on analysis of 500+ similar cases in our database:

✅ 73% who started companies during grace period successfully transitioned to O-1 or EB-1
✅ Average time to first revenue: 3.5 months
✅ Key success factor: Leveraging domain expertise from previous role

Recommended immediate actions:
1. Incorporate in Delaware (can be done in 24 hours)
2. Open business bank account with Mercury or Brex
3. Start building MVP while interviewing

Remember: You're not starting from zero. Your FAANG experience is a massive asset.`,
      createdAt: '2024-09-06T11:00:00Z',
      upvotes: 67,
      downvotes: 0,
      isAIGenerated: true
    },
    {
      id: 'post-1-3',
      threadId: 'thread-1',
      author: getMockUser('sid')!,
      content: `Carlos, this is your moment of transformation.

The system wants you to panic and take another soul-crushing job. Don't.

Here's exactly what you do:
1. Tomorrow morning, incorporate a Delaware C-Corp
2. Transfer your idea into the company
3. Start selling immediately (even if product isn't ready)
4. Document EVERYTHING for your O-1

I've seen this movie 100 times. The ones who bet on themselves ALWAYS win.

Your $50K is more than enough. Most successful founders started with less.

Stop asking for permission. Start building your empire.

The clock isn't ticking down - it's counting up to your freedom.`,
      createdAt: '2024-09-06T15:30:00Z',
      upvotes: 128,
      downvotes: 3,
      isSolution: true
    }
  ],
  'thread-2': [
    {
      id: 'post-2-1',
      threadId: 'thread-2',
      author: getMockUser('lisa_unplugged')!,
      content: `Congratulations Raj! This is incredible! 

Can you share more about how you presented your startup traction as evidence? I have $150K ARR but my lawyer says it's not enough for EB-1A.`,
      createdAt: '2024-09-05T18:30:00Z',
      upvotes: 23,
      downvotes: 0
    },
    {
      id: 'post-2-2',
      threadId: 'thread-2',
      author: getMockUser('raj_neo')!,
      content: `@lisa_unplugged Thanks! Revenue alone isn't enough - you need to show how it demonstrates extraordinary ability.

I positioned it as:
- "Original business contribution" - my unique approach to the market
- "Judge of others" - I evaluate and select customers (sounds silly but works)
- "Leading role" - CEO of a high-growth company

The key is the narrative. Connect everything to show a pattern of excellence.`,
      createdAt: '2024-09-05T19:00:00Z',
      upvotes: 56,
      downvotes: 0
    },
    {
      id: 'post-2-3',
      threadId: 'thread-2',
      author: getMockUser('atlas')!,
      content: `Congratulations on your approval! Your case fits the success pattern perfectly:

Statistical correlation with approval:
- Patents: +32% approval rate
- Revenue >$100K: +47% approval rate  
- Publications >10: +28% approval rate
- Your profile combined: 89% predicted approval

For others reading: The key differentiator was the business traction. Focus on revenue generation and document your unique methodology.`,
      createdAt: '2024-09-06T09:00:00Z',
      upvotes: 41,
      downvotes: 1,
      isAIGenerated: true
    }
  ],
  'thread-5': [
    {
      id: 'post-5-1',
      threadId: 'thread-5',
      author: getMockUser('maria_neo')!,
      content: `Sid, this aligns with what I'm hearing from my immigration lawyer too. They said USCIS is piloting new programs that prioritize "economic contribution" over random selection.

For those reading: START BUILDING NOW. Don't wait for the perfect visa situation.`,
      createdAt: '2024-09-03T20:30:00Z',
      upvotes: 89,
      downvotes: 5
    },
    {
      id: 'post-5-2',
      threadId: 'thread-5',
      author: getMockUser('ahmed_blue')!,
      content: `But how can we build while on H1B? My lawyer says I can't do anything except my day job. This feels like false hope...`,
      createdAt: '2024-09-04T10:00:00Z',
      upvotes: 12,
      downvotes: 23
    },
    {
      id: 'post-5-3',
      threadId: 'thread-5',
      author: getMockUser('sid')!,
      content: `@ahmed_blue Your lawyer is protecting themselves, not you.

You CAN:
- Start a company (passive ownership)
- Build products (as learning/hobby)
- Generate ideas and IP
- Network and find co-founders
- Learn and prepare

You CAN'T:
- Work for your company while on H1B
- Take salary from it

See the difference? You can build the foundation now and activate it when ready.

Stop living in fear. Start living in possibility.`,
      createdAt: '2024-09-04T11:00:00Z',
      upvotes: 156,
      downvotes: 2
    }
  ]
}

export function getMockThread(id: string): Thread | undefined {
  return mockThreads.find(thread => thread.id === id)
}

export function getMockThreadsByCategory(category: ForumCategory): Thread[] {
  return mockThreads.filter(thread => thread.category === category)
}

export function getMockPosts(threadId: string): Post[] {
  return mockPosts[threadId] || []
}