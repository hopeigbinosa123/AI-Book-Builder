// src/lib/models.ts

export async function callModel({
  model,
  prompt,
}: {
  model: string;
  prompt: string;
}): Promise<string> {
  console.log(`🔍 Sending to ${model}:`, prompt);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Model ${model} failed:`, errorText);
    throw new Error(`Model ${model} failed`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

export async function tryModels({
  models,
  prompt,
}: {
  models: string[];
  prompt: string;
}): Promise<string> {
  for (const model of models) {
    try {
      const response = await callModel({ model, prompt });
      if (response) return response;
    } catch (err) {
      console.warn(`⚠️ Model ${model} failed:`, err);
    }
  }
  throw new Error('All models failed to generate a response.');
}
