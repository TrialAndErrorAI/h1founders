# Firestore MVP Schema - Ship Now, Expand Later

## Phase 1: MVP Collections (Ship This Week)

### `members` (Authenticated users - SIMPLIFIED)
```javascript
{
  uid: string,              // Firebase Auth UID (document ID)
  
  // Core Identity (Required)
  phone: string,            // From Firebase Auth
  name: string,             // Display name
  
  // Basic Profile (Optional)
  company: string,          
  role: string,             // Founder, Co-founder, etc.
  location: string,         // City, State
  visaType: string,         // H1B, O1, L1, GC, Citizen
  
  // Community Status
  isWhatsAppMember: boolean,    // Pre-existing member
  whatsappJoinedDate: timestamp, // When they joined WhatsApp
  
  // System Fields
  createdAt: timestamp,
  lastActive: timestamp,
  profileComplete: boolean
}
```

### `unclaimed` (Pre-imported WhatsApp members - MINIMAL)
```javascript
{
  id: string,
  phone: string,            // WhatsApp phone number
  name: string,             // Name from WhatsApp export
  joinedDate: timestamp,    // When joined WhatsApp group
  status: 'unclaimed'
}
```

## Phase 2: Add When Forum Goes Live (Week 2)

### `forum_threads`
```javascript
{
  id: string,
  title: string,
  content: string,
  
  authorId: string,         
  authorName: string,       // Denormalized for speed
  
  upvotes: number,
  replyCount: number,
  
  createdAt: timestamp,
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
  
  createdAt: timestamp
}
```

## Phase 3: Add When Monetizing (Month 2)

### Add to `members`:
```javascript
subscription: {
  tier: 'free' | 'club_h1',
  expiresAt: timestamp
}
```

### New collection `waitlist`:
```javascript
{
  email: string,
  source: string,
  createdAt: timestamp
}
```

## Phase 4: Scale Features (Month 3+)

Per ATLAS recommendations:
- `events` collection
- `notifications` preferences
- Vote tracking subcollections
- Badge progression history
- Referral system
- Search optimization fields

## Security Rules (MVP)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Members can read all, write own
    match /members/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Unclaimed profiles - read only for matching
    match /unclaimed/{document} {
      allow read: if request.auth != null;
      allow write: if false; // Admin only via backend
    }
    
    // Forum (when ready)
    match /forum_threads/{thread} {
      allow read: if true; // Public for SEO
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

## Import Strategy for 781 WhatsApp Members

1. **Minimal import to `unclaimed`:**
```javascript
// Just enough to claim profiles
{
  phone: '+1234567890',
  name: 'John Doe',
  joinedDate: 'March 2024',
  status: 'unclaimed'
}
```

2. **When user claims:**
   - Match by phone number
   - Create full `members` profile
   - Delete from `unclaimed`
   - Mark as `isWhatsAppMember: true`

## ATLAS's Key Insights Applied:

✅ **Start lean** - 10 fields not 60
✅ **Phone-first** - Perfect for WhatsApp community  
✅ **Pre-populate** - 781 members ready to claim
✅ **Denormalize** - authorName for performance
✅ **Privacy later** - Add controls when needed
✅ **Scale ready** - Clear upgrade path defined

## Next Actions:

1. ✅ Deploy this MVP schema
2. ✅ Import 781 WhatsApp members (minimal data)
3. ✅ Build simple member directory
4. ✅ Ship and iterate based on usage

---
*Pragmatic approach: Ship working features, not perfect architecture*