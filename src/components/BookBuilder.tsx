// src/components/BookBuilder.tsx
import React, { useState, useEffect } from 'react';
import BookForm from './BookForm';
import ChapterList from './ChapterList';
import PromptTips from './PromptTips';
import PromptHistory from './PromptHistory';
import type { BookData, BookRequest } from '../types';
import { generateBook } from '../lib/orchestrator';
import '../styles/bookBuilder.css';
import '../App.css';

const LOCAL_KEY = 'promptHistory';

const BookBuilder: React.FC = () => {
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [mode, setMode] = useState<'fast' | 'creative'>('fast');
  const [lastRequest, setLastRequest] = useState<BookRequest | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState(false);
  const [promptHistory, setPromptHistory] = useState<
    { title: string; prompt: string }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setPromptHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(promptHistory));
  }, [promptHistory]);

  const handleBookRequest = async (formData: BookRequest): Promise<void> => {
  setLoading(true);
  setBook(null);
  setChapterProgress(0);
  setLastRequest(formData);
  setCopied(false);
  setError(null);

  try {
    const data = await generateBook(formData, mode, (index) => {
      setChapterProgress(index);
      if (debug) console.log(`✅ Chapter ${index} generated`);
    });

    setBook(data);
    setPromptHistory((prev) => [
      ...prev,
      { title: data.title, prompt: data.cover },
    ]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ Book generation failed:', err.message);
      setError('Something went wrong while generating your book. Please try again or switch modes.');
    } else {
      console.error('❌ Unknown error:', err);
      setError('An unexpected error occurred.');
    }
  } finally {
    setLoading(false);
  }
};


  const copyToClipboard = () => {
    if (book?.cover) {
      navigator.clipboard.writeText(book.cover);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadPrompt = (text: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book?.title || 'cover_prompt'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="book-builder">
      <label htmlFor="mode-select">
        Mode:
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'fast' | 'creative')}
        >
          <option value="fast">⚡ Fast</option>
          <option value="creative">🎨 Creative</option>
        </select>
      </label>

      <label htmlFor="debug-toggle">
        <input
          type="checkbox"
          id="debug-toggle"
          checked={debug}
          onChange={() => setDebug(!debug)}
        />
        🐛 Debug Mode
      </label>

      <BookForm onSubmit={handleBookRequest} />

      {loading && (
        <p>
          Generating your book...{' '}
          {chapterProgress > 0 && `Expanded ${chapterProgress} chapter${chapterProgress > 1 ? 's' : ''}`}
        </p>
      )}

      {error && (
        <div className="error-message">
                    <p>🚨 {error}</p>
          <button onClick={() => lastRequest && handleBookRequest(lastRequest)}>
            🔁 Retry Last Request
          </button>
        </div>
      )}

      {book && (
        <div className="book-preview">
          <h2>{book.title}</h2>
          <ChapterList chapters={book.chapters} />

          <div className="cover-prompt">
            <h3>🎨 Cover Prompt</h3>
            <p>
              Use this prompt in your favorite image generation tool to create a high-quality book cover:
            </p>
            <pre className="cover-text">{book.cover}</pre>

            <button onClick={copyToClipboard}>
              📋 {copied ? 'Copied!' : 'Copy Prompt'}
            </button>

            <button onClick={() => downloadPrompt(book.cover)}>
              📁 Download Prompt (.txt)
            </button>

            <div className="image-tools">
              <h4>Popular Image Generation Tools</h4>
              <ul>
                <li><a href="https://www.midjourney.com/" target="_blank" rel="noopener noreferrer">Midjourney</a></li>
                <li><a href="https://openart.ai/" target="_blank" rel="noopener noreferrer">OpenArt</a></li>
                <li><a href="https://www.craiyon.com/" target="_blank" rel="noopener noreferrer">Craiyon</a></li>
                <li><a href="https://playgroundai.com/" target="_blank" rel="noopener noreferrer">Playground AI</a></li>
                <li><a href="https://www.artbreeder.com/" target="_blank" rel="noopener noreferrer">Artbreeder</a></li>
              </ul>
            </div>

            <PromptTips />
          </div>

          {lastRequest && (
            <button onClick={() => handleBookRequest(lastRequest)}>
              🔁 Regenerate Book
            </button>
          )}
        </div>
      )}

      <PromptHistory
        history={promptHistory}
        onReuse={(prompt) => {
          navigator.clipboard.writeText(prompt);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      />
    </div>
  );
};

export default BookBuilder;
