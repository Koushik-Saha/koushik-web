import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Dynamically import @xenova/transformers since it's an ESM module
  const { pipeline } = await import('@xenova/transformers');
  
  console.log('Initializing local transformer feature extraction pipeline...');
  // Load the lightweight and efficient all-MiniLM-L6-v2 embedding model (384 dims)
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  const getEmbedding = async (text: string): Promise<number[]> => {
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  };

  console.log('Truncating old document chunks from database...');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "DocumentChunk"');

  const chunks: { source: string; content: string }[] = [];

  // 1. Process Blogs
  const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
  if (fs.existsSync(blogsPath)) {
    console.log('Reading blogs.json...');
    const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
    for (const blog of blogs) {
      const content = `Blog Post\nTitle: ${blog.title}\nCategory: ${blog.category}\nSummary: ${blog.summary}\nContent:\n${blog.content}`;
      chunks.push({ source: 'blog', content });
    }
  }

  // 2. Process Resume
  const resumePath = path.join(process.cwd(), 'data', 'resume.json');
  if (fs.existsSync(resumePath)) {
    console.log('Reading resume.json...');
    const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
    
    // Summary & Personal details
    chunks.push({
      source: 'resume',
      content: `Koushik Saha Professional Summary:\nTitle: ${resume.personalInfo.title}\nLocation: ${resume.personalInfo.location}\nSummary: ${resume.personalInfo.summary}\nSubheading: ${resume.personalInfo.subheading}`
    });

    // Work Experience
    for (const exp of resume.experience) {
      const expContent = `Work Experience:\nRole: ${exp.role}\nCompany: ${exp.company}\nPeriod: ${exp.period}\nHighlights:\n${exp.highlights.map((h: string) => `- ${h}`).join('\n')}\nSkills Used: ${exp.skills.join(', ')}`;
      chunks.push({ source: 'resume', content: expContent });
    }

    // Projects
    for (const proj of resume.projects) {
      const projContent = `Project Highlight:\nTitle: ${proj.title}\nSubtitle: ${proj.subtitle}\nDescription: ${proj.description}\nKey Metrics: ${proj.metrics.join(', ')}\nTech Stack: ${proj.techStack.join(', ')}`;
      chunks.push({ source: 'resume', content: projContent });
    }

    // Publications
    for (const pub of resume.publications) {
      const pubContent = `Academic Publication:\nTitle: ${pub.title}\nJournal: ${pub.journal} (${pub.year})\nStatus: ${pub.status}${pub.doi ? `\nDOI: ${pub.doi}` : ''}`;
      chunks.push({ source: 'resume', content: pubContent });
    }

    // Certifications
    for (const cert of resume.certifications) {
      const certContent = `Professional Certification:\nCertification Name: ${cert.name}\nIssuer: ${cert.issuer} (${cert.year})`;
      chunks.push({ source: 'resume', content: certContent });
    }

    // Leadership / Community
    for (const lead of resume.leadership) {
      const leadContent = `Leadership & Open Source:\nTitle: ${lead.title}\nDescription: ${lead.description}`;
      chunks.push({ source: 'resume', content: leadContent });
    }
  }

  console.log(`Generating embeddings and indexing ${chunks.length} text chunks into Neon PostgreSQL...`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`[${i + 1}/${chunks.length}] Embedding chunk from "${chunk.source}"...`);
    
    try {
      const embedding = await getEmbedding(chunk.content);
      const embeddingStr = `[${embedding.join(',')}]`;
      const id = crypto.randomUUID();

      // Write via raw SQL since vector type is custom
      await prisma.$executeRawUnsafe(
        'INSERT INTO "DocumentChunk" (id, source, content, embedding) VALUES ($1, $2, $3, $4::vector)',
        id,
        chunk.source,
        chunk.content,
        embeddingStr
      );
    } catch (err) {
      console.error(`[ERROR] Failed to index chunk ${i + 1}:`, err);
    }
  }

  console.log('Embedding index update complete!');
  await prisma.$disconnect();
}

main().catch(console.error);
