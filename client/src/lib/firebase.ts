import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, browserLocalPersistence, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// Remove analytics for now to reduce bundle size
// import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAln--PJhiSKYPKelHJMcHxbREHaOmHjcU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "h1founders.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "h1founders",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "h1founders.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "440555697620",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:440555697620:web:f66ba4ccde51ec712b1241",
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional, for analytics
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Analytics disabled to reduce bundle size - can be re-enabled later
// export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null)

// Set up auth persistence
setPersistence(auth, browserLocalPersistence)

// Export phone auth utilities
export { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential }

// Helper to format phone numbers for Firebase (E.164 format)
export function formatPhoneNumber(phone: string): string {
  // If already starts with +, assume it's properly formatted
  if (phone.startsWith('+')) {
    return phone
  }

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // US numbers (10 digits) - add +1
  if (digits.length === 10) {
    return `+1${digits}`
  }

  // US numbers with country code (11 digits starting with 1)
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }

  // For all other numbers, assume they include country code
  // Common patterns:
  // India: 91XXXXXXXXXX (12 digits total)
  // Turkey: 90XXXXXXXXX (11-12 digits)
  // UK: 44XXXXXXXXX (11-12 digits)
  return `+${digits}`
}