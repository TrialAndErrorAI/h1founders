export default function MediaBanner() {
  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <a
          href="https://www.wsj.com/world/india/h1b-visas-india-tech-engineering-834e079a"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 text-sm font-mono hover:text-accent transition-colors group"
        >
          <span className="text-foreground-tertiary">AS FEATURED IN</span>
          <span className="text-foreground font-bold tracking-wider">THE WALL STREET JOURNAL</span>
          <span className="text-foreground-tertiary hidden sm:inline">•</span>
          <span className="text-accent hidden sm:inline group-hover:text-accent-secondary">
            "This isn't reform, it's a sledgehammer"
          </span>
          <svg className="w-4 h-4 text-foreground-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}