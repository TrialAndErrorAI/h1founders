import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  increment,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
  Unsubscribe
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { BadgeLevel } from '../types/forum.types'

// Types
interface ForumAuthor {
  uid: string
  name: string
  badge: BadgeLevel
}

interface ForumThread {
  id?: string
  title: string
  content: string
  category: string
  authorId: string
  authorName: string
  authorBadge: string
  replyCount: number
  upvotes: number
  views?: number
  createdAt: any
  lastReplyAt: any
}

interface ForumReply {
  id?: string
  threadId: string
  content: string
  authorId: string
  authorName: string
  authorBadge: string
  upvotes: number
  createdAt: any
}

export class ForumService {
  // Create a new thread
  async createThread(
    title: string,
    content: string,
    category: string,
    author: ForumAuthor
  ): Promise<string> {
    const threadData = {
      title,
      content,
      category,
      authorId: author.uid,
      authorName: author.name,
      authorBadge: author.badge || BadgeLevel.BLUE_PILL,
      replyCount: 0,
      upvotes: 0,
      views: 0,
      createdAt: serverTimestamp(),
      lastReplyAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'forum_threads'), threadData)
    return docRef.id
  }

  // Get threads (optionally filtered by category)
  async getThreads(category: string | null = null): Promise<ForumThread[]> {
    let q = query(
      collection(db, 'forum_threads'),
      orderBy('lastReplyAt', 'desc'),
      limit(20)
    )

    if (category) {
      q = query(
        collection(db, 'forum_threads'),
        where('category', '==', category),
        orderBy('lastReplyAt', 'desc'),
        limit(20)
      )
    }

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ForumThread))
  }

  // Get a single thread by ID (tries originalId first, then document ID)
  async getThread(threadId: string): Promise<ForumThread | null> {
    // First try to find by originalId (for imported content)
    try {
      const q = query(
        collection(db, 'forum_threads'),
        where('originalId', '==', threadId),
        limit(1)
      )
      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        return {
          id: doc.id,
          ...doc.data()
        } as ForumThread
      }
    } catch (error) {

    }

    // Fall back to direct document ID lookup
    const docRef = doc(db, 'forum_threads', threadId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as ForumThread
  }

  // Increment view count (handles both originalId and document ID)
  async incrementViewCount(threadId: string): Promise<void> {
    try {
      // First try to find by originalId
      const q = query(
        collection(db, 'forum_threads'),
        where('originalId', '==', threadId),
        limit(1)
      )
      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id
        await updateDoc(doc(db, 'forum_threads', docId), {
          views: increment(1)
        })
        return
      }

      // Fall back to direct document ID
      const docRef = doc(db, 'forum_threads', threadId)
      await updateDoc(docRef, {
        views: increment(1)
      })
    } catch (error) {

    }
  }

  // Create a reply to a thread
  async createReply(
    threadId: string,
    content: string,
    author: ForumAuthor
  ): Promise<string> {
    // Add the reply
    const replyData = {
      threadId,
      content,
      authorId: author.uid,
      authorName: author.name,
      authorBadge: author.badge || BadgeLevel.BLUE_PILL,
      upvotes: 0,
      createdAt: serverTimestamp()
    }

    const replyRef = await addDoc(collection(db, 'forum_replies'), replyData)

    // Update thread counters
    await updateDoc(doc(db, 'forum_threads', threadId), {
      replyCount: increment(1),
      lastReplyAt: serverTimestamp()
    })

    return replyRef.id
  }

  // Get replies for a thread
  async getReplies(threadId: string): Promise<ForumReply[]> {
    const q = query(
      collection(db, 'forum_replies'),
      where('threadId', '==', threadId),
      orderBy('createdAt', 'asc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ForumReply))
  }

  // Upvote a thread
  async upvoteThread(threadId: string): Promise<void> {
    await updateDoc(doc(db, 'forum_threads', threadId), {
      upvotes: increment(1)
    })
  }

  // Upvote a reply
  async upvoteReply(replyId: string): Promise<void> {
    await updateDoc(doc(db, 'forum_replies', replyId), {
      upvotes: increment(1)
    })
  }

  // Subscribe to thread updates (real-time)
  subscribeToThread(
    threadId: string,
    callback: (thread: ForumThread) => void
  ): Unsubscribe {
    const docRef = doc(db, 'forum_threads', threadId)
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({
          id: doc.id,
          ...doc.data()
        } as ForumThread)
      }
    })
  }

  // Subscribe to replies (real-time)
  subscribeToReplies(
    threadId: string,
    callback: (replies: ForumReply[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, 'forum_replies'),
      where('threadId', '==', threadId),
      orderBy('createdAt', 'asc')
    )

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const replies = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ForumReply))
      callback(replies)
    })
  }

  // Subscribe to category threads (real-time)
  subscribeToCategoryThreads(
    category: string,
    callback: (threads: ForumThread[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, 'forum_threads'),
      where('category', '==', category),
      orderBy('lastReplyAt', 'desc'),
      limit(20)
    )

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const threads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ForumThread))
      callback(threads)
    })
  }

  // Subscribe to all threads (real-time)
  subscribeToAllThreads(
    callback: (threads: ForumThread[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, 'forum_threads'),
      orderBy('lastReplyAt', 'desc'),
      limit(50)
    )

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const threads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ForumThread))
      callback(threads)
    })
  }
}

// Export a singleton instance
export const forumService = new ForumService()