# Market Opportunity Research

Research date: 2026-08-22  
Target market: English-language search, with US-first keyword evidence and global utility appeal.

## Executive conclusion

No honest research process can guarantee that a keyword "will trend" or that a new site will rank within six months. Search volume is an estimate, Google Trends is normalized rather than absolute, and ranking depends on authority, product quality, links, indexing, and distribution.

The strongest balanced opportunity is a focused utility suite for developers, marketers, and technical SEOs. The first five builds are:

1. **UTM Builder + QA** — strongest balance of intent, CPC, observed demand, and buildability.
2. **LLM Token & Cost Calculator** — strongest emerging-AI traffic upside; current competitors prove search-led demand.
3. **Cron Expression Generator** — broad developer demand with a low-difficulty signal and a large incumbent proving the use case.
4. **JSON-LD Schema Generator** — smaller head term, but high CPC, low stated competition, and strong SEO/AEO relevance.
5. **Favicon Generator** — stable, visual, browser-based utility with meaningful developer/design demand and a clear differentiation path.

## How the evidence was weighted

- **Demand:** keyword volume ranges and observed competitor visits, not one isolated number.
- **Trend:** Google Trends directionality and current 2026 AI/SEO market signals.
- **Competition:** keyword difficulty when available, incumbent traffic/backlinks, and number of well-established alternatives.
- **Intent:** whether the searcher is trying to complete an action immediately.
- **Buildability:** whether a fast, private, browser-first tool can deliver a meaningfully better experience without paid APIs.
- **Six-month upside:** a relative forecast, not a promise. It assumes clean technical SEO, useful documentation, indexable pages, links/distribution, and continued iteration.

Google Trends is used directionally only: Google says its values are indexed and normalized from 1–100, low-volume terms can appear as 0, and one-off spikes should not be treated as proof of demand. Google Keyword Planner, Ahrefs, Semrush, and third-party sources use different databases, countries, time windows, and clustering rules, so their numbers are not interchangeable.

## Ranked opportunity list

| Overall | Tool opportunity | Demand signal | Competition signal | Six-month traffic upside | Rankability | Decision |
|---:|---|---|---|---:|---:|---|
| 1 | UTM Builder + QA | Semrush shows **12,100 US searches** for “utm builder”; related terms add 2,900 + 1,900 + 2,400. A separate opportunity report estimates 9,100 searches and 20,500 traffic potential. | Existing UTMBuilder.net receives about **82K monthly visits**, ranks around position 2, and has authority/backlinks but not an impregnable moat. | **8.7/10** | **8.4/10** | Build |
| 2 | LLM Token & Cost Calculator | Toolify reports **37.3K monthly visitors** for an LLM token counter and “token counter” traffic around 37.3K in its keyword table. Probedex reports a nearby LLM pricing domain at **207.9K monthly visits**, 63% organic, with “openai api pricing” at 37.3K and “llm token counter” at 1.4K. | Competitive, but much of the market is young and fragmented. Current pages have weak UX and limited model/cost comparison depth. | **9.4/10** | **7.3/10** | Build |
| 3 | Cron Expression Generator | KDROI reports **32,000 monthly searches**, KD **28/100**, CPC $1.85; DevPick’s tool map reports 5.4K for the narrower head term. A Stack Exchange analysis cites crontab.guru at about **605K monthly visits** and a strong Google Trends reading. | There is a clear incumbent, but search intent is utilitarian and many alternatives are outdated or bare. | **8.9/10** | **7.6/10** | Build |
| 4 | JSON-LD Schema Generator | Google Ads-derived public data shows 3,600 for “schema markup”, 1,900 for “schema generator json”, 1,600 for “schema json generator”, and 1,000 for “schema generator”; CPC ranges roughly $4.74–$13.67. | Public data lists competition as 0 for the seed and several related terms; SERP competition exists, but the long-tail is fragmented by schema type. | **7.0/10** | **8.8/10** | Build |
| 5 | Favicon Generator + Multi-size Preview | DevPick reports **12.1K** search-volume sizing for “favicon generator”; Stack Overflow and developer resource directories show persistent use and an established workflow need. | Existing products are often either overbuilt brand suites or a single basic converter. A transparent, private, multi-platform pack is differentiated. | **7.2/10** | **7.8/10** | Build |
| 6 | Open Graph Preview + Meta Tag Generator | DevPick reports **4.4K** for “open graph preview” and **6K** for “meta tag generator”. Multiple free SEO suites list it as a popular utility. | Medium: many basic generators, but few polished preview-and-QA experiences. | **6.4/10** | **7.1/10** | Hold as phase two |
| 7 | CSS Gradient Generator | DevPick reports **33K** search-volume sizing. The tool is highly shareable and visually demonstrable. | Competition is high and design-tool SERPs have strong incumbents. | **7.4/10** | **5.7/10** | Hold as phase two |
| 8 | JSON to TypeScript Generator | DevPick reports **14.8K** search-volume sizing for the developer conversion query. | Competition is medium; differentiation depends on correctness, nested schema handling, and copy/export UX. | **6.8/10** | **6.8/10** | Hold as phase two |
| 9 | Robots.txt + AI Crawler Policy Generator | Ahrefs’ 2026 SEO research reports “llms.txt” at **3,700 US searches/month, +154% YoY**, while robots.txt generator signals are around 1K in DevPick. Ahrefs also reports that llms.txt is not used by major AI search providers and is not needed for Google generative features. | Low-to-medium competition, but the proposed standard is weak and potentially misleading. | **5.7/10** | **8.0/10** | Do not build as a standalone promise; consider an evidence-led robots/crawler tool later |
| 10 | QR Code Generator | DevPick reports **823K** search-volume sizing, so demand is enormous. | Saturation is extreme: generic QR generators are abundant, brand trust and distribution dominate, and the head SERP is not a reasonable six-month target for a new site. | **9.8/10** | **2.0/10** | Reject for this build |

## The five selected builds

### 1. UTM Builder + QA

**Core search intent:** “utm builder”, “utm generator”, “utm maker”, “utm tracking”, “utm creator”.

**Product wedge:** a campaign builder that also validates an existing URL, normalizes casing and naming, warns about missing values, and maintains a private local campaign history. Include copyable links, CSV export, presets, and shareable query-state URLs.

**Why it can win:** strong commercial CPC, high immediate task intent, and a clear quality gap between simple generators and a QA-oriented workflow.

### 2. LLM Token & Cost Calculator

**Core search intent:** “token counter”, “llm token counter”, “AI API cost calculator”, “OpenAI API pricing”, “LLM pricing comparison”.

**Product wedge:** privacy-first token estimation, provider/model comparison, input/output/cached-token pricing, request-volume scenarios, and a visible “verify current price” warning. Use an explicit approximation label for model families whose exact tokenizer is not bundled.

**Why it can win:** strong AI demand, clear cost-saving intent, high current competitor traffic, and a market where pricing changes make static tables stale. The site should publish a machine-readable pricing update timestamp and never imply financial certainty.

### 3. Cron Expression Generator

**Core search intent:** “cron expression generator”, “cron job generator”, “crontab generator”, “cron schedule builder”.

**Product wedge:** plain-English presets, reverse parser, human-readable explanation, next-run preview, timezone awareness, and syntax validation for common 5-field cron plus optional 6/7-field formats. Be explicit about dialect differences rather than silently outputting a schedule that may fail on the user’s system.

**Why it can win:** immediate developer utility, strong search demand, and a differentiated “explain + preview + validate” workflow instead of a single expression box.

### 4. JSON-LD Schema Generator

**Core search intent:** “schema markup”, “schema generator”, “schema generator JSON”, “FAQ schema generator”, “organization schema generator”.

**Product wedge:** form-driven templates for FAQPage, Article, Organization, Product, Event, BreadcrumbList, and LocalBusiness; live JSON-LD output; copy/download; validation warnings; and an honest eligibility disclaimer that valid markup does not guarantee a rich result.

**Why it can win:** high CPC, long-tail type-specific queries, and the growing need to make pages machine-readable for search and answer engines. Avoid unsupported claims about “guaranteed rich snippets.”

### 5. Favicon Generator

**Core search intent:** “favicon generator”, “favicon maker”, “favicon from image”, “favicon sizes”.

**Product wedge:** upload or draw a simple icon, preview across browser tabs, iOS, Android, Windows tiles, and manifest usage, then export a standards-aware package and HTML snippets. Keep processing in-browser where possible and clearly state that no image is uploaded.

**Why it can win:** visual product quality is easy to demonstrate, browser-only processing is a trust advantage, and the workflow is still commonly described as confusing across platforms.

## Rankability versus traffic potential

The likely easiest first-page targets among the selected five are **JSON-LD Schema Generator**, **UTM Builder + QA**, and **Cron Expression Generator**, because the query intent is explicit and the long-tail can be mapped to focused pages.

The most likely six-month traffic leader is **LLM Token & Cost Calculator**, followed by **Cron Expression Generator** and **UTM Builder + QA**, because adjacent model/pricing queries can produce a larger page cluster. That upside is also the most volatile: provider pricing and model names change quickly.

## Research sources and cross-verification

The following sources were checked across SEO databases, competitor traffic reports, Google documentation, developer communities, product directories, and live tools. Access date for this report is 2026-08-22 unless the source states otherwise.

1. [Google Trends basics](https://newsinitiative.withgoogle.com/resources/trainings/google-trends/basics-of-google-trends/) — explains indexed 1–100 values and normalization.
2. [Google Trends data FAQ](https://support.google.com/trends/answer/4365533?hl=en) — warns that low-volume terms can appear as 0 and that spikes are not proof of demand.
3. [Google Trends Explore](https://trends.google.com/trends/explore) — target interface for directionality checks; direct Explore requests were rate-limited in this environment, so no fabricated numeric score is included.
4. [Google Keyword Planner help](https://support.google.com/google-ads/answer/7337243?hl=en-GB) — confirms monthly-search and cost estimates as a separate demand source.
5. [Ahrefs 2026 AI search trends](https://ahrefs.com/blog/ai-search-trends/) — supports the free-tool strategy and notes that tools satisfy “do, not read” intent.
6. [Ahrefs 2026 SEO trends](https://ahrefs.com/blog/seo-trends/) — reports current AI/SEO growth and the llms.txt volume/trend caveat.
7. [Ahrefs FAQ](https://ahrefs.com/faq) — confirms free Keyword Generator and other no-account tools exist, with intentionally limited metrics.
8. [Ahrefs Free Keyword Generator](https://ahrefs.com/keyword-generator) — direct tool UI inspected; results widget was gated by a Cloudflare challenge in this environment.
9. [Semrush UTMBuilder.net overview](https://www.semrush.com/website/utmbuilder.net/overview/) — reports 12.1K US volume for “utm builder”, related keyword volumes, and competitor organic traffic/backlink data.
10. [Micro SaaS Ideas: UTM Builder and QA](https://www.microsaasideas.net/ideas/utm-builder-and-qa/) — independent 9.1K demand and 20.5K traffic-potential estimate, with medium competition.
11. [SEOData “generate schema”](https://www.seodata.dev/keyword/generate-schema) — Google Ads-derived US volumes, CPC, and competition for schema-related keywords.
12. [KDROI Cron Expression Generator](https://kdroi.io/analysis/cron-expression-generator) — 32K volume, KD 28, CPC $1.85, tool-site recommendation.
13. [Webmasters Stack Exchange cron analysis](https://webmasters.stackexchange.com/questions/140653/why-are-google-keyword-planner-average-monthly-search-estimates-always-so-low) — cites crontab.guru at ~605K visits and discusses why planner volume and site traffic can differ.
14. [DevPick developer tool map](https://devpick.sh/) — search-volume sizing across 118 utilities, including QR, CSS gradient, favicon, UTM, Open Graph, schema, robots, and conversion tools.
15. [Probedex Price Per Token analysis](https://probedex.ai/domain/pricepertoken.com) — reports 207.9K monthly visits, 63% organic, and adjacent LLM/API pricing keyword volumes and SERP positions.
16. [Toolify LLM Token Counter profile](https://www.toolify.ai/tool/llm-token-counter) — reports 37.9K monthly visits, 53.73% search traffic, and token-counter keyword traffic.
17. [DailyTools AI Cost Calculator](https://thedailytools.net/ai/cost-calculator) — confirms current user behavior around browser-only AI cost estimates and privacy messaging.
18. [FindPartner AI Cost Calculator](https://findpartner.app/ai-cost-calculator) — demonstrates model-comparison and per-request/monthly/yearly pricing intent.
19. [CostLynx LLM Cost Planning Calculator](https://www.costlynx.com/resources/ai-cost-calculator) — confirms the unit-economics and cached-token planning use case.
20. [FreeCalcKit embedding cost calculator](https://freecalckit.com/ai-cost-calculator/embedding-cost-calculator/) — validates adjacent RAG/embedding cost demand and the need for current-price disclaimers.
21. [FrontendHelpers](https://frontendhelpers.com/) — confirms a local-browser utility pattern for robots and text analysis, including the distinction between crawling and indexing.
22. [QCK free SEO tools](https://qck.co/pages/seo-tools) — confirms active demand for schema, AI crawler, robots, and no-signup SEO utilities.
23. [Surfaceable SEO/GEO platform](https://www.surfaceable.io/) — confirms schema and AI-visibility tooling are active categories and that live SEO data is usually a separate dependency.

## Build guardrails

- Never promise rankings, traffic, rich-result eligibility, or AI citations.
- Keep calculations private and local unless a server is genuinely required.
- Add visible “last verified” timestamps for model prices and standards guidance.
- Include canonical URLs, structured metadata, internal links, descriptive documentation, and static HTML content for every tool.
- Treat the five tools as one coherent suite with a shared design system, but give each page a distinct interaction model and search intent.
