import { NextResponse } from 'next/server';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blogs';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const tag = searchParams.get('tag');

    if (slug) {
      const post = getBlogPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    if (tag) {
      const filtered = BLOG_POSTS.filter(p => p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
      return NextResponse.json(filtered);
    }

    return NextResponse.json(BLOG_POSTS);
  } catch (err: unknown) {
    console.error('Blog API Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
