'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Sun, Moon, Sparkles, FileText, Menu, X } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume';

interface HeaderProps {
  onOpenChat: () => void;
}

export function Header({ onOpenChat }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Leadership', href: '/#leadership' },
    { name: 'Research', href: '/#publications' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#080808]/80 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Status Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {RESUME_DATA.personalInfo.name}
          </Link>

          {/* Responsive Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden xl:inline">Available for Roles</span>
            <span className="xl:hidden">Available</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors whitespace-nowrap ${
                link.name === 'Blog'
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Resume Download */}
          <a
            href={RESUME_DATA.personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Ask AI Trigger */}
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
            title="Ask Koushik's AI Ambassador"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 dark:text-amber-600" />
            <span>Ask AI</span>
          </button>

          {/* Theme Switcher */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 lg:hidden rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <a
              href={RESUME_DATA.personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
            >
              <FileText className="w-4 h-4" />
              Download Koushik-Saha.pdf
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
