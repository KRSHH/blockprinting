export const SITE = {
  name: 'Blockprinting',
  legalName: 'Blockprinting.org',
  url: 'https://blockprinting.org',
  domain: 'blockprinting.org',
  title: 'Blockprinting — Hand Block Printing, Woodblocks & Natural Dyes',
  titleTemplate: '%s | Blockprinting.org',
  description:
    'The authoritative resource on hand block printing: carved woodblocks, natural dyes, mordants, textile heritage, tools, and step-by-step printmaking guides.',
  locale: 'en_US',
  language: 'en',
  themeColor: '#1B365D',
  backgroundColor: '#FAF7F2',
  email: 'hello@blockprinting.org',
  twitterHandle: '@blockprinting',
  githubUrl: 'https://github.com/KRSHH/blockprinting',
  logoPath: '/favicon.svg',
  defaultOgImage: '/og/home.png',
  indexNowKey: 'b10ckpr1nt1ng0rg5e0m4xx1ng2026key',
  author: {
    name: 'Blockprinting Editorial',
    url: 'https://blockprinting.org/about/',
  },
  sameAs: ['https://github.com/KRSHH/blockprinting'],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'About', href: '/about/' },
  ],
  aiCrawlers: {
    allowSearchBots: true,
    allowTrainingBots: true,
  },
} as const;

export type NavItem = (typeof SITE.nav)[number];
