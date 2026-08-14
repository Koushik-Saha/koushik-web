'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, ArrowRight, UserCheck } from 'lucide-react';

interface CartoonBotAvatarProps {
  onOpenChat: () => void;
}

export function CartoonBotAvatar({ onOpenChat }: CartoonBotAvatarProps) {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechText, setSpeechText] = useState(
    "Hi there! 👋 I'm Koushik's AI Assistant. Ask me anything about his 7+ yrs Full-Stack engineering background, $2M ARR PWA, or AI research!"
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
      "Koushik Saha is a Senior Full-Stack Engineer & Cloud Architect (AWS/GCP). He has scaled platforms to 1M+ MAU, saved $180K/yr with Module Federation, and published 4 research papers!"
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

      {/* Floating Animated Cartoon Robot Character Button */}
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
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 shadow-xl border-2 border-white dark:border-zinc-800 focus:outline-none"
        title="Click to talk with Koushik's AI Cartoon Bot!"
      >
        {/* Glowing pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-75" />

        {/* SVG Cartoon Robot Face */}
        <svg
          viewBox="0 0 64 64"
          className="w-9 h-9 text-white drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antenna */}
          <line x1="32" y1="6" x2="32" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="5" r="3" fill="#FBBF24" className="animate-pulse" />

          {/* Robot Head Outer */}
          <rect x="12" y="16" width="40" height="34" rx="10" fill="#1E293B" stroke="currentColor" strokeWidth="2.5" />

          {/* Screen Face Glass */}
          <rect x="18" y="22" width="28" height="20" rx="6" fill="#0F172A" />

          {/* Blinking Cute Robot Eyes */}
          <motion.circle
            cx="26"
            cy="31"
            r="3.5"
            fill="#34D399"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
          />
          <motion.circle
            cx="38"
            cy="31"
            r="3.5"
            fill="#34D399"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
          />

          {/* Friendly Smiling Mouth Arc */}
          <path d="M26 37C28 39.5 36 39.5 38 37" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cute Blush Cheek Dots */}
          <circle cx="21" cy="35" r="1.5" fill="#F472B6" opacity="0.8" />
          <circle cx="43" cy="35" r="1.5" fill="#F472B6" opacity="0.8" />

          {/* Ear Bolts */}
          <rect x="8" y="28" width="4" height="10" rx="2" fill="#64748B" />
          <rect x="52" y="28" width="4" height="10" rx="2" fill="#64748B" />
        </svg>

        {/* Sparkle Badge Icon */}
        <span className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-400 text-black shadow">
          <Sparkles className="w-3 h-3" />
        </span>
      </motion.button>
    </div>
  );
}
