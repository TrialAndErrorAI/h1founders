import { METRICS } from '../data/metrics'

export default function Hero() {
  return (
    <section className="relative bg-background px-6 pt-8 pb-8 sm:pt-16 sm:pb-12 lg:px-8">
      <div className="mx-auto max-w-4xl text-center w-full">
        {/* Main Hook */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-slide-up">
          <span className="text-foreground">"You </span>
          <span className="text-accent matrix-glow">CAN</span>
          <span className="text-foreground"> start a business on H1B."</span>
        </h1>

        {/* Proof */}
        <div className="space-y-4 mb-10 animate-fade-in-delay">
          <p className="text-xl sm:text-2xl font-bold text-foreground">
            Built <span className="text-accent">{METRICS.arr} ARR</span>,
            <span className="text-accent"> $0 VC</span>,
            <span className="text-accent"> 95% gross profit</span>.
          </p>
          <p className="text-lg sm:text-xl text-foreground-secondary">
            Self-sponsored H1B. Got the Green Card. Bootstrapped the company.
          </p>
        </div>

        {/* The Reality */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-background-secondary/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 font-mono text-left border border-border hover:border-accent/30 transition-colors">
            <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
              15 years in the US. Always 60 days from deportation.<br/>
              The hardest part was believing I needed permission to build.<br/>
              I didn't. And neither do you.
            </p>
          </div>
        </div>

        {/* The Community */}
        <p className="text-lg sm:text-xl text-foreground-secondary mb-10">
          Now <span className="text-accent font-bold">{METRICS.whatsappMembers} founders</span> building in America without waiting.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => window.location.href = '/join'}
            className="bg-accent text-background px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto text-center font-mono transform hover:scale-105 hover:bg-accent/80 transition-all"
          >
            JOIN THE COMMUNITY
          </button>
          <a
            href="/programs"
            className="border border-accent text-accent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto text-center font-mono transform hover:scale-105 hover:bg-accent/10 transition-all"
          >
            VIEW PROGRAMS
          </a>
        </div>
      </div>
    </section>
  )
}
