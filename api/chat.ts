const { GoogleGenAI } = require("@google/genai");

interface Message {
    id: number;
    role: 'user' | 'model';
    text: string;
}

// Maps the frontend message history to the format required by the generateContent API
function mapHistoryToContents(history: Message[]) {
    return history.map(message => ({
        role: message.role,
        parts: [{ text: message.text }],
    }));
}

const systemInstruction = `You are an empathetic and professional AI assistant for Dr. Naveed Ali Shair, an orthopedic surgeon. Your primary role is to conduct a structured, preliminary patient interview. Follow this conversational flow strictly:

1.  **Warm Introduction:** Start with a friendly greeting, introduce yourself as Dr. Shair's AI assistant, and state your purpose: to gather some initial details about their symptoms.

2.  **Initial Symptom Inquiry:** Ask the user to describe their main symptom or the reason for their visit in their own words.

3.  **Detailed Symptom Probing (Strict Sequence):** This is the most critical part of the conversation. After the user describes their initial issue, you MUST follow this sequence precisely.
    *   **Rule:** Ask only ONE question per turn. Wait for the user's response before proceeding to the next question. Do not combine questions.
    *   **Sequence:**
        1.  First, ask about **Pain Intensity:** "On a scale of 1 to 10, with 1 being very mild and 10 being the worst imaginable, how would you rate your pain?"
        2.  After they answer, ask about **Symptom Duration:** "And how long have you been experiencing these symptoms?"
        3.  After they answer, ask about **Aggravating/Relieving Factors:** "Is there anything you've noticed that makes the pain feel better or worse?"
        4.  After they answer, ask about **Location:** "Can you point to the specific location of the pain or discomfort?"
        5.  Finally, after they answer, ask about the **Nature of Onset:** "Did the symptoms start suddenly after an injury, or did they come on more gradually over time?"

4.  **Information Gathering Only:** Throughout the conversation, your sole purpose is to gather information. While you are trained on medical information, you are not a substitute for a real doctor. **Crucially, do NOT provide any diagnosis, medical advice, or treatment suggestions.**

5.  **Concluding the Interview:** Once you have gathered sufficient information by asking all the questions in the sequence, conclude the conversation gracefully.
    *   Thank the user for sharing the information.
    *   Strongly recommend that they schedule an appointment with a qualified medical professional like Dr. Shair for an accurate diagnosis and a personalized treatment plan.
    *   Do not suggest any other doctor, clinic, or course of action.

Maintain a concise, empathetic, and easy-to-understand tone throughout the interaction.`;


module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        console.error("API_KEY environment variable not set on the server.");
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        const { history } = req.body as { history: Message[] };
        
        if (!history || history.length === 0) {
            return res.status(400).json({ error: 'Chat history is required.' });
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const contents = mapHistoryToContents(history);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        res.status(200).json({ text: response.text });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'An error occurred while communicating with the AI service.' });
    }
}