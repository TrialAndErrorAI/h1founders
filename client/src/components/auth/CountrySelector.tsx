import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Country, COUNTRIES } from '../../data/countries'

interface CountrySelectorProps {
  value: Country
  onChange: (country: Country) => void
  className?: string
}

export default function CountrySelector({ value, onChange, className = '' }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter countries based on search
  const filteredCountries = search
    ? COUNTRIES.filter(
        country =>
          country.name.toLowerCase().includes(search.toLowerCase()) ||
          country.dial.includes(search) ||
          country.code.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRIES

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected country display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        <span className="flex items-center gap-2">
          <span className="text-xl">{value.flag}</span>
          <span className="font-mono text-gray-900 dark:text-white">{value.dial}</span>
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-900 dark:text-white"
              autoFocus
            />
          </div>

          {/* Country list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    country.code === value.code ? 'bg-green-50 dark:bg-green-900/20' : ''
                  }`}
                >
                  <span className="text-xl">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {country.name}
                    </div>
                  </div>
                  <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    {country.dial}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}