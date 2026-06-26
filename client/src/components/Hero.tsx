import { METRICS } from '../data/metrics'

// Brand palette — terminal/operator aesthetic
const BRAND = {
  pageBg: '#0d0d0d',
  chrome: '#161616',        // title-bar chrome, slightly lighter than page
  body: '#0d0d0d',          // editor body
  border: '#30363d',        // subtle border
  statusBar: '#1d6fbb',     // VS Code blue status bar
  green: '#39d353',         // electric green — wordmark, success, added
  greenMuted: '#2a6132',    // dimmer green — comments
  text: '#e6edf3',          // primary body text
  muted: '#8b949e',         // secondary / dim text
}

export default function Hero() {
  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      style={{ backgroundColor: BRAND.pageBg }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Terminal window frame */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: `1px solid ${BRAND.border}` }}
        >

          {/* Window chrome — title bar with traffic-light dots */}
          <div
            className="flex items-center px-4 py-3 gap-4"
            style={{ backgroundColor: BRAND.chrome, borderBottom: `1px solid ${BRAND.border}` }}
          >
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
            </div>
            <span
              className="font-mono text-xs flex-1 text-center"
              style={{ color: BRAND.muted }}
            >
              h1b-founders.sh
            </span>
          </div>

          {/* Editor body */}
          <div
            className="px-6 sm:px-10 pt-8 pb-6"
            style={{ backgroundColor: BRAND.body }}
          >
            {/* Wordmark — big green headline */}
            <h1
              className="font-mono font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-2 leading-tight"
              style={{ color: BRAND.green }}
            >
              H1B FOUNDERS
            </h1>

            {/* Code comment — deadpan subhead */}
            <p
              className="font-mono text-base sm:text-lg mb-8"
              style={{ color: BRAND.greenMuted }}
            >
              // self-sponsor. no permission required.
            </p>

            {/* Proof — rendered as terminal output */}
            <div
              className="font-mono text-sm sm:text-base mb-8 space-y-1 pl-4 py-3"
              style={{ borderLeft: `2px solid ${BRAND.border}` }}
            >
              <p style={{ color: BRAND.text }}>
                <span style={{ color: BRAND.muted }}>$&gt;</span>{' '}
                built {METRICS.arr} ARR,{' '}
                <span style={{ color: BRAND.green }}>$0 VC</span>,{' '}
                <span style={{ color: BRAND.green }}>95% gross profit</span>
              </p>
              <p style={{ color: BRAND.muted }}>
                {'   '}self-sponsored H1B → green card → bootstrapped
              </p>
            </div>

            {/* The story — flat, deadpan */}
            <div
              className="font-mono text-sm sm:text-base mb-8 space-y-0.5"
              style={{ color: BRAND.muted }}
            >
              <p>15 years in the US. Always 60 days from deportation.</p>
              <p>The hardest part was believing I needed permission to build.</p>
              <p style={{ color: BRAND.text }}>I didn't. And neither do you.</p>
              <p>And you won't do it alone.</p>
            </div>

            {/* Community count */}
            <p
              className="font-mono text-sm mb-8"
              style={{ color: BRAND.muted }}
            >
              <span style={{ color: BRAND.green, fontWeight: 700 }}>
                {METRICS.whatsappMembers} founders
              </span>{' '}
              building in America without waiting.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { window.location.href = '/join' }}
                className="font-mono text-sm font-bold px-6 py-3 rounded transition-colors"
                style={{ backgroundColor: BRAND.green, color: BRAND.pageBg }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2ea043')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND.green)}
              >
                JOIN THE COMMUNITY
              </button>
              <a
                href="/programs"
                className="font-mono text-sm font-bold px-6 py-3 rounded text-center transition-colors"
                style={{
                  border: `1px solid ${BRAND.green}`,
                  color: BRAND.green,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(57,211,83,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                VIEW PROGRAMS
              </a>
            </div>
          </div>

          {/* VS Code–style status bar */}
          <div
            className="flex items-center gap-3 px-4 py-1.5 font-mono text-xs select-none"
            style={{ backgroundColor: BRAND.statusBar, color: '#ffffff' }}
          >
            <span className="font-semibold">APPROVED ✓</span>
            <span style={{ opacity: 0.7 }}>main</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ opacity: 0.7 }}>$0 VC</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ opacity: 0.7 }}>merit&gt;lottery</span>
          </div>

        </div>
      </div>
    </section>
  )
}
