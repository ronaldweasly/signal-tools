# JSON Lens — Build Specification

## Product shape

One focused Astro site for a single recurring intent: make JSON valid, readable, and inspectable.

- `/` — JSON formatter, validator, minifier, error locator, stats panel, and searchable tree inspector.
- `/research/` — evidence and caveats behind the product decision.
- `/about/` — product boundary and privacy behavior.

There are no unrelated utility routes. The old suite remains recoverable in Git history, but it is not part of the deployed product.

## Technical decisions

- Astro 7 with TypeScript and the Cloudflare Workers adapter.
- Server-rendered explanatory copy and FAQ content; browser-only JSON transformation and inspection.
- No database, API keys, analytics dependency, or upload endpoint in v1.
- Pure JSON transformations in `src/lib/json.ts` so parsing, sorting, minification, error locations, and stats are unit-testable.
- Self-hosted Geist, IBM Plex Sans, and JetBrains Mono typography.
- `tokens.css` is the source of truth for color, type, spacing, radius, motion, and z-index tokens.
- Hallmark macrostructure: Component Playground. The editor and tree preview are the primary content, not decorative illustrations.

## Interaction contract

- Format and minify preserve standard JSON semantics; optional key sorting is recursive.
- Invalid input keeps the output safe and explains a line, column, and parser message.
- Tree rendering uses DOM text nodes rather than injecting user input as HTML.
- Copy gives a short “Copied” state; download creates a local `formatted.json` file.
- Inputs remain usable at 320px, 375px, 414px, and 768px widths.
- Focus rings are immediate and visible; reduced motion is respected.

## SEO contract

- Stable canonical URLs for the focused app, research log, and about page.
- Unique title, description, Open Graph metadata, and `WebApplication` JSON-LD.
- Server-rendered explanation, FAQ, and research links around the interactive editor.
- `/sitemap-index.xml`, `/robots.txt`, and `/api/health` are generated routes.
- No fabricated traffic, testimonial, or ranking claims. Evidence and uncertainty live in `research/market-opportunity.md`.

## Verification contract

- `npm run check` — Astro/type checking.
- `npm test` — Vitest unit suite for JSON transformations.
- `npm run build` — production build.
- `npm run test:e2e` — Playwright flow, accessibility landmarks, metadata, mobile overflow, and route smoke tests.
- `git diff --check` — whitespace and patch hygiene before commit.
