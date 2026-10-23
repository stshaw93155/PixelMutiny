import { PROJECTS } from './data/projects.js';

export default function sitemap() {
  const baseUrl = 'https://pixelmutiny.com';

  const staticRoutes = ['', '/works', '/services', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: `${baseUrl}/works/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
