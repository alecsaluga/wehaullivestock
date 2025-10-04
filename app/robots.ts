import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://wehavllivestock.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
