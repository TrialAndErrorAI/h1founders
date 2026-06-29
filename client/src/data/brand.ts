/**
 * Operator brand palette — single source for the inline colors used across
 * the landing surfaces (Hero, Navigation, LaunchBanner, TrafficLights).
 *
 * Color = status, never decoration. This consolidates what were three local
 * `const BRAND` objects; the exact hex values are preserved (dedup, not recolor).
 *
 * NOTE: this is intentionally separate from the CSS-variable token system in
 * index.css (--accent-primary etc.). The two-greens question (#34d399 token vs
 * #39d353 here) is a deferred design decision — do not reconcile here.
 */
export const BRAND = {
  // Surfaces
  pageBg: '#0d0d0d',       // hero section + nav background
  card: '#101010',         // hero editor body
  chrome: '#161616',       // hero slim window-edge strip
  fieldBg: '#161b22',      // hero input field surface
  bannerBg: '#0a0a0a',     // launch banner — intentionally darker than pageBg
  mobileBg: '#111111',     // nav mobile drawer

  // Lines
  border: '#30363d',       // default hairline (hero frame, mobile drawer)
  bannerBorder: '#1a1a1a', // launch banner hairline + separators
  statusBar: '#1d6fbb',    // VS-blue accent — hero status bar AND nav bottom border

  // Text
  text: '#e6edf3',         // primary body
  muted: '#8b949e',        // dim subtext
  dim: '#a0a0a0',          // launch banner body (slightly lighter than muted)

  // Status / accent
  green: '#39d353',        // success / affirmation / link accent

  // macOS traffic-light dots
  trafficRed: '#ff5f57',
  trafficYellow: '#febc2e',
  trafficGreen: '#28c840',
} as const
