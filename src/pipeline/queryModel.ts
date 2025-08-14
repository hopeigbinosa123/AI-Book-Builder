export async function queryModel(model: string, prompt: string): Promise<string> {
  console.log(`🔍 Calling model: ${model}`);
  console.log(`📝 Prompt: ${prompt}`);

  const response = await fetch('/api/queryModel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, prompt }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ API error: ${response.status} ${response.statusText}`);
    console.error(`📄 Response body: ${errorText}`);
    throw new Error(`Model ${model} failed: ${response.statusText}`);
  }

  const { message } = await response.json();

  if (!message) {
    console.error('⚠️ No message content returned from API');
    throw new Error(`No response from model ${model}`);
  }

  return message;
}

// ✅ Fallback wrapper stays the same
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
