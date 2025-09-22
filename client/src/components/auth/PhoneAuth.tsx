import { useState, useEffect, useRef } from 'react'
import { ConfirmationResult } from 'firebase/auth'
import { useAuth } from '../../contexts/AuthContext'
import { formatPhoneNumber } from '../../lib/firebase'

interface PhoneAuthProps {
  onSuccess?: () => void
  isClaimingProfile?: boolean
}

// Format phone for display (XXX) XXX-XXXX
function formatPhoneDisplay(value: string): string {
  const phone = value.replace(/\D/g, '')
  const match = phone.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  if (!match) return value
  
  const [, area, prefix, line] = match
  if (line) return `(${area}) ${prefix}-${line}`
  if (prefix) return `(${area}) ${prefix}`
  if (area) return area.length < 3 ? area : `(${area})`
  return ''
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
      // Format and send OTP (remove formatting for actual send)
      const digitsOnly = phoneNumber.replace(/\D/g, '')
      const formattedPhone = formatPhoneNumber(digitsOnly)
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
    const input = e.target.value.replace(/\D/g, '').slice(0, 10) // Only digits, max 10
    setPhoneNumber(formatPhoneDisplay(input))
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
            <p className="text-foreground-tertiary text-sm">
              {isClaimingProfile 
                ? 'Enter your WhatsApp number to claim your pre-existing profile'
                : 'Enter your phone number to get started'}
            </p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground-secondary mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(555) 555-5555"
              className="w-full px-4 py-3 bg-background border border-border text-accent rounded-lg focus:outline-none focus:border-accent font-mono"
              required
            />
            <p className="mt-2 text-xs text-foreground-tertiary">
              We'll send you a verification code via SMS
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-pill text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || phoneNumber.replace(/\D/g, '').length < 10}
            className="w-full px-6 py-3 bg-accent text-black font-bold rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
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
            <p className="text-foreground-tertiary text-sm">
              We sent a 6-digit code to {phoneNumber}
            </p>
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-foreground-secondary mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 bg-background border border-border text-accent rounded-lg focus:outline-none focus:border-accent font-mono text-center text-2xl tracking-widest"
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
            className="w-full px-6 py-3 bg-accent text-black font-bold rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
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
            className="w-full text-foreground-tertiary hover:text-foreground-secondary text-sm"
          >
            ← Change phone number
          </button>
        </form>
      )}
    </div>
  )
}