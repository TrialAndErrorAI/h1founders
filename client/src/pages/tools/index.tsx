import { Link } from 'react-router-dom'

const tools = [
  {
    id: 'salary-explorer',
    name: 'H1B Salary Explorer',
    description: 'See what companies pay H1B holders. Then see what founders make instead.',
    status: 'LIVE',
    path: '/tools/salary-explorer',
    icon: '💰'
  },
  {
    id: 'eb1a-qualifier',
    name: 'EB1-A Qualifier',
    description: 'Find out if you qualify for EB1-A extraordinary ability green card.',
    status: 'LIVE',
    path: '/tools/eb1a-qualifier',
    icon: '🎯'
  },
  {
    id: 'visa-timeline',
    name: 'Visa Timeline Calculator',
    description: 'Calculate realistic timelines for different visa paths.',
    status: 'SOON',
    path: '#',
    icon: '⏱️'
  },
  {
    id: 'bootstrap-calculator',
    name: 'Bootstrap Revenue Calculator',
    description: 'Can you self-sponsor with your revenue?',
    status: 'SOON',
    path: '#',
    icon: '📈'
  }
]

export default function ToolsIndex() {
  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="terminal-prompt mb-2"></div>
          <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
            TOOLS/
          </h1>
          <p className="text-gray-400 text-lg">
            Interactive tools to help you escape the H1B matrix.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const isLive = tool.status === 'LIVE'
            
            return (
              <Link
                key={tool.id}
                to={isLive ? tool.path : '#'}
                className={`
                  block bg-gray-900 border rounded-lg p-6 transition-all duration-200
                  ${isLive 
                    ? 'border-green-400/20 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/10' 
                    : 'border-gray-700 opacity-60 cursor-not-allowed'
                  }
                `}
                onClick={(e) => {
                  if (!isLive) {
                    e.preventDefault()
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className={`
                    font-mono text-xs px-2 py-1 rounded
                    ${isLive 
                      ? 'bg-green-400/10 text-green-400 border border-green-400/20' 
                      : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                    }
                  `}>
                    {tool.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {tool.name}
                </h3>
                
                <p className="text-gray-400 text-sm">
                  {tool.description}
                </p>
                
                {isLive && (
                  <div className="mt-4 flex items-center text-green-400 font-mono text-sm">
                    <span>LAUNCH_TOOL()</span>
                    <span className="ml-2">→</span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center border-t border-gray-800 pt-8">
          <p className="text-gray-500 font-mono text-sm">
            // More tools coming soon. Building in public.
          </p>
        </div>
      </div>
    </div>
  )
}