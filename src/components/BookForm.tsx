// src/components/BookForm.tsx

import React, { useState } from 'react';
import type { BookRequest } from '../types/types';

interface BookFormProps {
  onSubmit: (formData: BookRequest) => Promise<void>;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const [theme, setTheme] = useState('');
  const [genre, setGenre] = useState('');
  const [tone, setTone] = useState('');
  const [chapters, setChapters] = useState(5);
  const [wordsPerChapter, setWordsPerChapter] = useState(500);
  const [customPrompt, setCustomPrompt] = useState('');
  const [model, setModel] = useState('openai/gpt-oss-20b');
  const [namingStyle, setNamingStyle] = useState('descriptive');
  const [outlineStrictness, setOutlineStrictness] = useState(3);
  const [characterContinuity, setCharacterContinuity] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!theme || !genre) {
      setError('Please fill in both theme and genre.');
      return;
    }

    const request: BookRequest = {
      theme,
      genre,
      tone,
      chapters,
      wordsPerChapter,
      customPrompt,
      model,
      advancedOptions: {
        namingStyle,
        outlineStrictness,
        characterContinuity,
      },
    };

    setSubmitting(true);
    try {
      await onSubmit(request);
    } catch (err) {
      console.error('Form submission failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <label>
        Theme:
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g. Time Travel, Lost Memories"
        />
      </label>

      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="e.g. Sci-Fi, Fantasy, Romance"
        />
      </label>

      <label>
        Tone:
        <input
          type="text"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="e.g. Epic, Whimsical, Dark"
        />
      </label>

      <label>
        Chapters:
        <input
          type="number"
          min={1}
          max={50}
          value={chapters}
          onChange={(e) => setChapters(Number(e.target.value))}
        />
      </label>

      <label>
        Words per Chapter:
        <input
          type="number"
          min={100}
          max={5000}
          value={wordsPerChapter}
          onChange={(e) => setWordsPerChapter(Number(e.target.value))}
        />
      </label>

      <label>
        Custom Prompt (optional):
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Override chapter generation with your own prompt. Use {title} to insert chapter title."
        />
      </label>

      <label>
        Model:
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="anthropic/claude-3-haiku">Claude 3 Haiku</option>
        <option value="deepseek/deepseek-r1-0528-qwen3-8b:free">DeepSeek R1 </option>
        <option value="openai/gpt-oss-20b">GPT-OSS 20B</option>
      </select>


      </label>

      <label>
        Naming Style:
        <select value={namingStyle} onChange={(e) => setNamingStyle(e.target.value)}>
          <option value="descriptive">Descriptive</option>
          <option value="poetic">Poetic</option>
          <option value="mysterious">Mysterious</option>
          <option value="minimalist">Minimalist</option>
        </select>
      </label>

      <label>
        Outline Strictness:
        <input
          type="range"
          min={1}
          max={5}
          value={outlineStrictness}
          onChange={(e) => setOutlineStrictness(Number(e.target.value))}
        />
        <span>{outlineStrictness}</span>
      </label>

      <label>
        Character Continuity:
        <input
          type="checkbox"
          checked={characterContinuity}
          onChange={(e) => setCharacterContinuity(e.target.checked)}
        />
      </label>

      {error && <p className="form-error">🚨 {error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Generating...' : 'Generate Book'}
      </button>
    </form>
  );
};

export default BookForm;