import React, { useState, useEffect } from 'react';

interface PromptItem {
  title: string;
  prompt: string;
  favorite?: boolean;
  note?: string;
}

interface PromptHistoryProps {
  history: PromptItem[];
  onReuse: (prompt: string) => void;
}

const LOCAL_KEY = 'promptHistory';

const PromptHistory: React.FC<PromptHistoryProps> = ({ history, onReuse }) => {
  const [items, setItems] = useState<PromptItem[]>(history);

  useEffect(() => {
    setItems(history);
  }, [history]);

  // Save updates to localStorage
  const updateItem = (index: number, updates: Partial<PromptItem>) => {
    const updated = [...items];
    updated[index] = { ...updated[index], ...updates };
    setItems(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  if (items.length === 0) return null;

  return (
    <div className="prompt-history">
      <h4>🕘 Prompt History</h4>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <strong>{item.title}</strong>
            <pre>{item.prompt}</pre>

            <button onClick={() => onReuse(item.prompt)}>↩️ Reuse Prompt</button>
            <button onClick={() => updateItem(idx, { favorite: !item.favorite })}>
              {item.favorite ? '💔 Unfavorite' : '⭐ Save to Favorites'}
            </button>

            <textarea
              placeholder="Add a note..."
              value={item.note || ''}
              onChange={(e) => updateItem(idx, { note: e.target.value })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptHistory;