import { Link } from 'react-router-dom'
import { METRICS } from '../data/metrics'

export default function Programs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Compact Hero — cards must be above the fold */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold terminal-text matrix-glow mb-2">
            3 Ways I Can Help
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            <span className="bg-background-secondary/50 border border-border px-3 py-1 rounded font-mono text-xs text-foreground-secondary">
              {METRICS.arr} ARR Bootstrapped
            </span>
            <span className="bg-background-secondary/50 border border-border px-3 py-1 rounded font-mono text-xs text-foreground-secondary">
              {METRICS.press}
            </span>
            <span className="bg-background-secondary/50 border border-border px-3 py-1 rounded font-mono text-xs text-foreground-secondary">
              {METRICS.visaPath}
            </span>
            <span className="bg-background-secondary/50 border border-border px-3 py-1 rounded font-mono text-xs text-foreground-secondary">
              {METRICS.whatsappMembers} founders
            </span>
          </div>
        </div>

        {/* 3 Program Cards — ABOVE THE FOLD */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">

            {/* H1B Founders Live */}
            <div className="bg-background-secondary/50 border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="mb-4">
                <h3 className="text-2xl font-bold terminal-text matrix-glow mb-1">
                  H1B Founders Live
                </h3>
                <p className="text-sm text-foreground-secondary font-mono">
                  Monthly show for everyone
                </p>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-accent font-mono">FREE</span>
              </div>
              <p className="text-foreground-secondary mb-4 text-sm">
                Real founders sharing their journey. Immigration, business, mindset.
                No scripts. No gatekeeping.
              </p>
              <div className="text-sm font-mono text-foreground-secondary space-y-1 mb-4">
                <div>{'\u2022'} {METRICS.liveShowDay}</div>
                <div>{'\u2022'} Host + 1 guest, 30-45 min</div>
                <div>{'\u2022'} Auto-publishes as podcast</div>
              </div>
              <div className="pt-4 border-t border-border">
                <Link
                  to="/live"
                  className="inline-block w-full text-center bg-accent/10 hover:bg-accent/20 border border-accent/50 text-accent px-4 py-2 rounded font-mono text-sm transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Launch Club */}
            <div className="bg-background-secondary/50 border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="mb-4">
                <h3 className="text-2xl font-bold terminal-text matrix-glow mb-1">
                  Launch Club
                </h3>
                <p className="text-sm text-foreground-secondary font-mono">
                  Ready to file, need prep
                </p>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-accent font-mono">{METRICS.launchClubPrice}</span>
                <span className="text-foreground-tertiary font-mono text-sm ml-2">({METRICS.launchClubDuration})</span>
              </div>
              <p className="text-foreground-secondary mb-4 text-sm">
                Entity formed. Cap table clean. Business case documented.
                Attorney meeting booked. You walk in prepared.
              </p>
              <div className="text-sm font-mono text-foreground-secondary space-y-1 mb-4">
                <div>{'\u2022'} 3-week sprint: entity → foundation → attorney</div>
                <div>{'\u2022'} Group of 5 founders max</div>
                <div>{'\u2022'} Serotte Law $1,000 discount included</div>
              </div>
              <div className="pt-4 border-t border-border text-sm text-foreground-secondary font-mono">
                <span className="text-foreground-tertiary">Status:</span> {METRICS.cohortsCompleted} cohorts complete. Next forming Q2 2026
              </div>
            </div>

            {/* WIN CLUB */}
            <div className="bg-background-secondary/50 border border-accent rounded-lg p-6 hover:border-accent/80 transition-colors">
              <div className="mb-4">
                <div className="inline-block bg-accent/20 border border-accent px-3 py-1 rounded text-xs font-mono text-accent mb-3">
                  ELITE
                </div>
                <h3 className="text-2xl font-bold terminal-text matrix-glow mb-1">
                  WIN CLUB
                </h3>
                <p className="text-sm text-foreground-secondary font-mono">
                  Already running, but stuck
                </p>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-accent font-mono">{METRICS.winClubPrice}</span>
                <span className="text-foreground-tertiary font-mono text-sm ml-2">(3 months)</span>
              </div>
              <p className="text-foreground-secondary mb-4 text-sm">
                You have customers and revenue but you're stuck.
                Know what to do but can't execute. This fixes that.
              </p>
              <div className="text-sm font-mono text-foreground-secondary space-y-1 mb-4">
                <div>{'\u2022'} Friday 1:1 private mentorship, 30 min</div>
                <div>{'\u2022'} Direct WhatsApp access between sessions</div>
                <div>{'\u2022'} Transformation, not tips</div>
              </div>
              <div className="pt-4 border-t border-border text-sm text-foreground-secondary font-mono">
                <span className="text-foreground-tertiary">Status:</span> {METRICS.winClubMembers} active members. DM Sid to apply
              </div>
            </div>
          </div>
        </div>

        {/* Positioning — compressed, BELOW cards */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-900/20 to-green-900/20 border border-accent/30 rounded-lg p-6">
            <p className="text-foreground-secondary">
              15 years in the US. Sponsored my own H1B. Got my Green Card. Bootstrapped to {METRICS.arr} ARR.
              I couldn't find like-minded people, so I built the community I wish existed.
              <span className="text-accent font-semibold"> The hardest part is actually having a business. Rest all is solvable.</span>
            </p>
            <p className="text-foreground-tertiary text-sm mt-3">
              Community is free, always. Coaching exists for structured support.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold terminal-text matrix-glow text-center mb-6">
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'Is the community really free?',
                answer: `Yes. Always. ${METRICS.whatsappMembers} immigrant founders in WhatsApp. No paywall. Coaching is optional.`
              },
              {
                question: "What if I'm not sure which program?",
                answer: "DM me. I'll tell you what fits. No pressure, just honest assessment."
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Launch Club: yes. WIN CLUB: 3-month commitment (transformation takes time).'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-background-secondary/50 border border-border rounded-lg p-5">
                <h3 className="text-base font-bold text-accent mb-2 font-mono">{faq.question}</h3>
                <p className="text-foreground-secondary text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-accent/30 rounded-lg p-6">
            <h2 className="text-xl font-bold terminal-text matrix-glow mb-2">
              Ready to Start?
            </h2>
            <div className="space-y-3">
              <a
                href={METRICS.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-background px-8 py-3 rounded font-mono font-bold hover:bg-accent/80 transition-colors"
              >
                Book a Call with Sid
              </a>
              <p className="text-foreground-secondary font-mono text-sm">
                <a href={METRICS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Join WhatsApp ({METRICS.whatsappMembers})
                </a>
                {' | '}
                <a href={METRICS.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  DM on LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
