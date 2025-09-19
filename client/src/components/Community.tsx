export default function Community() {
  return (
    <section id="community" className="bg-background-secondary px-6 py-24 sm:py-32 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="terminal-text text-4xl font-bold mb-4">
            ./community_network
          </h2>
          <p className="text-foreground-tertiary text-lg">
            "Each one of us has an inspiring story" - Built by founders, for founders
          </p>
        </div>
        
        {/* Network Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* WhatsApp */}
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-center mb-4">
              <div className="terminal-text font-mono text-xl font-bold">W</div>
              <h3 className="ml-3 text-xl font-semibold text-foreground font-mono">WhatsApp</h3>
            </div>
            <div className="bg-background-secondary rounded p-4 font-mono text-sm border border-border mb-4">
              <div className="text-accent">// Real-time founder chat</div>
              <div className="text-foreground-secondary">members: 700+</div>
              <div className="text-foreground-secondary">activity: "high"</div>
              <div className="text-foreground-secondary">wins_shared: "daily"</div>
            </div>
            <a
              href="https://chat.whatsapp.com/h1founders"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-text font-mono hover:text-foreground transition-colors"
            >
              ./join --whatsapp
            </a>
          </div>
          
          {/* Substack */}
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-center mb-4">
              <div className="terminal-text font-mono text-xl font-bold">S</div>
              <h3 className="ml-3 text-xl font-semibold text-foreground font-mono">Substack</h3>
            </div>
            <div className="bg-background-secondary rounded p-4 font-mono text-sm border border-border mb-4">
              <div className="text-accent">// Weekly immigration intel</div>
              <div className="text-foreground-secondary">subscribers: 648</div>
              <div className="text-foreground-secondary">open_rate: "50%"</div>
              <div className="text-foreground-secondary">frequency: "weekly"</div>
            </div>
            <a
              href="https://h1founders.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-text font-mono hover:text-foreground transition-colors"
            >
              ./subscribe --newsletter
            </a>
          </div>
          
          {/* Slack */}
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-center mb-4">
              <div className="terminal-text font-mono text-xl font-bold">S</div>
              <h3 className="ml-3 text-xl font-semibold text-foreground font-mono">Slack</h3>
            </div>
            <div className="bg-background-secondary rounded p-4 font-mono text-sm border border-border mb-4">
              <div className="text-accent">// Deep discussions</div>
              <div className="text-foreground-secondary">attorney_amas: true</div>
              <div className="text-foreground-secondary">profile_reviews: true</div>
              <div className="text-foreground-secondary">access: "premium"</div>
            </div>
            <a
              href="https://h1founders.slack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-text font-mono hover:text-foreground transition-colors"
            >
              ./join --slack
            </a>
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
                <span className="text-accent">[2024-03-15 09:23]</span>
                <span className="text-foreground-tertiary"> Girish:</span>
              </div>
              <p className="text-foreground-secondary mb-2">
                "I was on an H1B but my grace period ended and I changed my status to B2. 
                I'm deciding if I should try for an EB2-NIW or an O1 or an H1B."
              </p>
              <p className="text-foreground-tertiary text-sm font-mono">
                # First member. Started in panic, now building his company.
              </p>
            </div>
            
            {/* Message 2 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="font-mono text-sm mb-2">
                <span className="text-blue-pill">[2024-07-22 14:17]</span>
                <span className="text-foreground-tertiary"> Asha:</span>
              </div>
              <p className="text-foreground-secondary mb-2">
                "Thanks Sid for your selflessness and willingness to share your experience with many."
              </p>
              <p className="text-foreground-tertiary text-sm font-mono">
                # This community isn't about selling. It's about helping.
              </p>
            </div>
            
            {/* Message 3 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="font-mono text-sm mb-2">
                <span className="text-purple-400">[2024-08-03 11:42]</span>
                <span className="text-foreground-tertiary"> Lindsey:</span>
              </div>
              <p className="text-foreground-secondary mb-2">
                "I am an ex-founder with an EB1-A green card. You can self sponsor your EB1-A green card. 
                I created PermanentResident.us to give back."
              </p>
              <p className="text-foreground-tertiary text-sm font-mono">
                # Got EB1-A, now helps others for free. Community DNA.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-background-secondary rounded p-4 border border-border">
            <div className="font-mono text-sm">
              <div className="text-accent">// Community philosophy</div>
              <div className="text-foreground-secondary">
                "By sharing we make each other stronger with a sense of community." - Sid
              </div>
              <div className="terminal-text mt-2">
                Ready to connect with fellow founders? <span className="cursor">█</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Network Growth Terminal */}
        <div className="mt-16 bg-background-secondary rounded-lg p-6 border border-border">
          <div className="font-mono text-sm">
            <div className="text-accent">sid@network:~$ growth_stats --timeline</div>
            <div className="text-foreground-secondary mt-4 space-y-1">
              <div>March 2024    # Viral LinkedIn post → 100 members in 24hrs</div>
              <div>April 2024    # WhatsApp: 200 → Slack launched</div>
              <div>June 2024     # Substack: 300 subscribers</div>
              <div>August 2024   # WhatsApp: 500 → Attorney AMAs start</div>
              <div>September 2024# WhatsApp: 700+, Substack: 600+, Total: 1000+</div>
            </div>
            <div className="text-accent mt-4">
              From 0 to 1000+ in 6 months. Organic growth only. <span className="cursor">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}