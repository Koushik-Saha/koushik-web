'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, ArrowRight, UserCheck } from 'lucide-react';
import Image from 'next/image';

interface CartoonBotAvatarProps {
  onOpenChat: () => void;
}

export function CartoonBotAvatar({ onOpenChat }: CartoonBotAvatarProps) {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechText, setSpeechText] = useState(
    "Hi there! 👋 I'm Koushik's AI Assistant. Ask me anything about his 7+ yrs Full-Stack experience, $2M ARR PWA, or AI research!"
  );

  useEffect(() => {
    // Show greeting bubble after 1.2s on page load
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickIntro = () => {
    setSpeechText(
      "Koushik Saha is a Senior Full-Stack Engineer & Cloud Architect (AWS/GCP). He scaled DTE Energy's PWA to 1M+ MAU, saved $180K/yr with Module Federation, and published 4 research papers!"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            className="pointer-events-auto mb-3 w-80 max-w-[calc(100vw-3rem)] p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-3 relative"
          >
            {/* Speech bubble pointer tail */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-[#121215] border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45" />

            {/* Close button */}
            <button
              onClick={() => setShowSpeechBubble(false)}
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Greeting Header */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AI Representative
              </span>
            </div>

            {/* Speech Content */}
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              {speechText}
            </p>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  setShowSpeechBubble(false);
                  onOpenChat();
                }}
                className="flex-1 py-1.5 px-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Talk to Me</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={handleQuickIntro}
                className="py-1.5 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Intro</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated 3D Pixar-Style Cartoon Character Button */}
      <motion.button
        onClick={() => {
          if (showSpeechBubble) {
            setShowSpeechBubble(false);
            onOpenChat();
          } else {
            setShowSpeechBubble(true);
          }
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }}
        className="pointer-events-auto relative group flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 dark:bg-white shadow-2xl border-2 border-emerald-500 focus:outline-none overflow-hidden p-0.5"
        title="Click to talk with Koushik's AI Cartoon Avatar!"
      >
        {/* Glowing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-75" />

        {/* 3D Pixar Cartoon Character Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
          <Image
            src="/avatar.png"
            alt="Koushik Cartoon Character"
            width={64}
            height={64}
            className="object-cover w-full h-full transform scale-110"
            priority
          />
        </div>

        {/* Sparkle Badge */}
        <span className="absolute bottom-0 right-0 p-1 rounded-full bg-emerald-500 text-white shadow-md border border-white dark:border-zinc-900">
          <Sparkles className="w-3 h-3" />
        </span>
      </motion.button>
    </div>
  );
}
