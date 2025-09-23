import { useState, useEffect, useRef } from 'react'
import { ConfirmationResult } from 'firebase/auth'
import { useAuth } from '../../contexts/AuthContext'
import { formatPhoneNumber } from '../../lib/firebase'

interface PhoneAuthProps {
  onSuccess?: () => void
  isClaimingProfile?: boolean
}

// Format phone for display - supports international
function formatPhoneDisplay(value: string): string {
  // Keep + symbol if present
  const hasPlus = value.startsWith('+')
  const digits = value.replace(/\D/g, '')

  // If no country code (10 digits), format as US
  if (!hasPlus && digits.length <= 10) {
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (!match) return value

    const [, area, prefix, line] = match
    if (line) return `(${area}) ${prefix}-${line}`
    if (prefix) return `(${area}) ${prefix}`
    if (area) return area.length < 3 ? area : `(${area})`
    return ''
  }

  // International format: just add spaces for readability
  // +91 98765 43210 (India)
  // +90 534 685 9884 (Turkey)
  // +44 20 7946 0958 (UK)
  if (hasPlus && digits.length > 0) {
    // Keep country code together, then space every 3-4 digits
    let formatted = '+'
    if (digits.length <= 2) {
      formatted += digits
    } else if (digits.startsWith('1') && digits.length === 11) {
      // US/Canada: +1 (XXX) XXX-XXXX
      formatted += `1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    } else if (digits.startsWith('91') && digits.length === 12) {
      // India: +91 XXXXX XXXXX
      formatted += `91 ${digits.slice(2, 7)} ${digits.slice(7)}`
    } else if (digits.startsWith('90') && digits.length === 12) {
      // Turkey: +90 XXX XXX XX XX
      formatted += `90 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
    } else {
      // Generic international: add spaces every 3-4 digits after country code
      let countryCodeLength = 1 // Default
      if (digits.startsWith('1')) countryCodeLength = 1
      else if (digits.startsWith('44')) countryCodeLength = 2
      else if (digits.startsWith('86')) countryCodeLength = 2
      else if (digits.startsWith('91')) countryCodeLength = 2
      else if (digits.startsWith('90')) countryCodeLength = 2
      else if (digits.length > 2) countryCodeLength = 2 // Most common

      formatted += digits.slice(0, countryCodeLength) + ' '
      const remaining = digits.slice(countryCodeLength)
      // Add spaces every 3-4 digits
      for (let i = 0; i < remaining.length; i += 4) {
        formatted += remaining.slice(i, i + 4) + ' '
      }
      return formatted.trim()
    }
    return formatted
  }

  return '+' + digits
}

export default function PhoneAuth({ onSuccess, isClaimingProfile = false }: PhoneAuthProps) {
  const { sendOTP, verifyOTP, setupRecaptcha } = useAuth()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const recaptchaSetup = useRef(false)

  // Setup recaptcha once on mount - only for non-test numbers
  useEffect(() => {
    if (!recaptchaSetup.current) {
      try {
        setupRecaptcha('recaptcha-container')
        recaptchaSetup.current = true
      } catch (error) {
        console.log('ReCAPTCHA setup error (normal for test numbers):', error)
      }
    }
  }, [setupRecaptcha])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Format and send OTP
      // Keep + if present, otherwise let formatPhoneNumber handle it
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, '')
      const formattedPhone = formatPhoneNumber(cleanPhone)

      // Validate phone number length
      const digitsOnly = cleanPhone.replace(/\D/g, '')
      if (digitsOnly.length < 7) {
        throw new Error('Phone number too short')
      }

      const result = await sendOTP(formattedPhone)
      setConfirmationResult(result)
      setStep('otp')
    } catch (err: any) {
      console.error('Error sending OTP:', err)
      setError(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    // Allow + at start, digits anywhere
    const cleaned = input.replace(/[^\d+]/g, '')

    // Ensure + is only at the start
    const hasPlus = cleaned.startsWith('+')
    const digits = cleaned.replace(/\+/g, '')
    const formatted = hasPlus ? '+' + digits : digits

    // Limit length: 15 digits max for E.164 standard
    const limited = formatted.slice(0, hasPlus ? 16 : 10) // +15 digits or 10 for US

    setPhoneNumber(formatPhoneDisplay(limited))
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmationResult) return
    
    setError('')
    setLoading(true)

    try {
      await verifyOTP(confirmationResult, otpCode)
      onSuccess?.()
    } catch (err: any) {
      console.error('Error verifying OTP:', err)
      setError(err.message || 'Invalid code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Recaptcha container (invisible) */}
      <div id="recaptcha-container"></div>

      {step === 'phone' ? (
        <form onSubmit={handleSendOTP} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold terminal-text matrix-glow mb-2">
              {isClaimingProfile ? 'Claim Your Profile' : 'Join H1Founders'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isClaimingProfile
                ? 'Enter your WhatsApp number to claim your pre-existing profile'
                : 'Enter your phone number to get started'}
            </p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+91 98765 43210 or (555) 555-5555"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono"
              required
            />
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              International numbers supported • Include country code (+91, +44, +90)<br/>
              US numbers work with or without +1
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-pill text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || phoneNumber.replace(/\D/g, '').length < 7}
            className="w-full px-6 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          >
            {loading ? 'SENDING...' : 'SEND_VERIFICATION_CODE()'}
          </button>

          {isClaimingProfile && (
            <p className="text-center text-sm text-foreground-tertiary">
              Are you a Substack subscriber instead?{' '}
              <button type="button" className="text-accent hover:underline">
                Use email verification
              </button>
            </p>
          )}
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold terminal-text matrix-glow mb-2">
              Enter Verification Code
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We sent a 6-digit code to {phoneNumber}
            </p>
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-center text-2xl tracking-widest"
              maxLength={6}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-pill text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otpCode.length !== 6}
            className="w-full px-6 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          >
            {loading ? 'VERIFYING...' : 'VERIFY_AND_LOGIN()'}
          </button>

          <button
            type="button"
            onClick={() => {
              setStep('phone')
              setOtpCode('')
              setError('')
            }}
            className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
          >
            ← Change phone number
          </button>
        </form>
      )}
    </div>
  )
}