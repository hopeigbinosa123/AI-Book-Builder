export default async function handler(req: Request): Promise<Response> {
  const { model, prompt } = await req.json();

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    return new Response("Missing API key", { status: 500 });
  }

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

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content;

  return Response.json({ message });
}
