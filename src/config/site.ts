export const SITE = {
  name: 'Blockprinting',
  legalName: 'Blockprinting.org — Jeremy Fritzhand',
  url: 'https://blockprinting.org',
  domain: 'blockprinting.org',
  title: 'Blockprinting by Jeremy Fritzhand — Hand Block Printing & Craft',
  titleTemplate: '%s | Blockprinting.org',
  description:
    'Field notes, technical guides, and perspectives on traditional hand block printing, Bagru dabu mud-resist, natural dyes, and ethical craft by Jeremy Fritzhand.',
  locale: 'en_US',
  language: 'en',
  themeColor: '#1B365D',
  backgroundColor: '#FAF7F2',
  email: 'hello@blockprinting.org',
  twitterHandle: '@fritzhand',
  githubUrl: 'https://github.com/KRSHH/blockprinting',
  logoPath: '/favicon.svg',
  defaultOgImage: '/og/home.png',
  indexNowKey: 'b10ckpr1nt1ng0rg5e0m4xx1ng2026key',
  author: {
    name: 'Jeremy Fritzhand',
    givenName: 'Jeremy',
    familyName: 'Fritzhand',
    jobTitle: 'Founder of Studio Bagru & Fritz MFG; Hand Block Printing Educator & Craft Entrepreneur',
    bio: 'Jeremy Fritzhand has worked alongside hand block printers, woodblock carvers, and natural dyers in Bagru, Rajasthan since 2010. After arriving as a Minerva Fellow from Union College, he founded Studio Bagru and Fritz MFG to build transparent, ethical bridges between rural Indian artisans and global independent designers.',
    url: 'https://blockprinting.org/about/',
    sameAs: [
      'https://fritzhand.com',
      'https://fritzmfg.com',
      'https://studiobagru.com',
      'https://github.com/fritzhand',
    ],
  },
  sameAs: [
    'https://fritzhand.com',
    'https://fritzmfg.com',
    'https://studiobagru.com',
    'https://github.com/fritzhand',
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'About Jeremy', href: '/about/' },
  ],
  aiCrawlers: {
    allowSearchBots: true,
    allowTrainingBots: true,
  },
} as const;

export type NavItem = (typeof SITE.nav)[number];
