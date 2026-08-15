import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // block indexers from security analytics console
    },
    sitemap: 'https://www.koushiksaha.dev/sitemap.xml',
  };
}
