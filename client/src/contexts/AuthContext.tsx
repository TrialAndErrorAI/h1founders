import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged, signOut, ConfirmationResult } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, RecaptchaVerifier, signInWithPhoneNumber } from '../lib/firebase'
import { MatrixLevel, SpecialStatus, getDefaultBadgeLevel, getUserSpecialBadges } from '../utils/badges'
import { generateUniqueUsername } from '../utils/username'
import { isVerifiedPhone } from '../data/verifiedPhones'

interface UserProfile {
  uid: string
  phone?: string
  email?: string
  name?: string
  username?: string
  company?: string
  visaType?: string
  location?: string
  whatsappNumber?: string
  isWhatsappMember?: boolean
  isSubstackSubscriber?: boolean
  isVerified?: boolean
  matrixLevel: MatrixLevel
  specialBadges: SpecialStatus[]
  profileComplete: boolean
  isPaidMember?: boolean  // Club H1 membership status
  clubH1JoinedAt?: Date    // When they joined Club H1
  claimedAt?: Date
  createdAt: Date
  lastActive: Date
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  sendOTP: (phoneNumber: string) => Promise<ConfirmationResult>
  verifyOTP: (confirmationResult: ConfirmationResult, code: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  setupRecaptcha: (containerId: string) => RecaptchaVerifier | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  // Removed unused recaptchaVerifier state - v3 is invisible and doesn't need manual state

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        // Fetch or create user profile
        const profileRef = doc(db, 'members', user.uid)
        const profileSnap = await getDoc(profileRef)
        
        if (profileSnap.exists()) {
          const profileData = profileSnap.data() as UserProfile
          setProfile(profileData)
          
          // Update last active
          await setDoc(profileRef, {
            lastActive: serverTimestamp()
          }, { merge: true })
        } else {
          // Create new profile with proper Matrix badges
          const isWhatsappMember = isVerifiedPhone(user.phoneNumber)
          
          // Generate unique username
          const username = await generateUniqueUsername()
          
          const newProfile: UserProfile = {
            uid: user.uid,
            phone: user.phoneNumber || undefined,
            email: user.email || undefined,
            name: user.displayName || undefined,
            username,
            isWhatsappMember,
            isSubstackSubscriber: false,
            isVerified: isWhatsappMember, // WhatsApp members are automatically verified
            matrixLevel: getDefaultBadgeLevel(isWhatsappMember), // UNPLUGGED by default
            specialBadges: getUserSpecialBadges(isWhatsappMember, false, false),
            profileComplete: false,
            createdAt: new Date(),
            lastActive: new Date()
          }
          
          // Remove undefined fields before saving to Firestore
          const profileToSave = Object.fromEntries(
            Object.entries({
              ...newProfile,
              createdAt: serverTimestamp(),
              lastActive: serverTimestamp()
            }).filter(([_, value]) => value !== undefined)
          )
          
          await setDoc(profileRef, profileToSave)
          
          setProfile(newProfile)
        }
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Setup Recaptcha - v3 invisible only (unused parameter but kept for API compatibility)
  const setupRecaptcha = (_containerId: string) => {
    // v3 doesn't need manual setup, handled in sendOTP
    return null
  }

  // Send OTP with Firebase's built-in reCAPTCHA (no v3 needed)
  const sendOTP = async (phoneNumber: string) => {
    try {
      // PRAGMATIC FIX: Check if verifier already exists and clear it
      const existingVerifier = (window as any).recaptchaVerifier
      if (existingVerifier) {
        try {
          existingVerifier.clear()
        } catch (e) {
          console.log('Could not clear existing verifier:', e)
        }
      }

      // Create invisible verifier for Firebase (it handles reCAPTCHA internally)
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified')
        }
      })

      // Store reference to clear it later
      ;(window as any).recaptchaVerifier = appVerifier
      
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      
      // Clean up after successful send
      setTimeout(() => {
        try {
          appVerifier.clear()
          ;(window as any).recaptchaVerifier = null
        } catch (e) {
          console.log('Cleanup error:', e)
        }
      }, 100)
      
      return confirmationResult
    } catch (error) {
      console.error('Error sending OTP:', error)
      
      // Provide specific error messages for common issues
      if ((error as any).code === 'auth/invalid-app-credential') {
        throw new Error('Authentication configuration error. Please check if localhost is in authorized domains.')
      } else if ((error as any).code === 'auth/quota-exceeded') {
        throw new Error('SMS quota exceeded. Please try again later.')
      } else if ((error as any).code === 'auth/invalid-phone-number') {
        throw new Error('Please enter a valid phone number with country code.')
      } else if ((error as any).code === 'auth/captcha-check-failed') {
        throw new Error('Please complete the reCAPTCHA verification.')
      }
      
      throw error
    }
  }

  // Verify OTP
  const verifyOTP = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      await confirmationResult.confirm(code)
      // User will be automatically signed in and profile created via onAuthStateChanged
    } catch (error) {
      console.error('Error verifying OTP:', error)
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Update profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in')
    
    const profileRef = doc(db, 'members', user.uid)
    await setDoc(profileRef, {
      ...updates,
      lastActive: serverTimestamp()
    }, { merge: true })
    
    // Update local state
    if (profile) {
      setProfile({
        ...profile,
        ...updates,
        lastActive: new Date()
      })
    }
  }

  const value = {
    user,
    profile,
    loading,
    sendOTP,
    verifyOTP,
    logout,
    updateProfile,
    setupRecaptcha
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}