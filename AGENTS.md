<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Every session

- Read this file and the relevant project docs; check Git status before editing. Use `main` as the integration branch for review PRs. Production deployment requires the owner's approval.
- Search measurement is Google Search Console only. Do not reintroduce Google Analytics or tracking/consent UI. See `docs/SEO.md` for page topics, research, and post-deployment checks.
- Keep schema and SEO copy grounded in `lib/content.ts` and visible page content. Do not invent results, client identities, endorsements, keyword-volume estimates, or AI ranking guarantees.
- Verify changes against a production build with browser and endpoint checks. Keep unfinished deployment/account work in follow-up issues.
