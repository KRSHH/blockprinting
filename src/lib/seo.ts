import { SITE } from '../config/site';

/**
 * Normalizes any path or URL into a strict, canonical absolute URL
 * with enforced trailing slash (matching astro.config.ts & Cloudflare Assets).
 */
export function buildCanonicalUrl(pathname: string, siteUrl: string = SITE.url): string {
  const base = siteUrl.replace(/\/+$/, '');
  const cleanPath = pathname.split('?')[0]?.split('#')[0] ?? '/';

  // Keep file extensions (e.g. .xml, .txt, .png, .html) without trailing slash
  if (/\.[a-z0-9]+$/i.test(cleanPath)) {
    return `${base}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
  }

  const normalized = cleanPath === '/' ? '/' : `/${cleanPath.replace(/^\/+|\/+$/g, '')}/`;
  return `${base}${normalized}`;
}

export function buildAbsoluteUrl(pathOrUrl: string, siteUrl: string = SITE.url): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  const base = siteUrl.replace(/\/+$/, '');
  return `${base}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function formatTitle(pageTitle?: string, isHome = false): string {
  if (isHome || !pageTitle) {
    return SITE.title;
  }
  if (pageTitle.includes(SITE.name)) {
    return pageTitle;
  }
  return SITE.titleTemplate.replace('%s', pageTitle);
}

export function estimateReadingTime(markdownBody: string): {
  words: number;
  minutes: number;
  isoDuration: string;
} {
  const plainText = markdownBody
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = plainText ? plainText.split(' ').length : 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return {
    words,
    minutes,
    isoDuration: `PT${minutes}M`,
  };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
