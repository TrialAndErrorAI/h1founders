/**
 * Simple Markdown Renderer for Content Threads
 * Handles basic markdown formatting for forum display
 */

interface MarkdownRendererProps {
  content: string
  isContentThread?: boolean
}

export function MarkdownRenderer({ content, isContentThread = false }: MarkdownRendererProps) {
  // If not a content thread, render as plain text
  if (!isContentThread) {
    return <p className="text-gray-300 whitespace-pre-wrap">{content}</p>
  }

  // Simple markdown parsing for content threads
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n')
    const elements: React.ReactElement[] = []
    let key = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="text-2xl font-bold text-white mb-4 mt-6">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-xl font-bold text-white mb-3 mt-5">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-lg font-bold text-white mb-2 mt-4">
            {line.substring(4)}
          </h3>
        )
      }
      // List items
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItem = line.substring(2)
        elements.push(
          <li key={key++} className="text-gray-300 mb-1 ml-4">
            • {processInlineMarkdown(listItem)}
          </li>
        )
      }
      // Numbered lists
      else if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^(\d+)\.\s(.*)/)
        if (match) {
          const [, num, text] = match
          elements.push(
            <li key={key++} className="text-gray-300 mb-1 ml-4">
              {num}. {processInlineMarkdown(text)}
            </li>
          )
        }
      }
      // Empty line
      else if (line.trim() === '') {
        elements.push(<br key={key++} />)
      }
      // Regular paragraph
      else if (line.trim()) {
        elements.push(
          <p key={key++} className="text-gray-300 mb-3">
            {processInlineMarkdown(line)}
          </p>
        )
      }
    }

    return elements
  }

  // Handle inline markdown (bold, italic, code)
  const processInlineMarkdown = (text: string) => {
    let processed = text

    // Split by markdown patterns and process
    const boldRegex = /\*\*(.*?)\*\*/g
    const codeRegex = /`(.*?)`/g
    
    // Simple processing - replace bold text
    processed = processed.replace(boldRegex, (_match, content) => {
      return `__BOLD_START__${content}__BOLD_END__`
    })
    
    processed = processed.replace(codeRegex, (_match, content) => {
      return `__CODE_START__${content}__CODE_END__`
    })

    // Convert back to JSX
    const finalParts = processed.split(/(__BOLD_START__|__BOLD_END__|__CODE_START__|__CODE_END__)/)
    let isBold = false
    let isCode = false
    
    return finalParts.map((part, index) => {
      if (part === '__BOLD_START__') {
        isBold = true
        return null
      } else if (part === '__BOLD_END__') {
        isBold = false
        return null
      } else if (part === '__CODE_START__') {
        isCode = true
        return null
      } else if (part === '__CODE_END__') {
        isCode = false
        return null
      } else if (part) {
        if (isBold) {
          return <strong key={index} className="text-white font-semibold">{part}</strong>
        } else if (isCode) {
          return <code key={index} className="bg-gray-800 text-green-400 px-1 py-0.5 rounded font-mono text-sm">{part}</code>
        } else {
          return part
        }
      }
      return null
    }).filter(Boolean)
  }

  return (
    <div className="prose prose-invert max-w-none">
      {renderMarkdown(content)}
    </div>
  )
}

export default MarkdownRenderer