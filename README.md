# Ali Asghar · asghar.me

A light, editorial software engineering portfolio built with Next.js App Router, React, and TypeScript. Static pages, the technology rail, and case studies use Server Components. Navigation, scroll motion, consent controls, and the contact form are small Client Components. The technology rail pauses through CSS on hover or keyboard focus, without a visible pause button.

Scroll animation is handled by `components/portfolio/ScrollMotion.tsx`, using deferred GSAP imports and native Intersection Observer visibility detection. It adds one-time section reveals, short card staggers, a diagram entrance, and desktop-only decorative parallax. ScrollTrigger is loaded only for desktop parallax; mobile reveals create tweens only when elements enter view. Native scrolling is preserved. Reduced motion skips the engine entirely; switching that preference restores all original styles. Content already visible on arrival, including the hero, is never hidden for an entrance effect. Route cleanup removes the previous page's observers and animations, and focusing a link reveals its containing card immediately. `node scripts/record-motion.cjs` records a short local browser preview against localhost:3100.

## Run locally

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production preview:

```sh
npm run build
npm run start -- --port 3100
```

Scripts invoke Node entry points directly so Windows project paths containing spaces and `&` work.

## Pages

- `/` — concise homepage
- `/about` — background, engineering focus, and education
- `/work` — selected projects
- `/work/[slug]` — statically generated case studies
- `/experience` — verified career timeline
- `/contact` — server-rendered configuration status and contact form
- `/privacy` — contact data and optional analytics disclosure
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg`
- `/api/contact` — POST-only email delivery endpoint

Unknown pages and project slugs return real 404 responses. Legacy homepage anchors `#hero`, `#projects`, `#work`, `#about`, `#experience`, and `#contact` remain available. Canonical hostname: `https://asghar.me`; inner paths have no trailing slash.

## Editing content

`lib/content.ts` is the central source for personal information, social links, projects, technology groups, and work experience.

KidzSearch uses a text-only final-year project card and has no project image panel. The generic software-layer infographic lives in `components/portfolio/SystemsIllustration.tsx`; it illustrates interfaces, application services, data, integrations, and cloud delivery without describing a client's private architecture.

**Add a project:** add an entry to `projects` with a unique slug and verified content. Static generation, sitemap entries, the work listing, and related projects update automatically. Select an existing visual type or add a purpose-built visual in `components/portfolio/ProjectVisual.tsx`. Do not invent outcomes, screenshots, or client permission.

**Update screenshots:** put approved public assets in `public/projects/`. Update `ProjectVisual.tsx` with the actual dimensions and descriptive alternative text. Use optimized WebP/AVIF. `npm run assets:refresh` captures only the public Invo.pk homepage and refreshes technology SVGs; review every refreshed asset. See `public/ASSET-CREDITS.md`.

**Update experience:** edit `experience`, including machine-readable dates and public date labels. Keep responsibilities factual and distinguish individual contributions from team work.

**Edit personal information/social links:** update `person`. Public email and the contact destination share this source. Verify the receiving address before changing it.

**Replace the portrait:** the current user-approved portrait is `public/images/ali-asghar-crewneck.webp`; its supplied PNG is preserved in `assets/portraits/ali-asghar-approved.png`. Put any approved replacement in `public/images/`, update `person.portrait`, and check the homepage and About page at mobile/tablet/desktop sizes. `Portrait.tsx` preloads the image and uses responsive Next Image delivery with AVIF/WebP variants. Adjust `objectPosition` for layout cropping only; preserve facial identity. Earlier unapproved images remain under `assets/unpublished/`, outside the public web root.

**SEO metadata:** page-specific metadata is declared in each `app/**/page.tsx`; common helpers live in `lib/seo.ts`. Update the canonical origin there if the domain changes. Root Person/WebSite data lives in `app/layout.tsx`; case-study breadcrumbs are generated from project data. The sharing image is generated in `app/opengraph-image.tsx`.

## Design and components

`app/globals.css` defines colors, typography, spacing, responsive layouts, and reduced-motion alternatives. Geist is used for body copy; Manrope for headlines. Fonts are self-hosted through `next/font`.

Shared components live in `components/portfolio/`: Header, Footer/ContactCTA, Portrait, PageIntro, ProjectCard, ProjectVisual, TechnologyMarquee, ContactForm, Analytics, and Icons. The site has no dark theme, scroll hijacking, loading screen, custom cursor, or client-rendered content shell.

## Contact delivery

Copy `.env.example` to `.env.local` and set `SMTP_USER` to your Gmail address and `SMTP_PASS` to its Google App Password. Legacy `EMAIL_USER` / `EMAIL_PASS` names are also accepted. Credentials are server-only and must also be configured in Vercel before deployment. Never commit them or use `NEXT_PUBLIC_` names.

Delivery uses Nodemailer with Gmail SMTP over TLS on port 465. The sender is the authenticated account; visitors are set as Reply-To. The destination remains `aasghar5445@gmail.com`. The form is unavailable until credentials exist, and reports acceptance only after SMTP accepts the destination. Acceptance does not prove inbox receipt.

Validation, size limits, same-origin JSON checks, header-injection protection, honeypot, and minimum completion time remain enabled. The default limit is five attempts per ten minutes per identifier on each running instance; serverless restarts and additional instances can reset or multiply this best-effort limit. For a shared production limit, configure all three: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `CONTACT_RATE_LIMIT_SECRET` (32+ random characters). Partial or failing Redis configuration fails closed. Only temporary hashed identifiers and counters are stored.

**Delivery verification:** submit a real message after configuring credentials, confirm inbox/spam receipt, and verify Reply-To. Automated tests mock SMTP; actual Gmail delivery remains unverified without credentials.

## Analytics and Search Console

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional public `G-…` identifier. Empty means no GA script and no analytics consent banner. Changing it requires rebuilding.
- `GOOGLE_SITE_VERIFICATION`: optional HTML verification token. Leave empty for DNS-based verification. Search Console ownership has not been confirmed.

GA loads only after explicit analytics consent. Rejecting analytics preserves all site functionality. Events include page views, project-link interactions (`view_project`), selected contact clicks (`contact_click`), and successful provider acceptance (`contact_form_submit`). Message contents and field values are never added to event payloads. There is no résumé or résumé event.

In GA4, turn off automatic browser-history page-view tracking in Enhanced Measurement to avoid duplicating the app's manual page views. Turn off enhanced form interactions if enabled. Verify behavior in DebugView after providing the real ID. Cookie preferences can be reopened after consent; withdrawing consent disables tracking and clears accessible GA cookies. This is a conservative opt-in implementation; confirm the final privacy wording against your actual account settings and data practices.

Production metadata allows indexing. Builds with `VERCEL_ENV=preview` emit noindex/nofollow metadata and response headers, plus restrictive robots rules. Keep Vercel preview deployment protection enabled as an additional safeguard. Do not serve a production build under a preview domain without the preview environment setting.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run build
node node_modules/@playwright/test/cli.js install chromium firefox webkit
npm test
npm run test:browsers
```

Browser tests start the production server on port 3100. They cover metadata, raw HTML, JSON-LD parsing, internal links, missing routes, contact handling, mobile-menu focus, reduced motion, all eight requested widths, and automated accessibility checks. Mocked backend tests exercise abuse rejection, rate limits, provider failures, and provider acceptance without sending email.

`npm run screenshots` captures responsive screenshots against a running localhost:3100 server. `npm run audit:performance` saves mobile and desktop Lighthouse HTML/JSON reports against that same server. Run performance audits without concurrent browser tests for more useful measurements. `AUDIT_CHROMIUM` can optionally point to an existing Chromium executable for local tooling. It is not a site setting.

See `docs/IMPLEMENTATION.md` for measured results, limitations, and rollout steps. Local Lighthouse results are lab measurements, not field Core Web Vitals or a guarantee for a future portrait/analytics configuration.

## Deploy to Vercel

1. Import this repository using Vercel's Next.js preset; use Node.js 22 and the normal npm build. Do not configure a static export: the contact endpoint requires server execution.
2. Add server secrets to the appropriate Preview/Production environment without committing them. Configure the Gmail account and its Google App Password.
3. Create a preview deployment, check all routes and screenshots, confirm its noindex headers, and verify contact delivery after setup.
4. Obtain explicit approval before production deployment, changing live variables, or editing domain/DNS settings.
5. After approval, deploy production and verify canonical URLs, status codes, robots, sitemap, sharing image, consent, and email receipt.
6. Configure the `www` hostname's certificate and permanent redirect in Vercel. The application redirect exists, but cannot repair a TLS certificate before HTTPS reaches the application.
7. Confirm Search Console ownership, submit `https://asghar.me/sitemap.xml`, inspect the homepage and representative case studies, and monitor indexing and Core Web Vitals.

Keep the prior Vercel deployment available for rollback. Production deployment and account changes have not been performed as part of this local redesign.
