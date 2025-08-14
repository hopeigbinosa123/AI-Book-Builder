export interface BookRequest {
  theme: string;
  genre: string;
  tone?: string;
  chapters?: number;
  wordsPerChapter?: number;
  customPrompt?: string;
  model?: string;
  advancedOptions?: {
    namingStyle?: string;
    outlineStrictness?: number;
    characterContinuity?: boolean;
  };
}

export interface Chapter {
  title: string;
  content: string;
}

export interface BookData {
  title: string;
  chapters: Chapter[];
  cover: string;
}
