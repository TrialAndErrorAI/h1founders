export default function Hero() {
  return (
    <section className="relative bg-black px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center">
      <div className="mx-auto max-w-4xl text-center">
        {/* Matrix Opening Line */}
        <div className="mb-8">
          <p className="text-2xl text-gray-400 mb-4 font-mono">What if I told you...</p>
        </div>
        
        {/* Main Hook - The Truth Bomb */}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8">
          <span className="text-white">"You </span>
          <span className="terminal-text matrix-glow">CAN</span>
          <span className="text-white"> start a business on H1B."</span>
        </h1>
        
        {/* The Red Pill Moment */}
        <div className="space-y-6 mb-12">
          <p className="text-3xl font-bold text-white">
            I took the <span style={{color: '#ff073a'}}>red pill</span>.
          </p>
          <p className="text-2xl font-bold text-white sm:text-3xl">
            Built <span className="terminal-text">$3M ARR</span>, 
            <span className="terminal-text"> $0 VC</span>, 
            <span className="terminal-text"> 95% gross profit</span> anyway.
          </p>
        </div>
        
        {/* The Reality */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-gray-900 rounded-lg p-6 font-mono text-left border border-gray-700">
            <div className="terminal-prompt mb-2"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              15 years in the US. Always 60 days from deportation.<br/>
              Until I learned the slave mentality was self-imposed.<br/>
              Bootstrap profitable. Self-sponsor. Break free.
            </p>
          </div>
        </div>
        
        {/* The Community */}
        <p className="text-xl text-gray-300 mb-12">
          Now <span className="terminal-text font-bold">1,400+ founders</span> refusing to wait 150 years.
        </p>
        
        {/* The Choice - Red Pill vs Blue Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-x-8">
          <button
            onClick={() => window.location.href = '/network'}
            className="red-pill-button px-8 py-4 text-lg font-semibold rounded-lg w-full sm:w-auto text-center font-mono"
          >
            RED PILL: join_founders()
          </button>
          <a
            href="/forum"
            className="blue-pill-button px-8 py-4 text-lg font-semibold rounded-lg w-full sm:w-auto text-center font-mono"
          >
            BLUE PILL: browse_forum()
          </a>
        </div>
        
        {/* Terminal Footer */}
        <div className="mt-16 text-center">
          <p className="terminal-text font-mono text-sm">
            // Welcome to the real world
          </p>
        </div>
      </div>
    </section>
  )
}