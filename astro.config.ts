import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://blockprinting.org',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  fonts: [
    {
      name: 'Source Serif 4',
      cssVariable: '--font-book',
      provider: fontProviders.google(),
      weights: [400, 600, 700],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
    },
    {
      name: 'Archivo Narrow',
      cssVariable: '--font-display',
      provider: fontProviders.google(),
      weights: [600, 700],
      styles: ['normal'],
      fallbacks: ['Arial Narrow', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      name: 'IBM Plex Sans',
      cssVariable: '--font-ui',
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ['normal'],
      fallbacks: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    },
  ],
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/og/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      namespaces: {
        news: false,
        video: false,
        image: true,
        xhtml: true,
      },
      serialize(item) {
        if (item.url === 'https://blockprinting.org/') {
          item.priority = 1.0;
          item.changefreq = 'daily' as any;
        } else if (
          item.url.includes('/guides/') ||
          item.url.includes('/glossary/') ||
          item.url.includes('/tools/')
        ) {
          item.priority = 0.9;
          item.changefreq = 'weekly' as any;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
