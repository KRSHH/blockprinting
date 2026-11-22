import type {
  Article,
  BreadcrumbList,
  CollectionPage,
  FAQPage,
  Graph,
  HowTo,
  Organization,
  Person,
  ProfilePage,
  Thing,
  WebPage,
  WebSite,
} from 'schema-dts';
import { SITE } from '../config/site';
import { buildAbsoluteUrl, buildCanonicalUrl } from './seo';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStepInput {
  name: string;
  text: string;
}

export interface SchemaPageOptions {
  pathname: string;
  title: string;
  description: string;
  image?: string;
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ProfilePage';
  datePublished?: Date;
  dateModified?: Date;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  howTo?: {
    name: string;
    description: string;
    totalTime?: string;
    steps: HowToStepInput[];
  };
  article?: {
    headline: string;
    description: string;
    datePublished: Date;
    dateModified?: Date;
    authorName?: string;
    authorUrl?: string;
    section?: string;
    keywords?: string[];
    wordCount?: number;
    timeRequired?: string;
  };
}

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const AUTHOR_ID = `${SITE.url}/#author`;

export function buildSchemaGraph(options: SchemaPageOptions): Graph {
  const canonicalUrl = buildCanonicalUrl(options.pathname);
  const pageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const imageUrl = buildAbsoluteUrl(options.image ?? SITE.defaultOgImage);

  const authorPerson: Person = {
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: SITE.author.name,
    givenName: SITE.author.givenName,
    familyName: SITE.author.familyName,
    url: SITE.author.url,
    jobTitle: SITE.author.jobTitle,
    description: SITE.author.bio,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Union College',
    },
    knowsAbout: [
      'Hand Block Printing',
      'Bagru Dabu Mud-Resist Printing',
      'Natural Dyes and Mordants',
      'Woodblock Carving',
      'Ethical Textile Manufacturing',
      'Artisan Design Rights',
      'Indian Craft Heritage',
    ],
    sameAs: [...SITE.author.sameAs],
  };

  const organization: Organization = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    founder: { '@id': AUTHOR_ID },
    logo: {
      '@type': 'ImageObject',
      url: buildAbsoluteUrl(SITE.logoPath),
    },
    sameAs: [...SITE.sameAs],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'editorial',
    },
  };

  const website: WebSite = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
    author: { '@id': AUTHOR_ID },
    publisher: { '@id': ORG_ID },
  };

  const webPage: WebPage | CollectionPage | ProfilePage = {
    '@type': options.pageType ?? 'WebPage',
    '@id': pageId,
    url: canonicalUrl,
    name: options.title,
    description: options.description,
    inLanguage: SITE.language,
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': AUTHOR_ID },
    ...(options.pageType === 'ProfilePage' ? { mainEntity: { '@id': AUTHOR_ID } } : {}),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: '1200',
      height: '630',
    },
    ...(options.datePublished ? { datePublished: options.datePublished.toISOString() } : {}),
    ...(options.dateModified ? { dateModified: options.dateModified.toISOString() } : {}),
    ...(options.breadcrumbs && options.breadcrumbs.length > 0
      ? { breadcrumb: { '@id': breadcrumbId } }
      : {}),
  };

  const graph: Thing[] = [authorPerson, organization, website, webPage];

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    const breadcrumbList: BreadcrumbList = {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: options.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: buildCanonicalUrl(crumb.href),
      })),
    };
    graph.push(breadcrumbList);
  }

  if (options.article) {
    const articleNode: Article = {
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      isPartOf: { '@id': pageId },
      mainEntityOfPage: { '@id': pageId },
      headline: options.article.headline,
      description: options.article.description,
      image: [imageUrl],
      inLanguage: SITE.language,
      datePublished: options.article.datePublished.toISOString(),
      dateModified: (options.article.dateModified ?? options.article.datePublished).toISOString(),
      author: { '@id': AUTHOR_ID },
      publisher: { '@id': ORG_ID },
      ...(options.article.section ? { articleSection: options.article.section } : {}),
      ...(options.article.keywords?.length ? { keywords: options.article.keywords.join(', ') } : {}),
      ...(options.article.wordCount ? { wordCount: options.article.wordCount } : {}),
      ...(options.article.timeRequired ? { timeRequired: options.article.timeRequired } : {}),
    };
    graph.push(articleNode);
  }

  if (options.faqs && options.faqs.length > 0) {
    const faqNode: FAQPage = {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: options.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    graph.push(faqNode);
  }

  if (options.howTo && options.howTo.steps.length > 0) {
    const howToNode: HowTo = {
      '@type': 'HowTo',
      '@id': `${canonicalUrl}#howto`,
      name: options.howTo.name,
      description: options.howTo.description,
      ...(options.howTo.totalTime ? { totalTime: options.howTo.totalTime } : {}),
      step: options.howTo.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    };
    graph.push(howToNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
