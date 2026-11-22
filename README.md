# Blockprinting.org — by Jeremy Fritzhand

Built with **Astro 7**, **Tailwind CSS v4**, and **Cloudflare Workers Static Assets**, engineered for peak technical SEO, Core Web Vitals, Google Discover/Images eligibility, and AI search discoverability.

- **Live Site:** https://blockprinting.org/
- **Author & Primary Entity:** Jeremy Fritzhand (Founder of Studio Bagru & Fritz MFG)

---

## North Star Goal & Positioning

1. **Category Ownership:** Whenever anyone searches for **block printing** (and related queries around hand block printing, Bagru, *dabu* mud-resist, carved woodblocks, natural dyes, and ethical Indian textile sourcing), `blockprinting.org` is built to be the #1 authoritative result across Google Search, Google Images, Google Discover, and AI answer engines.
2. **Entity Authority:** Establish **Jeremy Fritzhand** as the unmistakable definitive voice of modern hand block printing—combining cultural stewardship, category-defining presence, and explorer-level first-hand workshop authority (the "De Beers and Columbus of block printing") through consistent `Person` Schema.org identity, first-person Bagru field notes, and cross-linked E-E-A-T authority (`fritzhand.com`, `fritzmfg.com`, `studiobagru.com`, `github.com/fritzhand`).

---

## Visual Asset Checklist (Required for Peak SEO, Images & Discover)

### 1. Brand & Technical SEO Icons (`public/`)
- [ ] Complete icon set: `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png` (`180×180`), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (carved woodblock seal in indigo `#1B365D` & vermilion `#B5452E`)
- [ ] Default social / Knowledge Graph fallback banner (`og-default.png`, `1200×630`)

### 2. Core Editorial Banners (`src/assets/images/`, `>=1200px` wide for Google Discover)
- [ ] Homepage Hero Banner (`hero-bagru-workshop.png`, `1600×900`) — carved teakwood blocks (*rekh*, *datta*, *gadh*) on indigo & madder-dyed cotton on a padded Bagru table
- [ ] Guides Hub Banner (`banner-guides-archive.png`, `1600×600`) — flat-lay of natural dye ingredients (*harda*, madder root, indigo cakes, pomegranate rinds) and carved floral blocks

### 3. Author Portrait (E-E-A-T & Knowledge Panel)
- [ ] Real portrait of **Jeremy Fritzhand** (`jeremy-fritzhand.webp`, `800×800` square + `1200×800` landscape) for `/about/` (`ProfilePage` + `Person.image` JSON-LD), guide author cards, and homepage intro

### 4. Guide Hero Banners (`1600×900`, wired to `Article.image` JSON-LD & OG)
- [ ] `guide-hand-block-printing.png` — Complete Guide to Traditional Hand Block Printing
- [ ] `guide-bagru-dabu.png` — Bagru Dabu Printing: The Art of Mud-Resist Textiles
- [ ] `guide-natural-dyes.png` — Natural Dyes and Mordants for Hand Block Printing
- [ ] `guide-ethical-craft.png` — Ethical Block Printing: Supply Chains & Artisan Rights

### 5. In-Article Educational Diagrams (`1200×800`, Google Images & `HowTo` Rich Results)
- [ ] `diagram-block-anatomy.png` — Anatomy of a 3-block set (*Rekh* outline, *Datta* background, *Gadh* filler)
- [ ] `comparison-bagru-sanganer-ajrakh.png` — Side-by-side swatch comparison of Bagru, Sanganer, and Ajrakh
- [ ] `process-dabu-steps.png` — 5-step *dabu* mud-resist visual strip (Clay → Stamp → Sawdust → Indigo Vat → Wash Reveal)

---

## SEO Batteries Included

- **Astro 7 SSG + Zero JS by Default** — instant TTFB via Cloudflare's global edge
- **Astro 7 Stable Fonts API** — self-hosted `Newsreader`, `Inter`, and `JetBrains Mono` with zero CLS
- **Strict Canonicalization** — `trailingSlash: 'always'`, `force-trailing-slash` in `wrangler.jsonc`, and `www` → apex `301` redirect in `src/worker.ts`
- **Unified Schema.org `@graph` JSON-LD** — `Person` (Jeremy Fritzhand), `Organization`, `WebSite`, `WebPage` / `CollectionPage` / `ProfilePage`, `BreadcrumbList`, `Article`, `FAQPage`, and `HowTo`
- **Build-Time Dynamic OG Images** — 1200×630 PNGs generated per route via `satori` + `@resvg/resvg-js`
- **XML Sitemap + RSS Feed** — `@astrojs/sitemap` + `@astrojs/rss` with auto-discovery tags
- **AI Search / GEO Readiness** — dynamic `/llms.txt`, `/llms-full.txt`, and AI-aware `/robots.txt`
- **Speculation Rules API + Astro Prefetch** — prerendered internal navigation
- **IndexNow Instant Indexing** — `npm run indexnow` pings Bing/Yandex/Seznam from the built sitemap
- **Automated SEO Audit** — `npm run seo:audit` validates every built HTML page and edge asset
- **Security & Caching Headers** — HSTS, immutable asset caching, `nosniff`, `COOP` in `public/_headers`

---

## Commands

```bash
npm run dev        # Start local Astro dev server
npm run build      # Typecheck (astro check) + production build
npm run seo:audit  # Validate built HTML, Schema.org, OG images, sitemap, robots, llms.txt
npm run cf:dev     # Preview via Wrangler locally
npm run cf:deploy  # Build and deploy to Cloudflare Workers (blockprinting.org)
npm run indexnow   # Submit sitemap URLs to IndexNow
```
