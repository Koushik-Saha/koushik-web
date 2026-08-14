import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { AI_SYSTEM_PROMPT } from '@/data/ai-context';

export const runtime = 'nodejs';

// List of candidate models for forward & backward compatibility
const PREFERRED_MODELS = [
  'claude-haiku-4-5-20251001',
  'claude-sonnet-4-6',
  'claude-3-5-haiku-20241022',
  'claude-3-haiku-20240307'
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Fallback preview mode if API key is not configured
    if (!apiKey) {
      const lastUserMessage = messages[messages.length - 1]?.content || '';
      let mockReply = "Hello! I am Koushik's AI ambassador. Ask me anything about his 7+ years of Full-Stack experience, React 18 / Next.js PWA architecture, $180K/yr cloud savings with Module Federation, AWS/GCP Architect certifications, or research papers!";

      const lower = lastUserMessage.toLowerCase();
      if (lower.includes('tech') || lower.includes('stack') || lower.includes('skill')) {
        mockReply = "Koushik's core tech stack includes React 18/19, Next.js (App Router), TypeScript, Tailwind CSS, Node.js, Go (Golang), Python, PostgreSQL, Prisma, Redis, AWS (S3, Lambda, EC2), Docker, Kubernetes, and Claude API / OpenAI integrations.";
      } else if (lower.includes('experience') || lower.includes('company') || lower.includes('work')) {
        mockReply = "Koushik is currently Lead Software Engineer at Freedom Shopping LLC (building IJAISM academic SaaS and FixUp multi-tenant retail platform). Previously, he was Senior Full-Stack Engineer at Powerley, modernizing DTE Energy's PWA to 1M+ MAU ($2M+ ARR) and saving $180K/yr via Module Federation.";
      } else if (lower.includes('pub') || lower.includes('paper') || lower.includes('research')) {
        mockReply = "Koushik has published 4 research papers in peer-reviewed journals including 'Advances in Public Health' (2026) on AI hospital resource allocation and 'Computational and Systems Oncology' (2026) on Cancer Genomics.";
      }

      return NextResponse.json({ role: 'assistant', content: mockReply });
    }

    const anthropic = new Anthropic({ apiKey });

    // Format message history for Anthropic API
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.content
    }));

    let assistantText = '';
    let lastError: unknown = null;

    // Attempt preferred models in sequence
    for (const model of PREFERRED_MODELS) {
      try {
        const response = await anthropic.messages.create({
          model,
          max_tokens: 500,
          system: AI_SYSTEM_PROMPT,
          messages: formattedMessages
        });

        if (response.content[0]?.type === 'text') {
          assistantText = response.content[0].text;
          break; // success
        }
      } catch (err: unknown) {
        console.warn(`Model ${model} failed, trying fallback...`, err);
        lastError = err;
      }
    }

    if (!assistantText) {
      throw lastError || new Error('All candidate models failed');
    }

    return NextResponse.json({
      role: 'assistant',
      content: assistantText
    });
  } catch (err: unknown) {
    console.error('Chat API Error:', err);
    return NextResponse.json(
      { error: 'Failed to generate AI response. Please try again.' },
      { status: 500 }
    );
  }
}
