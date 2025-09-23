// Country data for phone authentication
// Prioritized by H1B holder demographics

export interface Country {
  code: string      // ISO code like "US"
  name: string      // Display name
  dial: string      // Dial code like "+1"
  flag: string      // Emoji flag
  format?: string   // Optional format mask
  placeholder?: string  // Example number
}

// Top countries for H1B holders
export const COUNTRIES: Country[] = [
  // Most common first
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', placeholder: '(555) 555-5555' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', placeholder: '98765 43210' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳', placeholder: '138 0000 0000' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', placeholder: '(506) 555-5555' },
  { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷', placeholder: '534 685 98 84' },

  // Other common countries
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', placeholder: '7700 900000' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽', placeholder: '55 1234 5678' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷', placeholder: '11 98765-4321' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷', placeholder: '10-1234-5678' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵', placeholder: '90-1234-5678' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭', placeholder: '917 123 4567' },
  { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳', placeholder: '91 234 56 78' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰', placeholder: '301 2345678' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩', placeholder: '1812-345678' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬', placeholder: '802 123 4567' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', placeholder: '151 12345678' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹', placeholder: '312 345 6789' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸', placeholder: '612 34 56 78' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺', placeholder: '912 345-67-89' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦', placeholder: '71 123 4567' },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬', placeholder: '100 123 4567' },
  { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱', placeholder: '50-123-4567' },
  { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬', placeholder: '9123 4567' },
  { code: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰', placeholder: '9123 4567' },
  { code: 'TW', name: 'Taiwan', dial: '+886', flag: '🇹🇼', placeholder: '912 345 678' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭', placeholder: '81 234 5678' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩', placeholder: '812-345-6789' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾', placeholder: '12-345 6789' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿', placeholder: '21 123 4567' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷', placeholder: '11 2345-6789' },
  { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱', placeholder: '9 1234 5678' },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴', placeholder: '321 123 4567' },
  { code: 'PE', name: 'Peru', dial: '+51', flag: '🇵🇪', placeholder: '912 345 678' },
  { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪', placeholder: '412-1234567' },
  { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱', placeholder: '512 345 678' },
  { code: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦', placeholder: '50 123 4567' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱', placeholder: '6 12345678' },
  { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪', placeholder: '470 12 34 56' },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪', placeholder: '70-123 45 67' },
  { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴', placeholder: '912 34 567' },
  { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰', placeholder: '20 12 34 56' },
  { code: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮', placeholder: '50 123 4567' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭', placeholder: '78 123 45 67' },
  { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹', placeholder: '664 123456' },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹', placeholder: '912 345 678' },
  { code: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷', placeholder: '691 234 5678' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪', placeholder: '85 123 4567' },
]

// Helper to get country by code
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code)
}

// Helper to get country by dial code
export function getCountryByDial(dial: string): Country | undefined {
  return COUNTRIES.find(c => c.dial === dial)
}

// Default country (US for H1B context)
export const DEFAULT_COUNTRY = COUNTRIES[0]