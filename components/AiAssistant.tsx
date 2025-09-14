import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../types';
import { getAiResponse } from '../services/geminiService';
import { PaperAirplaneIcon, SparklesIcon, UserCircleIcon, InformationCircleIcon } from './icons';


const AiAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const initializeChat = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setMessages([]); // Clear previous messages for a clean start
        try {
            // Create a dummy user message to kickstart the conversation and get the initial greeting.
            const initialHistory: Message[] = [{ id: 0, role: 'user', text: 'Hello' }];
            const initialMessage = await getAiResponse(initialHistory);
            setMessages([{ id: Date.now(), role: 'model', text: initialMessage }]);
        } catch (err) {
            console.error(err);
            setError("Failed to start a session with the AI assistant. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        initializeChat();
    }, [initializeChat]);
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading, error]);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [userInput]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !!error) return;

        const newUserMessage: Message = { id: Date.now(), role: 'user', text: userInput };
        const currentHistory = [...messages, newUserMessage];
        
        setMessages(currentHistory);
        setUserInput('');
        setIsLoading(true);
        setError(null);

        try {
            const responseText = await getAiResponse(currentHistory);
            const newAiMessage: Message = { id: Date.now() + 1, role: 'model', text: responseText };
            setMessages(prev => [...prev, newAiMessage]);
        } catch (err) {
            setError('There was an error processing your request. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e as any);
        }
    };

    const retryLastRequest = async () => {
        // If messages are empty, it means initialization failed, so retry it.
        if (messages.length === 0) {
            initializeChat();
            return;
        }

        // Otherwise, a user's message failed to get a response. Retry with existing history.
        setIsLoading(true);
        setError(null);

        try {
            const responseText = await getAiResponse(messages);
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
        <section id="ai-assistant" className="py-20 bg-white" aria-labelledby="ai-assistant-heading">
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
                        <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-4 rounded-r-lg mb-4 flex items-start gap-3" role="alert">
                             <div className="flex-shrink-0">
                                <InformationCircleIcon className="h-6 w-6 text-red-500 mt-0.5" />
                            </div>
                            <div>
                                <p className="font-bold">Important Disclaimer</p>
                                <p className="text-sm">This AI assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a physician for a proper diagnosis.</p>
                            </div>
                        </div>
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
                        {isLoading && messages.length === 0 && !error && (
                             <div className="flex justify-center items-center h-full text-gray-500">
                                <p>Initializing AI Assistant...</p>
                            </div>
                        )}
                        {error && (
                            <div className="flex items-center justify-center gap-4 text-center p-2">
                                <p className="text-red-500 text-sm">{error}</p>
                                <button
                                    onClick={retryLastRequest}
                                    className="bg-blue-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    aria-label="Retry failed request"
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                        <div className="relative flex items-end gap-2">
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={error ? "Please resolve the error to continue." : "Describe your symptoms..."}
                                className="w-full pl-4 pr-12 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none overflow-y-auto"
                                style={{maxHeight: '150px'}}
                                disabled={isLoading || !!error}
                                aria-disabled={isLoading || !!error}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !userInput.trim() || !!error}
                                className="flex-shrink-0 bg-blue-600 text-white rounded-full h-11 w-11 flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                aria-label="Send message"
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