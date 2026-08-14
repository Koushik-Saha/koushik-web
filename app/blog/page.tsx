'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AIChatbotDrawer } from '@/components/AIChatbotDrawer';
import { CartoonBotAvatar } from '@/components/CartoonBotAvatar';
import { BLOG_POSTS } from '@/data/blogs';
import { RESUME_DATA } from '@/data/resume';
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';

export default function BlogIndexPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(BLOG_POSTS.flatMap(post => post.tags))
  );

  // Filter posts based on search & tag selection
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080808] transition-colors duration-200">
      {/* Top Header */}
      <Header onOpenChat={() => setIsChatOpen(true)} />

      {/* Main Blog Hero */}
      <main className="flex-1">
        <section className="py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <BookOpen className="w-3.5 h-3.5" />
                Technical Journal
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Engineering Articles & Insights
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Deep dives into full-stack architecture, Micro-frontends (Module Federation), Claude AI integration, and Core Web Vitals optimization.
              </p>
            </div>

            {/* Search & Tag Controls */}
            <div className="pt-4 space-y-4">
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search articles by keyword or topic..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors"
                />
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Filter:
                </span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors font-medium ${
                    selectedTag === null
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  All Posts ({BLOG_POSTS.length})
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`text-xs px-3 py-1 rounded-full transition-colors font-medium ${
                      selectedTag === tag
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Post List Grid */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {filteredPosts.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                No articles found matching your query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      {/* Category & Date Metadata */}
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Title Link */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug"
                      >
                        {post.title}
                      </Link>

                      {/* Summary */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    {/* Footer Tags & Read Link */}
                    <div className="pt-5 mt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
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
