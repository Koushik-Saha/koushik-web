'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { PublicationsSection } from '@/components/PublicationsSection';
import { ContactSection } from '@/components/ContactSection';
import { AIChatbotDrawer } from '@/components/AIChatbotDrawer';
import { RESUME_DATA } from '@/data/resume';
import { FileText, ArrowUp } from 'lucide-react';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080808] transition-colors duration-200">
      {/* Top Header */}
      <Header onOpenChat={() => setIsChatOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenChat={() => setIsChatOpen(true)} />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {RESUME_DATA.personalInfo.name}. Built with Next.js, Tailwind CSS, & Anthropic Claude API.
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={RESUME_DATA.personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume PDF
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* AI Assistant Floating Drawer */}
      <AIChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(prev => !prev)}
      />
    </div>
  );
}
