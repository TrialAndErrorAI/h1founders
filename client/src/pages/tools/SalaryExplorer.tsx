import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Mock data - in production, this would come from h1data.info scraping
const salaryData = [
  { company: 'Google', role: 'Software Engineer', base: 185000, total: 280000, level: 'L4', location: 'Mountain View, CA' },
  { company: 'Google', role: 'Senior Software Engineer', base: 225000, total: 380000, level: 'L5', location: 'Mountain View, CA' },
  { company: 'Meta', role: 'Software Engineer', base: 175000, total: 265000, level: 'E4', location: 'Menlo Park, CA' },
  { company: 'Meta', role: 'Senior Software Engineer', base: 215000, total: 360000, level: 'E5', location: 'Menlo Park, CA' },
  { company: 'Amazon', role: 'Software Development Engineer', base: 165000, total: 240000, level: 'SDE II', location: 'Seattle, WA' },
  { company: 'Amazon', role: 'Senior Software Engineer', base: 195000, total: 340000, level: 'SDE III', location: 'Seattle, WA' },
  { company: 'Microsoft', role: 'Software Engineer', base: 155000, total: 220000, level: '62', location: 'Redmond, WA' },
  { company: 'Microsoft', role: 'Senior Software Engineer', base: 185000, total: 285000, level: '64', location: 'Redmond, WA' },
  { company: 'Apple', role: 'Software Engineer', base: 175000, total: 260000, level: 'ICT3', location: 'Cupertino, CA' },
  { company: 'Apple', role: 'Senior Software Engineer', base: 210000, total: 350000, level: 'ICT4', location: 'Cupertino, CA' },
  { company: 'Netflix', role: 'Software Engineer', base: 300000, total: 400000, level: 'Senior', location: 'Los Gatos, CA' },
  { company: 'Stripe', role: 'Software Engineer', base: 180000, total: 290000, level: 'L2', location: 'San Francisco, CA' },
  { company: 'Uber', role: 'Software Engineer', base: 170000, total: 250000, level: 'L4', location: 'San Francisco, CA' },
  { company: 'Airbnb', role: 'Software Engineer', base: 175000, total: 265000, level: 'L4', location: 'San Francisco, CA' },
  { company: 'Tesla', role: 'Software Engineer', base: 145000, total: 180000, level: 'P3', location: 'Palo Alto, CA' },
]

export default function SalaryExplorer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState(salaryData)
  const [isTyping, setIsTyping] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const filtered = salaryData.filter(
          item => 
            item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setResults(filtered)
      } else {
        setResults(salaryData)
      }
      setIsTyping(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/tools" className="text-gray-400 hover:text-green-400 font-mono text-sm mb-4 inline-block">
            ← TOOLS/
          </Link>
          <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
            H1B_SALARY_EXPLORER
          </h1>
          <p className="text-gray-400 text-lg">
            See what companies pay H1B holders. Then see what founders make instead.
          </p>
        </div>

        {/* Search Terminal */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="terminal-text font-mono">query$</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setIsTyping(true)
              }}
              placeholder="Search company or role..."
              className="flex-1 bg-transparent border-none outline-none text-white font-mono"
              autoFocus
            />
            {isTyping && (
              <span className="text-green-400 animate-pulse">_</span>
            )}
          </div>
          <p className="text-gray-500 font-mono text-xs">
            // Try: Google, Meta, Senior Software Engineer
          </p>
        </div>

        {/* Results Table */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-green-400">
                  <th className="text-left p-4">COMPANY</th>
                  <th className="text-left p-4">ROLE</th>
                  <th className="text-left p-4">LEVEL</th>
                  <th className="text-right p-4">BASE</th>
                  <th className="text-right p-4">TOTAL</th>
                  <th className="text-left p-4 hidden md:table-cell">LOCATION</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? (
                  results.map((item, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 text-white">{item.company}</td>
                      <td className="p-4 text-gray-300">{item.role}</td>
                      <td className="p-4 text-gray-400">{item.level}</td>
                      <td className="p-4 text-right text-yellow-400">{formatCurrency(item.base)}</td>
                      <td className="p-4 text-right text-green-400 font-bold">{formatCurrency(item.total)}</td>
                      <td className="p-4 text-gray-400 hidden md:table-cell">{item.location}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      // No results found. Try a different search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Founder Comparison */}
        <div className="mb-12">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="red-pill-button px-6 py-3 font-mono font-semibold rounded-lg"
          >
            {showComparison ? 'HIDE' : 'SHOW'}_FOUNDER_REALITY()
          </button>
        </div>

        {showComparison && (
          <div className="bg-gradient-to-r from-red-900/20 to-transparent border border-red-500/30 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-mono text-red-500 mb-6">// THE FOUNDER ALTERNATIVE</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-green-400 font-mono mb-4">H1B_EMPLOYEE:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>→ Avg Total Comp: $280,000</li>
                  <li>→ 60 days to deportation if fired</li>
                  <li>→ 150+ year wait for green card</li>
                  <li>→ Can't start a business</li>
                  <li>→ Tied to one employer</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-green-400 font-mono mb-4">BOOTSTRAP_FOUNDER:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>→ My ARR: $3,000,000+</li>
                  <li>→ 95% gross profit margin</li>
                  <li>→ Self-sponsored EB1-A</li>
                  <li>→ Green card in 18 months</li>
                  <li>→ Complete freedom</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-black/50 rounded">
              <p className="text-yellow-400 font-mono text-sm">
                // REALITY: You're trading freedom for a paycheck.
              </p>
              <p className="text-gray-400 font-mono text-sm mt-2">
                // The system wants you to believe this is the only way.
              </p>
              <p className="text-green-400 font-mono text-sm mt-2">
                // 1,400+ founders proved otherwise.
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gray-900 border border-green-400/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-mono text-white mb-4">
            Ready to break free?
          </h3>
          <p className="text-gray-400 mb-6">
            Find out if you qualify for EB1-A and escape the H1B trap.
          </p>
          <Link
            to="/tools/eb1a-qualifier"
            className="inline-block red-pill-button px-8 py-3 font-mono font-semibold rounded-lg"
          >
            CHECK_EB1A_ELIGIBILITY()
          </Link>
        </div>

        {/* Data Source Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 font-mono text-xs">
            // Data sourced from public H1B filings. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  )
}