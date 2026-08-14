'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Sparkles, FileText } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume';

interface HeaderProps {
  onOpenChat: () => void;
}

export function Header({ onOpenChat }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-[#080808]/70 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Status */}
        <div className="flex items-center space-x-3">
          <a href="#" className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white hover:opacity-80 transition-opacity">
            {RESUME_DATA.personalInfo.name}
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for Lead Roles
          </span>
        </div>

        {/* Navigation & Controls */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <a
            href="#experience"
            className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#publications"
            className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Research
          </a>
          <a
            href="#contact"
            className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Contact
          </a>

          <a
            href={RESUME_DATA.personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>

          {/* AI Chat Button Header Shortcut */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity"
            title="Talk to Koushik's AI Representative"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 dark:text-amber-600" />
            <span>Ask AI</span>
          </button>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
