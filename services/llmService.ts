
/**
 * Core Service for OpenRouter interactions.
 * Uses the platform-provided process.env.API_KEY.
 * OpenRouter documentation: https://openrouter.ai/docs
 */

export const sendMessageToLLM = async (
  message: string,
  model: string = 'google/gemini-2.0-flash-001',
  systemInstruction?: string,
  temperature: number = 0.7,
  context?: string,
  apiKey?: string
): Promise<string> => {
  try {
    const fullSystemInstruction = systemInstruction 
      ? `${systemInstruction}${context ? `\n\nAdditional Knowledge Context:\n${context}` : ''}`
      : `You are a helpful AI assistant.${context ? `\n\nAdditional Knowledge Context:\n${context}` : ''}`;

    // For security and cross-environment compatibility, call the local proxy
    // endpoint `/api/openrouter` (server should forward to OpenRouter using
    // the server-side OPENROUTER_API_KEY). The server expects the same
    // OpenRouter-style body (model, messages, temperature).

    const proxyBody = {
      model,
      messages: [
        { role: 'system', content: fullSystemInstruction },
        { role: 'user', content: message }
      ],
      temperature
    };

    const response = await fetch('/api/openrouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proxyBody)
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("API_KEY_UNAUTHORIZED");
      }
      
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: { message: errorText } };
      }
      
      throw new Error(errorData.error?.message || `OpenRouter Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response content received.";
  } catch (error: any) {
    console.error("LLM Service Fault:", error);
    throw error;
  }
};
