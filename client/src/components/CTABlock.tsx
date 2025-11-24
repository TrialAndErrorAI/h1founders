// Reusable CTA Block with psychological triggers
// Use: Scarcity mode for launches, Soft mode for evergreen pages

interface CTABlockProps {
  variant?: 'scarcity' | 'soft'
  // Scarcity mode props
  spots?: number
  program?: string
  startDate?: string
  closeDate?: string
  // Soft mode props
  headline?: string
  subtext?: string
  // Common
  showEmail?: boolean
  emailSubject?: string
}

export default function CTABlock({
  variant = 'soft',
  spots = 5,
  program = 'C2',
  startDate = 'Dec 16',
  closeDate = 'Dec 13',
  headline = "Ready to Start?",
  subtext = "DM me. I'll tell you what fits your situation.",
  showEmail = true,
  emailSubject = "H1Founders - Let's Talk"
}: CTABlockProps) {

  const whatsappLink = "https://chat.whatsapp.com/L7sHBIbCuyx2cYvzuaDCat"
  const linkedinLink = "https://linkedin.com/in/sidsarasvati"
  const emailLink = `mailto:sid@h1founders.com?subject=${encodeURIComponent(emailSubject)}`

  if (variant === 'scarcity') {
    return (
      <div className="bg-gradient-to-r from-red-900/20 to-green-900/20 border border-accent/30 rounded-lg p-6 sm:p-8 text-center">
        {/* Scarcity headline - loss aversion */}
        <h2 className="text-xl sm:text-2xl font-bold terminal-text matrix-glow mb-3">
          {spots} Spots | {program} Starts {startDate}
        </h2>

        {/* Deadline - urgency */}
        <p className="text-foreground-secondary text-sm mb-4">
          Registration closes {closeDate}
        </p>

        {/* Primary CTA - commitment */}
        <div className="space-y-3">
          <a
            href={`mailto:sid@h1founders.com?subject=Launch%20Club%20${program}%20-%20I'm%20In`}
            className="inline-block bg-accent text-background px-6 py-2 sm:px-8 sm:py-3 rounded font-mono font-bold hover:bg-accent/80 transition-colors"
          >
            I'm In - Email Sid
          </a>

          {/* Secondary options - multiple paths */}
          <p className="text-foreground-secondary font-mono text-xs sm:text-sm">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Join WhatsApp
            </a>
            {' | '}
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              DM on LinkedIn
            </a>
          </p>
        </div>
      </div>
    )
  }

  // Soft variant - low pressure, build trust (same layout as scarcity)
  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-accent/30 rounded-lg p-6 sm:p-8 text-center">
      {/* Invitation headline */}
      <h2 className="text-xl sm:text-2xl font-bold terminal-text matrix-glow mb-3">
        {headline}
      </h2>

      {/* Low pressure subtext */}
      <p className="text-foreground-secondary text-sm mb-4">
        {subtext}
      </p>

      {/* Primary CTA - same layout as scarcity */}
      <div className="space-y-3">
        <a
          href={emailLink}
          className="inline-block bg-accent text-background px-6 py-2 sm:px-8 sm:py-3 rounded font-mono font-bold hover:bg-accent/80 transition-colors"
        >
          Let's Talk - Email Sid
        </a>

        {/* Secondary options */}
        <p className="text-foreground-secondary font-mono text-xs sm:text-sm">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Join WhatsApp (1,400+)
          </a>
          {' | '}
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            DM on LinkedIn
          </a>
        </p>
      </div>

      {/* Trust builder - no pressure */}
      <p className="text-foreground-tertiary font-mono text-xs mt-6">
        // No urgency. No hard sell. Take your time.<br />
        I'm here when you're ready.
      </p>
    </div>
  )
}
