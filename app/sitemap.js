import { PROJECTS } from './data/projects.js';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelmutiny.com';

  const staticRoutes = ['', '/works', '/services', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/services' || route === '/works' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : (route === '/services' || route === '/works' ? 0.9 : 0.8),
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: `${baseUrl}/works/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
