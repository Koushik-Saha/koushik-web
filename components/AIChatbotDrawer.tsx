'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, RefreshCw, ChevronRight } from 'lucide-react';
import { track } from '@vercel/analytics';

interface AIChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  "What is your core tech stack?",
  "Tell me about your $180K cloud cost savings.",
  "What is your experience with AI & LLMs?",
  "What roles are you looking for?"
];

export function AIChatbotDrawer({ isOpen, onClose }: AIChatbotDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am Koushik's AI Representative. Ask me anything about his full-stack engineering experience, architecture achievements, or research!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    // Track question event in analytics
    try {
      track('ai_question_asked', { question: query });
    } catch {
      // analytics fail-safe
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || "I apologize, but I couldn't process that request right now."
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm having trouble connecting right now. You can email Koushik directly at koushik.saha666@gmail.com or use the contact form on this page!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={onClose} // triggers toggle open
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium text-sm shadow-xl hover:scale-105 transition-transform border border-zinc-700 dark:border-zinc-300"
        >
          <Sparkles className="w-4 h-4 text-amber-300 dark:text-amber-600 animate-pulse" />
          <span>Ask Koushik's AI</span>
        </motion.button>
      )}

      {/* Slide-over Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer Window */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-[#0c0c0e] border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                      Koushik's AI Ambassador
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                      Powered by Anthropic Claude
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-black rounded-tr-none font-medium'
                          : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {msg.role === 'user' && (
                      <div className="p-1 rounded bg-zinc-900 dark:bg-white text-white dark:text-black shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono pl-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                    <span>Thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="p-3 border-t border-zinc-100 dark:border-zinc-900/80 bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-1.5 px-1">
                  Suggested Questions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((promptText, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSend(promptText)}
                      disabled={isLoading}
                      className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors flex items-center gap-1"
                    >
                      <span>{promptText}</span>
                      <ChevronRight className="w-3 h-3 text-zinc-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Footer */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask Koushik's AI a question..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-transparent focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
