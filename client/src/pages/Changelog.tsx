import { useState, useEffect } from 'react'

export default function Changelog() {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the changelog markdown
    fetch('/CHANGELOG.md')
      .then(res => res.text())
      .then(text => {
        // Simple markdown to HTML conversion for display
        const html = text
          .replace(/^### (.*$)/gim, '<h3 className="text-xl font-bold text-accent mt-6 mb-3">$1</h3>')
          .replace(/^## (.*$)/gim, '<h2 className="text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border pb-2">$1</h2>')
          .replace(/^# (.*$)/gim, '<h1 className="text-3xl font-bold text-foreground mb-6">$1</h1>')
          .replace(/^\* (.*$)/gim, '<li className="text-foreground-secondary ml-4">$1</li>')
          .replace(/^- (.*$)/gim, '<li className="text-foreground-secondary ml-4">$1</li>')
          .replace(/\*\*(.*)\*\*/g, '<strong className="text-foreground font-semibold">$1</strong>')
          .replace(/\*(.*)\*/g, '<em>$1</em>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-accent hover:text-accent-secondary underline">$1</a>')
          .replace(/^---$/gim, '<hr className="border-border my-8">')
          .replace(/\n\n/g, '</p><p className="text-foreground-secondary mb-4">')
          .replace(/^#### (.*$)/gim, '<h4 className="text-lg font-semibold text-foreground mt-4 mb-2">$1</h4>')
          .replace(/- \[ \]/g, '<span className="text-foreground-tertiary">☐</span>')
          .replace(/- \[x\]/gi, '<span className="text-accent">✓</span>')

        setContent(`<div className="prose prose-invert max-w-none">${html}</div>`)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load changelog:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-accent font-mono">Loading changelog...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Beta Badge */}
      <div className="fixed top-4 right-4 z-50">
        <span className="px-3 py-1 bg-accent/20 border border-accent text-accent text-xs font-mono rounded">
          BETA v0.8.0
        </span>
      </div>

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Platform Changelog</h1>
              <p className="text-foreground-secondary font-mono text-sm">
                Weekly releases every Friday at 5 PM EST
              </p>
            </div>
            <a href="/" className="text-accent hover:text-accent-secondary font-mono text-sm">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Changelog Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className="changelog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-foreground-tertiary font-mono">
            <span>Building the future, one founder at a time.</span>
            <span>Platform Status: BETA</span>
          </div>
        </div>
      </div>
    </div>
  )
}