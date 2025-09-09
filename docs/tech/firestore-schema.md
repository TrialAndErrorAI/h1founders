# Firestore Database Schema

## Collections Structure

### `members` (Authenticated user profiles)
```javascript
{
  uid: string,              // Firebase Auth UID (document ID)
  
  // Authentication
  phone: string,            // Primary phone (from WhatsApp)
  email: string,            // Email (from Substack)
  phoneVerified: boolean,
  emailVerified: boolean,
  
  // Profile Info
  name: string,
  company: string,
  role: string,             // Founder, Co-founder, etc.
  location: string,         // City, State
  
  // Visa/Immigration
  visaType: string,         // H1B, O1, L1, GC, Citizen
  yearsInUS: number,
  greenCardStage: string,   // PERM, I-140, I-485, Approved
  
  // Business Info
  industry: string,
  stage: string,            // Idea, MVP, Revenue, Profitable
  revenue: string,          // Range: "$0", "$1-10K", "$10-100K", etc.
  fundingStatus: string,    // Bootstrapped, VC-backed, etc.
  
  // Community
  isWhatsAppMember: boolean,
  whatsAppJoinedDate: timestamp,
  isSubstackSubscriber: boolean,
  substackJoinedDate: timestamp,
  
  // Badge/Progress
  badge: string,            // BLUE_PILL, UNPLUGGED, FREED_MIND, etc.
  points: number,
  achievements: array,
  
  // Social Links
  linkedin: string,
  twitter: string,
  website: string,
  
  // Privacy Settings
  profileVisibility: string, // public, members, private
  showPhone: boolean,
  showEmail: boolean,
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  lastActive: timestamp,
  profileComplete: boolean,
  claimedAt: timestamp      // When WhatsApp member claimed profile
}
```

### `unclaimed` (Pre-imported WhatsApp/Substack members)
```javascript
{
  id: string,
  source: 'whatsapp' | 'substack' | 'both',
  phone: string,            // From WhatsApp export
  email: string,            // From Substack export
  name: string,             // If available
  joinedDate: timestamp,
  status: 'unclaimed',
  
  // After claiming, this doc is deleted and member doc created
}
```

### `forum_threads`
```javascript
{
  id: string,
  category: string,         // THE_CONSTRUCT, THE_MATRIX, etc.
  type: string,             // QUESTION, DISCUSSION, MILESTONE, etc.
  
  title: string,
  content: string,
  
  authorId: string,         // uid from members
  authorName: string,       // Denormalized for performance
  authorBadge: string,      // Denormalized
  
  upvotes: number,
  downvotes: number,
  replyCount: number,
  viewCount: number,
  
  isPinned: boolean,
  isLocked: boolean,
  isClubH1: boolean,        // Premium content
  
  tags: array,
  
  createdAt: timestamp,
  updatedAt: timestamp,
  lastReplyAt: timestamp
}
```

### `forum_replies`
```javascript
{
  id: string,
  threadId: string,
  
  content: string,
  
  authorId: string,
  authorName: string,
  authorBadge: string,
  
  upvotes: number,
  downvotes: number,
  
  isAccepted: boolean,      // For Q&A threads
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `waitlist` (Email captures)
```javascript
{
  id: string,
  email: string,
  source: string,           // network-access, academy, etc.
  createdAt: timestamp
}
```

## Security Rules Strategy

```javascript
// Public read for forum (SEO)
// Auth required for write
// Private member data behind auth
// Phone/email never exposed publicly
```

## Indexes Needed

1. `members` - by location, visaType, industry
2. `forum_threads` - by category, createdAt desc
3. `forum_replies` - by threadId, createdAt asc
4. `unclaimed` - by phone, email (for matching)

## Phone + Email Linking Flow

1. User signs in with phone → member doc created
2. User adds email → triggers verification
3. Check `unclaimed` collection for email match
4. If Substack subscriber found → merge data
5. Update member doc with `isSubstackSubscriber: true`
6. Same flow works in reverse (email first, then phone)