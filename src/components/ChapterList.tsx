// src/components/ChapterList.tsx
import React from 'react';
import type { Chapter } from '../pipeline/bookPipeline';

interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  return (
    <div className="chapter-list">
      <h3>Chapters</h3>
      <ul>
        {chapters.map((chapter, idx) => (
          <li key={idx}>
            <strong>{chapter.title}</strong>
            <p>{chapter.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;