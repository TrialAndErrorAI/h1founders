export default function Coaching() {
  return (
    <section id="coaching" className="bg-background px-6 py-16 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Direct Message */}
          <div>
            <h2 className="text-3xl font-bold terminal-text matrix-glow mb-4">
              Need 1:1 Help?
            </h2>
            <p className="text-lg text-foreground-secondary mb-4">
              I spent 15 years figuring out H1B entrepreneurship.
              You can learn it in 45 minutes.
            </p>
            <div className="space-y-2 text-foreground-tertiary font-mono text-sm mb-6">
              <p>✓ Your specific situation analyzed</p>
              <p>✓ Legal structure that actually works</p>
              <p>✓ Revenue timeline to switch from employer</p>
              <p>✓ EB1A pathway through your startup</p>
            </div>
            <a
              href="/coaching"
              className="inline-block px-6 py-3 bg-green-400 hover:bg-accent text-foreground font-mono font-bold rounded transition-colors"
            >
              BOOK_SESSION() → $185
            </a>
          </div>

          {/* Right: Social Proof */}
          <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
            <div className="font-mono text-sm">
              <div className="text-accent mb-3">// Recent feedback</div>
              <div className="text-foreground-secondary space-y-3">
                <p className="border-l-2 border-accent pl-3">
                  "Most valuable 45 minutes of my founder journey.
                  Sid cut through all the BS and gave me a clear path."
                  <span className="text-foreground-tertiary">- H1B founder, Nov 2024</span>
                </p>
                <p className="border-l-2 border-accent pl-3">
                  "I was about to make expensive mistakes. This call
                  saved me $10K+ in legal fees alone."
                  <span className="text-foreground-tertiary">- F1 founder, Dec 2024</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}