// src/components/BookPreview.tsx
import React from 'react';
import '../styles/BookPreview.css'; // Adjust the path as necessary

type BookPreviewProps = {
  title: string;
  chapters: string[];
  coverPrompt: string;
};

const BookPreview: React.FC<BookPreviewProps> = ({ title, chapters, coverPrompt }) => {
  return (
    <div className="book-preview">
      <h2 className="book-title">{title}</h2>

      <ul className="chapter-list">
        {chapters.map((chapter, idx) => (
          <li key={idx} className="chapter-item">
            {chapter}
          </li>
        ))}
      </ul>

      <p className="cover-prompt">
        <strong>Cover Prompt:</strong> {coverPrompt}
      </p>
    </div>
  );
};

export default BookPreview;