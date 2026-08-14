import blogsData from './blogs.json';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = blogsData as BlogPost[];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
