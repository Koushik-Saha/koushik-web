import { NextResponse } from 'next/server';
import resumeJson from '@/data/resume.json';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section');

    if (section && section in resumeJson) {
      const sectionData = resumeJson[section as keyof typeof resumeJson];
      return NextResponse.json({ [section]: sectionData });
    }

    return NextResponse.json(resumeJson);
  } catch (err: unknown) {
    console.error('Portfolio API Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
