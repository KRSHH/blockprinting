import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  const sections = guides.map((g) => {
    const faqs = g.data.faqs?.length
      ? `\n\n### FAQs\n\n${g.data.faqs.map((f) => `**${f.question}**\n${f.answer}`).join('\n\n')}`
      : '';

    return [
      `## ${g.data.title}`,
      `URL: ${SITE.url}/guides/${g.id}/`,
      `Category: ${g.data.category}`,
      `Published: ${g.data.publishedAt.toISOString().slice(0, 10)}`,
      `Summary: ${g.data.description}`,
      '',
      (g.body ?? '').trim(),
      faqs,
    ].join('\n');
  });

  const body = `# ${SITE.name} — Full Text Corpus\n\n> ${SITE.description}\n\n${sections.join('\n\n---\n\n')}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
