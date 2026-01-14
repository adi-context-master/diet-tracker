import { Router } from 'express';
import db from '../db/index.js';

const router = Router();

// Get completed items for a date
router.get('/:date', (req, res) => {
    const { date } = req.params;

    try {
        const items = db.prepare('SELECT item_id FROM checklist WHERE check_date = ?').all(date);
        const completedIds = items.map(item => item.item_id);
        res.json(completedIds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle item completion
router.post('/toggle', (req, res) => {
    const { item_id, date, completed } = req.body;

    if (!item_id || !date) {
        return res.status(400).json({ error: 'item_id and date are required' });
    }

    try {
        if (completed) {
            db.prepare('INSERT OR IGNORE INTO checklist (item_id, check_date) VALUES (?, ?)').run(item_id, date);
        } else {
            db.prepare('DELETE FROM checklist WHERE item_id = ? AND check_date = ?').run(item_id, date);
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get history (last N days with completion counts)
router.get('/history/:days', (req, res) => {
    const { days } = req.params;

    try {
        const history = db.prepare(`
            SELECT check_date, COUNT(*) as completed_count
            FROM checklist
            GROUP BY check_date
            ORDER BY check_date DESC
            LIMIT ?
        `).all(parseInt(days));
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get note for a date
router.get('/notes/:date', (req, res) => {
    const { date } = req.params;

    try {
        const note = db.prepare('SELECT content FROM daily_notes WHERE note_date = ?').get(date);
        res.json({ content: note?.content || '' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Save note for a date
router.post('/notes', (req, res) => {
    const { date, content } = req.body;

    if (!date) {
        return res.status(400).json({ error: 'date is required' });
    }

    try {
        if (content && content.trim()) {
            db.prepare(`
                INSERT INTO daily_notes (note_date, content, updated_at)
                VALUES (?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(note_date) DO UPDATE SET
                    content = excluded.content,
                    updated_at = CURRENT_TIMESTAMP
            `).run(date, content.trim());
        } else {
            db.prepare('DELETE FROM daily_notes WHERE note_date = ?').run(date);
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
