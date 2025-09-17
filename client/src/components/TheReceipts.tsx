export default function TheReceipts() {
  return (
    <section className="bg-gray-900 px-6 py-10 sm:py-14 lg:px-8 border-t border-gray-700">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="terminal-text text-3xl sm:text-4xl font-bold mb-3">
            ./the_receipts
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Don't believe me? Here's the proof.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue Proof */}
          <div className="bg-black rounded-lg p-5 border border-gray-700 hover:border-green-400 transform hover:scale-105 transition-all duration-200 group">
            <div className="text-center">
              <div className="terminal-text text-2xl sm:text-3xl font-bold mb-2 group-hover:matrix-glow">$3M+</div>
              <p className="text-gray-400 mb-3 text-sm">Annual Revenue</p>
              <div className="bg-gray-800/50 rounded p-3 font-mono text-xs">
                <div className="text-green-400">// Bootstrapped</div>
                <div className="text-gray-300">companies: 4</div>
                <div className="text-gray-300">vc_funding: $0</div>
                <div className="text-gray-300">margin: 95%</div>
              </div>
            </div>
          </div>

          {/* Green Card */}
          <div className="bg-black rounded-lg p-5 border border-gray-700 hover:border-green-400 transform hover:scale-105 transition-all duration-200 group">
            <div className="text-center">
              <div className="terminal-text text-2xl sm:text-3xl font-bold mb-2 group-hover:matrix-glow">EB1-A</div>
              <p className="text-gray-400 mb-3 text-sm">Green Card</p>
              <div className="bg-gray-800/50 rounded p-3 font-mono text-xs">
                <div className="text-green-400">// Self-sponsored</div>
                <div className="text-gray-300">approved: true</div>
                <div className="text-gray-300">timeline: 18mo</div>
                <div className="text-gray-300">freedom: true</div>
              </div>
            </div>
          </div>

          {/* Community Impact */}
          <div className="bg-black rounded-lg p-5 border border-gray-700 hover:border-green-400 transform hover:scale-105 transition-all duration-200 group">
            <div className="text-center">
              <div className="terminal-text text-2xl sm:text-3xl font-bold mb-2 group-hover:matrix-glow">1,400+</div>
              <p className="text-gray-400 mb-3 text-sm">Founders Helped</p>
              <div className="bg-gray-800/50 rounded p-3 font-mono text-xs">
                <div className="text-green-400">// Impact</div>
                <div className="text-gray-300">bootstrapped: many</div>
                <div className="text-gray-300">eb1a_filed: 10+</div>
                <div className="text-gray-300">still_growing: true</div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Timeline */}
        <div className="mt-12">
          <h3 className="terminal-text text-xl sm:text-2xl font-bold text-center mb-6">
            ./15_year_journey
          </h3>
          <div className="bg-black rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-green-400/30 transition-colors">
            <div className="font-mono text-xs sm:text-sm space-y-1.5">
              <div className="text-green-400">sid@usa:~$ visa_timeline --show-all</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2010  # F1: MS Computer Science @ RIT</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2012  # OPT: Vivox (acquired by Unity)</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2013  # H1B: Won lottery first try</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2014  # Cogito: MIT spinout, emotion AI</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2016  # EB2 filed: 150+ year wait...</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2018  # i140 approved (still waiting)</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2019  # Compass: Director of Eng → IPO</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2021  # JOKR: VP Eng, fastest unicorn ever</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2021  # 11 years on H1B, sponsored others' GCs</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2022  # Founded T&E (investor only)</div>
              <div className="text-yellow-400 hover:text-green-400 transition-colors">2023  # EB1-A denied → refiled → APPROVED</div>
              <div className="text-gray-500">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
              <div className="text-green-400 font-bold text-base">2024  # SELF-SPONSORED MY OWN H1B</div>
              <div className="text-green-400 font-bold">2024  # Green card in hand (FREEDOM!)</div>
              <div className="text-gray-300 hover:text-green-400 transition-colors">2024  # Finally CEO of my own company</div>
              <div className="text-green-400 font-bold">2024  # LinkedIn post → 1,400+ founders unite</div>
              <div className="text-green-400 animate-pulse">sid@freedom:~$ ./now_helping_you_break_free █</div>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4 text-base">
            Still think it's impossible?
          </p>
          <a
            href="#coaching"
            className="red-pill-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg font-mono inline-block transform hover:scale-105 transition-all"
          >
            wake_up() // Let's talk
          </a>
        </div>
      </div>
    </section>
  )
}