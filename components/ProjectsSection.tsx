'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { RESUME_DATA } from '@/data/resume';

function ProjectArchitecture({ id }: { id: string }) {
  if (id === 'mindreframe') {
    return (
      <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200/50 dark:border-zinc-800/60 rounded-lg space-y-2">
        <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-500">System Architecture</p>
        <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
          <div className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-center flex-1">
            Client PWA
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-center flex-1" title="Avoids RAG search latency">
            In-Memory Prompt
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-center flex-1">
            Claude API
          </div>
        </div>
      </div>
    );
  }

  if (id === 'codemen-ui') {
    return (
      <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200/50 dark:border-zinc-800/60 rounded-lg space-y-2">
        <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-500">CI/CD & Delivery Flow</p>
        <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
          <div className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-center flex-1">
            Storybook UI
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-center flex-1">
            WCAG A11y Audit
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20 text-center flex-1">
            npm Registry
          </div>
        </div>
      </div>
    );
  }

  if (id === 'ijaism') {
    return (
      <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200/50 dark:border-zinc-800/60 rounded-lg space-y-2">
        <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-500">Deployment Pipeline</p>
        <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
          <div className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-center flex-1">
            Next.js / Docker
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-center flex-1">
            ORCID / Stripe
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-center flex-1">
            Neon Serverless DB
          </div>
        </div>
      </div>
    );
  }

  if (id === 'fixup-report') {
    return (
      <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200/50 dark:border-zinc-800/60 rounded-lg space-y-2">
        <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-500">Security & Reconciliation Flow</p>
        <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
          <div className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-center flex-1">
            Multi-Tenant Web
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20 text-center flex-1">
            RBAC Anomaly Check
          </div>
          <span className="text-zinc-400">➔</span>
          <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-center flex-1">
            Neon PostgreSQL
          </div>
        </div>
      </div>
    );
  }

  return null;
}

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

                {/* Description - formatted with pre-line to display case study paragraphs */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>

                {/* System Architecture Flow Diagram */}
                <ProjectArchitecture id={project.id} />

                {/* Key Metrics */}
                <div className="flex flex-wrap gap-1.5 pt-2">
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
