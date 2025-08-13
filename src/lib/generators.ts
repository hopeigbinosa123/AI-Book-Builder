// src/lib/generators.ts
import { tryModels } from './models';
import type { BookRequest } from '../types';

export async function generateOutline(request: BookRequest): Promise<string[]> {
  const prompt = `
You are an expert ${request.genre} author. Create an outline for a book titled "The ${request.theme} Chronicles" with a ${request.tone} tone.
List ${request.chapters} chapter titles only. Use ${request.advancedOptions?.namingStyle || 'descriptive'} naming.
Return only the list of chapter titles.
`;

  const raw = await tryModels({
    models: ['openchat/openchat-3.5-0106', 'mistralai/mistral-7b'],
    prompt,
  });

  return raw
    .split('\n')
    .map(line => line.replace(/^[-*\d.]+\s*/, '').trim())
    .filter(Boolean);
}

export async function generateChapterContent({
  theme,
  genre,
  tone,
  chapterTitle,
  previousTitles,
}: {
  theme: string;
  genre: string;
  tone: string;
  chapterTitle: string;
  previousTitles: string[];
}): Promise<string> {
  const prompt = `
You are writing a ${genre} book titled "The ${theme} Chronicles" with a ${tone} tone.
Write the full content for the chapter titled "${chapterTitle}".
Previous chapters: ${previousTitles.join(', ')}
Ensure character continuity and emotional depth. Use vivid scenes and dialogue.
Return only the chapter content.
`;

  return await tryModels({
    models: ['openchat/openchat-3.5-0106', 'mistralai/mistral-7b'],
    prompt,
  });
}

export async function generateTitle(theme: string, genre: string, tone: string): Promise<string> {
  const prompt = `Suggest a compelling title for a ${genre} book themed around ${theme} with a ${tone} tone.`;

  const raw = await tryModels({
    models: ['openchat/openchat-3.5-0106', 'mistralai/mistral-7b'],
    prompt,
  });

  return raw.replace(/^Title:\s*/i, '').trim();
}