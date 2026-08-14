'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Sparkles, Mail, MapPin, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { RESUME_DATA } from '@/data/resume';

interface HeroSectionProps {
  onOpenChat: () => void;
}

export function HeroSection({ onOpenChat }: HeroSectionProps) {
  return (
    <section className="py-12 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {RESUME_DATA.personalInfo.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-sans font-medium">
              <Award className="w-3.5 h-3.5" />
              AWS & GCP Certified Cloud Architect
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {RESUME_DATA.personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300 max-w-3xl">
              {RESUME_DATA.personalInfo.title}
            </p>
          </div>

          {/* Short Bio */}
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Full-stack leader specializing in high-throughput frontend architectures (React 18, Next.js, Module Federation), microservices (Node.js, Go), and AI-native applications. Proven track record scaling platforms to <strong className="text-zinc-900 dark:text-white font-medium">1M+ MAU ($2M+ ARR)</strong>, cutting cloud costs by <strong className="text-zinc-900 dark:text-white font-medium">$180K/year</strong>, and publishing peer-reviewed research in AI genomics and emergency health response.
          </p>

          {/* Key Metrics Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-4">
            {RESUME_DATA.personalInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
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

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={RESUME_DATA.personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              Download Resume PDF
            </a>

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Ask AI Ambassador
            </button>

            <div className="flex items-center space-x-2 pl-2">
              <a
                href={RESUME_DATA.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={RESUME_DATA.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
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
        </motion.div>
      </div>
    </section>
  );
}
