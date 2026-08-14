'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, MessageSquare, Code, Terminal, Cpu } from 'lucide-react';

interface HeroCartoonDeveloperProps {
  onOpenChat: () => void;
}

export function HeroCartoonDeveloper({ onOpenChat }: HeroCartoonDeveloperProps) {
  const [speechBubbleText, setSpeechBubbleText] = useState(
    "Hi there! 👋 Welcome to Koushik Saha's portfolio. I'm his AI representative!"
  );

  // 3D Motion Tilt Values on Mouse Hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [12, -12]);
  const rotateY = useTransform(mouseX, [-150, 150], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 relative">
      {/* Centered Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 max-w-lg text-center px-5 py-3.5 rounded-2xl bg-white/90 dark:bg-[#121216]/90 border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-md space-y-2 relative z-20"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live AI Ambassador
          </span>
        </div>

        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
          {speechBubbleText}
        </p>

        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={onOpenChat}
            className="px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity shadow-md flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 dark:text-amber-600" />
            <span>Chat with My AI</span>
          </button>
        </div>

        {/* Speech Pointer Tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#121216] border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45" />
      </motion.div>

      {/* Main Centered 3D Moving Cartoon Character Stage */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="perspective-1000 relative flex items-center justify-center cursor-pointer"
        onClick={onOpenChat}
        title="Click to interact with Koushik's AI Assistant"
      >
        {/* Ambient Glowing Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/10 blur-3xl transform scale-125 animate-pulse" />

        {/* Floating Tech Particles */}
        <motion.div
          animate={{ y: [-5, -25, -5], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute -top-4 -left-6 z-20 p-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-lg text-emerald-500"
        >
          <Code className="w-5 h-5" />
        </motion.div>

        <motion.div
          animate={{ y: [-10, -35, -10], opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
          className="absolute top-10 -right-8 z-20 p-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-lg text-cyan-500 font-mono text-xs font-bold"
        >
          &lt;/&gt;
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-12 -left-8 z-20 p-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-lg text-amber-500 font-mono text-xs font-bold"
        >
          AWS
        </motion.div>

        {/* 3D Tilting Character Container */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          animate={{
            y: [0, -12, 0],
            rotateZ: [0, 1, -1, 0]
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-3xl p-4 bg-gradient-to-b from-white/40 to-white/10 dark:from-white/10 dark:to-transparent border-2 border-emerald-500/40 shadow-2xl backdrop-blur-lg flex items-center justify-center overflow-hidden group"
        >
          {/* High Res 3D Pixar Cartoon Character Image */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#0a0a0d] flex items-center justify-center">
            <Image
              src="/avatar.png"
              alt="Koushik Saha 3D Animated Pixar Cartoon Developer Character"
              width={420}
              height={420}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* Interactive Click Banner Overlay */}
          <div className="absolute bottom-3 left-4 right-4 py-2 px-3 rounded-xl bg-zinc-900/90 dark:bg-white/90 text-white dark:text-black text-center text-xs font-semibold font-mono shadow-xl flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 animate-pulse" />
            <span>Interactive 3D AI Assistant — Click to Chat</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
