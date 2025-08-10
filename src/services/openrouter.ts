// src/services/openrouter.ts

/**
 * Type definition for a single message in the OpenRouter format.
 */
interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Type definition for the API request payload.
 */
interface OpenRouterRequest {
  model: string;
  messages: ChatMessage[];
}

/**
 * Type definition for the API response.
 */
interface OpenRouterResponse {
  choices?: {
    message?: {
      content: string;
    };
  }[];
}

/**
 * Sends a prompt to a specific OpenRouter model and returns the response.
 * @param model - The model ID (e.g. "openai/gpt-oss-20b")
 * @param prompt - The user prompt to send
 * @param system - Optional system prompt to guide the model
 */
export async function queryModel(
  model: string,
  prompt: string,
  system?: string
): Promise<string> {
  const messages: ChatMessage[] = [];

  if (system) {
    messages.push({ role: "system", content: system });
  }

  messages.push({ role: "user", content: prompt });

  const payload: OpenRouterRequest = {
    model,
    messages
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yourdomain.com", // Replace with your deployed domain
        "X-Title": "AI Book Builder"
      },
      body: JSON.stringify(payload)
    });

    const data: OpenRouterResponse = await response.json();
    return data.choices?.[0]?.message?.content ?? "No response";
  } catch (error) {
    console.error("OpenRouter error:", error);
    return "Error contacting model.";
  }
}
