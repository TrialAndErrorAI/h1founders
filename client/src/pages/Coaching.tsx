export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Mental Freedom Hook */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold terminal-text matrix-glow mb-4">
            Stop Asking Permission
          </h1>
          <p className="text-xl text-foreground-secondary font-mono">
            Break years of mental programming in 45 minutes
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: What You Get */}
          <div className="space-y-8">
            <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-accent mb-4">The Problem You're Facing</h2>
              <div className="space-y-4 text-foreground-secondary">
                <p>
                  You're still asking "How can I?" instead of saying "I'm building this."
                </p>
                <p>
                  Your lawyer said no, so you stopped. You accepted waiting until 2029 like it's reasonable. You've been "thinking about it for years" but haven't started.
                </p>
                <p className="font-semibold text-foreground">
                  The prison is in your head. I was stuck there for 11 years.
                </p>
                <p className="text-accent">
                  The hardest part is actually having a business. Rest all is solvable.
                </p>
              </div>
            </div>

            <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-accent mb-4">The Transformation</h3>
              <div className="space-y-3 text-foreground-secondary">
                <p>
                  In 45 minutes, we'll rewire your mental patterns:
                </p>
                <ul className="space-y-2 mt-3 font-mono text-sm">
                  <li>• FROM: "How can I?" → TO: "I'm doing this"</li>
                  <li>• FROM: "My lawyer said..." → TO: "I tested it myself"</li>
                  <li>• FROM: "Wait until 2029" → TO: "Free by 2025"</li>
                  <li>• FROM: "Too risky" → TO: "Staying employed is riskier"</li>
                  <li>• FROM: Employee identity → TO: Founder identity</li>
                </ul>
              </div>
            </div>

            <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-accent mb-4">Session Structure</h3>
              <div className="space-y-3 text-foreground-secondary font-mono text-sm">
                <p>// Mental reprogramming agenda</p>
                <div className="pl-4 space-y-2">
                  <p>[0-10 min] Identify your permission-seeking patterns</p>
                  <p>[10-30 min] Break the mental prison you've accepted</p>
                  <p>[30-40 min] Install founder identity & behaviors</p>
                  <p>[40-45 min] Next steps (Win Club if ready)</p>
                </div>
                <div className="pt-4 mt-4 border-t border-border">
                  <p className="text-accent text-lg font-bold">$297 for 45 minutes</p>
                  <p className="text-foreground-secondary text-sm mt-2">
                    One bad decision costs $10K.<br/>
                    One identity shift changes everything.
                  </p>
                  <p className="text-yellow-400 text-xs mt-3">
                    // Want ongoing support? Ask about Win Club ($497/mo)
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

        {/* Bottom: Direct Message */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-red-900/20 to-green-900/20 border border-accent/30 rounded-lg p-8 text-center">
            <p className="text-lg text-foreground-secondary font-mono mb-4">
              "That's a common myth. I believed it for 11 years.<br/>
              The forums are wrong. Your lawyer is wrong.<br/>
              You're asking the wrong question."
            </p>
            <p className="text-accent font-bold text-xl">
              Stop asking "How can I?"<br/>
              Start saying "I am."
            </p>
            <p className="text-foreground-tertiary text-sm mt-4 font-mono">
              // No course upsell. No BS. Just identity transformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}