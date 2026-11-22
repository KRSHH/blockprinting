import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  const guideLinks = guides
    .map((g) => `- [${g.data.title}](${SITE.url}/guides/${g.id}/): ${g.data.description}`)
    .join('\n');

  const content = `# ${SITE.name}

> ${SITE.description}

## Core Pages

- [Home](${SITE.url}/): Overview of hand block printing, carved woodblocks, natural dyes, and regional traditions.
- [Guides](${SITE.url}/guides/): Complete library of practical block printing tutorials and craft references.
- [About](${SITE.url}/about/): Editorial mission and documentation standards of ${SITE.legalName}.

## Guides

${guideLinks}

## Machine-Readable Feeds

- [Full Text Corpus (llms-full.txt)](${SITE.url}/llms-full.txt)
- [XML Sitemap](${SITE.url}/sitemap-index.xml)
- [RSS Feed](${SITE.url}/rss.xml)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
