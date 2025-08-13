// src/api/generateBook.ts

export async function generateBook({
  theme,
  genre,
  prompt,
}: {
  theme: string;
  genre: string;
  prompt?: string;
}) {
  const title = prompt
    ? `Inspired by "${prompt}": The ${theme} Saga`
    : `The ${theme} Saga`;

  const chapters = [
    `Chapter 1: ${genre} Begins`,
    `Chapter 2: Trials of ${theme}`,
    `Chapter 3: The Rift`,
    `Chapter 4: Secrets Unveiled`,
    `Chapter 5: Final Reckoning`,
  ];

  const coverPrompt = prompt
    ? `A surreal ${genre.toLowerCase()} scene inspired by "${prompt}", infused with ${theme.toLowerCase()} motifs.`
    : `A surreal ${genre.toLowerCase()} scene infused with ${theme.toLowerCase()} motifs.`;

  await new Promise((r) => setTimeout(r, 1000)); // Simulate latency
  return { title, chapters, coverPrompt };
}