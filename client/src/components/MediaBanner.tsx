export default function MediaBanner() {
  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <a
          href="https://community.h1bfounders.com/p/how-manisha-puppala-became-the-face"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm font-mono hover:text-accent transition-colors group text-center"
        >
          <span className="text-foreground-secondary">
            <span className="text-foreground font-bold">WSJ</span> on the $100K H-1B fee:{' '}
            <span className="text-foreground">"this isn't reform, it's a sledgehammer"</span>
          </span>
          <span className="text-foreground-tertiary group-hover:text-accent flex-shrink-0">→</span>
        </a>
      </div>
    </div>
  )
}