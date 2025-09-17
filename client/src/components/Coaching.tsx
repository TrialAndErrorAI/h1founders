export default function Coaching() {
  return (
    <section id="coaching" className="bg-black px-6 py-24 sm:py-32 lg:px-8 border-t border-gray-700">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="terminal-text text-4xl font-bold mb-4">
            ./coaching_session
          </h2>
          <p className="text-gray-400 text-lg">
            Debug your startup. Patch the myths. Deploy success.
          </p>
        </div>
        
        {/* Terminal Coaching Interface */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden max-w-2xl mx-auto">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 font-mono text-sm text-gray-400">coaching@h1founders:~$</span>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-8">
            <div className="font-mono text-sm mb-8">
              <div className="text-green-400">// Coaching session specification</div>
              <div className="text-gray-300 mt-2">
                session = &#123;<br/>
                &nbsp;&nbsp;duration: "45 minutes",<br/>
                &nbsp;&nbsp;price: "$185",<br/>
                &nbsp;&nbsp;mode: "1:1_personalized",<br/>
                &nbsp;&nbsp;outcome: "actionable_plan"<br/>
                &#125;
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <span className="terminal-text mr-3 font-mono">✓</span>
                <span className="text-gray-300">myths.destroy() → Clear mental blocks</span>
              </div>
              <div className="flex items-start">
                <span className="terminal-text mr-3 font-mono">✓</span>
                <span className="text-gray-300">bootstrap_strategy() → Custom plan for your idea</span>
              </div>
              <div className="flex items-start">
                <span className="terminal-text mr-3 font-mono">✓</span>
                <span className="text-gray-300">immigration_safe_structure() → Legal compliance</span>
              </div>
              <div className="flex items-start">
                <span className="terminal-text mr-3 font-mono">✓</span>
                <span className="text-gray-300">eb1a_roadmap() → Green card pathway</span>
              </div>
            </div>
            
            <div className="bg-black rounded p-4 border border-gray-700 font-mono text-sm mb-8">
              <div className="text-green-400">// Success metrics</div>
              <div className="text-gray-300">
                if (coached_by_sid) &#123;<br/>
                &nbsp;&nbsp;clarity: "100%",<br/>
                &nbsp;&nbsp;actionable_steps: "defined",<br/>
                &nbsp;&nbsp;fear_level: "minimized",<br/>
                &nbsp;&nbsp;confidence: "boosted"<br/>
                &#125;
              </div>
            </div>
            
            <a
              href="https://cal.com/sid-sarasvati/h1bfounders"
              target="_blank"
              rel="noopener noreferrer"
              className="red-pill-button w-full py-4 text-lg font-semibold rounded-lg font-mono text-center block"
            >
              ./book_session --apply
            </a>
            
            <div className="mt-6 text-center font-mono text-sm">
              <span className="text-yellow-400">WARNING:</span>
              <span className="text-gray-400"> Limited slots. Manual review process.</span>
            </div>
          </div>
        </div>
        
        {/* Testimonial Terminal */}
        <div className="mt-16 bg-black rounded-lg p-6 border border-gray-700">
          <div className="font-mono text-sm">
            <div className="text-green-400">sid@coaching:~$ cat testimonials.log</div>
            <div className="text-gray-300 mt-4">
              "Sid helped me realize I was limiting myself with immigration myths.<br/>
              Now I'm building my SaaS while on H1B. Game changer." - Priya K.<br/>
              <br/>
              "The session paid for itself in clarity alone. Sid's<br/>
              been there, done that. Real advice, not theory." - Marcus L.
            </div>
            <div className="text-green-400 mt-4">
              Ready to debug your entrepreneurial journey? <span className="cursor">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}