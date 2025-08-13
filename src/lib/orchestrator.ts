// src/lib/orchestrator.ts

import type { BookRequest, BookData, Chapter } from '../types';
import { callModel } from './models';

function generateCoverPrompt(request: BookRequest): string {
  return `An illustrated cover for "The ${request.theme} Chronicles", a ${request.genre} book with a ${request.tone || 'adventurous'} tone.`;
}

export async function generateBook(
  request: BookRequest,
  mode: 'fast' | 'creative',
  onProgress?: (index: number) => void
): Promise<BookData> {
  const model = request.model || 'openai/gpt-oss-20b';
  const chapters: Chapter[] = [];

  const chapterCount = request.chapters || 5;
  const words = request.wordsPerChapter || 500;
  const tone = request.tone || 'adventurous';
  const namingStyle = request.advancedOptions?.namingStyle || 'descriptive';
  const strictness = request.advancedOptions?.outlineStrictness ?? 3;
  const continuity = request.advancedOptions?.characterContinuity ?? true;

  // ✅ Step 1: Generate chapter titles
  const outlinePrompt = `
You are an expert ${request.genre} author. Create an outline for a book titled "The ${request.theme} Chronicles" with a ${tone} tone.
List ${chapterCount} chapter titles only. Use ${namingStyle} naming.
Outline strictness level: ${strictness} (1 = loose, 5 = tightly structured).
Return only the list of chapter titles.
  `;

  const rawTitles = await callModel({ model, prompt: outlinePrompt });
  const chapterTitles = rawTitles
    .split('\n')
    .map(line => line.replace(/^[-*\d.]+\s*/, '').trim())
    .filter(Boolean);

  // ✅ Step 2: Generate each chapter
  for (let i = 0; i < chapterTitles.length; i++) {
    if (onProgress) onProgress(i + 1);

    const chapterPrompt = request.customPrompt
      ? request.customPrompt.replace('{title}', chapterTitles[i])
      : `
You are writing a ${request.genre} book titled "The ${request.theme} Chronicles" with a ${tone} tone.
Write a short, vivid chapter titled "${chapterTitles[i]}".
Target length: ~${words} words.
${continuity ? 'Maintain emotional depth and character continuity across chapters.' : ''}
Return only the chapter content.
      `;

    const content = await callModel({ model, prompt: chapterPrompt });
    chapters.push({ title: chapterTitles[i], content });
  }

  // ✅ Step 3: Generate book title
  const titlePrompt = `Suggest a compelling title for a ${request.genre} book themed around ${request.theme} with a ${tone} tone.`;
  const rawTitle = await callModel({ model, prompt: titlePrompt });
  const title = rawTitle.replace(/^Title:\s*/i, '').trim();

  // ✅ Step 4: Generate cover prompt
  const cover = generateCoverPrompt(request);

  return { title, chapters, cover };
}