'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users2, CheckCircle2 } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume';

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Users2 className="w-5 h-5 text-emerald-500" />
            Leadership & Open Source
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Open-source maintainership, engineering standards, and cross-functional team mentorship.
          </p>
        </div>

        {/* Leadership List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESUME_DATA.leadership.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
