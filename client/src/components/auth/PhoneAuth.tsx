import { useState, useEffect, useRef } from 'react'
import { ConfirmationResult } from 'firebase/auth'
import { useAuth } from '../../contexts/AuthContext'
import CountrySelector from './CountrySelector'
import { Country, DEFAULT_COUNTRY } from '../../data/countries'

interface PhoneAuthProps {
  onSuccess?: () => void
  isClaimingProfile?: boolean
}


export default function PhoneAuth({ onSuccess, isClaimingProfile = false }: PhoneAuthProps) {
  const { sendOTP, verifyOTP, setupRecaptcha } = useAuth()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [localNumber, setLocalNumber] = useState('')  // Just the local number, no country code
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
      // Combine country code + local number
      const fullNumber = selectedCountry.dial + localNumber.replace(/\D/g, '')

      // Validate phone number length
      if (localNumber.replace(/\D/g, '').length < 7) {
        throw new Error('Please enter a valid phone number')
      }

      const result = await sendOTP(fullNumber)
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
    // Allow digits and common formatting characters
    const cleaned = input.replace(/[^\d\s\-\(\)]/g, '')
    setLocalNumber(cleaned)
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              {/* Country selector */}
              <div className="w-28">
                <CountrySelector
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                />
              </div>

              {/* Phone input - local number only */}
              <input
                type="tel"
                id="phone"
                value={localNumber}
                onChange={handlePhoneChange}
                placeholder={selectedCountry.placeholder || 'Phone number'}
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono"
                required
              />
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
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
            disabled={loading || localNumber.replace(/\D/g, '').length < 7}
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
              We sent a 6-digit code to {selectedCountry.dial} {localNumber}
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