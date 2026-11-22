import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order
  );

  const sections = guides.map((g) => {
    const faqs = g.data.faqs?.length
      ? `\n\n### Common Questions\n\n${g.data.faqs.map((f) => `Q. ${f.question}\nA. ${f.answer}`).join('\n\n')}`
      : '';

    return [
      `## ${g.data.title}`,
      `Author: ${g.data.author}`,
      `URL: ${SITE.url}/guides/${g.id}/`,
      `Section: ${g.data.category}`,
      `Published: ${g.data.publishedAt.toISOString().slice(0, 10)}`,
      `Summary: ${g.data.description}`,
      '',
      (g.body ?? '').trim(),
      faqs,
    ].join('\n');
  });

  const body = `# ${SITE.name} — Full Text Corpus by ${SITE.author.name}\n\n> ${SITE.description}\n\n${sections.join('\n\n---\n\n')}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
