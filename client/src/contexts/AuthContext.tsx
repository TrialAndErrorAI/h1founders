import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged, signOut, ConfirmationResult } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, RecaptchaVerifier, signInWithPhoneNumber } from '../lib/firebase'

interface UserProfile {
  uid: string
  phone?: string
  email?: string
  name?: string
  company?: string
  visaType?: string
  location?: string
  whatsappNumber?: string
  isWhatsappMember?: boolean
  isSubstackSubscriber?: boolean
  profileComplete: boolean
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
  setupRecaptcha: (containerId: string) => RecaptchaVerifier
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
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null)

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
          // Create new profile
          const newProfile: UserProfile = {
            uid: user.uid,
            phone: user.phoneNumber || undefined,
            email: user.email || undefined,
            name: user.displayName || undefined,
            profileComplete: false,
            createdAt: new Date(),
            lastActive: new Date()
          }
          
          await setDoc(profileRef, {
            ...newProfile,
            createdAt: serverTimestamp(),
            lastActive: serverTimestamp()
          })
          
          setProfile(newProfile)
        }
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Setup Recaptcha
  const setupRecaptcha = (containerId: string) => {
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      })
      setRecaptchaVerifier(verifier)
      return verifier
    }
    return recaptchaVerifier
  }

  // Send OTP
  const sendOTP = async (phoneNumber: string) => {
    try {
      const appVerifier = recaptchaVerifier || setupRecaptcha('recaptcha-container')
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      return confirmationResult
    } catch (error) {
      console.error('Error sending OTP:', error)
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