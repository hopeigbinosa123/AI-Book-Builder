// src/pipeline/bookPipeline.ts
import type { BookRequest } from '../types/types';

export interface Chapter {
  title: string;
  content: string;
}

export interface BookData {
  title: string;
  chapters: Chapter[];
  cover: string;
}

/**
 * Simulates book generation using AI.
 * @param request - BookRequest object with user input
 * @param mode - 'fast' or 'creative'
 * @param onProgress - optional callback for chapter progress
 * @returns BookData object
 */
export async function generateBook(
  request: BookRequest,
  mode: 'fast' | 'creative',
  onProgress?: (index: number) => void
): Promise<BookData> {
  const {
    theme,
    genre,
    tone = 'Neutral',
    chapters = 5,
    wordsPerChapter = 1000,
    customPrompt = '',
    advancedOptions,
  } = request;

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const generatedChapters: Chapter[] = [];

  for (let i = 0; i < chapters; i++) {
    if (onProgress) onProgress(i + 1);
    await delay(mode === 'fast' ? 200 : 600); // Simulate generation time

    generatedChapters.push({
      title: `Chapter ${i + 1}: ${genre} Journey`,
      content: `This is a ${tone.toLowerCase()} chapter about ${theme.toLowerCase()} in a ${genre.toLowerCase()} setting.`,
    });
  }

  const coverPrompt = `An illustrated cover for "The ${theme} Chronicles", a ${genre} book with a ${tone} tone. ${
    customPrompt ? `Include: ${customPrompt}` : ''
  }`;

  return {
    title: `The ${theme} Chronicles`,
    chapters: generatedChapters,
    cover: coverPrompt,
  };
}