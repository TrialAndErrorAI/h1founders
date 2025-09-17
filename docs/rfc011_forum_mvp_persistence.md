# RFC 011: Forum MVP Persistence - Ship Today, Perfect Later
**Date**: September 17, 2025
**Status**: ACTIVE
**Priority**: SHIP NOW

## Problem
Forum has no persistence - all comments are dummy. We need REAL data persistence to launch.

## Philosophy
"Fix the problem, not the blame" - We need working forums, not perfect forums.

## MVP Scope (What Ships Today)

### Just Two Collections - That's It
```
firestore/
├── forum_threads/    # User posts
└── forum_replies/    # Comments on posts
```

### 1. forum_threads (MINIMAL)
```typescript
{
  id: string,           // Auto-generated

  // Content
  title: string,
  content: string,      // Markdown text
  category: string,     // THE_CONSTRUCT, THE_MATRIX, etc.

  // Author (denormalized for speed)
  authorId: string,     // Firebase Auth UID
  authorName: string,   // Display name
  authorBadge: string,  // BLUE_PILL, NEO, etc.

  // Counters (denormalized)
  replyCount: number,   // Increment on reply
  upvotes: number,      // Simple counter

  // Timestamps
  createdAt: timestamp,
  lastReplyAt: timestamp
}
```

### 2. forum_replies (MINIMAL)
```typescript
{
  id: string,
  threadId: string,     // Parent thread

  // Content
  content: string,      // Markdown text

  // Author (denormalized)
  authorId: string,
  authorName: string,
  authorBadge: string,

  // Simple voting
  upvotes: number,

  createdAt: timestamp
}
```

## What We're NOT Building (Yet)
- ❌ Downvotes (just upvotes for now)
- ❌ Nested replies (flat comments only)
- ❌ Edit history (can edit, no tracking)
- ❌ View counts (not critical)
- ❌ Vote tracking (who voted for what)
- ❌ Thread tags (category is enough)
- ❌ Pinned posts (sort by recent)
- ❌ Search (Ctrl+F works)

## Implementation Plan (Today)

### Step 1: Create ForumService (~1 hour)
```typescript
// services/forumService.ts
import { db } from '../config/firebase'
import {
  collection, doc, addDoc, updateDoc,
  query, where, orderBy, limit, onSnapshot,
  increment, serverTimestamp
} from 'firebase/firestore'

export class ForumService {
  // Threads
  async createThread(title, content, category, author) {
    return addDoc(collection(db, 'forum_threads'), {
      title,
      content,
      category,
      authorId: author.uid,
      authorName: author.name,
      authorBadge: author.badge || 'BLUE_PILL',
      replyCount: 0,
      upvotes: 0,
      createdAt: serverTimestamp(),
      lastReplyAt: serverTimestamp()
    })
  }

  async getThreads(category = null) {
    let q = query(
      collection(db, 'forum_threads'),
      orderBy('lastReplyAt', 'desc'),
      limit(20)
    )
    if (category) {
      q = query(q, where('category', '==', category))
    }
    // Execute and return
  }

  // Replies
  async createReply(threadId, content, author) {
    // Add reply
    const reply = await addDoc(collection(db, 'forum_replies'), {
      threadId,
      content,
      authorId: author.uid,
      authorName: author.name,
      authorBadge: author.badge || 'BLUE_PILL',
      upvotes: 0,
      createdAt: serverTimestamp()
    })

    // Update thread counters
    await updateDoc(doc(db, 'forum_threads', threadId), {
      replyCount: increment(1),
      lastReplyAt: serverTimestamp()
    })

    return reply
  }

  async getReplies(threadId) {
    return query(
      collection(db, 'forum_replies'),
      where('threadId', '==', threadId),
      orderBy('createdAt', 'asc')
    )
  }

  // Voting (simple)
  async upvoteThread(threadId) {
    return updateDoc(doc(db, 'forum_threads', threadId), {
      upvotes: increment(1)
    })
  }

  async upvoteReply(replyId) {
    return updateDoc(doc(db, 'forum_replies', replyId), {
      upvotes: increment(1)
    })
  }

  // Real-time (basic)
  subscribeToThread(threadId, callback) {
    const q = query(
      collection(db, 'forum_replies'),
      where('threadId', '==', threadId),
      orderBy('createdAt', 'asc')
    )
    return onSnapshot(q, callback)
  }
}
```

### Step 2: Update Forum UI (~30 min)
```typescript
// pages/forum/index.tsx
const forumService = new ForumService()

// Replace mock data with:
const [threads, setThreads] = useState([])

useEffect(() => {
  const loadThreads = async () => {
    const dbThreads = await forumService.getThreads(selectedCategory)
    setThreads([
      ...contentThreads,  // Keep static content
      ...dbThreads        // Add dynamic threads
    ])
  }
  loadThreads()
}, [selectedCategory])
```

### Step 3: Wire Up Create Thread (~30 min)
```typescript
// CreateThread.tsx
const handleSubmit = async () => {
  await forumService.createThread(
    title,
    content,
    category,
    { uid: user.uid, name: profile.name, badge: profile.matrixLevel }
  )
  navigate('/forum')
}
```

### Step 4: Wire Up Replies (~30 min)
```typescript
// ForumThread.tsx
const handleReply = async () => {
  await forumService.createReply(
    threadId,
    replyContent,
    { uid: user.uid, name: profile.name, badge: profile.matrixLevel }
  )
  setReplyContent('')
}
```

## Security Rules (SIMPLE)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Threads: Anyone can read, auth to write
    match /forum_threads/{thread} {
      allow read: if true;  // Public for SEO
      allow create: if request.auth != null;
      allow update: if request.auth != null
        && request.auth.uid == resource.data.authorId;
    }

    // Replies: Same as threads
    match /forum_replies/{reply} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null
        && request.auth.uid == resource.data.authorId;
    }
  }
}
```

## Data Migration Strategy

### Keep Static Content Working
1. Continue loading markdown content
2. Mix with Firestore threads
3. Sort by date/activity
4. Users won't notice the difference

### Initial Data
- Start empty (no migration needed)
- Let users create first threads organically
- Static content provides initial value

## What Success Looks Like (Today)
- ✅ Users can create threads
- ✅ Users can reply to threads
- ✅ Replies show up in real-time
- ✅ Upvotes work (simple counter)
- ✅ Forum feels alive

## What We'll Add Later (Not Today)
- Week 2: Edit/delete functionality
- Week 3: Vote tracking (who voted)
- Month 2: Search, filters, tags
- Month 3: Moderation tools

## Cost Analysis
**Free tier covers:**
- 50,000 reads/day (plenty for 1,400 users)
- 20,000 writes/day (tons of posts/replies)
- Real-time listeners included

**We're nowhere near paid tier**

## Time Estimate
- ForumService: 1 hour
- UI Integration: 1.5 hours
- Testing: 30 minutes
- **Total: 3 hours to working forum**

## Decisions

### Why No Downvotes?
- Positive community vibe
- Simpler to implement
- Can add later if needed

### Why Denormalize Author Data?
- Avoid extra reads
- Faster rendering
- Username changes rare

### Why No Vote Tracking?
- Don't need to prevent double-voting yet
- Simpler = ship faster
- Add when it becomes a problem

## Next Actions (In Order)
1. ✅ Approve this RFC
2. ⏳ Create ForumService.ts
3. ⏳ Update forum UI components
4. ⏳ Deploy security rules
5. ⏳ Test with real posts
6. ⏳ Ship it!

---

*"Hardest part is actually having a business. Rest all is solvable."*

**This gets forums working TODAY. Perfect them tomorrow.**