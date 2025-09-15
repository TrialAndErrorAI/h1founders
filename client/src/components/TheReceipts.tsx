export default function TheReceipts() {
  return (
    <section className="bg-gray-900 px-6 py-12 sm:py-16 lg:px-8 border-t border-gray-700">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="terminal-text text-4xl font-bold mb-4">
            ./the_receipts
          </h2>
          <p className="text-gray-400 text-lg">
            Don't believe me? Here's the proof.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Revenue Proof */}
          <div className="bg-black rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-all">
            <div className="text-center">
              <div className="terminal-text text-3xl font-bold mb-2">$3M+</div>
              <p className="text-gray-400 mb-4">Annual Revenue</p>
              <div className="bg-gray-800 rounded p-3 font-mono text-sm">
                <div className="text-green-400">// Bootstrapped</div>
                <div className="text-gray-300">companies: 4</div>
                <div className="text-gray-300">vc_funding: $0</div>
                <div className="text-gray-300">margin: 95%</div>
              </div>
            </div>
          </div>

          {/* Green Card */}
          <div className="bg-black rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-all">
            <div className="text-center">
              <div className="terminal-text text-3xl font-bold mb-2">EB1-A</div>
              <p className="text-gray-400 mb-4">Green Card</p>
              <div className="bg-gray-800 rounded p-3 font-mono text-sm">
                <div className="text-green-400">// Self-sponsored</div>
                <div className="text-gray-300">approved: true</div>
                <div className="text-gray-300">timeline: 18mo</div>
                <div className="text-gray-300">freedom: true</div>
              </div>
            </div>
          </div>

          {/* Community Impact */}
          <div className="bg-black rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-all">
            <div className="text-center">
              <div className="terminal-text text-3xl font-bold mb-2">1,400+</div>
              <p className="text-gray-400 mb-4">Founders Helped</p>
              <div className="bg-gray-800 rounded p-3 font-mono text-sm">
                <div className="text-green-400">// Impact</div>
                <div className="text-gray-300">bootstrapped: many</div>
                <div className="text-gray-300">eb1a_filed: 50+</div>
                <div className="text-gray-300">still_growing: true</div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Timeline */}
        <div className="mt-16">
          <h3 className="terminal-text text-2xl font-bold text-center mb-8">
            ./journey_timeline
          </h3>
          <div className="bg-black rounded-lg p-6 border border-gray-700">
            <div className="font-mono text-sm space-y-2">
              <div className="text-green-400">sid@usa:~$ history | tail -15</div>
              <div className="text-gray-300">2009    # Arrived in US on student visa</div>
              <div className="text-gray-300">2010    # OPT → H1B conversion</div>
              <div className="text-gray-300">2015    # Started first side project (scared)</div>
              <div className="text-gray-300">2018    # Incorporated Trial & Error LLC</div>
              <div className="text-gray-300">2020    # Launched RenovateAI</div>
              <div className="text-gray-300">2022    # Hit $1M ARR</div>
              <div className="text-gray-300">2023    # EB1-A approved, $3M ARR</div>
              <div className="text-gray-300">2024    # LinkedIn post went viral</div>
              <div className="text-gray-300">2024    # H1BFounders community: 1,400+ members</div>
              <div className="text-green-400">sid@freedom:~$ █</div>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Still think it's impossible?
          </p>
          <a
            href="#coaching"
            className="red-pill-button px-8 py-4 text-lg font-semibold rounded-lg font-mono inline-block"
          >
            wake_up() // Let's talk
          </a>
        </div>
      </div>
    </section>
  )
}