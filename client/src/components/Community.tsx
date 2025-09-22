export default function Community() {
  return (
    <section id="community" className="bg-background-secondary px-6 py-24 sm:py-32 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="terminal-text text-4xl font-bold mb-4">
            ./identity_shifts_daily
          </h2>
          <p className="text-foreground-tertiary text-lg">
            Watch founders transform from "How can I?" to "I'm building this"
          </p>
        </div>
        
        {/* Primary CTA - WhatsApp */}
        <div className="bg-background rounded-lg p-8 border-2 border-accent mb-16 text-center">
          <div className="font-mono text-sm mb-4">
            <div className="text-accent text-lg">// Join 850+ founders breaking free</div>
          </div>
          <p className="text-foreground text-xl mb-6">
            Real-time support. No BS. Just founders helping founders.
          </p>
          <a
            href="https://chat.whatsapp.com/EDzgWji4jr6AlVKch0dGMV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-black px-8 py-3 rounded font-bold hover:bg-green-400 transition-colors text-lg"
          >
            JOIN WHATSAPP GROUP →
          </a>
          <div className="mt-6 flex justify-center gap-8 text-sm text-foreground-tertiary">
            <span>✓ Real founders</span>
            <span>✓ Daily wins</span>
            <span>✓ No lawyers selling</span>
          </div>
        </div>
        
        {/* Community Terminal */}
        <div className="bg-background rounded-lg p-8 border border-border">
          <div className="font-mono text-sm mb-8">
            <div className="text-accent">sid@community:~$ cat whatsapp_highlights.log</div>
          </div>
          
          <div className="space-y-8">
            {/* Message 1 */}
            <div className="border-l-4 border-accent pl-6">
              <div className="font-mono text-sm mb-2">
                <span className="text-accent">[Week 1]</span>
                <span className="text-foreground-tertiary"> Permission-Seeker:</span>
              </div>
              <p className="text-foreground-secondary mb-2">
                "How can I start a business? My lawyer said it's risky.
                I'll wait until I get my green card in 2029."
              </p>
              <p className="text-foreground-tertiary text-sm font-mono">
                # Classic mental prison. Asking for permission to exist.
              </p>
            </div>
            
            {/* Message 2 */}
            <div className="border-l-4 border-yellow-500 pl-6">
              <div className="font-mono text-sm mb-2">
                <span className="text-yellow-400">[Week 4]</span>
                <span className="text-foreground-tertiary"> In Transition:</span>
              </div>
              <p className="text-foreground-secondary mb-2">
                "Wait, the forums were wrong? I tested it myself.
                I can actually do this. Why did I wait so long?"
              </p>
              <p className="text-foreground-tertiary text-sm font-mono">
                # The crack in the Matrix. First-hand truth beats forum myths.
              </p>
            </div>
            
            {/* Message 3 */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="font-mono text-sm mb-2">
                <span className="text-accent">[Week 12]</span>
                <span className="text-foreground-tertiary"> Founder Mode:</span>
              </div>
              <p className="text-foreground-secondary mb-2">
                "Just hit $10K MRR. Self-sponsoring my H1B next month.
                I'm not waiting until 2029. I'm free already."
              </p>
              <p className="text-foreground-tertiary text-sm font-mono">
                # Identity shift complete. Behavior follows identity.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-background-secondary rounded p-4 border border-border">
            <div className="font-mono text-sm">
              <div className="text-accent">// The pattern is clear</div>
              <div className="text-foreground-secondary">
                Week 1: "How can I...?" (permission-seeking)<br/>
                Week 4: "Wait, I can?" (awakening)<br/>
                Week 12: "I'm building this" (transformation)
              </div>
              <div className="terminal-text mt-4">
                Your identity shift starts here <span className="cursor">█</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Identity Shift Stats */}
        <div className="mt-16 bg-background-secondary rounded-lg p-6 border border-border">
          <div className="font-mono text-sm">
            <div className="text-accent">sid@transformations:~$ show_impact --real</div>
            <div className="text-foreground-secondary mt-4 space-y-1">
              <div>Permission-seekers transformed: 1400+</div>
              <div>"How can I?" → "I'm building": Daily</div>
              <div>People rejecting 2029 timeline: 100s</div>
              <div>Forum myths busted: Countless</div>
              <div>Mental prisons broken: Growing</div>
            </div>
            <div className="text-accent mt-4">
              Every day, someone stops asking and starts doing. <span className="cursor">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}