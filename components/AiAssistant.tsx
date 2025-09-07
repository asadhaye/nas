import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../types';
import { createOrthoChatSession, sendMessage } from '../services/geminiService';
import { PaperAirplaneIcon, SparklesIcon, UserCircleIcon } from './icons';
import type { Chat } from '@google/genai';


const AiAssistant: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const initializeChat = useCallback(() => {
        try {
            const chatSession = createOrthoChatSession();
            setChat(chatSession);
            setIsLoading(true);
            sendMessage(chatSession, "Hello").then(initialMessage => {
                 setMessages([{ id: Date.now(), role: 'model', text: initialMessage }]);
            }).catch(err => {
                console.error(err);
                setError("Failed to start a session with the AI assistant.");
            }).finally(() => {
                setIsLoading(false);
            });
        } catch (e) {
            console.error(e);
            setError("Could not initialize the AI assistant. The API key might be missing.");
        }
    }, []);

    useEffect(() => {
        initializeChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chat) return;

        const newUserMessage: Message = { id: Date.now(), role: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);
        setError(null);

        try {
            const responseText = await sendMessage(chat, userInput);
            const newAiMessage: Message = { id: Date.now() + 1, role: 'model', text: responseText };
            setMessages(prev => [...prev, newAiMessage]);
        } catch (err) {
            setError('There was an error processing your request. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="ai-assistant" className="py-20 bg-gray-50" aria-labelledby="ai-assistant-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="ai-assistant-heading" className="text-3xl md:text-4xl font-bold text-gray-900">AI-Powered Symptom Assistant</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Have a conversation with our AI assistant for a preliminary check of your symptoms.
                        <br />
                        <span className="font-semibold text-red-600">This is not a medical diagnosis. Always consult a qualified doctor.</span>
                    </p>
                </div>
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl flex flex-col" style={{height: '65vh'}}>
                    <div ref={chatContainerRef} className="flex-1 p-6 space-y-4 overflow-y-auto">
                        {messages.map((message) => (
                             <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                {message.role === 'model' && (
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                        <SparklesIcon className="h-6 w-6" />
                                    </div>
                                )}
                                <div className={`max-w-md p-4 rounded-2xl ${message.role === 'user' ? 'bg-gray-200 text-gray-800 rounded-br-none' : 'bg-blue-600 text-white rounded-bl-none'}`}>
                                    <p className="whitespace-pre-wrap">{message.text}</p>
                                </div>
                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                        <UserCircleIcon className="h-7 w-7" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && messages.length > 0 && (
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                    <SparklesIcon className="h-6 w-6" />
                                </div>
                                <div className="max-w-md p-4 rounded-2xl bg-blue-600 text-white rounded-bl-none">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-white rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                        <div className="relative">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Describe your symptoms..."
                                className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                                disabled={isLoading || !!error}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !userInput.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                <PaperAirplaneIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AiAssistant;