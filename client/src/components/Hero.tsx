export default function Hero() {
  return (
    <section className="relative bg-background px-6 pt-4 pb-8 sm:pt-8 sm:pb-12 lg:px-8 min-h-[90vh] flex items-center">
      <div className="mx-auto max-w-4xl text-center w-full">
        {/* Matrix Opening Line */}
        <div className="mb-6 animate-fade-in">
          <p className="text-xl sm:text-2xl text-foreground-tertiary font-mono">What if I told you...</p>
        </div>

        {/* Main Hook - The Truth Bomb */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-slide-up">
          <span className="text-foreground">"You </span>
          <span className="text-accent matrix-glow">CAN</span>
          <span className="text-foreground"> start a business on H1B."</span>
        </h1>
        
        {/* The Red Pill Moment */}
        <div className="space-y-4 mb-10 animate-fade-in-delay">
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            I took the <span className="text-red-pill">red pill</span>.
          </p>
          <p className="text-xl sm:text-2xl font-bold text-foreground">
            Built <span className="text-accent">$3M ARR</span>,
            <span className="text-accent"> $0 VC</span>,
            <span className="text-accent"> 95% profit</span> anyway.
          </p>
        </div>
        
        {/* The Reality */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-background-secondary/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 font-mono text-left border border-border hover:border-accent/30 transition-colors">
            <div className="terminal-prompt mb-2"></div>
            <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
              15 years in the US. Always 60 days from deportation.<br/>
              Until I learned the slave mentality was self-imposed.<br/>
              Bootstrap profitable. Self-sponsor. Break free.
            </p>
          </div>
        </div>

        {/* The Community */}
        <p className="text-lg sm:text-xl text-foreground-secondary mb-10">
          Now <span className="text-accent font-bold">thousands of founders</span> refusing to wait 150 years.
        </p>
        
        {/* The Choice - Red Pill vs Blue Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => window.location.href = '/network'}
            className="red-pill-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto text-center font-mono transform hover:scale-105 transition-all"
          >
            RED PILL: join_founders()
          </button>
          <a
            href="/forum"
            className="blue-pill-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto text-center font-mono transform hover:scale-105 transition-all"
          >
            BLUE PILL: browse_forum()
          </a>
        </div>

        {/* Terminal Footer */}
        <div className="mt-12 text-center">
          <p className="text-accent font-mono text-xs sm:text-sm animate-pulse">
            // Welcome to the real world
          </p>
        </div>
      </div>
    </section>
  )
}