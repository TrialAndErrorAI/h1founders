import { useState, useEffect } from 'react'

interface Sponsor {
  name: string
  tagline: string
  url: string
  tier: 'blue' | 'red' | 'neo' | 'architect'
}

// Active partners in pipeline
const sponsors: Sponsor[] = [
  {
    name: 'Manifest Labs PLLC',
    tagline: 'Manifest Your Green Card',
    url: 'https://calendly.com/manifestlabs',
    tier: 'architect'
  },
  {
    name: 'FinStackk',
    tagline: 'SOC 2 Accounting for Founders',
    url: 'https://calendly.com/finstackk',
    tier: 'neo'
  }
]

export default function SponsorBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentSponsor, setCurrentSponsor] = useState(0)
  
  // Check if user has hidden banner
  useEffect(() => {
    const hidden = localStorage.getItem('sponsorBannerHidden')
    if (hidden === 'true') {
      setIsVisible(false)
    }
  }, [])
  
  // Rotate sponsors every 10 seconds if multiple
  useEffect(() => {
    if (sponsors.length > 1) {
      const interval = setInterval(() => {
        setCurrentSponsor((prev) => (prev + 1) % sponsors.length)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [])
  
  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('sponsorBannerHidden', 'true')
  }
  
  if (!isVisible || sponsors.length === 0) return null
  
  const sponsor = sponsors[currentSponsor]
  
  return (
    <div className="bg-background border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2 flex items-center justify-between">
          <div className="flex-1 flex items-center">
            {/* Terminal prompt style */}
            <span className="text-foreground-tertiary font-mono text-xs sm:text-sm mr-2">
              sid@h1founders:~$
            </span>
            <span className="text-accent font-mono text-xs sm:text-sm mr-2">
              cat /etc/sponsors
            </span>
            <span className="text-foreground-tertiary font-mono text-xs sm:text-sm mr-2">
              &gt;
            </span>
            
            {/* Sponsor info */}
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-accent font-mono text-xs sm:text-sm">
                POWERED BY:
              </span>
              <span className="text-foreground font-mono text-xs sm:text-sm font-semibold">
                {sponsor.name}
              </span>
              <span className="text-foreground-tertiary font-mono text-xs sm:text-sm hidden sm:inline">
                - {sponsor.tagline}
              </span>
              <span className="text-accent font-mono text-xs sm:text-sm ml-2 group-hover:text-foreground transition-colors">
                | $escape_the_matrix()
              </span>
            </a>
          </div>
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="ml-4 text-foreground-tertiary hover:text-foreground-tertiary font-mono text-xs"
            aria-label="Close sponsor banner"
          >
            [X]
          </button>
        </div>
        
        {/* Multiple sponsors indicator */}
        {sponsors.length > 1 && (
          <div className="absolute bottom-1 right-4 flex gap-1">
            {sponsors.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-colors ${
                  index === currentSponsor ? 'bg-green-400' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}