// components/Chatbot.tsx
'use client';

import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatbotInterface() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help your business today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: input }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      
      const data = await response.json();
      const aiText = data[0]?.generated_text || "I couldn't process that request.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: aiText,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to process request'
      );
      setMessages((prev) => [
        ...prev,
        {
          id: 'error',
          text: 'Please try again later',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary-500 bg-opacity-10 rounded-lg">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
              <div className={`p-2 rounded-full ${
                message.isUser ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'
              }`}>
                {message.isUser ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`px-4 py-3 rounded-lg ${
                message.isUser ? 'bg-primary-500 text-white' : 'bg-white text-gray-800 border border-gray-200'
              }`}>
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="p-2 rounded-full bg-secondary-100 text-secondary-600">
              <Bot size={18} />
            </div>
            <div className="px-4 py-3 rounded-lg bg-white border border-gray-200">
              <Loader2 className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg disabled:opacity-50 transition-opacity"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}
