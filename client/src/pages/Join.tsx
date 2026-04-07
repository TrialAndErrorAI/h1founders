import { METRICS } from '../data/metrics'

export default function Join() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold terminal-text matrix-glow mb-3">
            Join the Community
          </h1>
          <p className="text-xl text-foreground-secondary font-mono">
            {METRICS.whatsappMembers} immigrant founders. Free. Always.
          </p>
        </div>

        {/* Three paths */}
        <div className="space-y-6">

          {/* WhatsApp */}
          <a
            href={METRICS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background-secondary/50 border border-accent hover:border-accent/80 rounded-lg p-8 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">💬</div>
              <div>
                <h2 className="text-2xl font-bold terminal-text matrix-glow mb-2 group-hover:text-accent transition-colors">
                  WhatsApp Community
                </h2>
                <p className="text-foreground-secondary mb-3">
                  The heart of H1B Founders. Daily discussions on immigration,
                  business setup, visa strategy, and founder life. Members help members.
                </p>
                <div className="font-mono text-sm text-accent">
                  Join {METRICS.whatsappMembers} founders →
                </div>
              </div>
            </div>
          </a>

          {/* Substack */}
          <a
            href={METRICS.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background-secondary/50 border border-border hover:border-accent/50 rounded-lg p-8 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📧</div>
              <div>
                <h2 className="text-2xl font-bold terminal-text mb-2 group-hover:text-accent transition-colors">
                  Substack Newsletter
                </h2>
                <p className="text-foreground-secondary mb-3">
                  Deep dives on immigration strategy, founder stories, and H1B Founders Live
                  episodes. In your inbox when it matters.
                </p>
                <div className="font-mono text-sm text-foreground-tertiary group-hover:text-accent transition-colors">
                  Subscribe ({METRICS.substackSubscribers} readers) →
                </div>
              </div>
            </div>
          </a>

          {/* Cal.com booking */}
          <a
            href={METRICS.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background-secondary/50 border border-border hover:border-accent/50 rounded-lg p-8 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📞</div>
              <div>
                <h2 className="text-2xl font-bold terminal-text mb-2 group-hover:text-accent transition-colors">
                  Book a Call with Sid
                </h2>
                <p className="text-foreground-secondary mb-3">
                  Want structured coaching? Thinking about WIN CLUB or Launch Club?
                  Let's talk. No pressure, just an honest conversation about where you are.
                </p>
                <div className="font-mono text-sm text-foreground-tertiary group-hover:text-accent transition-colors">
                  Schedule a time →
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center text-foreground-tertiary font-mono text-sm">
          <p>Community is free. Always. Coaching is optional.</p>
          <p className="mt-1">
            <a href={METRICS.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              LinkedIn
            </a>
            {' · '}
            <a href={METRICS.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              X/Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
