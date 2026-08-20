'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume';

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-500" />
            Skills & Technical Expertise
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Comprehensive breakdown of languages, state management, testing, cloud infrastructure, and databases.
          </p>
        </div>

        {/* Categorized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESUME_DATA.skillsCategorized.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-3">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
