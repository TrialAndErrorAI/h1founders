// Username generation for Matrix members
// Level-neutral names that don't change with progression

import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

const MATRIX_TERMS = [
  'matrix',
  'zion', 
  'nebula',
  'sentinel',
  'oracle',
  'cipher',
  'trinity',
  'switch',
  'apoc',
  'tank',
  'dozer',
  'link',
  'niobe',
  'ghost',
  'sparks',
  'keymaker',
  'seraph',
  'rama',
  'sati'
]

// Generate a random 4-digit suffix
function getRandomSuffix(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

// Check if username exists in Firestore
async function isUsernameTaken(username: string): Promise<boolean> {
  const q = query(collection(db, 'members'), where('username', '==', username))
  const snapshot = await getDocs(q)
  return !snapshot.empty
}

// Generate a unique username (with collision checking)
export async function generateUniqueUsername(): Promise<string> {
  let attempts = 0
  const maxAttempts = 10
  
  while (attempts < maxAttempts) {
    const term = MATRIX_TERMS[Math.floor(Math.random() * MATRIX_TERMS.length)]
    const suffix = getRandomSuffix()
    const username = `${term}_${suffix}`
    
    // Check if this username is already taken
    const taken = await isUsernameTaken(username)
    
    if (!taken) {
      return username
    }
    
    attempts++
  }
  
  // Fallback: Add timestamp if we can't find unique after 10 attempts
  const timestamp = Date.now().toString().slice(-6)
  return `matrix_${timestamp}`
}

// Format username for display (with @ symbol)
export function formatUsername(username: string): string {
  if (!username) return '@anonymous'
  return username.startsWith('@') ? username : `@${username}`
}

// Validate username for manual changes
export function isValidUsername(username: string): boolean {
  // Must be 3-20 chars, alphanumeric + underscore only
  const regex = /^[a-zA-Z0-9_]{3,20}$/
  return regex.test(username)
}

// TODO: Future enhancement - use LLM for more creative usernames
// Example: "quantum_rebel_7834", "freed_mind_2983", etc.