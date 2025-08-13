// src/components/LiveEstimate.tsx
import React from 'react';
import type { BookRequest } from '../types/types';

interface LiveEstimateProps {
  formData: BookRequest;
}

const LiveEstimate: React.FC<LiveEstimateProps> = ({ formData }) => {
  const chapters = formData.chapters ?? 5;
  const wordsPerChapter = formData.wordsPerChapter ?? 1000;
  const totalWords = chapters * wordsPerChapter;

  // 🧠 Estimate: 1 second per 100 words
  const estimatedSeconds = Math.ceil(totalWords / 100);
  const estimatedTime = estimatedSeconds < 60
    ? `${estimatedSeconds} seconds`
    : `${Math.ceil(estimatedSeconds / 60)} minute${estimatedSeconds >= 120 ? 's' : ''}`;

  // 🧠 Optional complexity score
  const complexityScore = (() => {
    let score = 1;
    if (formData.tone?.toLowerCase() === 'dark' || formData.tone?.toLowerCase() === 'whimsical') score += 1;
    if (formData.advancedOptions?.characterContinuity) score += 1;
    if ((formData.advancedOptions?.outlineStrictness ?? 0) > 70) score += 1;
    return score;
  })();

  return (
    <div className="live-estimate">
      <h2 className="live-estimate__heading">📊 Live Estimate</h2>
      <p><strong>Total Words:</strong> {totalWords.toLocaleString()}</p>
      <p><strong>Estimated Generation Time:</strong> {estimatedTime}</p>
      <p><strong>Complexity Score:</strong> {complexityScore} / 5</p>
    </div>
  );
};

export default LiveEstimate;