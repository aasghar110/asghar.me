# Redesign handoff

## Delivered

The portfolio has been rebuilt around a light editorial design: large Manrope headings, Geist body copy, navy hierarchy, restrained blue accents, fine borders, and asymmetric selected-work cards. The homepage stays focused on an introduction, technology rail, three projects, a short background/experience preview, and a contact invitation.

The homepage and About page use the user-approved editorial portrait. The supplied 1122 × 1402 PNG is preserved unchanged in `assets/portraits/`; the public WebP is approximately 131 KB instead of 2.16 MB. No facial retouching was applied. The image is preloaded and delivered in responsive AVIF/WebP variants, with layout crops verified across all eight requested widths. The monogram remains only as an optional fallback if the portrait path is cleared.

The information architecture contains all five requested primary pages, five project overviews, a privacy page, and a custom 404. Anonymous professional overviews stay high level. Technical diagrams are labeled as illustrative workflows; Invo.pk uses a capture of its actual public website. Invo.pk ownership is mentioned within the project story and About page without founder branding.

## Architecture and organization

- Next.js App Router **16.4.3**, React **19.2.4**, strict TypeScript, npm, Node.js **22**.
- Static generation for the homepage, About, Work, Experience, Privacy, and all five case studies.
- Dynamic server rendering only for contact configuration status; a Node.js route handles email submission.
- Small Client Components for menu interaction, scroll motion, form state, and analytics consent. The technology rail is server rendered and pauses on hover or keyboard focus without a visible button.
- `lib/content.ts` centralizes personal data, projects, strengths, and career history.
- `components/portfolio/` holds shared layout, artwork, project, and interaction components.
- `app/globals.css` contains design tokens and responsive styling. Breakpoints adapt the composition rather than shrinking desktop cards.
- Deferred GSAP/ScrollTrigger enhancement for scroll reveals. No database for portfolio content, smooth-scroll library, custom cursor, or mandatory splash screen.
- The existing Next.js 16.2.6 dependency had security advisories. Next.js and its lint configuration were updated together within version 16. The dependency audit subsequently reported zero vulnerabilities.

The retired implementation remains recoverable through Git. Original unapproved images were moved outside `public` to `assets/unpublished`; their Git blob hashes were checked and match byte for byte. They return 404 at their former public paths in the redesigned application.

## Public routes

| Route                                          | Purpose                                        | Rendering       |
| ---------------------------------------------- | ---------------------------------------------- | --------------- |
| `/`                                            | Homepage                                       | Static          |
| `/about`                                       | Background, strengths, education               | Static          |
| `/work`                                        | Project collection                             | Static          |
| `/experience`                                  | Career timeline                                | Static          |
| `/contact`                                     | Contact details and form                       | Server rendered |
| `/privacy`                                     | Contact data and optional analytics disclosure | Static          |
| `/work/invo-pk`                                | Independent product overview                   | Static          |
| `/work/security-operations`                    | Anonymous professional overview                | Static          |
| `/work/kidzsearch`                             | University project overview                    | Static          |
| `/work/education-platform`                     | Anonymous professional overview                | Static          |
| `/work/investment-portal`                      | Anonymous professional overview                | Static          |
| `/robots.txt`, `/sitemap.xml`                  | Search crawler resources                       | Static          |
| `/opengraph-image`                             | Generated sharing image                        | Static          |
| `/icon.svg`, `/apple-icon.png`, `/favicon.ico` | Identity assets                                | Static          |
| `/manifest.webmanifest`                        | Preserved public manifest route                | Static          |
| `/api/contact`                                 | Validated email submission                     | Server endpoint |

The previous `/og-image.png` and `/og-image1.png` addresses permanently redirect to the new sharing image. `/icon.png` redirects to the new PNG icon. Inner paths use no trailing slash. Legacy homepage section fragments remain available.

## SEO implementation

Each public page has a unique title and description, an absolute canonical, Open Graph and Twitter metadata, a single H1, and meaningful server-generated text. Person and WebSite JSON-LD are included globally; case studies add BreadcrumbList data. Unsupported salary, ranking, revenue, user-count, and performance claims were removed.

The sitemap covers all 11 content routes and does not fabricate modification dates. Unknown pages and project slugs return real 404 responses. Preview builds emit noindex/nofollow headers and metadata; the preview robots file disallows crawling. Production builds allow content indexing and exclude the API from crawler access.

The application includes a permanent `www`-to-apex redirect. A working certificate for `www.asghar.me` is still a hosting/domain task: an application redirect cannot repair TLS before a request reaches it. No live domain settings were changed.

## Analytics and ownership status

| Integration            | Implementation                                                                     | Current status                                    |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| GA4                    | Opt-in loading, manual route tracking, project/contact events, withdrawal controls | Disabled: no measurement ID supplied              |
| Search Console         | Optional verification token, sitemap, metadata                                     | Ownership unconfirmed; DNS verification may exist |
| Gmail SMTP             | Server-side plain-text delivery with Reply-To                                      | Disabled: Gmail credentials pending               |
| Distributed spam limit | Atomic Upstash counters with HMAC identifiers and TTL                              | Configuration pending                             |

Analytics transport and navigation behavior were tested with a dummy measurement ID and a mocked Google script. Consent blocked initial script loading, acceptance loaded exactly one script, navigation produced one page view per tested route, and withdrawal disabled tracking. No events were sent to a real GA property.

## Contact verification

Destination: **aasghar5445@gmail.com**. The visible form is unavailable until all server settings exist, with a direct email alternative. Client validation, server validation, bounded input, origin restrictions, honeypot/timing checks, rate-limit rejection, service failure, and provider acceptance are implemented.

Automated tests exercised the actual route handler with mocked Upstash and Nodemailer SMTP responses, including rejection and accepted delivery. A separate browser test verified field errors, preserved text after delivery failure, and clearing after acceptance. No real email was sent or inbox receipt verified. That remains a mandatory setup check after configuration.

See `.env.example` and the README for Gmail credentials and optional distributed rate-limit settings, optional GA ID, and optional Search Console token. Private values must be added securely; no secrets were committed or printed.

## Verification performed

- Production build succeeded with static output for content pages and case studies.
- ESLint and strict TypeScript checks passed.
- Full dependency audit reported zero vulnerabilities.
- Cross-browser suite: **27 passed** across Chromium, WebKit, and Firefox. Six configured-only cases were deliberately skipped in that default run; the two distinct configured scenarios were run separately in Chromium and passed against a dummy preview build.
- Final Chromium regression after spacing refinements: **9 passed**, with the two configured-only scenarios skipped because the final build has no credentials or analytics ID.
- Tested widths: **320, 360, 390, 430, 768, 1024, 1440, 1920** across the homepage and representative inner/case-study routes; no horizontal page overflow.
- Mobile menu focus entry/wrapping, Escape close, link navigation, and browser back navigation passed.
- Reduced-motion behavior and marquee pause behavior passed.
- All 11 public content routes were checked for metadata, one H1, canonical consistency, and parseable JSON-LD.
- No-JavaScript checks passed for all 11 content routes.
- Internal links, missing routes, sitemap coverage, social image output, legacy redirects, unapproved asset 404s, and client runtime errors were checked.
- Axe automated checks for WCAG A/AA rules passed on primary pages and the Invo.pk case study at desktop and mobile sizes. This is useful automated coverage, not a certification or a substitute for assistive-technology user testing.
- Responsive screenshots were captured and visually reviewed. Stable captures use reduced motion; the normal preview includes the moving marquee.

## Performance

Measured with Lighthouse **13.5.0** against the local production build on **2026-10-25**, using the default simulated mobile profile and the desktop preset. The final saved runs are:

| Measurement         | Mobile     | Desktop    |
| ------------------- | ---------- | ---------- |
| Performance         | **72**     | **98**     |
| Accessibility       | **100**    | **100**    |
| Best practices      | **100**    | **100**    |
| SEO                 | **100**    | **100**    |
| LCP                 | **3.26 s** | **0.93 s** |
| Total Blocking Time | **844 ms** | **44 ms**  |
| CLS                 | **0.001**  | **0**      |

The initial mobile lab run scored 77 with 576 ms blocking. Follow-up work removed automatic background route prefetches, omitted the analytics client boundary when tracking is disabled, rendered the static technology list on the server, and replaced the font-dependent placeholder monogram with SVG artwork. The static redesign then scored 93. After adding scroll motion, an eager per-element ScrollTrigger setup proved expensive on mobile and was replaced by native visibility detection and on-demand GSAP tweens. The post-portrait run scored 72 on mobile and 98 on desktop, with 844 ms mobile blocking. Its host benchmark was approximately 450, compared with approximately 1,700 in the earlier motion run; the mobile performance target remains unmet in the saved report. Host benchmark values varied between runs, so differences cannot be attributed entirely to code changes. Baseline measurements are preserved in `reports/baseline-metrics.json`.

Mobile LCP remains above the 2.5-second goal. It needs another check on the real deployment with the approved portrait; the score is not presented as a guarantee that all Core Web Vitals goals have been achieved. No field INP result is available.

Saved evidence: [mobile HTML report](reports/lighthouse-mobile.report.html), [desktop HTML report](reports/lighthouse-desktop.report.html), [machine-readable metrics](reports/metrics.json), and the corresponding full Lighthouse JSON reports.

These are local production-build lab results. Real hosting/network conditions, configured third-party services, and actual visitor hardware will affect results. Field LCP/INP/CLS must be monitored after launch; Lighthouse's Total Blocking Time is not an INP measurement.

## Remaining manual steps

1. Recheck portrait crops and loading if the approved image is replaced in the future.
2. Confirm any additional project screenshots or technical details before publishing them. Existing application screenshots remain unpublished.
3. Configure Gmail SMTP credentials and optionally the distributed rate-limit store. Submit a real enquiry and confirm receipt and Reply-To behavior.
4. Provide the GA4 measurement ID if tracking is wanted. Review Enhanced Measurement settings to avoid duplicate route/form collection, then verify DebugView on a preview.
5. Determine how Search Console ownership is verified. Preserve DNS verification or supply the HTML token/file; do not claim connection until verified.
6. Review the local or Vercel preview. Explicit approval is required before production deployment or live environment/domain changes.

## Safe rollout and post-launch checks

Use Vercel's Next.js preset with Node.js 22 and the existing npm build. Do not use static export. Keep preview deployment protection enabled and confirm preview noindex responses before sharing review URLs.

After explicit production approval, retain the previous deployment for rollback. Verify HTTPS and canonical redirects, all page status codes, robots/sitemap, sharing images, no-JavaScript content, the original portrait, consent behavior, and actual email receipt. Fix the `www` certificate in hosting before relying on that hostname redirect.

Confirm Search Console ownership, submit `https://asghar.me/sitemap.xml`, and inspect the homepage, work index, and representative case studies. Monitor indexing, unexpected exclusions, broken legacy links, Search Console performance, and field Core Web Vitals. Check GA events only after configuration and consent. Recheck mobile Lighthouse after configuring third-party integrations.

No production deployment, Git commit/push, live environment modification, account connection, DNS change, or external analytics setting change has been performed.

## Editing and artifacts

### Project presentation refinement

KidzSearch is now presented as a final-year project with a text-only editorial card and no case-study image panel. Its copy does not discuss deployment or usage status. The former security-specific artwork has been replaced by a reusable, generic software-layer infographic covering interfaces, services, API logic, workflows, data, integrations, and cloud delivery. It is labeled as a concept illustration.

The updated homepage, Work page, KidzSearch page, and security project page passed 32 route/viewport checks across all eight requested widths and eight desktop/mobile automated accessibility scans. The new artwork and project cards were visually inspected on desktop and mobile. Lighthouse was subsequently rerun after the scroll-motion enhancement; the current results are listed above.

### Scroll motion

`ScrollMotion.tsx` adds GSAP after an idle delay, with scoped cleanup on route changes. Native Intersection Observer detects when elements enter view; tweens are created then, avoiding an eager timeline and layout calculation for every offscreen element. ScrollTrigger is loaded only for desktop artwork parallax. Offscreen content enters once using short opacity/translation transitions; cards have a small stagger and the generic diagram assembles in layers. The hero remains stable for initial rendering. Native scrolling is not intercepted. Keyboard focus immediately completes the relevant reveal, and reduced-motion changes restore the original styles. If the optional animation download fails, content remains available.

Six focused motion checks passed across Chromium, WebKit, and Firefox, covering scroll completion, keyboard visibility, route changes, and live reduced-motion changes. Three additional Chromium checks passed for navigation, internal links/assets, and no-JavaScript readability. Build, lint, type checking, and the dependency audit passed. A recorded browser walkthrough is available at [scroll-motion.webm](previews/scroll-motion.webm).

- [README](../README.md): local development, content editing, assets, environment variables, testing, and deployment.
- [File inventory](FILES.md): changed, retired, moved, and created files.
- [Screenshots](screenshots/): all requested homepage widths plus desktop/mobile inner pages.
- [Asset credits](../public/ASSET-CREDITS.md): provenance and licensing notes.

### Approved portrait and technology controls

The approved portrait passed 16 loading, crop, and overflow checks across Home and About at all eight requested widths. The visible motion toggle was removed; hover, keyboard focus, and reduced-motion behavior remain supported. The updated technology-strip interaction test passed in Chromium, WebKit, and Firefox.
