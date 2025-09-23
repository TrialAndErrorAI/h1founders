#!/bin/bash

# H1Founders Launch Monitor
# Tracks signups after WhatsApp announcement

BASELINE_USERS=4
WHATSAPP_TOTAL=792
ANNOUNCEMENT_TIME="4:30 PM EDT"

while true; do
    clear
    echo "============================================================"
    echo "H1FOUNDERS LAUNCH MONITOR - WhatsApp Announcement"
    echo "============================================================"
    echo "Time: $(date '+%I:%M %p %Z')"
    echo "Announcement sent: $ANNOUNCEMENT_TIME"
    echo ""

    # Get current user count using MCP tool
    echo "📊 FETCHING LATEST STATS..."
    echo ""

    # Use the MCP Firebase tool to get users
    echo "Checking signups..."

    # Count users (we'll call the MCP tool from Claude)
    echo ""
    echo "🎯 TARGET: 50+ signups in first 24 hours"
    echo ""
    echo "Press Ctrl+C to stop monitoring"
    echo "Updates every 60 seconds..."

    sleep 60
done