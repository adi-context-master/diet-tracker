// localStorage-based storage for Vercel deployment
// Data persists in the browser

const STORAGE_KEYS = {
    CHECKLIST: 'diet-tracker-checklist',
    NOTES: 'diet-tracker-notes'
};

function getStorageData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

function setStorageData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Storage error:', e);
    }
}

export async function getCompletedItems(date) {
    const data = getStorageData(STORAGE_KEYS.CHECKLIST);
    return data[date] || [];
}

export async function toggleItem(item_id, date, completed) {
    const data = getStorageData(STORAGE_KEYS.CHECKLIST);

    if (!data[date]) {
        data[date] = [];
    }

    if (completed) {
        if (!data[date].includes(item_id)) {
            data[date].push(item_id);
        }
    } else {
        data[date] = data[date].filter(id => id !== item_id);
    }

    setStorageData(STORAGE_KEYS.CHECKLIST, data);
    return { success: true };
}

export async function getHistory(days = 7) {
    const data = getStorageData(STORAGE_KEYS.CHECKLIST);
    const history = [];

    // Get dates sorted in descending order
    const dates = Object.keys(data).sort().reverse().slice(0, days);

    for (const date of dates) {
        history.push({
            check_date: date,
            completed_count: data[date].length
        });
    }

    return history;
}

export async function getNote(date) {
    const data = getStorageData(STORAGE_KEYS.NOTES);
    return { content: data[date] || '' };
}

export async function saveNote(date, content) {
    const data = getStorageData(STORAGE_KEYS.NOTES);

    if (content && content.trim()) {
        data[date] = content.trim();
    } else {
        delete data[date];
    }

    setStorageData(STORAGE_KEYS.NOTES, data);
    return { success: true };
}
