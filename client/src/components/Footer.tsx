export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {/* Terminal Footer */}
        <div className="bg-background-secondary rounded-lg p-6 border border-border">
          <div className="font-mono text-sm">
            <div className="text-accent">sid@h1founders:~$ ./connect --channels</div>
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
                href="https://community.h1bfounders.com"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-text hover:text-foreground font-mono transition-colors"
              >
                community.h1bfounders.com
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
                H1Founders - Breaking ALL mental prisons since March 2024
              </div>
              <div className="text-foreground-tertiary text-xs">
                Founded by Sid Sarasvati • "The slave mentality was self-imposed" • Helping 1400+ realize the same
              </div>
            </div>
            
            <div className="mt-6 bg-background rounded p-4 border border-border">
              <div className="text-accent mb-3">// Impact metrics</div>
              <div className="space-y-2">
                <div className="flex justify-between text-foreground-secondary">
                  <span>Mental prisons broken:</span>
                  <span className="text-accent">1400+</span>
                </div>
                <div className="flex justify-between text-foreground-secondary">
                  <span>Identity shifts daily:</span>
                  <span className="text-yellow-400">"How can I?" → "I am"</span>
                </div>
                <div className="flex justify-between text-foreground-secondary">
                  <span>Founders coached:</span>
                  <span className="text-accent">50+</span>
                </div>
                <div className="flex justify-between text-foreground-secondary">
                  <span>Win Club:</span>
                  <span className="text-red-pill">Private Mentorship Cohort</span>
                </div>
              </div>
              <div className="text-accent mt-4 text-center">
                The immigration was easy. Mental freedom is the real work. <span className="cursor">█</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="font-mono text-xs text-foreground-tertiary">
            ./break_mental_slavery --realize="it was always self-imposed" --timeline="now"
          </div>
        </div>
      </div>
    </footer>
  )
}