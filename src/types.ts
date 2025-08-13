// src/types.ts

export interface BookRequest {
  theme: string;
  genre: string;
  tone?: string;
  chapters: number;
  advancedOptions?: {
    namingStyle?: string;
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