'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Sparkles, Mail, MapPin, Award, Phone, Globe, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { RESUME_DATA } from '@/data/resume';
import Image from 'next/image';

interface HeroSectionProps {
  onOpenChat: () => void;
}

export function HeroSection({ onOpenChat }: HeroSectionProps) {
  return (
    <section className="py-12 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Metadata, Title, Summary, Metrics & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 xl:col-span-8 space-y-6"
          >
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {RESUME_DATA.personalInfo.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {RESUME_DATA.personalInfo.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">
                <Award className="w-3.5 h-3.5" />
                AWS & GCP Certified Architect
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-zinc-950 via-emerald-600 to-zinc-950 dark:from-white dark:via-emerald-400 dark:to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow">
                  {RESUME_DATA.personalInfo.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                {RESUME_DATA.personalInfo.title}
              </p>
            </div>

            {/* Full Professional Summary */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border-t-4 border-t-emerald-500 border-x border-b border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-2 shadow-sm animate-fade-in">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Professional Summary
              </div>
              <p>{RESUME_DATA.personalInfo.summary}</p>
            </div>

            {/* Key Metrics Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {RESUME_DATA.personalInfo.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-colors duration-300 shadow-sm"
                >
                  <div className="text-xl sm:text-2xl font-bold font-mono text-zinc-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs & Social Links */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={RESUME_DATA.personalInfo.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
                >
                  <FileDown className="w-4 h-4" />
                  Download Koushik-Saha.pdf
                </a>

                <button
                  onClick={onOpenChat}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Ask AI Ambassador
                </button>

                <div className="flex items-center space-x-2 pl-2">
                  <a
                    href={RESUME_DATA.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={RESUME_DATA.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={RESUME_DATA.personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${RESUME_DATA.personalInfo.email}`}
                    className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal flex items-start gap-1.5 max-w-xl">
                <span>💡</span>
                <span>Click the <strong>Ask AI Ambassador</strong> button to chat with a custom assistant trained directly on my career achievements, publications, and professional code experience.</span>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Side-by-Side Floating 3D Pixar Cartoon Character Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-4 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              onClick={onOpenChat}
              className="relative group w-72 sm:w-80 rounded-3xl p-3 bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-md cursor-pointer"
              title="Click to talk with Koushik's AI Assistant"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

              {/* Avatar Container */}
              <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0c0c0f] flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800">
                <Image
                  src="/avatar.png"
                  alt="Koushik Saha 3D Pixar Cartoon Developer Avatar"
                  width={340}
                  height={340}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Bottom Interactive Badge */}
              <div className="mt-3 py-2 px-3 rounded-xl bg-zinc-900/90 dark:bg-white/90 text-white dark:text-black text-center text-xs font-mono font-semibold shadow-lg flex items-center justify-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 animate-pulse" />
                <span>AI Representative — Click to Chat</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
