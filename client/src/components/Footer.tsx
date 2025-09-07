export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-700">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {/* Terminal Footer */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="font-mono text-sm">
            <div className="text-green-400">sid@h1founders:~$ ./connect --socials</div>
            <div className="mt-4 flex justify-center space-x-8">
              <a
                href="https://www.linkedin.com/in/sidsarasvati/"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-text hover:text-white font-mono transition-colors"
              >
                linkedin.com/in/sidsarasvati
              </a>
              <a
                href="https://x.com/sidjustice_"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-text hover:text-white font-mono transition-colors"
              >
                x.com/sidjustice_
              </a>
              <a
                href="mailto:sid@h1founders.com"
                className="terminal-text hover:text-white font-mono transition-colors"
              >
                sid@h1founders.com
              </a>
            </div>
            
            <div className="mt-8 text-center border-t border-gray-700 pt-6">
              <div className="text-gray-300 mb-2">
                H1Founders - Breaking visa slavery since March 2024
              </div>
              <div className="text-gray-500 text-xs">
                Founded by Sid Sarasvati • CEO of RenovateAI ($3M ARR) • EB1-A recipient
              </div>
            </div>
            
            <div className="mt-6 bg-black rounded p-4 border border-gray-700">
              <div className="text-green-400">// System status</div>
              <div className="text-gray-300">
                community_size: 1400,<br/>
                companies_bootstrapped: "many",<br/>
                myths_destroyed: "countless",<br/>
                freedom_enabled: true
              </div>
              <div className="text-green-400 mt-2">
                Ready to start your journey? <span className="cursor">█</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="font-mono text-xs text-gray-600">
            ./build_business --while="on_h1b" --outcome="eb1a_green_card"
          </div>
        </div>
      </div>
    </footer>
  )
}