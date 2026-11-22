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
  const [serifRegular, serifBold, displayBold] = await Promise.all([
    readFile(
      path.join(
        root,
        'node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff'
      )
    ),
    readFile(
      path.join(
        root,
        'node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-700-normal.woff'
      )
    ),
    readFile(
      path.join(
        root,
        'node_modules/@fontsource/archivo-narrow/files/archivo-narrow-latin-700-normal.woff'
      )
    ),
  ]);

  cachedFonts = [
    { name: 'Source Serif 4', data: serifRegular, weight: 400, style: 'normal' },
    { name: 'Source Serif 4', data: serifBold, weight: 700, style: 'normal' },
    { name: 'Archivo Narrow', data: displayBold, weight: 700, style: 'normal' },
  ];

  return cachedFonts;
}

export interface OgImageOptions {
  title: string;
  subtitle?: string;
  section?: string;
}

export async function renderOgImagePng({
  title,
  subtitle = SITE.description,
  section = 'BLOCKPRINTING.ORG',
}: OgImageOptions): Promise<Uint8Array> {
  const fonts = await loadFonts();

  const truncatedTitle = title.length > 76 ? `${title.slice(0, 73).trim()}...` : title;
  const truncatedSub = subtitle.length > 155 ? `${subtitle.slice(0, 152).trim()}...` : subtitle;

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
          padding: '64px 76px',
          backgroundColor: '#FFFFFF',
          color: '#111110',
          fontFamily: 'Source Serif 4',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#111110',
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'Archivo Narrow',
                      fontSize: '22px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#111110',
                    },
                    children: [
                      { type: 'span', props: { children: section } },
                      {
                        type: 'span',
                        props: {
                          style: { color: '#A31C1C' },
                          children: 'JEREMY FRITZHAND',
                        },
                      },
                    ],
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
                      fontFamily: 'Archivo Narrow',
                      fontSize: truncatedTitle.length > 48 ? '58px' : '68px',
                      fontWeight: 700,
                      lineHeight: 1.04,
                      textTransform: 'uppercase',
                      color: '#111110',
                    },
                    children: truncatedTitle,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '25px',
                      lineHeight: 1.42,
                      color: '#595955',
                      maxWidth: '980px',
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
                borderTop: '2px solid #111110',
                paddingTop: '18px',
                fontSize: '20px',
                color: '#111110',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    children: 'blockprinting.org — The Living Reference on Hand Block Printing',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { color: '#A31C1C', fontWeight: 700 },
                    children: '1st Edition',
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
