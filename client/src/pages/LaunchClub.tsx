import CTABlock from '../components/CTABlock'

export default function LaunchClub() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* HERO + TOP CTA */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold terminal-text matrix-glow mb-4">
            Launch Club
          </h1>
          <p className="text-xl text-accent font-mono mb-2">
            Attorney-Ready in 3 Weeks
          </p>
          <p className="text-foreground-secondary font-mono mb-6">
            $997 | 5 founders max | C2 starts Dec 16
          </p>

          {/* Immediate action for ready buyers */}
          <div className="space-y-3">
            <a
              href="mailto:sid@h1founders.com?subject=Launch%20Club%20C2%20-%20I'm%20In"
              className="inline-block bg-accent text-background px-8 py-3 rounded font-mono font-bold hover:bg-accent/80 transition-colors"
            >
              I'm In - Email Sid
            </a>
            <p className="text-foreground-secondary font-mono text-sm">
              <a
                href="https://chat.whatsapp.com/L7sHBIbCuyx2cYvzuaDCat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Join WhatsApp
              </a>
              {' | '}
              <a
                href="https://linkedin.com/in/sidsarasvati"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                DM on LinkedIn
              </a>
            </p>
          </div>
        </div>

        {/* DREAM OUTCOME */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-accent/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold terminal-text matrix-glow mb-4">
              The Outcome
            </h2>
            <p className="text-foreground-secondary text-lg mb-4">
              In 3 weeks, you stop Googling "H1B self-sponsor" at 2 AM.
            </p>
            <p className="text-foreground">
              Entity formed. Cap table clean. Business case documented. Attorney meeting booked.
            </p>
            <p className="text-accent font-mono mt-4">
              You're not figuring it out - you're executing a proven path.
            </p>
          </div>
        </div>

        {/* WHAT YOU WALK OUT WITH */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold terminal-text matrix-glow mb-6">
            What You Walk Out With
          </h2>

          <div className="space-y-6">
            {/* Entity Foundation */}
            <div className="bg-background-secondary/30 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Entity Foundation</h3>
              <ul className="space-y-2 text-foreground-secondary font-mono text-sm mb-4">
                <li>• C-corp formed (Delaware)</li>
                <li>• Registered agent active</li>
                <li>• EIN + DUNS registered</li>
                <li>• Operating agreement / bylaws</li>
              </ul>
              <p className="text-foreground-secondary text-sm italic">
                Most founders waste weeks figuring this out. We do it Week 1.
              </p>
            </div>

            {/* Ownership Structure */}
            <div className="bg-background-secondary/30 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Ownership Structure</h3>
              <ul className="space-y-2 text-foreground-secondary font-mono text-sm mb-4">
                <li>• Cap table documented (clean equity split)</li>
                <li>• Offer letter to yourself as employee</li>
                <li>• 83(b) election filed (if applicable)</li>
                <li>• Stock certificates / vesting schedule</li>
              </ul>
              <p className="text-foreground-secondary text-sm italic">
                Lawyers charge $2K for cap table cleanup. Yours will be clean from day one.
              </p>
            </div>

            {/* Business Case */}
            <div className="bg-background-secondary/30 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Business Case</h3>
              <ul className="space-y-2 text-foreground-secondary font-mono text-sm mb-4">
                <li>• Business plan written</li>
                <li>• Pitch deck created</li>
                <li>• Revenue projections documented</li>
                <li>• SOC code selected + justified</li>
              </ul>
              <p className="text-foreground-secondary text-sm italic">
                The attorney files paperwork. They don't build your business case. This is the work.
              </p>
            </div>

            {/* Attorney-Ready Handoff */}
            <div className="bg-background-secondary/30 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Attorney-Ready Handoff</h3>
              <ul className="space-y-2 text-foreground-secondary font-mono text-sm mb-4">
                <li>• All docs organized for handoff</li>
                <li>• Questions pre-answered</li>
                <li>• Warm intro to Serotte Law</li>
              </ul>
              <p className="text-foreground-secondary text-sm italic">
                You walk in prepared. Less billable hours fumbling. They discount you $1,000.
              </p>
            </div>
          </div>
        </div>

        {/* PARTNER BONUSES */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold terminal-text matrix-glow mb-6">
            Partner Bonuses
          </h2>

          {/* Serotte Bonus */}
          <div className="bg-gradient-to-r from-green-900/20 to-transparent border border-accent/30 rounded-lg p-6 mb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-accent">Serotte Law - $1,000 Off</h3>
              <span className="bg-accent/20 text-accent px-2 py-1 rounded font-mono text-xs">BONUS</span>
            </div>
            <ul className="space-y-2 text-foreground-secondary font-mono text-sm mb-4">
              <li>• "H1Founders Prep Discount" on H1B filing</li>
              <li>• Direct intro to partner Raghavan Nagarajan</li>
              <li>• You walk in ready, save them time, they discount you</li>
            </ul>
            <div className="bg-background/50 border border-border/50 rounded p-4">
              <p className="text-foreground-secondary text-sm">
                <span className="text-accent font-semibold">Why Serotte?</span> They did my H1B.
                They've helped 10+ founders in this community. They know your situation.
                This isn't a random referral - these are vetted attorneys with proven success stories.
              </p>
            </div>
          </div>

          {/* Brad Bonus */}
          <div className="bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/30 rounded-lg p-6 mb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-blue-400">Brad Daniels CPA - $400 Off</h3>
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-mono text-xs">BONUS</span>
            </div>
            <ul className="space-y-2 text-foreground-secondary font-mono text-sm">
              <li>• Incorporation: $600 (normally $1,000)</li>
              <li>• Tax strategy consult included</li>
              <li>• First year filing discount</li>
            </ul>
          </div>

          {/* Community Bonus */}
          <div className="bg-background-secondary/30 border border-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-foreground">H1Founders Community</h3>
              <span className="bg-foreground-secondary/20 text-foreground-secondary px-2 py-1 rounded font-mono text-xs">BONUS</span>
            </div>
            <ul className="space-y-2 text-foreground-secondary font-mono text-sm">
              <li>• 860+ immigrant founders</li>
              <li>• Lifetime access to community</li>
              <li>• WhatsApp group for real-time support</li>
            </ul>
          </div>

          {/* Total Bonus Value */}
          <div className="text-right pt-4 mt-4 border-t border-border">
            <p className="text-foreground-secondary font-mono">
              Total bonus value: <span className="text-accent font-bold">$1,400+</span>
            </p>
          </div>
        </div>

        {/* THE MATH */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-accent/10 to-transparent border border-accent/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold terminal-text matrix-glow mb-6">
              The Math
            </h2>
            <div className="space-y-3 font-mono">
              <div className="flex justify-between">
                <span className="text-foreground-secondary">You pay:</span>
                <span className="text-foreground">$997</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Partner discounts:</span>
                <span className="text-foreground">$1,400</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-accent/30">
                <span className="text-accent font-bold">My coaching:</span>
                <span className="text-accent font-bold">Free</span>
              </div>
            </div>
            <p className="text-foreground-secondary text-sm mt-4">
              I structured this so you come out ahead. You get prepared,
              partners get qualified clients, I get to help founders.
            </p>
          </div>
        </div>

        {/* GUARANTEE */}
        <div className="mb-12">
          <div className="bg-background-secondary/30 border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold terminal-text matrix-glow mb-4">
              Guarantee
            </h2>
            <p className="text-foreground text-lg mb-4">
              Do the work. Show up to calls.
            </p>
            <p className="text-foreground-secondary">
              If you're not attorney-ready after 3 weeks, I keep working with you until you are.
              No extra charge.
            </p>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mb-12">
          <CTABlock variant="scarcity" spots={5} program="C2" startDate="Dec 16" closeDate="Dec 13" />
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center">
          <p className="text-foreground-tertiary font-mono text-sm">
            Not for everyone. If you're filing later or want to figure it out yourself, no problem.
            <br />
            If you're ready to stop researching and start executing - this is the path.
          </p>
        </div>

      </div>
    </div>
  )
}
