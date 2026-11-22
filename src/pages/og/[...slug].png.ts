import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../../config/site';
import { renderOgImagePng } from '../../lib/og';

interface OgProps {
  title: string;
  subtitle: string;
  eyebrow: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = await getCollection('guides', ({ data }) => !data.draft);

  const staticRoutes = [
    {
      params: { slug: 'home' },
      props: {
        title: 'The Living Archive of Traditional Hand Block Printing',
        subtitle: SITE.description,
        eyebrow: 'BLOCKPRINTING.ORG',
      },
    },
    {
      params: { slug: 'guides' },
      props: {
        title: 'Block Printing Guides & Tutorials',
        subtitle:
          'Step-by-step references on carved woodblocks, botanical dyes, mordants, and studio technique.',
        eyebrow: 'GUIDES',
      },
    },
    {
      params: { slug: 'about' },
      props: {
        title: 'About Blockprinting.org',
        subtitle:
          'Documenting traditional hand block printing techniques, carved woodblocks, and natural dye craft.',
        eyebrow: 'ABOUT',
      },
    },
  ];

  const guideRoutes = guides.map((guide) => ({
    params: { slug: `guides/${guide.id}` },
    props: {
      title: guide.data.title,
      subtitle: guide.data.description,
      eyebrow: guide.data.category,
    },
  }));

  return [...staticRoutes, ...guideRoutes];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle, eyebrow } = props as OgProps;
  const png = await renderOgImagePng({ title, subtitle, eyebrow });

  return new Response(Buffer.from(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
