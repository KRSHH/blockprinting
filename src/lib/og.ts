import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../config/site';

let cachedFonts: Array<{ name: string; data: Buffer; weight: 400 | 700; style: 'normal' }> | null =
  null;

async function loadFonts() {
  if (cachedFonts) return cachedFonts;

  const root = process.cwd();
  const [interRegular, interBold, newsreaderBold] = await Promise.all([
    readFile(path.join(root, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff')),
    readFile(path.join(root, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff')),
    readFile(
      path.join(root, 'node_modules/@fontsource/newsreader/files/newsreader-latin-700-normal.woff')
    ),
  ]);

  cachedFonts = [
    { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
    { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
    { name: 'Newsreader', data: newsreaderBold, weight: 700, style: 'normal' },
  ];

  return cachedFonts;
}

export interface OgImageOptions {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

export async function renderOgImagePng({
  title,
  subtitle = SITE.description,
  eyebrow = 'BLOCKPRINTING.ORG',
}: OgImageOptions): Promise<Uint8Array> {
  const fonts = await loadFonts();

  const truncatedTitle = title.length > 82 ? `${title.slice(0, 79).trim()}...` : title;
  const truncatedSub = subtitle.length > 150 ? `${subtitle.slice(0, 147).trim()}...` : subtitle;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#FAF7F2',
          color: '#1A1816',
          border: '16px solid #1B365D',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '18px',
                            height: '18px',
                            backgroundColor: '#B5452E',
                            borderRadius: '3px',
                          },
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '20px',
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            color: '#1B365D',
                            textTransform: 'uppercase',
                          },
                          children: eyebrow,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: '#57524A',
                    },
                    children: 'blockprinting.org',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: 'Newsreader',
                      fontSize: truncatedTitle.length > 52 ? '54px' : '64px',
                      fontWeight: 700,
                      lineHeight: 1.12,
                      color: '#1A1816',
                    },
                    children: truncatedTitle,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      lineHeight: 1.45,
                      color: '#57524A',
                      maxWidth: '960px',
                    },
                    children: truncatedSub,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '2px solid #DFD6C7',
                paddingTop: '22px',
                fontSize: '19px',
                color: '#1B365D',
                fontWeight: 700,
              },
              children: [
                {
                  type: 'span',
                  props: {
                    children: 'Traditional Hand Block Printing, Woodblocks & Natural Dyes',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { color: '#B5452E' },
                    children: 'Guide & Archive',
                  },
                },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });

  return resvg.render().asPng();
}
