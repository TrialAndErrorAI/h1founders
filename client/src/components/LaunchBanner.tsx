import { useAuth } from '../contexts/AuthContext'
import { METRICS } from '../data/metrics'

// Operator brand — no mic, no gradient, no filled pill, no broadcast hype.
// LIVE = mono green tag · body = sans dim · CTA = green text link (matches
// the hero's "view the programs" link style).
const BRAND = {
  bg: '#0a0a0a',
  border: '#1a1a1a',
  green: '#39d353',
  dim: '#a0a0a0',
}

export default function LaunchBanner() {
  const { user } = useAuth()

  // Hide banner only if user is authenticated
  if (user) return null

  return (
    <div
      className="px-4 py-2.5"
      style={{ backgroundColor: BRAND.bg, borderBottom: `1px solid ${BRAND.border}` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left">
        <span className="font-mono text-sm flex-shrink-0" style={{ color: BRAND.green }}>
          LIVE
        </span>
        <span className="hidden sm:inline" style={{ color: BRAND.border }}>·</span>
        <span className="font-sans text-sm" style={{ color: BRAND.dim }}>
          Founders who did it, in their own words. Monthly on Substack.
        </span>
        <span className="hidden sm:inline" style={{ color: BRAND.border }}>·</span>
        <a
          href={METRICS.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm underline flex-shrink-0 transition-opacity hover:opacity-80"
          style={{ color: BRAND.green }}
        >
          watch →
        </a>
      </div>
    </div>
  )
}
