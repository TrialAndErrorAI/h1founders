export default function Transformation() {
  return (
    <section className="bg-background px-6 py-24 sm:py-32 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <h2 className="terminal-text text-center text-4xl font-bold mb-4">
          ./break_mental_chains
        </h2>
        <p className="text-center text-xl text-foreground-tertiary mb-16">
          Stop asking for permission. Start taking action.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Blue Pill Reality */}
          <div className="bg-background-secondary rounded-lg p-8 border border-red-500">
            <h3 className="text-xl font-bold text-red-pill mb-4 font-mono">BLUE_PILL.exe</h3>
            <div className="bg-background rounded p-4 border border-border font-mono text-sm mb-4">
              <div className="text-red-pill">// Permission-seeking mode</div>
              <div className="text-foreground-secondary">"How can I...?"</div>
              <div className="text-foreground-secondary">"My lawyer said..."</div>
              <div className="text-foreground-secondary">"I'll wait until 2029"</div>
              <div className="text-foreground-secondary">"Too many challenges"</div>
              <div className="text-foreground-secondary">"I've been thinking for years..."</div>
            </div>
            <ul className="space-y-3 text-foreground-secondary">
              <li className="flex items-start">
                <span className="text-red-pill mr-2 font-mono">×</span>
                "How can I...?" (begging for permission)
              </li>
              <li className="flex items-start">
                <span className="text-red-pill mr-2 font-mono">×</span>
                "My lawyer said no" (outsourced your brain)
              </li>
              <li className="flex items-start">
                <span className="text-red-pill mr-2 font-mono">×</span>
                "I'll wait until 2029" (accepting 5-year prison)
              </li>
              <li className="flex items-start">
                <span className="text-red-pill mr-2 font-mono">×</span>
                "I'm just an H1B" (visa is your identity)
              </li>
            </ul>
          </div>
          
          {/* Red Pill Freedom */}
          <div className="bg-background-secondary rounded-lg p-8 border border-accent">
            <h3 className="text-xl font-bold terminal-text mb-4 font-mono">RED_PILL.exe</h3>
            <div className="bg-background rounded p-4 border border-border font-mono text-sm mb-4">
              <div className="text-accent">// Founder identity mode</div>
              <div className="text-foreground-secondary">"I'm building this"</div>
              <div className="text-foreground-secondary">"I tested it myself"</div>
              <div className="text-foreground-secondary">"Free by 2025, not 2029"</div>
              <div className="text-foreground-secondary">"Challenges = opportunities"</div>
              <div className="text-foreground-secondary">"Started yesterday"</div>
            </div>
            <ul className="space-y-3 text-foreground-secondary">
              <li className="flex items-start">
                <span className="terminal-text mr-2 font-mono">✓</span>
                "I'm building" (already in motion)
              </li>
              <li className="flex items-start">
                <span className="terminal-text mr-2 font-mono">✓</span>
                "I tested it myself" (first-hand truth)
              </li>
              <li className="flex items-start">
                <span className="terminal-text mr-2 font-mono">✓</span>
                "I reject their timeline" (create your own)
              </li>
              <li className="flex items-start">
                <span className="terminal-text mr-2 font-mono">✓</span>
                "I'm a founder" (visa is just paperwork)
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center bg-background-secondary rounded-xl p-8 border border-yellow-500">
          <div className="font-mono text-sm mb-4">
            <span className="text-yellow-400">IDENTITY_SHIFT:</span>
            <span className="text-foreground-secondary"> The real transformation</span>
          </div>
          <p className="text-xl font-semibold text-foreground mb-4">
            You're asking "How can I?" when you should be saying "I am."
          </p>
          <p className="text-lg text-foreground-secondary mb-6">
            You're waiting for permission that will never come.<br/>
            You've accepted a 5-year sentence like it's reasonable.<br/>
            <br/>
            <span className="text-accent font-bold">I did this for 11 years.</span> The prison was in my head.<br/>
            The day I stopped asking and started doing, everything changed.
          </p>
          <div className="bg-background rounded p-4 border border-border font-mono text-sm">
            <div className="text-accent">// Real behavior change is identity change</div>
            <div className="text-foreground-secondary mt-2">
              When you think like a founder, you act like a founder.<br/>
              When you act like a founder, you become one.<br/>
              <br/>
              <span className="text-red-pill">Stop asking for permission.</span><br/>
              <span className="text-accent">Start taking action.</span>
            </div>
            <div className="terminal-text mt-4 animate-pulse">your_move() █</div>
          </div>
        </div>
      </div>
    </section>
  )
}