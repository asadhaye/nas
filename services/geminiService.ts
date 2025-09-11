import type { Message } from '../types';

export async function getAiResponse(history: Message[]): Promise<string> {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ history }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.text;

    } catch (error) {
        console.error("Error fetching from /api/chat:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
}
