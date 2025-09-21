import { Link } from 'react-router-dom'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Crisis() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link to="/" className="text-accent hover:underline font-mono text-sm">← Back to Home</Link>
          <h1 className="text-3xl font-bold mt-4" style={{ color: 'var(--text-primary)' }}>
            H1B $100K Crisis Tracker
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--text-secondary)' }}>
            Facts, not fear. Verified by 850+ founders.
          </p>
        </div>
      </div>

      {/* Last Updated Banner */}
      <div className="bg-yellow-400/10 border border-yellow-400/30 p-4">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
            <strong>Last Updated:</strong> September 21, 2025 - 2:00 PM EST
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* What Actually Changed */}
        <section className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400" />
            What Actually Changed
          </h2>
          <div className="space-y-3 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
            <p>• $100,000 fee for NEW H1B petitions (not annual, one-time)</p>
            <p>• Effective: September 21, 2025 at 12:01 AM</p>
            <p>• Applies to: Future applicants in February 2026 lottery</p>
            <p>• Only affects those currently OUTSIDE the US</p>
            <p>• Fee paid by employers, not employees</p>
          </div>
        </section>

        {/* Who Is NOT Affected */}
        <section className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
            You're SAFE If You're
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                Currently on H1B in the US
              </p>
              <p className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                Doing H1B transfer within US
              </p>
              <p className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                Extending your H1B
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                F1 to H1B status change
              </p>
              <p className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                Self-sponsoring your H1B
              </p>
              <p className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                Already in 2025 lottery
              </p>
            </div>
          </div>
        </section>

        {/* Who IS Affected */}
        <section className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <XCircleIcon className="w-6 h-6 text-red-400" />
            Who IS Affected
          </h2>
          <div className="space-y-3 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
            <p className="flex items-center gap-2">
              <XCircleIcon className="w-4 h-4 text-red-400" />
              New H1B applicants from abroad (starting Feb 2026 lottery)
            </p>
            <p className="flex items-center gap-2">
              <XCircleIcon className="w-4 h-4 text-red-400" />
              Outsourcing companies bringing consultants from overseas
            </p>
            <p className="flex items-center gap-2">
              <XCircleIcon className="w-4 h-4 text-red-400" />
              First-time H1B applicants outside the US
            </p>
          </div>
        </section>

        {/* Action Steps */}
        <section className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            What You Should Do
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>If You're in the US:</h3>
              <ul className="space-y-1 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>• Don't panic - you're not affected</li>
                <li>• Avoid international travel if possible</li>
                <li>• Consider expediting green card process</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>If You're Outside the US:</h3>
              <ul className="space-y-1 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>• Explore O-1 visa (no lottery, no $100K fee)</li>
                <li>• Consider L-1 if you have a qualifying company</li>
                <li>• Look into EB-1A or EB-2 NIW (green card paths)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Join Community CTA */}
        <section className="border-2 border-accent rounded-lg p-8 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Get Real-Time Updates & Support
          </h2>
          <p className="mb-6 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Join 850+ founders navigating this together. No fear-mongering. Just facts.
          </p>
          <div className="space-y-4">
            <a
              href="https://chat.whatsapp.com/EDzgWji4jr6AlVKch0dGMV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
            >
              Join WhatsApp Group →
            </a>
            <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              <p>Or discuss in our forum (members only)</p>
              <Link to="/forum" className="text-accent hover:underline">Go to Forum →</Link>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Latest Analysis
          </h2>
          <div className="space-y-4">
            <a
              href="https://community.h1bfounders.com/p/trumps-100k-h1b-proclamation-what"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border rounded hover:border-accent transition-colors"
              style={{ borderColor: 'var(--border-primary)' }}
            >
              <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Trump's $100K H1B Proclamation: What It Actually Means
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Stop panicking. Here's what actually changed and who's affected.
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                September 20, 2025 • 5 min read
              </p>
            </a>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="text-center text-sm p-4" style={{ color: 'var(--text-tertiary)' }}>
          <p>This is community-verified information, not legal advice.</p>
          <p>Consult an immigration attorney for your specific situation.</p>
        </div>
      </div>
    </div>
  )
}