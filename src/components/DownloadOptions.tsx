// src/components/DownloadOptions.tsx
import React from 'react';

interface DownloadOptionsProps {
  title: string;
  chapters: string[];
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ title, chapters }) => {
  const handleDownload = (format: 'pdf' | 'docx') => {
    // 🧪 Placeholder logic — replace with real export later
    const content = `${title}\n\n${chapters.join('\n\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.${format === 'pdf' ? 'pdf' : 'docx'}`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="download-options">
      <h3 className="download-options__heading">📥 Export Your Book</h3>
      <div className="download-options__buttons">
        <button onClick={() => handleDownload('pdf')} className="button button--secondary">
          Download PDF
        </button>
        <button onClick={() => handleDownload('docx')} className="button button--secondary">
          Download Word
        </button>
      </div>
    </div>
  );
};

export default DownloadOptions;