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
        title: 'Hand Block Printing, Natural Dyes & the Makers Keeping Craft Alive',
        subtitle: SITE.description,
        eyebrow: 'JEREMY FRITZHAND · BLOCKPRINTING.ORG',
      },
    },
    {
      params: { slug: 'guides' },
      props: {
        title: 'Block Printing Guides & Field Notes',
        subtitle:
          'Workshop-tested references by Jeremy Fritzhand on woodblocks, Bagru dabu mud-resist, natural dyes, and ethical craft.',
        eyebrow: 'GUIDES BY JEREMY FRITZHAND',
      },
    },
    {
      params: { slug: 'about' },
      props: {
        title: 'About Jeremy Fritzhand',
        subtitle:
          'Founder of Studio Bagru and Fritz MFG—documenting traditional Indian hand block printing and ethical craft since 2010.',
        eyebrow: 'ABOUT THE AUTHOR',
      },
    },
  ];

  const guideRoutes = guides.map((guide) => ({
    params: { slug: `guides/${guide.id}` },
    props: {
      title: guide.data.title,
      subtitle: guide.data.description,
      eyebrow: `${guide.data.category} · BY ${guide.data.author.toUpperCase()}`,
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
