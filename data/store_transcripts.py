#!/usr/bin/env python3
import sqlite3
import os

# Database path
db_path = '/Users/sid/Code/te/h1founders/data/coaching_crm.db'

# Transcripts to store
transcripts = [
    {
        'email': 'khasim.life@gmail.com',
        'file': '/Users/sid/Downloads/Coaching Call with Sid between Sid Sara_ Transcript.txt'
    },
    {
        'email': 'sheekha.k@gmail.com', 
        'file': '/Users/sid/Downloads/Coaching Call with Sid between Sid Sara_ Transcript-3.txt'
    },
    {
        'email': 'yadavaditya4742@gmail.com',
        'file': '/Users/sid/Downloads/Coaching Call with Sid between Sid Sara_ Transcript-2.txt'
    },
    {
        'email': 'pasupuleti.prasanthi@gmail.com',
        'file': '/Users/sid/Downloads/Coaching Call with Sid between Sid Sara_ Transcript-4.txt'
    },
    {
        'email': 'jaikumarpr@gmail.com',
        'file': '/Users/sid/Downloads/Jaikumar _ Sid (H1BFounders Coaching) Transcript.txt'
    },
    {
        'email': 'j.samarth@outlook.com',
        'file': '/Users/sid/Downloads/Coaching Call with Sid between Sid Sara_ Transcript-5.txt'
    },
    {
        'email': 'akshaykokane09@gmail.com',
        'file': '/Users/sid/Downloads/Coaching Call with Sid between Sid Sara_ Transcript-6.txt'
    },
    {
        'email': 'estherliyating@gmail.com',
        'file': '/Users/sid/Downloads/Coaching Call with Sid between Sid Sara_ Transcript-7.txt'
    }
]

# Connect to database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

for transcript in transcripts:
    if os.path.exists(transcript['file']):
        with open(transcript['file'], 'r') as f:
            content = f.read()
        
        # Update the session with transcript
        cursor.execute("""
            UPDATE sessions 
            SET transcript_text = ?
            WHERE client_id = (SELECT id FROM clients WHERE email = ?)
        """, (content, transcript['email']))
        
        print(f"✓ Stored transcript for {transcript['email']}")
    else:
        print(f"✗ File not found: {transcript['file']}")

conn.commit()
conn.close()
print("\nAll transcripts stored in database!")