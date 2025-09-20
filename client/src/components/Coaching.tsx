export default function Coaching() {
  return (
    <section id="coaching" className="bg-background px-6 py-16 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Direct Message */}
          <div>
            <h2 className="text-3xl font-bold terminal-text matrix-glow mb-4">
              Ready to Debug Your Mind?
            </h2>
            <p className="text-lg text-foreground-secondary mb-4">
              I spent 11 years believing lies about what's possible.
              Let's debug your mental programming in 45 minutes.
            </p>
            <div className="space-y-2 text-foreground-tertiary font-mono text-sm mb-6">
              <p>✓ Break your "How can I?" patterns</p>
              <p>✓ Shift from employee to founder identity</p>
              <p>✓ Stop waiting for permission that never comes</p>
              <p>✓ Create your own timeline (not 2029)</p>
            </div>
            <a
              href="/coaching"
              className="inline-block px-6 py-3 bg-green-400 hover:bg-accent text-foreground font-mono font-bold rounded transition-colors"
            >
              BOOK_SESSION()
            </a>
          </div>

          {/* Right: Social Proof */}
          <div className="bg-background-secondary/50 border border-border rounded-lg p-6">
            <div className="font-mono text-sm">
              <div className="text-accent mb-3">// Recent feedback</div>
              <div className="text-foreground-secondary space-y-3">
                <p className="border-l-2 border-accent pl-3">
                  "I went from 'How can I?' to 'I'm building this.'
                  The mindset shift was worth 10x the price."
                  <span className="text-foreground-tertiary">- Former permission-seeker, Nov 2024</span>
                </p>
                <p className="border-l-2 border-accent pl-3">
                  "Stopped accepting my 5-year prison sentence.
                  Now building my path to freedom."
                  <span className="text-foreground-tertiary">- Founder who rejected 2029, Dec 2024</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}