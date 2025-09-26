export default function MissionStatement() {
  return (
    <section className="bg-background border-y border-border">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="text-center space-y-4">
          {/* Mission Header */}
          <div className="font-mono text-sm text-foreground-tertiary">
            // OUR MISSION
          </div>

          {/* Core Mission */}
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Enable the smartest people from anywhere to build in America
          </h2>

          {/* Merit Statement */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base font-mono">
            <span className="text-accent">Merit &gt; Lottery</span>
            <span className="text-foreground-tertiary">•</span>
            <span className="text-red-pill">Builders &gt; Beggars</span>
            <span className="text-foreground-tertiary">•</span>
            <span className="text-yellow-400">Value &gt; Visa Games</span>
          </div>

          {/* The Test */}
          <p className="text-foreground-secondary text-sm sm:text-base max-w-2xl mx-auto">
            We help those who CREATE VALUE, not those waiting for handouts.
            The test is simple: Are you building or begging?
          </p>
        </div>
      </div>
    </section>
  )
}