import { useState, useEffect, useRef } from 'react';
import { dietPlan, getTotalItems } from './data/dietPlan';
import { getQuoteForDate } from './data/quotes';
import { getCompletedItems, toggleItem, getNote, saveNote } from './api/api';
import './App.css';

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function App() {
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [completedItems, setCompletedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState('');
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [savedNote, setSavedNote] = useState('');
    const noteRef = useRef(null);

    const totalItems = getTotalItems();
    const completedCount = completedItems.length;
    const progressPercent = Math.round((completedCount / totalItems) * 100);
    const quote = getQuoteForDate(selectedDate);

    useEffect(() => {
        loadData();
    }, [selectedDate]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [completed, noteData] = await Promise.all([
                getCompletedItems(selectedDate),
                getNote(selectedDate)
            ]);
            setCompletedItems(completed);
            setNote(noteData.content || '');
            setSavedNote(noteData.content || '');
            setIsEditingNote(false);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setLoading(false);
    };

    const handleToggle = async (itemId) => {
        const isCompleted = completedItems.includes(itemId);
        const newCompleted = isCompleted
            ? completedItems.filter(id => id !== itemId)
            : [...completedItems, itemId];

        setCompletedItems(newCompleted);

        try {
            await toggleItem(itemId, selectedDate, !isCompleted);
        } catch (error) {
            console.error('Error toggling item:', error);
            setCompletedItems(completedItems);
        }
    };

    const handleSaveNote = async () => {
        try {
            await saveNote(selectedDate, note);
            setSavedNote(note);
            setIsEditingNote(false);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleCancelNote = () => {
        setNote(savedNote);
        setIsEditingNote(false);
    };

    const handleEditNote = () => {
        setIsEditingNote(true);
        setTimeout(() => noteRef.current?.focus(), 0);
    };

    const isToday = selectedDate === getToday();

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="app">
            <header>
                <div className="header-top">
                    <h1>Diet Tracker</h1>
                    <div className="user-info">Aditya Singh</div>
                </div>
                <div className="date-nav">
                    <button
                        onClick={() => {
                            const d = new Date(selectedDate);
                            d.setDate(d.getDate() - 1);
                            setSelectedDate(d.toISOString().split('T')[0]);
                        }}
                    >
                        &lt;
                    </button>
                    <span className="current-date">{formatDate(selectedDate)}</span>
                    <button
                        onClick={() => {
                            const d = new Date(selectedDate);
                            d.setDate(d.getDate() + 1);
                            setSelectedDate(d.toISOString().split('T')[0]);
                        }}
                    >
                        &gt;
                    </button>
                    {!isToday && (
                        <button className="today-btn" onClick={() => setSelectedDate(getToday())}>
                            Today
                        </button>
                    )}
                </div>
            </header>

            {/* Motivation Quote Section */}
            <div className="motivation-card">
                <div className="quote-icon">✨</div>
                <p className="quote-text">"{quote.quote}"</p>
                <p className="quote-author">— {quote.author}</p>
            </div>

            {/* Daily Progress */}
            <div className="summary-card">
                <div className="summary-header">
                    <h2>Daily Progress</h2>
                    <span className="summary-count">{completedCount} / {totalItems}</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="progress-text">
                    {progressPercent === 100
                        ? 'Great job! All tasks completed!'
                        : `${progressPercent}% completed`}
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    {/* Checklist */}
                    <div className="checklist">
                        {dietPlan.map((section) => (
                            <div key={section.id} className="section">
                                <div className="section-header">
                                    <span className="section-time">{section.time}</span>
                                    <span className="section-title">{section.title}</span>
                                </div>
                                <div className="section-items">
                                    {section.items.map((item) => {
                                        const isChecked = completedItems.includes(item.id);
                                        return (
                                            <label
                                                key={item.id}
                                                className={`checklist-item ${isChecked ? 'checked' : ''}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleToggle(item.id)}
                                                />
                                                <span className="checkmark"></span>
                                                <div className="item-content">
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-desc">{item.description}</span>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Daily Notes Section */}
                    <div className="notes-card">
                        <div className="notes-header">
                            <h3>Daily Notes</h3>
                            {!isEditingNote && (
                                <button className="edit-btn" onClick={handleEditNote}>
                                    {savedNote ? 'Edit' : 'Add Note'}
                                </button>
                            )}
                        </div>

                        {isEditingNote ? (
                            <div className="notes-edit">
                                <textarea
                                    ref={noteRef}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="How did today go? Any observations, challenges, or wins to note..."
                                    rows={4}
                                />
                                <div className="notes-actions">
                                    <button className="save-btn" onClick={handleSaveNote}>
                                        Save
                                    </button>
                                    <button className="cancel-btn" onClick={handleCancelNote}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="notes-display">
                                {savedNote ? (
                                    <p>{savedNote}</p>
                                ) : (
                                    <p className="notes-empty">No notes for this day. Tap "Add Note" to record your thoughts.</p>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
