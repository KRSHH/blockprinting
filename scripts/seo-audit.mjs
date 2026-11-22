import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

async function walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkHtmlFiles(full)));
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

async function fileExists(relPath) {
  try {
    await access(path.join(DIST_DIR, relPath));
    return true;
  } catch {
    return false;
  }
}

const errors = [];
const warnings = [];

// 1. Verify required technical SEO & Cloudflare assets exist
const requiredFiles = [
  'robots.txt',
  'sitemap-index.xml',
  'sitemap-0.xml',
  'rss.xml',
  'llms.txt',
  'llms-full.txt',
  'manifest.webmanifest',
  'favicon.svg',
  '_headers',
  '_redirects',
  '404.html',
  'og/home.png',
];

for (const file of requiredFiles) {
  if (!(await fileExists(file))) {
    errors.push(`Missing required SEO/edge file in dist/: ${file}`);
  }
}

// 2. Audit every HTML page
const htmlFiles = await walkHtmlFiles(DIST_DIR);
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const filePath of htmlFiles) {
  const rel = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  const html = await readFile(filePath, 'utf8');
  const is404 = rel === '404.html' || rel === '404/index.html';

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  const jsonLdMatch = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  const h1Matches = html.match(/<h1[\s>]/gi) ?? [];

  if (!titleMatch) {
    errors.push(`[${rel}] Missing <title>`);
  } else {
    const title = titleMatch[1].trim();
    if (title.length > 75) warnings.push(`[${rel}] Title length ${title.length} > 75 chars: "${title}"`);
    if (seenTitles.has(title)) {
      errors.push(`[${rel}] Duplicate <title> with ${seenTitles.get(title)}: "${title}"`);
    }
    seenTitles.set(title, rel);
  }

  if (!descMatch) {
    errors.push(`[${rel}] Missing meta description`);
  } else {
    const desc = descMatch[1].trim();
    if (desc.length < 50 || desc.length > 165) {
      warnings.push(`[${rel}] Meta description length ${desc.length} outside 50-165 chars`);
    }
    if (seenDescriptions.has(desc)) {
      errors.push(`[${rel}] Duplicate meta description with ${seenDescriptions.get(desc)}`);
    }
    seenDescriptions.set(desc, rel);
  }

  if (!canonicalMatch) {
    errors.push(`[${rel}] Missing <link rel="canonical">`);
  } else if (!canonicalMatch[1].startsWith('https://blockprinting.org/')) {
    errors.push(`[${rel}] Canonical URL is not absolute HTTPS on blockprinting.org: ${canonicalMatch[1]}`);
  }

  if (!ogImageMatch) {
    errors.push(`[${rel}] Missing og:image`);
  }

  if (!jsonLdMatch) {
    errors.push(`[${rel}] Missing JSON-LD structured data`);
  } else {
    try {
      JSON.parse(jsonLdMatch[1]);
    } catch (e) {
      errors.push(`[${rel}] Invalid JSON-LD syntax: ${e.message}`);
    }
  }

  if (h1Matches.length !== 1) {
    errors.push(`[${rel}] Expected exactly 1 <h1>, found ${h1Matches.length}`);
  }

  if (is404 && !html.includes('noindex')) {
    errors.push(`[${rel}] 404 page should include noindex`);
  }

  // Check images for missing alt attributes
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  for (const img of imgTags) {
    if (!/\balt\s*=/i.test(img)) {
      errors.push(`[${rel}] <img> tag missing alt attribute: ${img.slice(0, 80)}`);
    }
  }
}

console.log(`SEO Audit scanned ${htmlFiles.length} HTML pages and ${requiredFiles.length} core files.`);

if (warnings.length > 0) {
  console.log('\nWarnings:');
  for (const w of warnings) console.log(`  WARN: ${w}`);
}

if (errors.length > 0) {
  console.error('\nErrors:');
  for (const e of errors) console.error(`  FAIL: ${e}`);
  process.exit(1);
}

console.log('ALL SEO CHECKS PASSED.');
