
/**
 * Legacy service wrapper now routing to OpenRouter.
 * This ensures all parts of the app use the same unified LLM logic.
 */
import { sendMessageToLLM } from './llmService';

export const sendMessageToGemini = async (
  message: string,
  model?: string,
  systemInstruction?: string,
  temperature: number = 0.7
): Promise<string> => {
  try {
    // Redirecting to OpenRouter service which uses the system-injected process.env.API_KEY
    return await sendMessageToLLM(
      message,
      model,
      systemInstruction,
      temperature
    );
  } catch (error) {
    console.error("OpenRouter via GeminiService Error:", error);
    throw error;
  }
};
