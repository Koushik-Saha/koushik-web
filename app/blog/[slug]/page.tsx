'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { AIChatbotDrawer } from '@/components/AIChatbotDrawer';
import { CartoonBotAvatar } from '@/components/CartoonBotAvatar';
import { getBlogPostBySlug } from '@/data/blogs';
import { RESUME_DATA } from '@/data/resume';
import { ArrowLeft, Calendar, Clock, User, Share2, Mail } from 'lucide-react';

export default function SingleBlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#080808] text-zinc-900 dark:text-white p-4">
        <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
        <p className="text-sm text-zinc-500 mb-6">The requested blog post does not exist.</p>
        <Link
          href="/blog"
          className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-xs"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080808] transition-colors duration-200">
      {/* Top Header */}
      <Header onOpenChat={() => setIsChatOpen(true)} />

      <main className="flex-1 py-12 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          {/* Article Header */}
          <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-2">
              <span className="flex items-center gap-1 font-sans font-medium text-zinc-800 dark:text-zinc-200">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Article Content Body */}
          <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 space-y-4 leading-relaxed font-sans">
            {post.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-xl font-bold text-zinc-900 dark:text-white pt-4 pb-1 border-b border-zinc-100 dark:border-zinc-800">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                return (
                  <ul key={pIdx} className="list-disc pl-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {paragraph.split('\n').map((line, lIdx) => (
                      <li key={lIdx}>{line.replace(/^[0-9]\. |- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={pIdx} className="text-base text-zinc-700 dark:text-zinc-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags & Action Bar */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>

              <a
                href={`mailto:${RESUME_DATA.personalInfo.email}?subject=Feedback on article: ${post.title}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Author</span>
              </a>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          © {new Date().getFullYear()} {RESUME_DATA.personalInfo.name}
        </div>
      </footer>

      {/* Floating Animated Cartoon Character Assistant */}
      <CartoonBotAvatar onOpenChat={() => setIsChatOpen(true)} />

      {/* AI Assistant Floating Drawer */}
      <AIChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(prev => !prev)}
      />
    </div>
  );
}
