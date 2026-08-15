'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-500" />
            Engineering Experience
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            7+ years of building production web applications, micro-frontends, high-concurrency microservices, and leading engineering teams.
          </p>
        </div>

        {/* Experience Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
          {RESUME_DATA.experience.map((item, index) => {
            const isPowerley = item.id === 'powerley';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-1.5 sm:left-2.5 top-1.5 w-3 h-3 rounded-full ring-4 ring-white dark:ring-[#080808] transition-colors ${
                  isPowerley ? 'bg-emerald-500' : 'bg-zinc-900 dark:bg-white group-hover:bg-emerald-500'
                }`} />

                <div className={`p-5 sm:p-6 rounded-xl transition-all ${
                  isPowerley
                    ? 'border-l-4 border-l-emerald-500 border border-y-zinc-300 border-r-zinc-300 dark:border-y-zinc-700/80 dark:border-r-zinc-700/80 bg-zinc-100/50 dark:bg-emerald-950/5 shadow-md shadow-emerald-500/5'
                    : 'bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700'
                }`}>
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                          {item.role}
                        </h3>
                        {isPowerley && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            ★ High-Impact Senior Role
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {item.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-0">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </span>
                      {item.location && (
                        <span className="hidden sm:flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-4 mt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded text-xs font-mono bg-zinc-200/60 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
