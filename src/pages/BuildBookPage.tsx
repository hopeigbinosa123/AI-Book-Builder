import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookResult from '../components/BookResult';
import AdvancedSettings from '../components/AdvancedSettings';
import LiveEstimate from '../components/LiveEstimate';
import LoadingSpinner from '../components/LoadingSpinner';
import type { BookRequest, Chapter } from '../types';
import type { AdvancedOptions } from '../components/AdvancedSettings';
import { generateBook } from '../pipeline/bookPipeline';

const BuildBookPage: React.FC = () => {
  const [bookRequest, setBookRequest] = useState<BookRequest | null>(null);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({
    namingStyle: 'classic',
    outlineStrictness: 50,
    characterContinuity: true,
  });

  const mode = 'fast'; // Remove unused setMode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const handleGenerate = async (formData: BookRequest) => {
    const fullRequest: BookRequest = {
      ...formData,
      advancedOptions,
    };

    setBookRequest(fullRequest);
    setLoading(true);
    setError(null);

    try {
  const result = await generateBook(fullRequest, mode);
  setTitle(result.title);
  setChapters(result.chapters);
    } catch (err) {
      setError('Something went wrong while generating your book.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="build-book-page">
      <h1 className="build-book-page__heading">🛠️ Chronowriter: Build Your Book</h1>

      <BookForm onSubmit={handleGenerate} />
      <AdvancedSettings settings={advancedOptions} onChange={setAdvancedOptions} />

            {bookRequest && <LiveEstimate formData={bookRequest} />}

      {loading && <LoadingSpinner />}
      {error && <p className="build-book-page__error">{error}</p>}

      {!loading && title && chapters.length > 0 && (
        <BookResult title={title} chapters={chapters.map(ch => ch.title)} />
      )}
    </div>
  );
};

export default BuildBookPage;
