import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order
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

## Core Reference Pages

- [Encyclopedia Home](${SITE.url}/): Visual encyclopedia of hand block printing, Bagru dabu mud-resist, natural dyes, and cultural IP by Jeremy Fritzhand.
- [Photographic Archive](${SITE.url}/archive/): 16 documentary photographs from Bagru, Rajasthan (2010–2026).
- [Open Glossary](${SITE.url}/glossary/): 24 foundational workshop terms (rekh, datta, gadh, dabu, saaj, harda, syahi, kunda, and more).
- [Block Repeat & Yardage Calculator](${SITE.url}/tools/yardage-calculator/): Interactive studio tool estimating hand strikes per meter and carving days.
- [About Jeremy Fritzhand](${SITE.url}/about/): Entity home and background on Studio Bagru, Mahila Print, and Fritz MFG.

## Chapters by Jeremy Fritzhand

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
