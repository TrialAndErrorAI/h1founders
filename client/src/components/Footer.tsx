export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {/* Terminal Footer */}
        <div className="bg-background-secondary rounded-lg p-6 border border-border">
          <div className="font-mono text-sm">
            <div className="text-accent">sid@h1founders:~$ ./connect --socials</div>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/sidsarasvati/"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-text hover:text-foreground font-mono transition-colors"
              >
                linkedin.com/in/sidsarasvati
              </a>
              <a
                href="https://www.instagram.com/sid.sarasvati/"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-text hover:text-foreground font-mono transition-colors"
              >
                instagram.com/sid.sarasvati
              </a>
              <a
                href="https://www.instagram.com/h1bfounders/"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-text hover:text-foreground font-mono transition-colors"
              >
                instagram.com/h1bfounders
              </a>
              <a
                href="https://www.youtube.com/@h1bfounders"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-text hover:text-foreground font-mono transition-colors"
              >
                youtube.com/@h1bfounders
              </a>
              <a
                href="mailto:sid@h1founders.com"
                className="terminal-text hover:text-foreground font-mono transition-colors"
              >
                sid@h1founders.com
              </a>
            </div>
            
            <div className="mt-8 text-center border-t border-border pt-6">
              <div className="text-foreground-secondary mb-2">
                H1Founders - Breaking visa slavery since March 2024
              </div>
              <div className="text-foreground-tertiary text-xs">
                Founded by Sid Sarasvati • CEO of RenovateAI ($3M ARR) • EB1-A recipient
              </div>
            </div>
            
            <div className="mt-6 bg-background rounded p-4 border border-border">
              <div className="text-accent">// System status</div>
              <div className="text-foreground-secondary">
                community_size: 1400,<br/>
                companies_bootstrapped: "many",<br/>
                myths_destroyed: "countless",<br/>
                freedom_enabled: true
              </div>
              <div className="text-accent mt-2">
                Ready to start your journey? <span className="cursor">█</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="font-mono text-xs text-foreground-tertiary">
            ./build_business --while="on_h1b" --outcome="eb1a_green_card"
          </div>
        </div>
      </div>
    </footer>
  )
}