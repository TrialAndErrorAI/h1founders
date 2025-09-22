import { Link } from 'react-router-dom'
import SubstackFeed from '../components/SubstackFeed'

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
            Verified by 850+ founders. Not legal advice.
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            What Changed
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            NOT Affected (You're Safe)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                • Currently on H1B in the US
              </p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                • H1B transfer within US
              </p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                • H1B extension
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                • F1 to H1B change
              </p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                • Self-sponsoring H1B
              </p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                • In 2025 lottery already
              </p>
            </div>
          </div>
        </section>

        {/* Who IS Affected */}
        <section className="border rounded-lg p-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Affected (Act Now)
          </h2>
          <div className="space-y-3 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
            <p>• New H1B from abroad (Feb 2026 lottery)</p>
            <p>• Outsourcing companies bringing consultants</p>
            <p>• First-time H1B outside US</p>
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
                <li>• Stay in US</li>
                <li>• Focus on green card</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>If You're Outside the US:</h3>
              <ul className="space-y-1 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>• O-1 visa (no fee)</li>
                <li>• L-1 transfer</li>
                <li>• EB-1A/EB-2 NIW</li>
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
            850+ founders. Real-time updates.
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

        {/* Latest Articles from Substack */}
        <SubstackFeed />

      </div>
    </div>
  )
}