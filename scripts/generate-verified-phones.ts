#!/usr/bin/env bun
// Generate verifiedPhones.ts from WhatsApp CSV
import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'csv-parse/sync'

const csvContent = readFileSync('/Users/sid/Code/te/h1founders/Whatsapp-Contacts.csv', 'utf-8')

const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
})

const phoneNumbers = records
  .map(r => r.number)
  .filter(n => n && n.length >= 10)
  .map(n => n.replace(/[\s\-\(\)+]/g, '')) // Normalize

// Generate TypeScript file
const tsContent = `// Auto-generated from WhatsApp export - ${records.length} members
// Generated on: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - regenerate using scripts/generate-verified-phones.ts

export const VERIFIED_PHONES = new Set([
${phoneNumbers.map(n => `  "${n}"`).join(',\n')}
])

// Helper to check if a phone is verified
export function isVerifiedPhone(phone: string | null): boolean {
  if (!phone) return false
  // Normalize: remove +, spaces, dashes, parens
  const normalized = phone.replace(/[\\s\\-\\(\\)+]/g, '')
  return VERIFIED_PHONES.has(normalized)
}

// Stats
export const VERIFIED_STATS = {
  total: ${phoneNumbers.length},
  source: 'WhatsApp H1Founders Group',
  exportDate: '${new Date().toISOString().split('T')[0]}'
}
`

writeFileSync('/Users/sid/Code/te/h1founders/client/src/data/verifiedPhones.ts', tsContent)

console.log(`✅ Generated verifiedPhones.ts with ${phoneNumbers.length} numbers`)
console.log(`📍 Your number (15857296344) is ${phoneNumbers.includes('15857296344') ? 'INCLUDED ✓' : 'NOT FOUND ✗'}`)