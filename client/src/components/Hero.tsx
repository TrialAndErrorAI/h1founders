import { useState, type SyntheticEvent } from 'react'
import { METRICS } from '../data/metrics'
import { BRAND } from '../data/brand'
import TrafficLights from './TrafficLights'

export default function Hero() {
  const [building, setBuilding] = useState('')

  // The input prompt is the you-operate gesture. On submit, route to /join.
  const handleStart = (e: SyntheticEvent) => {
    e.preventDefault()
    window.location.href = '/join'
  }

  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      style={{ backgroundColor: BRAND.pageBg }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Restrained window edge — traffic-lights demoted to a small nod */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: `1px solid ${BRAND.border}` }}
        >
          {/* Slim chrome: just a small dot nod, no filename, no dominant bar */}
          <div
            className="flex items-center px-4 py-2.5 gap-1.5"
            style={{ backgroundColor: BRAND.chrome, borderBottom: `1px solid ${BRAND.border}` }}
          >
            <TrafficLights />
          </div>

          {/* Body */}
          <div className="px-6 sm:px-10 pt-10 pb-8" style={{ backgroundColor: BRAND.card }}>

            {/* Small mono wordmark label */}
            <p
              className="font-mono text-xs sm:text-sm mb-5 tracking-tight"
              style={{ color: BRAND.green }}
            >
              H1B FOUNDERS
            </p>

            {/* Headline — humanist sans, the first thing a cold visitor reads */}
            <h1
              className="font-sans font-bold text-3xl sm:text-5xl tracking-tight mb-3 leading-tight"
              style={{ color: BRAND.text }}
            >
              "You <span style={{ color: BRAND.green }}>CAN</span> start a business on H1B."
            </h1>

            {/* Dim plain subtext (no // comment) */}
            <p
              className="font-sans text-base sm:text-lg mb-8"
              style={{ color: BRAND.muted }}
            >
              Self-sponsor your future. No permission required.
            </p>

            {/* The you-operate input prompt — universally legible fill-in-the-blank */}
            <form onSubmit={handleStart} className="mb-8">
              <label
                className="block font-mono text-xs sm:text-sm mb-2"
                style={{ color: BRAND.muted }}
              >
                I'm building
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={building}
                  onChange={e => setBuilding(e.target.value)}
                  placeholder="a restaurant, a clinic, a consultancy, an app…"
                  className="operator-input font-sans text-base flex-1 px-4 py-3 rounded outline-none transition-colors"
                  style={{
                    backgroundColor: BRAND.fieldBg,
                    color: BRAND.text,
                  }}
                />
                <button
                  type="submit"
                  className="operator-btn font-sans text-base font-bold px-6 py-3 rounded transition-colors whitespace-nowrap"
                  style={{ color: BRAND.pageBg }}
                >
                  start →
                </button>
              </div>
            </form>

            {/* Secondary route — keep VIEW PROGRAMS reachable */}
            <p className="font-sans text-sm mb-9" style={{ color: BRAND.muted }}>
              Or{' '}
              <a
                href="/programs"
                className="underline transition-colors"
                style={{ color: BRAND.green }}
              >
                view the programs
              </a>{' '}
              if you want the map first.
            </p>

            {/* Proof — PEER proof leads (the becoming made real); guide credential
                demoted to one line. Numbers in mono accent per the brand. */}
            <div
              className="pt-6"
              style={{ borderTop: `1px solid ${BRAND.border}` }}
            >
              {/* Lead stat: peer proof, weight on the 20+, ascending 20→100→2,000 */}
              <p className="font-sans text-base sm:text-lg leading-relaxed mb-3" style={{ color: BRAND.text }}>
                Founders here self-sponsor their own H1B.{' '}
                <span className="font-mono font-bold" style={{ color: BRAND.green }}>{METRICS.selfSponsoredH1B}</span>{' '}
                <span style={{ color: BRAND.muted }}>on the record, and counting.</span>{' '}
                <span className="font-mono" style={{ color: BRAND.muted }}>{METRICS.coached}</span>{' '}
                <span style={{ color: BRAND.muted }}>coached.</span>{' '}
                <span className="font-mono" style={{ color: BRAND.muted }}>{METRICS.whatsappMembers}</span>{' '}
                <span style={{ color: BRAND.muted }}>in the room.</span>
              </p>

              {/* Guide credential — demoted to one line. Green card is Sid's, true. */}
              <p className="font-sans text-sm" style={{ color: BRAND.muted }}>
                Built by someone who did it.{' '}
                <span className="font-mono" style={{ color: BRAND.text }}>{METRICS.arr}</span> ARR,{' '}
                <span className="font-mono" style={{ color: BRAND.text }}>$0</span> VC, self-sponsored H1B → green card.
              </p>
            </div>
          </div>

          {/* Status bar — plain status words, no git framing */}
          <div
            className="flex items-center gap-3 px-4 py-1.5 font-mono text-xs select-none"
            style={{ backgroundColor: BRAND.statusBar, color: '#ffffff' }}
          >
            <span className="font-semibold">APPROVED ✓</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span style={{ opacity: 0.85 }}>$0 VC</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span style={{ opacity: 0.85 }}>merit over lottery</span>
          </div>
        </div>
      </div>
    </section>
  )
}
