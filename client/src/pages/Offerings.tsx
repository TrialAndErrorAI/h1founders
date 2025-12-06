import TierCard from '../components/offerings/TierCard'
import ComparisonTable from '../components/offerings/ComparisonTable'
import FAQ from '../components/offerings/FAQ'
import CTABlock from '../components/CTABlock'

export default function Offerings() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 1. HERO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold terminal-text matrix-glow mb-3">
            4 Ways I Can Help
          </h1>
          <p className="text-xl text-accent font-mono mb-6">
            (Community is free. Always.)
          </p>

          {/* Authority Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="bg-background-secondary/50 border border-border px-4 py-2 rounded font-mono text-sm text-foreground-secondary">
              $5M+ ARR Bootstrapped (Trial & Error Inc)
            </div>
            <div className="bg-background-secondary/50 border border-border px-4 py-2 rounded font-mono text-sm text-foreground-secondary">
              WSJ (2024, 2025) • Forbes • IBT
            </div>
            <div className="bg-background-secondary/50 border border-border px-4 py-2 rounded font-mono text-sm text-foreground-secondary">
              F1 → H1B (self-sponsored) → Green Card
            </div>
          </div>

          <p className="text-foreground-secondary font-mono">
            1,400+ immigrant founders already here
          </p>

          <a
            href="https://linkedin.com/in/sidsarasvati"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-accent hover:text-accent/80 font-mono text-sm underline"
          >
            linkedin.com/in/sidsarasvati
          </a>
        </div>

        {/* 2. POSITIONING */}
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
                I sponsored my own H1B. Got my Green Card. Bootstrapped to $5M+ ARR.
              </p>

              <p className="text-foreground">
                On business and founder mindset - <span className="text-accent font-semibold">I walk the talk</span>.
              </p>

              <p className="text-accent">
                The hardest part is actually having a business. Rest all is solvable.
              </p>

              <p>
                Thus I started H1Founders:
              </p>
              <ul className="font-mono text-sm space-y-2 ml-6">
                <li>• 1,400+ immigrant founders (free community, always)</li>
                <li>• Built by like-minded people sharing specialized knowledge</li>
                <li>• Breaking myths. Busting gatekeepers. Building in America.</li>
              </ul>

              <p className="pt-4 border-t border-border/30 mt-6">
                Coaching exists because some founders need structured support.
              </p>
              <p className="text-foreground">
                I do this because watching founders waste years hurts. Pricing: $197-497/month.
              </p>
              <p className="text-foreground-secondary text-sm mt-2">
                Plus: Access to my vetted network (CPAs, attorneys, partners I work with).
              </p>
            </div>
          </div>
        </div>

        {/* 3. 4-TIER CARDS */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold terminal-text matrix-glow text-center mb-12">
            Choose Your Path
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pathfinder */}
            <TierCard
              title="Pathfinder"
              subtitle="International founders, visa confusion"
              price="$297/session"
              retailPrice="$500"
              description="You have the idea. You have the prototype. Client wants to buy. But you don't know the steps."
              features={[
                '45-min strategic session',
                'C-Corp vs LLC + tax strategy',
                'O1/EB1A visa roadmap',
                'WhatsApp access between sessions',
                'Company setup templates'
              ]}
              format="1:1 consultant mode"
              details={[
                { label: 'Typical engagement', value: '1-3 sessions total' },
                { label: 'Capacity', value: '10 founding members' }
              ]}
            />

            {/* Launch Club */}
            <TierCard
              title="Launch Club"
              subtitle="Ready to file, need prep"
              price="$997 (3-week program)"
              description="Entity formed. Cap table clean. Business case documented. Attorney meeting booked. You walk in prepared."
              features={[
                'Week 1: Entity foundation (C-Corp, EIN, DUNS)',
                'Week 2: Ownership structure (cap table, 83b)',
                'Week 3: Business case + attorney handoff',
                'Serotte Law $1,000 discount',
                'Brad Daniels CPA $400 discount'
              ]}
              format="Group (5 founders max)"
              details={[
                { label: 'Sessions', value: 'Wed 6-7 PM ET (weekly)' },
                { label: 'Status', value: 'C1 + C2 filled. Next cohort forming.' },
                { label: 'Guarantee', value: 'Do the work, show up - not attorney-ready? I keep working with you.' }
              ]}
              ctaLink="/launch-club"
              ctaText="Apply for Next Cohort"
            />

            {/* Revenue Club */}
            <TierCard
              title="Revenue Club"
              subtitle="Built something, no customers yet"
              price="$297/month"
              description="You incorporated. You built something. No customers. Shipping paralysis."
              features={[
                'Bi-weekly group calls (2×/month)',
                'WhatsApp daily accountability',
                'Group pressure = execution',
                'Stay as long as needed'
              ]}
              format="Group (5 founders max)"
              details={[
                { label: 'Sessions', value: '1st & 3rd Monday, 1 hr each' },
                { label: 'Start date', value: 'Nov 25, 2025' },
                { label: 'Goal', value: 'First paying customer in 60 days. Not cheerleading. Just accountability.' }
              ]}
            />

            {/* WIN CLUB Premium */}
            <TierCard
              title="WIN CLUB Premium"
              subtitle="Already running, but stuck"
              price="$497/month (3 months)"
              description="You have customers/revenue but stuck. Analysis paralysis. Execution crisis. Know what to do, can't execute."
              features={[
                'Wed/Fri 1:1 private mentorship',
                '20 min each (focused, not fluff)',
                'Direct WhatsApp access between sessions',
                '"Shocks in the brain" - Transformation, not tips'
              ]}
              format="Exclusive 1:1 (5 founders max)"
              details={[
                { label: 'Commitment', value: '3 months minimum' },
                { label: 'Q1 2026 cohort', value: '5 spots only' },
                { label: 'Applications due', value: 'Dec 31, 2025' }
              ]}
              elite
            />
          </div>
        </div>

        {/* 4. COMPARISON TABLE */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold terminal-text matrix-glow text-center mb-8">
            Side-by-Side Comparison
          </h2>
          <div className="bg-background-secondary/30 border border-border rounded-lg p-6">
            <ComparisonTable />
          </div>
        </div>

        {/* 5. FAQ */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold terminal-text matrix-glow text-center mb-8">
            Common Questions
          </h2>
          <FAQ />
        </div>

        {/* 6. CTA */}
        <div className="max-w-3xl mx-auto">
          <CTABlock variant="soft" />
        </div>
      </div>
    </div>
  )
}
