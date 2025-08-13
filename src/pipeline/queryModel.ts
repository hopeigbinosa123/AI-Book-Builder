// src/pipeline/queryModel.ts

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function queryModel(model: string, prompt: string): Promise<string> {
  console.log(`🔍 Calling model: ${model}`);
  console.log(`📝 Prompt: ${prompt}`);

  const payload = {
    model,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ],
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ OpenRouter error: ${response.status} ${response.statusText}`);
    console.error(`📄 Response body: ${errorText}`);
    throw new Error(`Model ${model} failed: ${response.statusText}`);
  }

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content;

  if (!message) {
    console.error('⚠️ No message content returned:', data);
    throw new Error(`No response from model ${model}`);
  }

  return message;
}

// ✅ Optional fallback wrapper
export async function multiModelQuery(prompt: string): Promise<string> {
  const models = [
    'meta-llama/llama-3-8b-instruct',
    'mistral:7b',
    'nous-hermes:13b',
  ];

  for (const model of models) {
    try {
      return await queryModel(model, prompt);
    } catch (err) {
      console.warn(`⚠️ Model ${model} failed:`, err);
    }
  }

  throw new Error('All models failed to respond.');
}
