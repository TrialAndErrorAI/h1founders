#!/usr/bin/env python3
import sqlite3
import os

# Database path
db_path = '/Users/sid/Code/te/h1founders/data/coaching_crm.db'

# Tough love transcripts
tough_love_sessions = [
    {
        'name': 'Swapnil (Swap)',
        'file': '/Users/sid/Downloads/h1b-founders_sid-swap-magic-episode-aug-27-2025 (2).txt',
        'episode': 1,
        'session_type': 'tough_love'
    }
]

# Connect to database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

for session in tough_love_sessions:
    if os.path.exists(session['file']):
        with open(session['file'], 'r') as f:
            content = f.read()
        
        # Update the session with transcript
        cursor.execute("""
            UPDATE sessions 
            SET transcript_text = ?, session_type = ?
            WHERE client_id = (SELECT id FROM clients WHERE name = ?)
            AND session_date = '2025-08-27'
        """, (content, session['session_type'], session['name']))
        
        print(f"✓ Stored tough love transcript for {session['name']} - Episode {session['episode']}")
    else:
        print(f"✗ File not found: {session['file']}")

conn.commit()
conn.close()
print("\nTough Love sessions stored!")