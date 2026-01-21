
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { getSustainabilityInsight } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Stellar greetings. I am Core-AI. How can I assist with your cosmic business architecture today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getSustainabilityInsight(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-pink-500/30 w-80 md:w-96 h-[500px] rounded-2xl flex flex-col shadow-[0_0_50px_rgba(236,72,153,0.2)] overflow-hidden transition-all animate-in zoom-in-95">
          <div className="p-4 bg-blue-900/20 border-b border-pink-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-sm text-blue-100 tracking-tight">Core-AI Navigator</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-blue-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-pink-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-blue-900/30 text-blue-50 border border-blue-500/20 rounded-tl-none backdrop-blur-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-blue-900/20 p-3 rounded-2xl rounded-tl-none border border-blue-500/10 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-pink-500" />
                  <span className="text-xs text-blue-300/60 font-medium">Decrypting cosmic data...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950/50 border-t border-pink-500/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Request orbital analysis..."
                className="flex-1 bg-blue-950/50 border border-blue-500/20 rounded-xl px-4 py-2 text-sm text-blue-100 focus:outline-none focus:border-pink-500 transition-colors placeholder:text-blue-500/50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-gradient-to-r from-pink-600 to-blue-600 hover:scale-105 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-tr from-pink-600 to-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:scale-110 active:scale-95 group border-2 border-white/20"
        >
          <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};
