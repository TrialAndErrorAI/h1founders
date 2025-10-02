BEGIN TRANSACTION;

-- Insert session recording with full transcript
INSERT INTO session_recordings (
    session_type,
    session_id,
    recording_url,
    transcript_text,
    duration_minutes,
    recorded_at
) VALUES (
    'win_club',
    1,  -- WIN CLUB Session #1 ID
    NULL,  -- YouTube URL will be added later
    readfile('/Users/sid/Downloads/WIN CLUB - Harshdeep Transcript.txt'),
    24,
    '2025-10-01 17:00:00'
);

-- Insert Sid's analysis
INSERT INTO session_analysis (
    recording_id,
    sid_raw_notes,
    energy_level,
    key_signals,
    homework_assigned
) VALUES (
    (SELECT id FROM session_recordings WHERE session_type = 'win_club' AND session_id = 1),
    'Microsoft SE II, systems engineer (C++/Linux)
PicPicker - desktop photo curation app (Electron/TypeScript)
Split focus: Ship app OR prep for higher-paying job
Pattern: Perfectionism ("goalpost keeps moving")
IIT Delhi → Microsoft Redmond → Real estate flip (shook confidence)
Age 30, married, daily workout with wife (10/10 physical health)
Key tags: #cart_before_horse #visa_fear #too_casual #typical #metadssucks',
    7,  -- Energy level 7/10
    'cart_before_horse,visa_fear,too_casual,typical,metadssucks',
    'Weekly planning sheet - share on Friday'
);

COMMIT;

SELECT 'Recording inserted with ID: ' || id FROM session_recordings WHERE session_type = 'win_club' AND session_id = 1;
