import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, browserLocalPersistence, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// Remove analytics for now to reduce bundle size
// import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyAln--PJhiSKYPKelHJMcHxbREHaOmHjcU",
  authDomain: "h1founders.firebaseapp.com",
  projectId: "h1founders",
  storageBucket: "h1founders.firebasestorage.app",
  messagingSenderId: "440555697620",
  appId: "1:440555697620:web:f66ba4ccde51ec712b1241",
  // measurementId: "G-XXXXXXXXXX" // Optional, for analytics
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

// Helper to format phone numbers
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // Add +1 if not present for US numbers
  if (digits.length === 10) {
    return `+1${digits}`
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }
  
  // Return with + if not already present
  return digits.startsWith('+') ? digits : `+${digits}`
}