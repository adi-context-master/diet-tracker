const API_BASE = 'http://localhost:3001/api';

export async function getCompletedItems(date) {
    const response = await fetch(`${API_BASE}/checklist/${date}`);
    return response.json();
}

export async function toggleItem(item_id, date, completed) {
    const response = await fetch(`${API_BASE}/checklist/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id, date, completed }),
    });
    return response.json();
}

export async function getHistory(days = 7) {
    const response = await fetch(`${API_BASE}/checklist/history/${days}`);
    return response.json();
}

export async function getNote(date) {
    const response = await fetch(`${API_BASE}/checklist/notes/${date}`);
    return response.json();
}

export async function saveNote(date, content) {
    const response = await fetch(`${API_BASE}/checklist/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, content }),
    });
    return response.json();
}
