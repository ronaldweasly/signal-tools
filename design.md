# Design — JSON Lens

JSON Lens is a focused developer workbench, not a directory of unrelated utilities. The design system should make the core loop feel immediate: paste, understand, repair, compare, and leave with a trustworthy result.

## Genre

Modern-minimal developer tooling with an instrumented-terminal tone.

## Macrostructure family

- App pages: **Component Playground** — the live editor, result, and tree/compare previews are the page's primary content.
- Content pages: Long Document — research and about pages stay quiet, readable, and source-led.

## Theme

- `--color-paper` — `oklch(17% 0.025 160)`
- `--color-paper-2` — `oklch(21% 0.028 160)`
- `--color-paper-3` — `oklch(26% 0.032 160)`
- `--color-code` — `oklch(13% 0.025 160)`
- `--color-ink` — `oklch(94% 0.018 120)`
- `--color-ink-soft` — `oklch(82% 0.025 145)`
- `--color-muted` — `oklch(68% 0.035 150)`
- `--color-rule` — `oklch(34% 0.04 155)`
- `--color-accent` — `oklch(80% 0.17 119)`
- `--color-accent-ink` — `oklch(18% 0.045 140)`
- `--color-focus` — `oklch(88% 0.14 104)`

## Typography

- Display: Geist, 600–700, tight but never colliding.
- Body: IBM Plex Sans, 400–600, readable prose.
- Mono: JetBrains Mono, 400–600, JSON and instrument labels.
- Three families maximum; all declarations consume tokens from `src/styles/tokens.css`.

## Interaction stance

- Local-first: no pasted JSON upload or remote fetch by default.
- Silent success when the visible result already proves the action.
- Error states explain what broke, where, and what to try next.
- Repair is reversible and offers an explicit undo path.
- Focus rings are instant; hover never carries functionality alone.
- Reduced motion disables spatial motion and preserves state changes.

## Product parity priorities

1. Make errors easier to locate than a plain textarea: line numbers, highlighted line, and actionable message.
2. Match the everyday file/example/format/minify/repair loop without leaving the page.
3. Make inspection useful: expand/collapse, search, stable paths, and copyable values.
4. Add structured comparison without turning the product into a generic converter directory.
5. Make privacy, standards behavior, and SEO claims explicit and verifiable.

## Shared page rules

- The root route owns the complete JSON workflow.
- Research and About remain supporting pages, not competing tool surfaces.
- No fabricated usage metrics, speed claims, testimonials, or ranking promises.
- No fake browser/IDE chrome, no icon library mixing, no decorative gradients on text.
