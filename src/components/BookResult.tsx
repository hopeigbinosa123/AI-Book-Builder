// src/components/BookResult.tsx
import React from 'react';
import DownloadOptions from './DownloadOptions';

interface BookResultProps {
  title: string;
  chapters: string[];
}

const BookResult: React.FC<BookResultProps> = ({ title, chapters }) => {
  return (
    <div className="book-result">
      <h2 className="book-result__heading">📚 Your Book Preview</h2>

      <div className="book-result__section">
        <span className="book-result__label">Title:</span> {title}
      </div>

      <div className="book-result__section">
        <span className="book-result__label">Chapters:</span>
        <ul className="book-result__chapters">
          {chapters.map((ch, idx) => (
            <li key={idx}>
              <strong>Chapter {idx + 1}:</strong> {ch}
            </li>
          ))}
        </ul>
      </div>

      <DownloadOptions title={title} chapters={chapters} />
    </div>
  );
};

export default BookResult;