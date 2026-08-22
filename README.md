# Signal Tools

Signal Tools is an SEO-first Astro utility suite for small technical marketing and development jobs. The five tools are browser-first, explain their inputs, and keep the output copy-ready:

- `/utm-builder/` — build and validate campaign URLs.
- `/llm-cost-calculator/` — estimate token usage and compare model costs.
- `/cron-generator/` — generate, explain, and preview cron schedules.
- `/schema-generator/` — create JSON-LD for common Schema.org types.
- `/favicon-generator/` — create a text-based SVG favicon and install snippet.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run check
npm test
npm run build
npm run test:e2e
```

The e2e suite starts an isolated Astro dev server on port `45321` to avoid collisions with other local projects.

## Cloudflare Workers

This project uses Astro’s current Cloudflare Workers adapter. Build first, then deploy the generated Wrangler configuration:

```bash
npm run build
npx wrangler login
npm run deploy
```

The build generates `dist/server/wrangler.json`; the deploy script uses that file so the worker and `dist/client` assets stay aligned.

## Research

The opportunity review, source links, verification caveats, and prioritization are in [`research/market-opportunity.md`](research/market-opportunity.md). The selection is a probability-weighted product decision, not a guarantee of ranking or traffic.
