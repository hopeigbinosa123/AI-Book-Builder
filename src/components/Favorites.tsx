// src/components/Favorites.tsx
import React, { useEffect, useState } from 'react';

interface PromptItem {
  title: string;
  prompt: string;
  favorite?: boolean;
  note?: string;
}

const LOCAL_KEY = 'promptHistory';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<PromptItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const all: PromptItem[] = JSON.parse(stored);
      setFavorites(all.filter((item) => item.favorite));
    }
  }, []);

  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div className="favorites">
      <h3>⭐ Favorite Prompts</h3>
      <ul>
        {favorites.map((item, idx) => (
          <li key={idx}>
            <strong>{item.title}</strong>
            <pre>{item.prompt}</pre>
            {item.note && <p><em>Note:</em> {item.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;