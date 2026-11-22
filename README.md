# Blockprinting.org

Built with **Astro 7**, **Tailwind CSS v4**, and **Cloudflare Workers Static Assets**, engineered for peak technical SEO, Core Web Vitals, and AI search discoverability.

## SEO Batteries Included

- **Astro 7 SSG + Zero JS by Default** — instant TTFB via Cloudflare's global edge
- **Astro 7 Stable Fonts API** — self-hosted `Newsreader`, `Inter`, and `JetBrains Mono` with zero CLS
- **Strict Canonicalization** — `trailingSlash: 'always'`, `force-trailing-slash` in `wrangler.jsonc`, and `www` → apex 301 redirect in `public/_redirects`
- **Unified Schema.org `@graph` JSON-LD** — `Organization`, `WebSite`, `WebPage` / `CollectionPage` / `AboutPage`, `BreadcrumbList`, `Article`, `FAQPage`, and `HowTo`
- **Build-Time Dynamic OG Images** — 1200×630 PNGs generated per route via `satori` + `@resvg/resvg-js`
- **XML Sitemap + RSS Feed** — `@astrojs/sitemap` + `@astrojs/rss` with auto-discovery tags
- **AI Search / GEO Readiness** — dynamic `/llms.txt`, `/llms-full.txt`, and AI-aware `/robots.txt`
- **Speculation Rules API + Astro Prefetch** — prerendered internal navigation
- **IndexNow Instant Indexing** — `npm run indexnow` pings Bing/Yandex/Seznam from the built sitemap
- **Automated SEO Audit** — `npm run seo:audit` validates every built HTML page and edge asset
- **Security & Caching Headers** — HSTS, immutable asset caching, `nosniff`, `COOP` in `public/_headers`

## Commands

```bash
npm run dev        # Start local Astro dev server
npm run build      # Typecheck (astro check) + production build
npm run seo:audit  # Validate built HTML, Schema.org, OG images, sitemap, robots, llms.txt
npm run cf:dev     # Preview via Wrangler locally
npm run cf:deploy  # Build and deploy to Cloudflare Workers (blockprinting.org)
npm run indexnow   # Submit sitemap URLs to IndexNow
```
