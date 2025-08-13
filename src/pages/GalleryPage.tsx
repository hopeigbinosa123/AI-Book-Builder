// src/pages/GalleryPage.tsx
import React from "react";
import "./GalleryPage.css";

const GalleryPage: React.FC = () => {
  // Placeholder data — replace with real saved books later
  const savedBooks = [
    { title: "The Time Travel Chronicles", cover: "🕰️", id: 1 },
    { title: "Echoes of the Fallen Star‑Dust", cover: "🌌", id: 2 },
    { title: "Reaping Time’s Shadow", cover: "⏳", id: 3 },
  ];

  return (
    <main className="gallery">
      <h1>Your Book Gallery 📚</h1>
      <p>Explore your saved books and regenerate them anytime.</p>

      <div className="gallery__grid">
        {savedBooks.map((book) => (
          <div key={book.id} className="gallery__card">
            <div className="gallery__cover">{book.cover}</div>
            <h3>{book.title}</h3>
            <button className="gallery__remix">🔁 Remix</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GalleryPage;