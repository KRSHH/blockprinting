import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  const guideLinks = guides
    .map(
      (g) =>
        `- [${g.data.title}](${SITE.url}/guides/${g.id}/) (by ${g.data.author}): ${g.data.description}`
    )
    .join('\n');

  const content = `# ${SITE.name} — by ${SITE.author.name}

> ${SITE.description}

Author: ${SITE.author.name} (${SITE.author.jobTitle})

## Core Pages

- [Home](${SITE.url}/): Field notes on hand block printing, Bagru dabu mud-resist, natural dyes, and ethical craft by Jeremy Fritzhand.
- [Guides](${SITE.url}/guides/): Complete library of practical block printing tutorials and craft essays by Jeremy Fritzhand.
- [About Jeremy Fritzhand](${SITE.url}/about/): Background on Jeremy Fritzhand, Studio Bagru, Mahila Print, and Fritz MFG.

## Guides by Jeremy Fritzhand

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
