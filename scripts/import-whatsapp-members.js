#!/usr/bin/env node

/**
 * WhatsApp Member Import Script
 * Imports 781 pre-existing WhatsApp members into Firestore
 * 
 * Usage: node scripts/import-whatsapp-members.js [--dry-run]
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../firebase-service-account.json'); // You'll need to download this from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'h1founders'
});

const db = admin.firestore();

/**
 * Normalize phone number to E.164 format
 * Handles various WhatsApp export formats:
 * "+1 (555) 123-4567" -> "+15551234567"
 * "555-123-4567" -> "+15551234567" 
 * "+91 98765 43210" -> "+919876543210"
 */
function normalizePhone(phone) {
  if (!phone) return null;
  
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Add + if missing
  if (!cleaned.startsWith('+')) {
    // Assume US number if 10 digits
    if (cleaned.length === 10) {
      cleaned = '+1' + cleaned;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      cleaned = '+' + cleaned;
    }
  }
  
  // Validate E.164 format
  if (!/^\+[1-9]\d{1,14}$/.test(cleaned)) {
    console.warn(`Invalid phone format: ${phone} -> ${cleaned}`);
    return null;
  }
  
  return cleaned;
}

/**
 * Generate sample WhatsApp member data
 * In production, this would read from CSV/JSON export
 */
function generateSampleMembers() {
  const visaTypes = ['H1B', 'O1', 'L1', 'F1-OPT', 'Green Card', 'Citizen'];
  const locations = [
    'San Francisco, CA', 'New York, NY', 'Seattle, WA', 
    'Austin, TX', 'Boston, MA', 'Los Angeles, CA'
  ];
  const companies = [
    'Stealth Startup', 'AI Startup', 'FinTech Co', 
    'HealthTech Inc', 'EdTech Startup', 'SaaS Company'
  ];
  
  const members = [];
  
  // Generate 781 sample members
  for (let i = 1; i <= 781; i++) {
    members.push({
      phone: `+1555555${String(i).padStart(4, '0')}`, // +15555550001, etc
      name: `H1B Founder ${i}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      visaType: visaTypes[Math.floor(Math.random() * visaTypes.length)],
      joinedDate: new Date(2024, 2 + Math.floor(Math.random() * 7), Math.floor(Math.random() * 28) + 1) // March-Sept 2024
    });
  }
  
  return members;
}

/**
 * Import members to Firestore
 */
async function importMembers(members, dryRun = false) {
  console.log(`🚀 Starting import of ${members.length} WhatsApp members...`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No data will be written');
  }
  
  const BATCH_SIZE = 500; // Firestore batch limit
  let totalImported = 0;
  let totalSkipped = 0;
  
  // Process in batches
  for (let i = 0; i < members.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const batchMembers = members.slice(i, Math.min(i + BATCH_SIZE, members.length));
    
    for (const member of batchMembers) {
      const phone = normalizePhone(member.phone);
      
      if (!phone) {
        console.error(`❌ Skipping member with invalid phone: ${member.phone}`);
        totalSkipped++;
        continue;
      }
      
      // Create unclaimed profile document
      const docRef = db.collection('unclaimed').doc();
      
      const profileData = {
        id: docRef.id,
        phone: phone,
        name: member.name || 'H1B Founder',
        joinedDate: member.joinedDate || new Date('2024-03-01'),
        status: 'unclaimed',
        
        // Optional fields if available
        ...(member.location && { location: member.location }),
        ...(member.company && { company: member.company }),
        ...(member.visaType && { visaType: member.visaType })
      };
      
      if (!dryRun) {
        batch.set(docRef, profileData);
      } else {
        console.log(`Would import: ${phone} - ${member.name}`);
      }
      
      totalImported++;
    }
    
    if (!dryRun) {
      await batch.commit();
      console.log(`✅ Batch ${Math.floor(i / BATCH_SIZE) + 1} committed (${totalImported} members)`);
    }
  }
  
  console.log(`\n📊 Import Summary:`);
  console.log(`✅ Successfully imported: ${totalImported}`);
  console.log(`❌ Skipped (invalid phone): ${totalSkipped}`);
  console.log(`📱 Total in database: ${totalImported}`);
  
  return { imported: totalImported, skipped: totalSkipped };
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  
  try {
    // Check if we need service account credentials
    if (!fs.existsSync(path.join(__dirname, '../firebase-service-account.json'))) {
      console.error('❌ Missing firebase-service-account.json');
      console.log('\nTo get this file:');
      console.log('1. Go to Firebase Console > Project Settings > Service Accounts');
      console.log('2. Click "Generate new private key"');
      console.log('3. Save as firebase-service-account.json in project root');
      console.log('4. Add to .gitignore (never commit this file!)');
      process.exit(1);
    }
    
    // Load member data
    // TODO: Replace with actual WhatsApp export data
    const members = generateSampleMembers();
    
    // Import to Firestore
    const result = await importMembers(members, dryRun);
    
    console.log('\n✨ Import complete!');
    
    if (!dryRun) {
      console.log('\n🎯 Next steps:');
      console.log('1. Test phone auth with imported member phone number');
      console.log('2. Verify profile claiming flow works');
      console.log('3. Build member directory UI to display imported members');
    }
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { normalizePhone, importMembers };