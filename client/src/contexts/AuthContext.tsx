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

  // Setup Recaptcha - Force v2 to avoid Enterprise issues
  const setupRecaptcha = (containerId: string) => {
    if (!recaptchaVerifier) {
      // @ts-ignore - Force v2 reCAPTCHA to bypass Enterprise
      window.RecaptchaVerifier = RecaptchaVerifier
      
      const verifier = new RecaptchaVerifier(auth, containerId, {
        size: 'normal', // Use normal for v2 (visible checkbox)
        callback: () => {
          console.log('reCAPTCHA v2 solved successfully')
        },
        'expired-callback': () => {
          console.log('reCAPTCHA v2 expired')
        },
        'error-callback': (error: any) => {
          console.error('reCAPTCHA v2 error:', error)
        }
      })
      
      // Force render to ensure v2 is used
      verifier.render().then((widgetId: any) => {
        console.log('reCAPTCHA v2 widget rendered with ID:', widgetId)
      })
      
      setRecaptchaVerifier(verifier)
      return verifier
    }
    return recaptchaVerifier
  }

  // Send OTP
  const sendOTP = async (phoneNumber: string) => {
    try {
      // Check if container exists
      const container = document.getElementById('recaptcha-container')
      if (!container) {
        throw new Error('reCAPTCHA container not found. Please refresh the page.')
      }
      
      // Clear any existing reCAPTCHA widget
      container.innerHTML = ''
      
      // Always create a fresh verifier - don't reuse
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          console.log('reCAPTCHA solved for phone auth')
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired, please try again')
        }
      })
      
      // Render the reCAPTCHA widget
      await appVerifier.render()
      
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      
      // Clear verifier after successful use
      setTimeout(() => {
        try {
          appVerifier.clear()
        } catch (e) {
          console.log('Verifier already cleared')
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