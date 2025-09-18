-- H1Founders Coaching CRM Enhanced Schema
-- Supports recordings, transcripts, and Wed/Fri accountability program

CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    whatsapp_number TEXT,
    timezone TEXT DEFAULT 'EST',
    first_session_date DATE,
    total_sessions INTEGER DEFAULT 1,
    revenue_generated REAL DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    session_date DATE NOT NULL,
    session_time TIME,
    duration_minutes INTEGER DEFAULT 45,
    type TEXT, -- 'coaching', 'accountability', 'group'
    price REAL DEFAULT 185,
    recording_url TEXT,
    transcript_url TEXT,
    key_insights TEXT,
    action_items TEXT,
    completed BOOLEAN DEFAULT 1,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS accountability_program (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    status TEXT, -- 'interested', 'waitlist', 'active', 'churned'
    slot TEXT, -- 'Wed 9am', 'Fri 2pm', etc
    monthly_price REAL DEFAULT 497,
    start_date DATE,
    end_date DATE,
    check_in_days TEXT DEFAULT 'Wed,Fri',
    notes TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS check_ins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    scheduled_date DATE,
    scheduled_time TIME,
    actual_date DATE,
    duration_minutes INTEGER DEFAULT 20,
    status TEXT, -- 'scheduled', 'completed', 'no-show', 'rescheduled'
    notes TEXT,
    goals_set TEXT,
    goals_completed TEXT,
    blockers TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    testimonial TEXT,
    rating INTEGER,
    date_received DATE,
    public BOOLEAN DEFAULT 0,
    use_for TEXT, -- 'website', 'linkedin', 'partners'
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Insert 17 coaching clients with exact dates
INSERT OR IGNORE INTO clients (name, email, first_session_date, revenue_generated) VALUES
('Khasim Shaik', 'khasim.life@gmail.com', '2025-01-09', 185),
('Aditya Yadav', 'yadavaditya4742@gmail.com', '2025-01-17', 185),
('Sheekha Khetan', 'sheekha.k@gmail.com', '2025-01-29', 185),
('Prasanthi Pasupuleti', 'pasupuleti.prasanthi@gmail.com', '2025-02-28', 185),
('Artem', 'artem.lalaiants@gmail.com', '2025-03-12', 185),
('Pahul Singh', 'pahulsinggh@gmail.com', '2025-03-24', 185),
('Siva', 'badiginchalark@gmail.com', '2025-04-10', 185),
('Abidemi Awojuyigbe', 'abidemiawojuyigbe@gmail.com', '2025-06-25', 370),
('Harshdeep', 'hdgiitd@gmail.com', '2025-06-25', 185),
('Jaikumar Pettikkattil', 'jaikumarpr@gmail.com', '2025-07-03', 185),
('Joseph Kamalesh', 'joswa2122@gmail.com', '2025-07-17', 185),
('Shirley', 'luoxiaofo619@gmail.com', '2025-08-07', 185),
('Samarth Jain', 'j.samarth@outlook.com', '2025-08-15', 185),
('Akshay Kokane', 'akshaykokane09@gmail.com', '2025-08-22', 185),
('Saurabh Sharma', 'saurabhsvits@gmail.com', '2025-09-03', 185),
('Esther Lee', 'estherliyating@gmail.com', '2025-09-17', 185),
('Total (16 clients)', 'summary@h1founders.com', '2025-01-01', 2960);

-- Record actual sessions with dates
INSERT OR IGNORE INTO sessions (client_id, session_date, type, price)
SELECT id, first_session_date, 'coaching', 185
FROM clients WHERE email != 'summary@h1founders.com';

-- Add second session for Abidemi
INSERT INTO sessions (client_id, session_date, type, price)
SELECT id, '2025-08-13', 'coaching', 185
FROM clients WHERE email = 'abidemiawojuyigbe@gmail.com';

-- Add Saurabh to accountability waitlist
INSERT INTO accountability_program (client_id, status, notes)
SELECT id, 'interested', 'Requested 3x/week check-ins. Willing to do Wed/Fri for $497/month'
FROM clients WHERE email = 'saurabhsvits@gmail.com';