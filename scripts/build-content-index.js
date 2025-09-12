#!/usr/bin/env node
/**
 * Build-time Content Indexer
 * Reads all markdown files from /content and generates index.json
 * Run with: node scripts/build-content-index.js
 */

const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.join(process.cwd(), 'content')
const OUTPUT_FILE = path.join(process.cwd(), 'client/src/data/contentIndex.json')

// Simple frontmatter parser
function parseMarkdownWithFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    console.warn('No frontmatter found, skipping file')
    return null
  }
  
  const [, frontmatterStr, markdownContent] = match
  const frontmatter = {}
  
  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Handle arrays [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim())
      }
      
      // Handle booleans
      if (value === 'true') value = true
      if (value === 'false') value = false
      
      frontmatter[key] = value
    }
  })
  
  // Generate excerpt (first paragraph)
  const paragraphs = markdownContent.split('\n\n')
  const excerpt = paragraphs.find(p => p.trim() && !p.startsWith('#'))?.substring(0, 200) + '...'
  
  return {
    frontmatter,
    content: markdownContent.trim(),
    excerpt: excerpt?.replace(/[#*_]/g, '') || ''
  }
}

// Recursively find all .md files
function findMarkdownFiles(dir, category = '') {
  const files = []
  
  if (!fs.existsSync(dir)) {
    return files
  }
  
  const entries = fs.readdirSync(dir)
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      // Subdirectory becomes category
      files.push(...findMarkdownFiles(fullPath, entry))
    } else if (entry.endsWith('.md')) {
      files.push({
        path: fullPath,
        category: category || path.basename(dir),
        filename: entry
      })
    }
  }
  
  return files
}

function main() {
  console.log('🚀 Building content index...')
  console.log(`📁 Reading from: ${CONTENT_DIR}`)
  
  const contentIndex = {
    generated: new Date().toISOString(),
    totalFiles: 0,
    categories: {},
    threads: []
  }
  
  // Find all markdown files
  const markdownFiles = findMarkdownFiles(CONTENT_DIR)
  
  for (const file of markdownFiles) {
    try {
      const rawContent = fs.readFileSync(file.path, 'utf-8')
      const parsed = parseMarkdownWithFrontmatter(rawContent)
      
      if (!parsed) {
        console.warn(`⚠️  Skipping ${file.filename} - no frontmatter`)
        continue
      }
      
      const { frontmatter, content, excerpt } = parsed
      
      // Convert to thread format
      const thread = {
        id: frontmatter.id || file.filename.replace('.md', ''),
        title: frontmatter.title || file.filename,
        category: frontmatter.category || file.category.toUpperCase(),
        subcategory: frontmatter.subcategory,
        type: mapContentTypeToThreadType(frontmatter.contentType),
        author: {
          id: frontmatter.author || 'system',
          username: frontmatter.author || 'system',
          name: frontmatter.author || 'H1BFounders',
          badge: frontmatter.author === 'sid' ? 'THE_ARCHITECT' : 'FREED_MIND',
          isVerified: frontmatter.isOfficial || false
        },
        content: content,
        excerpt: excerpt,
        createdAt: frontmatter.createdAt || new Date().toISOString(),
        updatedAt: frontmatter.updatedAt || frontmatter.createdAt || new Date().toISOString(),
        views: frontmatter.views || 0,
        replies: 0,
        isPinned: frontmatter.isPinned || false,
        isLocked: false,
        tags: frontmatter.tags || [],
        
        // Content-specific fields
        contentType: frontmatter.contentType,
        isOfficial: frontmatter.isOfficial || false,
        sourceUrl: frontmatter.sourceUrl,
        eventDate: frontmatter.eventDate,
        toolEmbed: frontmatter.toolEmbed,
        featured: frontmatter.featured || false,
        badges: frontmatter.badges || []
      }
      
      contentIndex.threads.push(thread)
      
      // Track categories
      if (!contentIndex.categories[thread.category]) {
        contentIndex.categories[thread.category] = 0
      }
      contentIndex.categories[thread.category]++
      
      console.log(`✅ ${thread.title}`)
      
    } catch (error) {
      console.error(`❌ Error processing ${file.filename}:`, error.message)
    }
  }
  
  contentIndex.totalFiles = contentIndex.threads.length
  
  // Sort threads: Pinned → Featured → Official → Recent
  contentIndex.threads.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    if (a.isOfficial && !b.isOfficial) return -1
    if (!a.isOfficial && b.isOfficial) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // Write index file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(contentIndex, null, 2))
  
  console.log(`\n✨ Generated content index:`)
  console.log(`📄 ${contentIndex.totalFiles} files`)
  console.log(`📂 Categories: ${Object.keys(contentIndex.categories).join(', ')}`)
  console.log(`💾 Saved to: ${OUTPUT_FILE}`)
}

function mapContentTypeToThreadType(contentType) {
  const mapping = {
    'STORY': 'VICTORY',
    'EVENT': 'PROPHECY', 
    'GUIDE': 'RESOURCE',
    'TOOL': 'RESOURCE',
    'WISDOM': 'WARNING',
    'SUBSTACK': 'RESOURCE',
    'ANNOUNCEMENT': 'PROPHECY'
  }
  return mapping[contentType] || 'RESOURCE'
}

if (require.main === module) {
  main()
}