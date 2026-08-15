'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { LeadershipSection } from '@/components/LeadershipSection';
import { PublicationsSection } from '@/components/PublicationsSection';
import { ContactSection } from '@/components/ContactSection';
import { AIChatbotDrawer } from '@/components/AIChatbotDrawer';
import { CartoonBotAvatar } from '@/components/CartoonBotAvatar';
import { VisitorTracker } from '@/components/VisitorTracker';
import { RESUME_DATA } from '@/data/resume';
import { FileText, ArrowUp } from 'lucide-react';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080808] transition-colors duration-200">
      {/* Visitor Telemetry Tracker */}
      <VisitorTracker />

      {/* Top Header */}
      <Header onOpenChat={() => setIsChatOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenChat={() => setIsChatOpen(true)} />
        <ExperienceSection />
        
        {/* Colleague Testimonial Quote */}
        <div className="py-12 bg-zinc-50/50 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
            <span className="text-3xl text-emerald-500 font-serif leading-none">“</span>
            <blockquote className="text-base sm:text-lg md:text-xl italic font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Koushik built the most complex part of our platform and then made it clean enough that I could extend it without him.
            </blockquote>
            <div className="pt-2">
              <cite className="not-italic font-bold text-sm text-zinc-900 dark:text-white block">
                Former Colleague / Mentee
              </cite>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                Senior Engineering Team Member @ Powerley
              </span>
            </div>
          </div>
        </div>

        <ProjectsSection />
        <SkillsSection />
        <LeadershipSection />
        <PublicationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {RESUME_DATA.personalInfo.name}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={RESUME_DATA.personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              Koushik-Saha.pdf
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
