import { Link } from 'react-router-dom'
import { METRICS } from '../data/metrics'

export default function Programs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold terminal-text matrix-glow mb-3">
            3 Ways I Can Help
          </h1>
          <p className="text-xl text-accent font-mono mb-6">
            (Community is free. Always.)
          </p>

          {/* Authority Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="bg-background-secondary/50 border border-border px-4 py-2 rounded font-mono text-sm text-foreground-secondary">
              {METRICS.arr} {METRICS.arrLabel} ({METRICS.companyName})
            </div>
            <div className="bg-background-secondary/50 border border-border px-4 py-2 rounded font-mono text-sm text-foreground-secondary">
              {METRICS.press}
            </div>
            <div className="bg-background-secondary/50 border border-border px-4 py-2 rounded font-mono text-sm text-foreground-secondary">
              {METRICS.visaPath}
            </div>
          </div>

          <p className="text-foreground-secondary font-mono">
            {METRICS.whatsappMembers} immigrant founders already here
          </p>

          <a
            href={METRICS.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-accent hover:text-accent/80 font-mono text-sm underline"
          >
            linkedin.com/in/sidsarasvati
          </a>
        </div>

        {/* Positioning */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-red-900/20 to-green-900/20 border border-accent/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold terminal-text matrix-glow mb-6">
              "I couldn't find like-minded people."
            </h2>

            <div className="space-y-4 text-foreground-secondary">
              <p>
                Online forums full of irrelevant and false immigration info.
                Lawyers saying "wait until 2029." In today's political climate? Even worse.
              </p>

              <p>
                15 years in the US. Still 60 days from deportation.
                I sponsored my own H1B. Got my Green Card. Bootstrapped to {METRICS.arr} ARR.
              </p>

              <p className="text-foreground">
                On business and founder mindset - <span className="text-accent font-semibold">I walk the talk</span>.
              </p>

              <p className="text-accent">
                The hardest part is actually having a business. Rest all is solvable.
              </p>

              <p>
                Thus I started H1B Founders:
              </p>
              <ul className="font-mono text-sm space-y-2 ml-6">
                <li>{'\u2022'} {METRICS.whatsappMembers} immigrant founders (free community, always)</li>
                <li>{'\u2022'} Built by like-minded people sharing specialized knowledge</li>
                <li>{'\u2022'} Breaking myths. Busting gatekeepers. Building in America.</li>
              </ul>

              <p className="pt-4 border-t border-border/30 mt-6">
                Coaching exists because some founders need structured support.
              </p>
              <p className="text-foreground">
                I do this because watching founders waste years hurts.
              </p>
              <p className="text-foreground-secondary text-sm mt-2">
                Plus: Access to my vetted network (CPAs, attorneys, partners I work with).
              </p>
            </div>
          </div>
        </div>

        {/* 3 Program Cards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold terminal-text matrix-glow text-center mb-12">
            Choose Your Path
          </h2>

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
              <p className="text-foreground-secondary mb-4">
                Real founders sharing their journey. Immigration, business, mindset.
                No scripts. No gatekeeping.
              </p>
              <div className="text-sm font-mono text-foreground-secondary space-y-2 mb-4">
                <div>{'\u2022'} {METRICS.liveShowDay}</div>
                <div>{'\u2022'} Host + 1 guest, 30-45 min</div>
                <div>{'\u2022'} Live Q&A via text chat</div>
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
              <p className="text-foreground-secondary mb-4">
                Entity formed. Cap table clean. Business case documented.
                Attorney meeting booked. You walk in prepared.
              </p>
              <div className="text-sm font-mono text-foreground-secondary space-y-2 mb-4">
                <div>{'\u2022'} Week 1: Entity foundation (C-Corp, EIN, DUNS)</div>
                <div>{'\u2022'} Week 2: Ownership structure (cap table, 83b)</div>
                <div>{'\u2022'} Week 3: Business case + attorney handoff</div>
                <div>{'\u2022'} Serotte Law $1,000 discount included</div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="space-y-1 text-sm text-foreground-secondary font-mono">
                  <div>
                    <span className="text-foreground-tertiary">Format:</span> Group (5 founders max)
                  </div>
                  <div>
                    <span className="text-foreground-tertiary">Status:</span> {METRICS.cohortsCompleted} cohorts complete. Next forming Q2 2026
                  </div>
                  <div>
                    <span className="text-foreground-tertiary">Guarantee:</span> Do the work, show up — not ready? I keep working with you
                  </div>
                </div>
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
              <p className="text-foreground-secondary mb-4">
                You have customers and revenue but you're stuck.
                Analysis paralysis. Execution crisis. You know what to do but can't do it.
              </p>
              <div className="text-sm font-mono text-foreground-secondary space-y-2 mb-4">
                <div>{'\u2022'} Friday 1:1 private mentorship</div>
                <div>{'\u2022'} 30 min each (focused, not fluff)</div>
                <div>{'\u2022'} Direct WhatsApp access between sessions</div>
                <div>{'\u2022'} Transformation, not tips</div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="space-y-1 text-sm text-foreground-secondary font-mono">
                  <div>
                    <span className="text-foreground-tertiary">Commitment:</span> 3 months minimum
                  </div>
                  <div>
                    <span className="text-foreground-tertiary">Status:</span> {METRICS.winClubMembers} active members
                  </div>
                  <div>
                    <span className="text-foreground-tertiary">Apply:</span> DM Sid to apply
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold terminal-text matrix-glow text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'Is the community really free?',
                answer: `Yes. Always. ${METRICS.whatsappMembers} immigrant founders in WhatsApp groups. No paywall. I started this to find like-minded people. Coaching exists for structured support. Community is the foundation.`
              },
              {
                question: "What if I'm not sure which program?",
                answer: "DM me. I'll tell you what fits your situation. No pressure, no hard sell. Just honest assessment."
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Launch Club: Yes, cancel anytime. WIN CLUB: 3-month commitment (transformation takes time).'
              },
              {
                question: 'Why only 3 members in WIN CLUB?',
                answer: 'Real capacity constraint. Weekly 30-min private sessions = high-touch mentorship. Quality over quantity.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-background-secondary/50 border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-accent mb-3 font-mono">{faq.question}</h3>
                <p className="text-foreground-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-accent/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold terminal-text matrix-glow mb-3">
              Ready to Start?
            </h2>
            <p className="text-foreground-secondary text-sm mb-4">
              DM me. I'll tell you what fits your situation.
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:sid@h1founders.com?subject=${encodeURIComponent("H1Founders - Let's Talk")}`}
                className="inline-block bg-accent text-background px-8 py-3 rounded font-mono font-bold hover:bg-accent/80 transition-colors"
              >
                Let's Talk - Email Sid
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
            <p className="text-foreground-tertiary font-mono text-xs mt-6">
              No urgency. No hard sell. Take your time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
