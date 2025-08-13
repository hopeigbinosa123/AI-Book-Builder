// src/pipeline/modelConfig.ts

export const modelConfig = {
  fast: {
    title: ['mistral:instruct'],
    outline: ['gpt-3.5-turbo'],
    expand: ['gemma:7b'],
    cover: ['mistral:instruct'],
    style: ['gemma:7b'],
  },
  creative: {
    title: ['openchat:7b', 'gpt-3.5-turbo'],
    outline: ['claude-2', 'gpt-3.5-turbo'],
    expand: ['claude-2'],
    cover: ['gpt-3.5-turbo'],
    style: ['claude-2'],
  },
};
