// src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__icon" />
      <p className="loading-spinner__text">⏳ Generating your book... hang tight!</p>
    </div>
  );
};

export default LoadingSpinner;