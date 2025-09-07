import { useState } from 'react'
import { successStories, getFeaturedStories, SuccessStory } from '../../data/successStories'
import EmailCapture from '../../components/EmailCapture'

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null)
  const [filterBy, setFilterBy] = useState<'all' | 'featured'>('featured')
  
  const displayStories = filterBy === 'featured' ? getFeaturedStories() : successStories
  
  const getMetricColor = (label: string) => {
    if (label.includes('Revenue') || label.includes('Income')) return 'text-green-400'
    if (label.includes('Wait') || label.includes('Risk')) return 'text-red-400'
    if (label.includes('Freedom') || label.includes('Impact')) return 'text-blue-400'
    return 'text-yellow-400'
  }

  const getTimelineIcon = (type: SuccessStory['timeline'][0]['type']) => {
    switch (type) {
      case 'visa': return '📋'
      case 'business': return '🚀'
      case 'milestone': return '🎯'
      default: return '📍'
    }
  }

  if (selectedStory) {
    return (
      <div className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => setSelectedStory(null)}
            className="text-gray-400 hover:text-green-400 font-mono text-sm mb-8"
          >
            ← BACK_TO_STORIES()
          </button>

          {/* Story Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">{selectedStory.name}</h1>
            <p className="text-xl text-green-400 font-mono mb-4">{selectedStory.tagline}</p>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>{selectedStory.currentRole} at {selectedStory.company}</span>
              <span>•</span>
              <span className="text-green-400">{selectedStory.revenue}</span>
              <span>•</span>
              <span>{selectedStory.visaPath}</span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-mono text-green-400 mb-6">// TRANSFORMATION_METRICS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedStory.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-red-400">
                      <span className="text-xs">BEFORE: </span>
                      <span className="font-mono">{metric.before}</span>
                    </div>
                    <span className="text-gray-600">→</span>
                    <div className={getMetricColor(metric.label)}>
                      <span className="text-xs">AFTER: </span>
                      <span className="font-mono font-bold">{metric.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Breakthroughs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-900 border border-red-500/20 rounded-lg p-6">
              <h3 className="text-lg font-mono text-red-400 mb-4">// CHALLENGES_FACED</h3>
              <ul className="space-y-2">
                {selectedStory.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span className="text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-900 border border-green-500/20 rounded-lg p-6">
              <h3 className="text-lg font-mono text-green-400 mb-4">// BREAKTHROUGHS</h3>
              <ul className="space-y-2">
                {selectedStory.breakthroughs.map((breakthrough, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">{breakthrough}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-mono text-green-400 mb-6">// JOURNEY_TIMELINE</h2>
            <div className="space-y-4">
              {selectedStory.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="font-mono text-sm text-gray-500">{event.date}</span>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xl">{getTimelineIcon(event.type)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Advice */}
          <div className="bg-gradient-to-r from-green-900/20 to-transparent border border-green-500/30 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-mono text-green-400 mb-4">// KEY_ADVICE</h3>
            <p className="text-white text-lg italic">"{selectedStory.topAdvice}"</p>
            <p className="text-gray-400 mt-4">— {selectedStory.name}</p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">Ready to write your own success story?</p>
            <a
              href="/tools/eb1a-qualifier"
              className="inline-block red-pill-button px-8 py-3 font-mono font-semibold rounded-lg"
            >
              CHECK_YOUR_ELIGIBILITY()
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="terminal-prompt mb-2"></div>
          <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
            SUCCESS_STORIES/
          </h1>
          <p className="text-gray-400 text-lg">
            Real founders who escaped the H1B matrix. Real numbers. Real transformation.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex items-center space-x-4">
          <button
            onClick={() => setFilterBy('featured')}
            className={`px-4 py-2 font-mono text-sm rounded-lg border transition-all ${
              filterBy === 'featured' 
                ? 'bg-green-500 text-black border-green-500' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
          >
            FEATURED ({getFeaturedStories().length})
          </button>
          <button
            onClick={() => setFilterBy('all')}
            className={`px-4 py-2 font-mono text-sm rounded-lg border transition-all ${
              filterBy === 'all' 
                ? 'bg-green-500 text-black border-green-500' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
          >
            ALL_STORIES ({successStories.length})
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {displayStories.map(story => (
            <div
              key={story.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-400/30 transition-all cursor-pointer group"
              onClick={() => setSelectedStory(story)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {story.name}
                  </h3>
                  <p className="text-green-400 font-mono text-sm">{story.tagline}</p>
                </div>
                {story.featured && (
                  <span className="text-yellow-400 text-sm">⭐ FEATURED</span>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <span className="font-mono">{story.visaPath}</span>
                <span>•</span>
                <span className="text-green-400">{story.revenue}</span>
                <span>•</span>
                <span>{story.timeToGreenCard}</span>
              </div>

              {/* Excerpt */}
              <p className="text-gray-300 mb-4">
                {story.excerpt}
              </p>

              {/* Key Metrics Preview */}
              <div className="bg-black/50 rounded p-3 mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {story.metrics.slice(0, 2).map((metric, index) => (
                    <div key={index}>
                      <p className="text-gray-500 text-xs">{metric.label}</p>
                      <p className="font-mono">
                        <span className="text-red-400 text-xs">{metric.before}</span>
                        <span className="text-gray-600 mx-1">→</span>
                        <span className={`text-xs ${getMetricColor(metric.label)}`}>{metric.after}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>{story.industry}</span>
                  <span>•</span>
                  <span>{story.employees} employees</span>
                </div>
                <span className="text-green-400 font-mono text-sm group-hover:translate-x-2 transition-transform">
                  READ_MORE →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Your Story */}
        <div className="bg-gradient-to-r from-red-900/20 to-transparent border border-red-500/30 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-mono text-red-400 mb-4">// SHARE_YOUR_STORY</h2>
              <p className="text-gray-300 mb-4">
                Got your green card? Built a successful business? Your story could inspire the next wave of immigrant founders.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Get featured on the platform
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Inspire 1,400+ founders
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Build your personal brand
                </li>
              </ul>
            </div>
            
            <div className="bg-black/50 rounded-lg p-6">
              <h3 className="text-lg font-mono text-white mb-2">// Submit Your Success</h3>
              <p className="text-gray-400 text-sm mb-4">
                We'll reach out to feature your transformation.
              </p>
              <EmailCapture
                placeholder="founder@success.com"
                buttonText="SUBMIT_STORY()"
                context="story-submission"
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400 font-mono">$23M+</p>
            <p className="text-gray-500 text-sm">Combined ARR</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400 font-mono">18mo</p>
            <p className="text-gray-500 text-sm">Avg Time to GC</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400 font-mono">125</p>
            <p className="text-gray-500 text-sm">Jobs Created</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400 font-mono">100%</p>
            <p className="text-gray-500 text-sm">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}