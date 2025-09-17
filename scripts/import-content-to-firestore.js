#!/usr/bin/env node
/**
 * Import existing content from contentIndex.json into Firestore
 * This creates real forum threads from static content
 * Run once to populate the forum with initial content
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Firebase config (same as in the app)
const firebaseConfig = {
  apiKey: "AIzaSyBpIDXRzyhFe3nLvP1cYWFQxTGOCMJSpao",
  authDomain: "h1founders.firebaseapp.com",
  projectId: "h1founders",
  storageBucket: "h1founders.firebasestorage.app",
  messagingSenderId: "648172571873",
  appId: "1:648172571873:web:e940cf0f29c5ad582c2233",
  measurementId: "G-MB23CF4KSD"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Read content index
const contentPath = join(__dirname, '../client/src/data/contentIndex.json')
const content = JSON.parse(readFileSync(contentPath, 'utf-8'))

// Map content types to forum thread types
const contentTypeToThreadType = {
  'ANNOUNCEMENT': 'PROPHECY',
  'announcement': 'PROPHECY',
  'RESOURCE': 'RESOURCE',
  'PROPHECY': 'PROPHECY',
  'STORY': 'VICTORY',
  'GUIDE': 'RESOURCE',
  'TOOL': 'RESOURCE'
}

async function checkExistingThread(title) {
  const q = query(collection(db, 'forum_threads'), where('title', '==', title))
  const snapshot = await getDocs(q)
  return !snapshot.empty
}

async function importContent() {
  console.log('🚀 Starting content import to Firestore...')
  console.log(`📚 Found ${content.threads.length} content pieces to import`)

  let imported = 0
  let skipped = 0

  for (const thread of content.threads) {
    // Check if thread already exists (avoid duplicates)
    const exists = await checkExistingThread(thread.title)
    if (exists) {
      console.log(`⏭️  Skipping "${thread.title}" (already exists)`)
      skipped++
      continue
    }

    try {
      // Create forum thread in Firestore
      const threadData = {
        // Core content
        title: thread.title,
        content: thread.content || thread.excerpt || '',
        category: thread.category || 'THE_CONSTRUCT',

        // Author info (ATLAS/Sid as author for official content)
        authorId: 'atlas-system',
        authorName: thread.isOfficial ? '@sid' : thread.author?.name || 'ATLAS',
        authorBadge: thread.author?.badge || 'THE_ARCHITECT',

        // Metadata
        contentType: contentTypeToThreadType[thread.contentType] || 'RESOURCE',
        isPinned: thread.isPinned || false,
        isOfficial: thread.isOfficial || false,
        sourceUrl: thread.sourceUrl || '',

        // Counters
        replyCount: 0,
        upvotes: 0,
        views: 0,

        // Timestamps
        createdAt: serverTimestamp(),
        lastReplyAt: serverTimestamp(),

        // Original content metadata
        originalId: thread.id,
        importedFrom: 'contentIndex',
        importedAt: serverTimestamp()
      }

      // Generate SEO-friendly slug from title
      const slug = thread.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 60) // Keep it reasonable length

      // Use setDoc with custom ID instead of addDoc for predictable URLs
      const docId = thread.id || `${slug}-${Date.now()}`
      const docRef = doc(db, 'forum_threads', docId)
      await setDoc(docRef, threadData)
      console.log(`✅ Imported "${thread.title}" (ID: ${docRef.id})`)
      imported++

    } catch (error) {
      console.error(`❌ Failed to import "${thread.title}":`, error.message)
    }
  }

  console.log('\n📊 Import Summary:')
  console.log(`✅ Successfully imported: ${imported} threads`)
  console.log(`⏭️  Skipped (already exist): ${skipped} threads`)
  console.log(`📚 Total in forum: ${imported + skipped} threads`)

  console.log('\n🎯 Next Steps:')
  console.log('1. Visit https://master.h1founders.pages.dev/forum to see imported threads')
  console.log('2. Test creating new threads and replies')
  console.log('3. ATLAS can continue adding markdown files to /content/')
  console.log('4. Run this script again anytime to import new content')

  process.exit(0)
}

// Run the import
importContent().catch(error => {
  console.error('💥 Import failed:', error)
  process.exit(1)
})