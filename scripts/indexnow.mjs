import { readFile } from 'node:fs/promises';
import path from 'node:path';

const HOST = 'blockprinting.org';
const KEY = 'b10ckpr1nt1ng0rg5e0m4xx1ng2026key';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.resolve(process.cwd(), 'dist/sitemap-0.xml');

const xml = await readFile(SITEMAP_PATH, 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error('No URLs found in dist/sitemap-0.xml. Run `npm run build` first.');
  process.exit(1);
}

console.log(`Submitting ${urlList.length} URLs to IndexNow for ${HOST}...`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`IndexNow response: ${res.status} ${res.statusText}`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
