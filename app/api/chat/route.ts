import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { AI_SYSTEM_PROMPT } from '@/data/ai-context';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

// Cache extractor instance in memory
let extractor: any = null;

async function getEmbedding(text: string): Promise<number[]> {
  if (!extractor) {
    const { pipeline } = await import('@xenova/transformers');
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

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

    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // 1. Perform Semantic Search
    let context = '';
    try {
      const embedding = await getEmbedding(lastUserMessage);
      const embeddingStr = `[${embedding.join(',')}]`;

      const matches: any[] = await prisma.$queryRawUnsafe(`
        SELECT content, 1 - (embedding <=> $1::vector) AS similarity
        FROM "DocumentChunk"
        ORDER BY embedding <=> $1::vector
        LIMIT 4
      `, embeddingStr);

      context = matches.map(m => m.content).join('\n\n');
    } catch (embedErr) {
      console.error('Semantic search failed:', embedErr);
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Fallback preview mode if API key is not configured
    if (!apiKey) {
      let mockReply = "Hello! I am Koushik's AI ambassador. Ask me anything about his 7+ years of Full-Stack experience, React 18 / Next.js PWA architecture, $180K/yr cloud savings with Module Federation, AWS/GCP Architect certifications, or research papers!";

      // If we got matching semantic chunks, show the top match for a rich demo experience!
      if (context) {
        const topChunk = context.split('\n\n')[0] || '';
        mockReply = `🤖 [AI Ambassador Demo Mode - RAG Results]:\n\nBased on your query, here is relevant information from Koushik's indexed profile:\n\n${topChunk}\n\n(Set ANTHROPIC_API_KEY in .env.local to enable full Claude conversational synthesis).`;
      }

      return NextResponse.json({ role: 'assistant', content: mockReply });
    }

    const anthropic = new Anthropic({ apiKey });

    // Format message history for Anthropic API
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.content
    }));

    // Synthesize the system prompt with matching RAG context
    const enrichedSystemPrompt = `
      ${AI_SYSTEM_PROMPT}

      VERIFIED PORTFOLIO DATA CONTEXT (Use this to answer the user's question accurately):
      ${context}
    `;

    let assistantText = '';
    let lastError: unknown = null;

    // Attempt preferred models in sequence
    for (const model of PREFERRED_MODELS) {
      try {
        const response = await anthropic.messages.create({
          model,
          max_tokens: 500,
          system: enrichedSystemPrompt,
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
