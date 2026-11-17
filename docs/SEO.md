# Portfolio SEO, AEO, and GEO

Reviewed 17 November 2026. This is an on-page implementation plan, not a ranking guarantee. Search Console is the only search measurement integration; no visitor analytics script is required.

## Search intent and page ownership

| Page | Main topic | Supporting evidence |
| --- | --- | --- |
| Home | Ali Asghar, software engineer in Karachi | Visible location and backend/full-stack introduction |
| About | Ali Asghar backend and full-stack engineer | Skills, education, links to experience and Invo.pk |
| Work | Software engineering projects and case studies | Links to all five factual project summaries |
| Experience | Ali Asghar software engineering experience | Dated roles at Digital Dividend Global and GentecSoft |
| Invo.pk | .NET and React POS, inventory, and accounts case study | Independent development, public product link |
| Other case studies | Each project's domain and demonstrated technologies | Role, goal, contributions, technical approach, limitations |

These are content-based topic choices, not measured keyword-volume findings. Use actual Search Console queries to refine wording after indexing. Do not add keyword lists to visible copy or a meta-keywords tag: Google does not use that tag.

## Implemented foundation

Unique titles and descriptions, canonical HTTPS URLs, Open Graph/Twitter cards, one H1 per page, textual server-rendered content, descriptive internal links, image alt text, sitemap, robots rules, and real missing-page 404s are maintained. The homepage now directly explains identity, location, and core technologies. Case-study headings describe the goal, contribution, approach, and considerations.

About uses ProfilePage pointing to the shared Person entity. Case studies use WebPage and CreativeWork, linking author/contributor and breadcrumbs to stable IDs. No employer endorsement, reviews, invented outcomes, pricing, or software-product ownership is inferred for anonymized work. Markup must match visible evidence. No special AI schema, fabricated FAQs, or llms.txt is needed for Google Search visibility.

Google Analytics and its environment setting have been removed. Existing Search Console HTML verification and DNS-based verification remain supported. No Search Console account settings or production configuration have been changed.

Build verification exposed [GHSA-mfr8-8qww-v76h](https://github.com/advisories/GHSA-mfr8-8qww-v76h) in Next.js 16.4.3. Next.js and its ESLint configuration were updated together to patch release 16.4.6.

## After the owner approves production deployment

1. Confirm the existing Search Console property covers `https://asghar.me`. Retain DNS verification, or use the existing server-side `GOOGLE_SITE_VERIFICATION` setting if HTML verification is used. Do not share credentials or tokens in issues.
2. Verify live HTML canonicals, robots, sitemap, statuses, mobile rendering, and social image. Preview deployments must remain noindex; production must allow indexing.
3. Submit `https://asghar.me/sitemap.xml` in Search Console. Inspect Home, About, Work, and Invo.pk using URL Inspection and its live test. Request indexing for the changed representative pages if appropriate.
4. Validate public About and case-study URLs in Schema.org Validator and Google's Rich Results Test. Valid schema does not guarantee a rich result; CreativeWork alone is not a promised Google rich-result feature.
5. Review Page Indexing and Core Web Vitals. Prior local mobile performance measurements missed the target; verify deployed behavior and field data before claiming a performance improvement.
6. Save a Search Console performance baseline and compare equal 28-day windows after recrawling. Review clicks, impressions, CTR, average position, query/page pairs, country, and device. Separate branded name queries from broader engineering queries. Low CTR at stable positions may justify revising a title; low visibility may require stronger original project evidence.
7. Continue adding owner-verified implementation decisions, constraints, and outcomes to case studies when available. Avoid invented statistics, generic AI articles, and duplicate pages for keyword variations. Search Console alone does not establish citations across every AI answer service.

## Research

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): clear titles, useful descriptions, crawlable links, and image context; no use of meta keywords.
- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): existing SEO foundations apply to AI Overviews and AI Mode; no extra AI files or special schema required.
- [Google generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): original first-hand content, technical clarity, and avoiding unsupported AEO/GEO hacks. Eligibility does not guarantee indexing or serving.
- Local Next.js guides (reviewed at 16.4.3 and rechecked after the 16.4.6 patch): `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` and `01-app/02-guides/json-ld.md`. JSON-LD stays server-rendered and escapes `<`.

## Validation

Final local production build, lint, and typecheck passed on Next.js 16.4.6 using Node.js 22.23.4. `npm audit --omit=dev` reported zero known production dependency vulnerabilities. `npm run test:browsers -- --workers=1` passed 39 checks across Chromium, WebKit, and Firefox; six configured contact/preview checks were skipped. Coverage includes all 11 public routes, metadata, canonicals, JSON-LD, internal links, 404s, responsive layout, JavaScript-free content, automated accessibility, navigation/motion, mocked contact handling, and no Google Analytics requests.

See the PR for actual build and browser results. The existing production homepage, robots file, and sitemap returned HTTP 200 during review. Search Console ownership, live indexing, Google rich-result validation, and future rankings require post-deployment verification and are not claimed by local tests. Remaining release/account checks are tracked in [issue #1](https://github.com/aasghar110/asghar.me/issues/1).
