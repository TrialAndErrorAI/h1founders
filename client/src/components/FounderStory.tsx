export default function FounderStory() {
  return (
    <section className="bg-background-secondary px-6 py-24 sm:py-32 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="terminal-text text-4xl font-bold mb-4">./immigrant_founder_reality</h2>
          <p className="text-foreground-tertiary text-lg">
            From Scared Employee to $3M Company
          </p>
        </div>
        
        <div className="space-y-8">
          {/* The Fear Terminal */}
          <div className="bg-background rounded-lg p-8 border border-red-500">
            <div className="font-mono text-sm mb-4">
              <span className="text-red-pill">ERROR:</span> 
              <span className="text-foreground-secondary"> fear_loop.exe has been running for 15 years</span>
            </div>
            <div className="bg-background-secondary rounded p-4 font-mono text-sm border border-border">
              <div className="text-red-pill">// The mental prison</div>
              <div className="text-foreground-secondary">while (on_h1b) &#123;</div>
              <div className="text-foreground-secondary ml-4">thought: "Don't start a business"</div>
              <div className="text-foreground-secondary ml-4">thought: "You'll lose your visa"</div>
              <div className="text-foreground-secondary ml-4">thought: "Family will be deported"</div>
              <div className="text-foreground-secondary ml-4">action: stay_safe() // Do nothing</div>
              <div className="text-foreground-secondary">&#125;</div>
            </div>
            <p className="text-foreground-secondary mt-4 text-lg">
              Every entrepreneur in our community knows this fear. The voice that keeps you small.
            </p>
          </div>
          
          {/* The Breakthrough */}
          <div className="bg-background rounded-lg p-8 border border-accent">
            <div className="font-mono text-sm mb-4">
              <span className="text-accent">SUCCESS:</span> 
              <span className="text-foreground-secondary"> myths.debunked() → freedom.unlocked()</span>
            </div>
            <div className="text-foreground-secondary text-lg space-y-4">
              <p>
                But here's what I learned: <span className="terminal-text font-semibold">The myths keeping immigrants 
                as employees are mostly BS.</span> You CAN start businesses on H1B. You CAN bootstrap profitable companies. 
                You CAN break free from visa slavery.
              </p>
              <p>
                I didn't just build one company - I built multiple. RenovateAI hit $3M revenue. I learned to bootstrap, 
                scale, and most importantly - how to help other immigrants overcome the mental blocks.
              </p>
            </div>
          </div>
          
          {/* The Viral Moment */}
          <div className="bg-background rounded-lg p-8 border border-blue-500">
            <div className="font-mono text-sm mb-4">
              <span className="text-blue-pill">VIRAL:</span> 
              <span className="text-foreground-secondary"> linkedin_post.exe → community_explosion()</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-background-secondary rounded p-4 text-center border border-border">
                <div className="terminal-text text-2xl font-bold">872</div>
                <div className="text-foreground-tertiary text-sm">Reactions</div>
              </div>
              <div className="bg-background-secondary rounded p-4 text-center border border-border">
                <div className="terminal-text text-2xl font-bold">100+</div>
                <div className="text-foreground-tertiary text-sm">Founders in 24hrs</div>
              </div>
              <div className="bg-background-secondary rounded p-4 text-center border border-border">
                <div className="terminal-text text-2xl font-bold">1,400+</div>
                <div className="text-foreground-tertiary text-sm">Community Today</div>
              </div>
            </div>
            <p className="text-foreground-secondary text-lg">
              Everyone had the same fear. Everyone needed the same permission. We gave it to each other.
            </p>
          </div>
          
          {/* The Community Ethos */}
          <div className="bg-background rounded-lg p-8 border border-accent">
            <div className="text-center mb-6">
              <p className="terminal-text text-2xl font-bold matrix-glow">
                "Each one of us has an inspiring story."
              </p>
              <p className="text-foreground-tertiary mt-2">- Community founding principle</p>
            </div>
            <div className="bg-background-secondary rounded p-4 font-mono text-sm border border-border">
              <div className="text-accent">// This isn't about selling you coaching</div>
              <div className="text-foreground-secondary">community_model = &#123;</div>
              <div className="text-foreground-secondary ml-4">approach: "peer_to_peer",</div>
              <div className="text-foreground-secondary ml-4">members: 1400,</div>
              <div className="text-foreground-secondary ml-4">goal: "bootstrap_freedom",</div>
              <div className="text-foreground-secondary ml-4">eb1a_outcome: "bonus_not_primary"</div>
              <div className="text-foreground-secondary">&#125;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}