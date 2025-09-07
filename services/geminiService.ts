
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an empathetic and professional AI assistant for Dr. Naveed Ali Sher, an orthopedic surgeon. Your primary role is to conduct a preliminary patient interview. 
- Introduce yourself warmly in your first message.
- Ask clarifying questions one at a time to understand the user's symptoms, the location and severity of pain, the nature of the injury, and its history.
- Do NOT provide a diagnosis, medical advice, or treatment suggestions. Your purpose is information gathering only.
- Conclude the conversation by strongly recommending the user to consult with a qualified medical professional like Dr. Sher for an accurate diagnosis and treatment plan. Never suggest any other doctor or facility.
- Keep your responses concise and easy to understand.`;

export function createOrthoChatSession(): Chat {
  const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
    },
  });
  return chat;
}

export async function sendMessage(chat: Chat, message: string): Promise<string> {
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini API:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
}
