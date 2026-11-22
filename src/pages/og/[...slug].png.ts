import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../../config/site';
import { renderOgImagePng } from '../../lib/og';

interface OgProps {
  title: string;
  subtitle: string;
  section: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = await getCollection('guides', ({ data }) => !data.draft);

  const staticRoutes = [
    {
      params: { slug: 'home' },
      props: {
        title: 'Block Printing — The Living Reference',
        subtitle: SITE.description,
        section: 'BLOCKPRINTING.ORG',
      },
    },
    {
      params: { slug: 'guides' },
      props: {
        title: 'The Encyclopedia — Nine Chapters',
        subtitle:
          'Nine illustrated chapters on woodblocks, Bagru dabu mud-resist, natural dyes, fabric care, and ethical sourcing.',
        section: 'ENCYCLOPEDIA',
      },
    },
    {
      params: { slug: 'archive' },
      props: {
        title: 'Photographic Field Archive (2010–2026)',
        subtitle:
          'Sixteen documentary photographs from Bagru, Rajasthan—Chhipa master printers, dabu indigo vats, teak blocks, and Mahila Print.',
        section: 'PHOTOGRAPHIC ARCHIVE',
      },
    },
    {
      params: { slug: 'glossary' },
      props: {
        title: 'Open Glossary of Block Printing',
        subtitle:
          'Twenty-four foundational workshop terms from Bagru, Sanganer, and Kutch—rekh, datta, gadh, dabu, saaj, harda, and syahi.',
        section: 'GLOSSARY',
      },
    },
    {
      params: { slug: 'tools' },
      props: {
        title: 'Block Repeat & Fabric Yardage Calculator',
        subtitle:
          'Calculate hand strikes per meter, carved block count, and artisan carving days for hand block printing.',
        section: 'STUDIO TOOLS',
      },
    },
    {
      params: { slug: 'about' },
      props: {
        title: 'About Jeremy Fritzhand',
        subtitle:
          'Founder of Studio Bagru and Fritz MFG—documenting traditional Indian hand block printing and ethical craft since 2010.',
        section: 'AUTHOR',
      },
    },
  ];

  const guideRoutes = guides.map((guide) => ({
    params: { slug: `guides/${guide.id}` },
    props: {
      title: guide.data.title,
      subtitle: guide.data.description,
      section: guide.data.category.toUpperCase(),
    },
  }));

  return [...staticRoutes, ...guideRoutes];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle, section } = props as OgProps;
  const png = await renderOgImagePng({ title, subtitle, section });

  return new Response(Buffer.from(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
