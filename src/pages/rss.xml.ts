import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

export const GET: APIRoute = async (context) => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: [
      `<language>${SITE.language}</language>`,
      `<atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />`,
    ].join(''),
    items: guides.map((guide) => ({
      title: guide.data.title,
      description: guide.data.description,
      pubDate: guide.data.publishedAt,
      link: `/guides/${guide.id}/`,
      categories: [guide.data.category, ...guide.data.tags],
      author: guide.data.author,
    })),
  });
};
