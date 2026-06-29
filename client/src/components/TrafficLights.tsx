import { BRAND } from '../data/brand'

/**
 * macOS window traffic-light dots (red / amber / green) — the small
 * operator-interface nod shared by the hero window-edge and the nav.
 *
 * `size` keeps the existing per-surface appearance exact: the hero uses
 * w-2.5/h-2.5, the nav uses w-3/h-3.
 */
export default function TrafficLights({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const dot = size === 'md' ? 'w-3 h-3' : 'w-2.5 h-2.5'
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <span className={`block ${dot} rounded-full`} style={{ backgroundColor: BRAND.trafficRed }} />
      <span className={`block ${dot} rounded-full`} style={{ backgroundColor: BRAND.trafficYellow }} />
      <span className={`block ${dot} rounded-full`} style={{ backgroundColor: BRAND.trafficGreen }} />
    </div>
  )
}
