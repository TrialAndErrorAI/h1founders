export default function WhatIActuallyDo() {
  return (
    <section className="bg-black px-6 py-24 sm:py-32 lg:px-8 border-t border-gray-700">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="terminal-text text-4xl font-bold mb-4">
            ./what_i_actually_do
          </h2>
          <p className="text-gray-400 text-lg">
            Real companies. Real traction. Real founder.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Trial & Error (Umbrella) */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Trial & Error</h3>
              <span className="terminal-text font-mono text-sm">// The umbrella</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black rounded p-4 border border-gray-700">
                <div className="font-mono text-sm">
                  <div className="text-green-400">company_type:</div>
                  <div className="text-gray-300">"LLC Holding Company"</div>
                </div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700">
                <div className="font-mono text-sm">
                  <div className="text-green-400">founded:</div>
                  <div className="text-gray-300">2018</div>
                </div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700">
                <div className="font-mono text-sm">
                  <div className="text-green-400">subsidiaries:</div>
                  <div className="text-gray-300">3 active</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* RenovateAI */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">RenovateAI</h3>
              <span className="terminal-text font-mono text-sm">// The cash cow</span>
            </div>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">$3M</div>
                <div className="text-gray-400 text-sm">ARR</div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">2M+</div>
                <div className="text-gray-400 text-sm">Users</div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">95%</div>
                <div className="text-gray-400 text-sm">Gross Margin</div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">$0</div>
                <div className="text-gray-400 text-sm">VC Funding</div>
              </div>
            </div>
            <p className="text-gray-300">
              SaaS platform for home renovation contractors. Bootstrapped from $0 to $3M ARR 
              while on H1B visa. Proof that immigrants can build world-class companies.
            </p>
          </div>
          
          {/* Body AI */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Body AI</h3>
              <span className="terminal-text font-mono text-sm">// The experiment</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black rounded p-4 border border-gray-700">
                <div className="font-mono text-sm">
                  <div className="text-green-400">status:</div>
                  <div className="text-gray-300">"Active Development"</div>
                </div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700">
                <div className="font-mono text-sm">
                  <div className="text-green-400">market:</div>
                  <div className="text-gray-300">"Fitness Tracking"</div>
                </div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700">
                <div className="font-mono text-sm">
                  <div className="text-green-400">stack:</div>
                  <div className="text-gray-300">"AI + Mobile"</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* H1BFounders */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">H1BFounders</h3>
              <span className="terminal-text font-mono text-sm">// The movement</span>
            </div>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">1,400+</div>
                <div className="text-gray-400 text-sm">Members</div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">648</div>
                <div className="text-gray-400 text-sm">Substack</div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">50%</div>
                <div className="text-gray-400 text-sm">Open Rate</div>
              </div>
              <div className="bg-black rounded p-4 border border-gray-700 text-center">
                <div className="terminal-text text-2xl font-bold">6</div>
                <div className="text-gray-400 text-sm">Months</div>
              </div>
            </div>
            <p className="text-gray-300">
              Community of immigrant founders helping each other bootstrap businesses and achieve EB1-A. 
              Born from one LinkedIn post. Became a movement.
            </p>
          </div>
        </div>
        
        {/* Bottom Terminal */}
        <div className="mt-16 bg-black rounded-lg p-6 border border-gray-700">
          <div className="font-mono text-sm">
            <div className="text-green-400">sid@freedom:~$ ./portfolio --summary</div>
            <div className="text-gray-300 mt-2">
              Total companies: 4<br/>
              Combined revenue: $3M+<br/>
              External funding: $0<br/>
              Immigrant founder: true<br/>
              Still helping others: true
            </div>
            <div className="text-green-400 mt-4">
              Ready to build your own? <span className="cursor">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}