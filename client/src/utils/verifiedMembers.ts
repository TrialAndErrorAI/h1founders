// Verified Members Management (stored in Firestore, not source code)
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

// Check if a phone number is a verified WhatsApp member
export async function isVerifiedMember(phoneNumber: string | null): Promise<boolean> {
  if (!phoneNumber) return false
  
  try {
    // Normalize phone number (remove + and any formatting)
    const normalized = phoneNumber.replace(/[\s\-\(\)+]/g, '')
    
    // Query Firestore for this phone number
    const q = query(
      collection(db, 'verifiedMembers'),
      where('phone', '==', normalized)
    )
    
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error('Error checking verified status:', error)
    return false
  }
}

// Add a verified member (used by import script)
export async function addVerifiedMember(
  phoneNumber: string, 
  name?: string,
  pushName?: string
): Promise<void> {
  const normalized = phoneNumber.replace(/[\s\-\(\)+]/g, '')
  
  const docRef = doc(collection(db, 'verifiedMembers'))
  await setDoc(docRef, {
    phone: normalized,
    name: name || null,
    pushName: pushName || null,
    source: 'whatsapp',
    addedAt: new Date(),
    verified: true
  })
}