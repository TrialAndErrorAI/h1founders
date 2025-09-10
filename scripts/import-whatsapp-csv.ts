#!/usr/bin/env bun
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync } from 'fs'
import { parse } from 'csv-parse/sync'

// Initialize Firebase Admin
const app = initializeApp({
  projectId: 'h1founders',
})

const db = getFirestore(app)

async function importWhatsAppMembers(dryRun = true) {
  console.log(`🚀 Starting WhatsApp member import (DRY RUN: ${dryRun})`)
  
  // Read CSV file
  const csvContent = readFileSync('/Users/sid/Code/te/h1founders/Whatsapp-Contacts.csv', 'utf-8')
  
  // Parse CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  })
  
  console.log(`📋 Found ${records.length} WhatsApp members in CSV`)
  
  const batch = db.batch()
  const importStats = {
    total: records.length,
    processed: 0,
    errors: 0,
    skipped: 0
  }
  
  for (const record of records) {
    try {
      const phoneNumber = record.number
      const name = record.Name || ''
      const pushName = record['Push Name'] || ''
      
      // Skip invalid numbers
      if (!phoneNumber || phoneNumber.length < 10) {
        importStats.skipped++
        continue
      }
      
      // Normalize phone number (remove any formatting)
      const normalized = phoneNumber.replace(/[\s\-\(\)+]/g, '')
      
      // Create document ID from phone number (for easy lookup)
      const docRef = db.collection('verifiedMembers').doc(normalized)
      
      const memberData = {
        phone: normalized,
        name: name || null,
        pushName: pushName || null,
        source: 'whatsapp',
        importedAt: new Date(),
        verified: true
      }
      
      if (!dryRun) {
        batch.set(docRef, memberData)
      }
      
      importStats.processed++
      
      // Log sample entries
      if (importStats.processed <= 5) {
        console.log(`  ✅ ${phoneNumber} - ${name || pushName || '(no name)'}`)
      } else if (importStats.processed === 6) {
        console.log(`  ... processing remaining ${records.length - 5} members ...`)
      }
      
      // Special callout for Sid
      if (normalized === '15857296344') {
        console.log(`  🔴 Found Sid Sarasvati - THE ARCHITECT`)
      }
      
    } catch (error) {
      console.error(`  ❌ Error processing record:`, error)
      importStats.errors++
    }
  }
  
  if (!dryRun && importStats.processed > 0) {
    console.log('\n📤 Committing batch to Firestore...')
    await batch.commit()
    console.log('✅ Batch committed successfully!')
  }
  
  console.log('\n📊 Import Summary:')
  console.log(`  Total records: ${importStats.total}`)
  console.log(`  Successfully processed: ${importStats.processed}`)
  console.log(`  Skipped (invalid): ${importStats.skipped}`)
  console.log(`  Errors: ${importStats.errors}`)
  
  if (dryRun) {
    console.log('\n⚠️  This was a DRY RUN - no data was written to Firestore')
    console.log('Run with --execute flag to perform actual import:')
    console.log('  bun run scripts/import-whatsapp-csv.ts --execute')
  }
}

// Check for existing imports
async function checkExistingImports() {
  const snapshot = await db.collection('verifiedMembers').limit(5).get()
  
  if (!snapshot.empty) {
    console.log(`\n⚠️  Found ${snapshot.size} existing verified members:`)
    snapshot.forEach(doc => {
      const data = doc.data()
      console.log(`  - ${data.phone}: ${data.name || data.pushName || '(no name)'}`)
    })
    
    const totalCount = await db.collection('verifiedMembers').count().get()
    console.log(`\nTotal verified members in database: ${totalCount.data().count}`)
    
    return true
  }
  
  return false
}

// Main execution
async function main() {
  try {
    console.log('🔍 Checking for existing verified members...')
    const hasExisting = await checkExistingImports()
    
    if (hasExisting) {
      console.log('\n⚠️  WARNING: Existing verified members found!')
      console.log('This will ADD to existing members, not replace.')
      console.log('To reset, manually delete the verifiedMembers collection first.\n')
    }
    
    const isDryRun = !process.argv.includes('--execute')
    await importWhatsAppMembers(isDryRun)
    
    console.log('\n✨ Import process complete!')
    
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

// Run the script
main().catch(console.error)