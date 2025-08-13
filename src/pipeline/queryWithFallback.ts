// src/pipeline/queryWithFallback.ts
import { modelConfig } from './modelConfig';
import { queryModel } from './queryModel';

export async function queryWithFallback(
  stage: keyof typeof modelConfig['fast'],
  prompt: string,
  mode: 'fast' | 'creative' = 'fast'
): Promise<string> {
  const models = modelConfig[mode][stage];

  for (const model of models) {
    try {
      const result = await queryModel(model, prompt);
      return result;
    } catch (error) {
      console.warn(`Model ${model} failed for stage "${stage}" in ${mode} mode:`, error);
    }
  }

  throw new Error(`All models failed for stage "${stage}" in ${mode} mode`);
}
