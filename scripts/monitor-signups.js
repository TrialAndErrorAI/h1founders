#!/usr/bin/env node

/**
 * Real-time signup monitoring for WhatsApp announcement
 * Tracks conversion rate and member types
 */

const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin
const app = initializeApp({
  projectId: 'h1founders'
});

const auth = getAuth();
const db = getFirestore();

// Baseline before announcement (4:30pm)
const BASELINE_USERS = 4;
const ANNOUNCEMENT_TIME = new Date('2025-09-22T20:30:00Z'); // 4:30pm EDT
const WHATSAPP_MEMBERS_TOTAL = 792;

async function getSignupStats() {
  try {
    // Get all users
    const listResult = await auth.listUsers(100);
    const users = listResult.users;

    // Get member details from Firestore
    const membersSnapshot = await db.collection('members').get();
    const members = {};
    membersSnapshot.forEach(doc => {
      members[doc.id] = doc.data();
    });

    // Calculate stats
    const stats = {
      totalUsers: users.length,
      newSignups: users.length - BASELINE_USERS,
      whatsappMembers: 0,
      regularMembers: 0,
      recentSignups: []
    };

    // Analyze each user
    users.forEach(user => {
      const member = members[user.uid];
      const createdTime = new Date(user.metadata.creationTime);

      if (member) {
        if (member.isWhatsappMember) {
          stats.whatsappMembers++;
        } else {
          stats.regularMembers++;
        }

        // Track signups after announcement
        if (createdTime > ANNOUNCEMENT_TIME) {
          stats.recentSignups.push({
            phone: user.phoneNumber,
            username: member.username,
            badge: member.matrixLevel,
            isWhatsapp: member.isWhatsappMember,
            signedUp: createdTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York' })
          });
        }
      }
    });

    // Sort recent signups by time
    stats.recentSignups.sort((a, b) => new Date(a.signedUp) - new Date(b.signedUp));

    // Calculate conversion rate
    stats.conversionRate = ((stats.whatsappMembers / WHATSAPP_MEMBERS_TOTAL) * 100).toFixed(2) + '%';

    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

async function displayStats() {
  const stats = await getSignupStats();
  if (!stats) return;

  console.clear();
  console.log('='.repeat(60));
  console.log('H1FOUNDERS LAUNCH MONITOR - WhatsApp Announcement');
  console.log('='.repeat(60));
  console.log(`Time: ${new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}`);
  console.log(`Announcement sent: 4:30 PM EDT`);
  console.log();

  console.log('📊 OVERALL STATS');
  console.log('-'.repeat(40));
  console.log(`Total Users: ${stats.totalUsers}`);
  console.log(`New Signups: ${stats.newSignups} (since announcement)`);
  console.log(`WhatsApp Members: ${stats.whatsappMembers} / ${WHATSAPP_MEMBERS_TOTAL}`);
  console.log(`Conversion Rate: ${stats.conversionRate}`);
  console.log(`Regular Members: ${stats.regularMembers}`);
  console.log();

  if (stats.recentSignups.length > 0) {
    console.log('🆕 RECENT SIGNUPS');
    console.log('-'.repeat(40));
    stats.recentSignups.slice(-5).forEach((signup, i) => {
      const badge = signup.isWhatsapp ? '✅ FREED_MIND' : '⭕ UNPLUGGED';
      console.log(`${i + 1}. ${signup.username} - ${badge} - ${signup.signedUp}`);
    });
  }

  console.log();
  console.log('🎯 TARGET: 50+ signups in first 24 hours');
  console.log(`📈 Progress: ${stats.newSignups}/50 (${(stats.newSignups/50*100).toFixed(0)}%)`);

  // Alert on milestones
  if (stats.newSignups === 10) {
    console.log('\n🎉 MILESTONE: 10 signups reached!');
  } else if (stats.newSignups === 25) {
    console.log('\n🎉 MILESTONE: 25 signups - halfway to target!');
  } else if (stats.newSignups === 50) {
    console.log('\n🎉 MILESTONE: 50 signups - TARGET ACHIEVED!');
  }
}

// Run monitor
console.log('Starting signup monitor...');
console.log('Press Ctrl+C to stop\n');

// Initial display
displayStats();

// Update every 30 seconds
setInterval(displayStats, 30000);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nMonitoring stopped.');
  process.exit(0);
});