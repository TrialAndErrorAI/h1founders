import { useState, useEffect } from 'react'
import EmailCapture from './EmailCapture'

interface ComingSoonProps {
  title: string
  description: string
  features: string[]
  launchDate: string
  context: string
}

export default function ComingSoon({ 
  title, 
  description, 
  features, 
  launchDate,
  context 
}: ComingSoonProps) {
  const [typedText, setTypedText] = useState('')
  const fullText = `// ${title} initializing...`
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [fullText])

  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Terminal Header */}
        <div className="mb-12">
          <div className="terminal-prompt mb-2"></div>
          <h1 className="text-3xl sm:text-4xl font-mono terminal-text matrix-glow">
            {typedText}
            <span className="animate-pulse">_</span>
          </h1>
        </div>

        {/* Status Message */}
        <div className="bg-background-secondary border border-border rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <span className="text-yellow-400 text-2xl">⚠</span>
            <div>
              <p className="text-yellow-400 font-mono text-sm mb-2">STATUS: UNDER_CONSTRUCTION</p>
              <p className="text-foreground-secondary text-lg">{description}</p>
            </div>
          </div>
        </div>

        {/* What's Coming */}
        <div className="mb-12">
          <h2 className="text-xl font-mono text-accent mb-4">// What's coming:</h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-accent font-mono">→</span>
                <p className="text-foreground-secondary">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Date */}
        <div className="bg-background-secondary border border-accent/20 rounded-lg p-6 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent font-mono text-sm mb-1">EXPECTED_LAUNCH:</p>
              <p className="text-2xl font-bold text-foreground">{launchDate}</p>
            </div>
            <div className="text-accent">
              <svg className="w-12 h-12 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Email Capture */}
        <div className="bg-background border border-border rounded-lg p-8">
          <h3 className="text-xl font-mono text-foreground mb-2">// Be the first to know</h3>
          <p className="text-foreground-tertiary mb-6">Get notified when this section goes live.</p>
          <EmailCapture 
            placeholder="founder@startup.com"
            buttonText="NOTIFY_ME()"
            context={context}
          />
        </div>

        {/* Vote for Features */}
        <div className="mt-12 text-center">
          <p className="text-foreground-tertiary font-mono text-sm">
            Want this sooner? Vote for priority features in our community.
          </p>
        </div>

        {/* Matrix Easter Egg */}
        <div className="mt-24 text-center">
          <p className="text-foreground font-mono text-xs">
            // There is no spoon
          </p>
        </div>
      </div>
    </div>
  )
}