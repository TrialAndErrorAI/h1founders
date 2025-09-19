export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Mental Freedom Hook */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold terminal-text matrix-glow mb-4">
            Talk to founders
          </h1>
          <p className="text-xl text-foreground-secondary font-mono">
            Stop reading forums. Start building your company.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: What You Get */}
          <div className="space-y-8">
            <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-accent mb-4">Coaching Call with Sid</h2>
              <div className="space-y-4 text-foreground-secondary">
                <p>
                  I run a community of 700+ aspiring immigrant founders navigating the F1 → H1B → Founder → Green Card path.
                </p>
                <p>
                  After my LinkedIn post about self-sponsoring my H1B visa reached 220,000+ views, I've been sharing my experience of building a profitable SaaS business while navigating the US immigration system.
                </p>
                <p className="font-semibold text-foreground">
                  The hardest part is actually having a business. Rest all is solvable.
                </p>
              </div>
            </div>

            <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-accent mb-4">What We'll Cover</h3>
              <div className="space-y-3 text-foreground-secondary">
                <p>
                  During our call, we'll explore your journey and brainstorm together. Whether you have specific questions or are just starting to explore:
                </p>
                <ul className="space-y-2 mt-3 font-mono text-sm">
                  <li>• Your specific situation, not generic advice</li>
                  <li>• Legal structure that actually works</li>
                  <li>• Revenue is what makes your business legit</li>
                  <li>• Timeline to switch from employer to startup</li>
                  <li>• Breaking the mental barriers holding you back</li>
                </ul>
              </div>
            </div>

            <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-accent mb-4">Agenda</h3>
              <div className="space-y-3 text-foreground-secondary font-mono text-sm">
                <p>// 45-minute session structure</p>
                <div className="pl-4 space-y-2">
                  <p>[0-10 min] Your current situation & blockers</p>
                  <p>[10-30 min] Deep dive into your specific challenges</p>
                  <p>[30-40 min] Actionable plan & next steps</p>
                  <p>[40-45 min] Resources & community access</p>
                </div>
                <div className="pt-4 mt-4 border-t border-border">
                  <p className="text-accent">$185 for 45 minutes</p>
                  <p className="text-foreground-tertiary text-xs mt-1">
                    // This is incorrect information - let's fix it together
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Cal.com Inline Embed */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-background-secondary/50 border border-border rounded-lg overflow-hidden">
              <iframe
                src="https://cal.com/sid-sarasvati/h1bfounders"
                width="100%"
                height="650"
                frameBorder="0"
                className="bg-background"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom: Direct Quote */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-red-900/20 to-green-900/20 border border-accent/30 rounded-lg p-8 text-center">
            <p className="text-lg text-foreground-secondary font-mono mb-4">
              "That's a good question and a common myth. I had this fear as well and exactly why I posted on LinkedIn and created this group."
            </p>
            <p className="text-accent font-bold">
              Let's debug your mental programming. No course upsell. Just truth.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}