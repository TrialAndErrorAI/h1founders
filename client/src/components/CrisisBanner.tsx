import { Link } from 'react-router-dom'

export default function CrisisBanner() {
  return (
    <Link
      to="/crisis"
      className="block bg-yellow-400 text-black p-3 text-center font-bold sticky top-0 z-50 hover:bg-yellow-300 transition-colors"
    >
      <span className="text-lg">📢 H1B $100K Update: Get Facts, Not Fear →</span>
    </Link>
  )
}