import { METRICS } from '../data/metrics'

export default function Live() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold terminal-text matrix-glow mb-3">
            H1B Founders Live
          </h1>
          <p className="text-xl text-foreground-secondary font-mono mb-6">
            Real founders. Real stories. No gatekeeping.
          </p>
          <p className="text-accent font-mono">
            {METRICS.liveShowDay} on {METRICS.liveShowPlatform}
          </p>
        </div>

        {/* What is it */}
        <div className="bg-background-secondary/50 border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold terminal-text matrix-glow mb-4">
            The Show
          </h2>
          <div className="space-y-4 text-foreground-secondary">
            <p>
              A monthly live conversation with immigrant founders who are building
              real businesses in America. No scripts. No slides. Just the raw story
              of how they got here.
            </p>
            <ul className="font-mono text-sm space-y-2 ml-4">
              <li>Host + 1 guest, 30-45 minutes</li>
              <li>Live audience Q&A via text chat</li>
              <li>Auto-publishes as podcast (Apple Podcasts, Spotify)</li>
              <li>Free to attend, free to listen</li>
            </ul>
          </div>
        </div>

        {/* Why Watch */}
        <div className="bg-gradient-to-r from-red-900/20 to-green-900/20 border border-accent/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold terminal-text matrix-glow mb-4">
            Why Watch
          </h2>
          <div className="space-y-3 text-foreground-secondary font-mono text-sm">
            <div>
              <span className="text-accent">For founders:</span> Hear how others navigated
              the same immigration + business maze you're in
            </div>
            <div>
              <span className="text-accent">For guests:</span> Build your public profile.
              Every episode = evidence for O-1/EB-1A visa portfolios
            </div>
            <div>
              <span className="text-accent">For the curious:</span> See what immigrant founders
              actually go through — no sugar-coating
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <a
            href={METRICS.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent/10 hover:bg-accent/20 border border-accent text-accent px-8 py-3 rounded font-mono text-lg transition-colors"
          >
            Subscribe on Substack
          </a>
          <p className="text-foreground-tertiary font-mono text-sm">
            Get notified when we go live. {METRICS.substackSubscribers} subscribers already in.
          </p>
        </div>

      </div>
    </div>
  )
}
