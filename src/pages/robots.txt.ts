import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

export const GET: APIRoute = () => {
  const aiSearchBots = ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot', 'Applebot'];
  const aiTrainingBots = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot'];

  const lines: string[] = [
    '# robots.txt for Blockprinting.org',
    'User-agent: *',
    'Allow: /',
    'Disallow: /404',
    '',
  ];

  for (const bot of aiSearchBots) {
    lines.push(
      `User-agent: ${bot}`,
      SITE.aiCrawlers.allowSearchBots ? 'Allow: /' : 'Disallow: /',
      ''
    );
  }

  for (const bot of aiTrainingBots) {
    lines.push(
      `User-agent: ${bot}`,
      SITE.aiCrawlers.allowTrainingBots ? 'Allow: /' : 'Disallow: /',
      ''
    );
  }

  lines.push(
    `Host: ${SITE.url}`,
    `Sitemap: ${SITE.url}/sitemap-index.xml`,
    `# AI directory: ${SITE.url}/llms.txt`,
    ''
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
