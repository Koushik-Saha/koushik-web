'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { RESUME_DATA } from '@/data/resume';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-500" />
            Featured Projects & Open Source
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Selected engineering projects demonstrating full-stack architecture, AI integration, design systems, and multi-tenant SaaS platforms.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME_DATA.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group flex flex-col justify-between p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Header Title & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {project.subtitle}
                    </p>
                  </div>
                  {project.id === 'mindreframe' && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <Sparkles className="w-3 h-3" /> AI Native
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.metrics.map((metric, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium"
                    >
                      ✓ {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Tech Stack & Links */}
              <div className="pt-5 mt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      aria-label="View Source Code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
