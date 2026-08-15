'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume';

export function PublicationsSection() {
  return (
    <section id="publications" className="py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Research & Publications */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Research & Publications
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Peer-reviewed journal publications and systematic reviews exploring AI applications in healthcare, resource allocation, and cancer genomics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESUME_DATA.publications.map((pub, idx) => {
              const isPublished = pub.status === 'Published';
              return (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`p-5 rounded-xl border transition-all space-y-2 ${
                    isPublished
                      ? 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/80'
                      : 'bg-zinc-100/30 dark:bg-zinc-950/20 border-dashed border-zinc-200 dark:border-zinc-800/40 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider ${
                      isPublished ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500'
                    }`}>
                      {pub.year} • {pub.journal}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      isPublished 
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
                    }`}>
                      {isPublished ? 'Published' : 'Forthcoming'}
                    </span>
                  </div>

                  <h3 className={`font-semibold leading-snug ${
                    isPublished ? 'text-sm text-zinc-900 dark:text-white' : 'text-xs text-zinc-500 dark:text-zinc-400'
                  }`}>
                    {pub.title}
                  </h3>

                  {pub.doi && (
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <span>DOI:</span>
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                      >
                        {pub.doi}
                        <ExternalLink className="w-3 h-3 inline" />
                      </a>
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-500" />
              Education
            </h3>
            <div className="space-y-3">
              {RESUME_DATA.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{edu.degree}</h4>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{edu.period}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{edu.institution} — {edu.location}</p>
                  {edu.gpa && (
                    <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Cloud Certifications
            </h3>
            <div className="space-y-3">
              {RESUME_DATA.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {cert.name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
                  </div>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
