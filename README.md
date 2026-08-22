# JSON Lens

JSON Lens is a focused, SEO-first Astro utility for formatting, validating, safely repairing, comparing, and inspecting JSON. It runs entirely in the browser: paste or drop a payload, find a syntax error, compare structure, explore the tree, then copy or download the result.

## Local development

```bash
npm install
npm run dev
```

Checks used for the production handoff:

```bash
npm run check
npm test
npm run build
npm run test:e2e
```

The Playwright suite starts an isolated Astro dev server on port `45321` so it does not collide with other local projects.

## Cloudflare Workers

The site uses Astro's Cloudflare Workers adapter. Build first, then deploy the generated Wrangler configuration:

```bash
npm run build
npx wrangler login
npm run deploy
```

The build generates `dist/server/wrangler.json`; the deploy script uses that file so the worker and `dist/client` assets stay aligned.

## Research

The opportunity review and product decision are in [`research/market-opportunity.md`](research/market-opportunity.md). It compares six candidate categories and documents the limits of public keyword estimates, Google Trends access, and direct Ahrefs verification. The selection is a probability-weighted product decision, not a promise of rankings or traffic.
