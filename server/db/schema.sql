-- Checklist items completed by user
CREATE TABLE IF NOT EXISTS checklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id TEXT NOT NULL,
    check_date TEXT NOT NULL,
    completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(item_id, check_date)
);

-- Daily notes/comments
CREATE TABLE IF NOT EXISTS daily_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_date TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster date queries
CREATE INDEX IF NOT EXISTS idx_checklist_date ON checklist(check_date);
CREATE INDEX IF NOT EXISTS idx_notes_date ON daily_notes(note_date);
