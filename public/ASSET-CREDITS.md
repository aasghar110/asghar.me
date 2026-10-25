# Asset provenance

- `projects/invo-public.webp`: browser capture of the public https://invo.pk/ homepage, captured for its owner's portfolio. No application login or private customer view was used.
- `icons/*.svg`: technology marks from Simple Icons, https://github.com/simple-icons/simple-icons, downloaded from the develop branch on 2026-10-25. The collection is distributed under CC0; see `icons/LICENSE.md`. Technology names and marks belong to their respective owners. No endorsement is implied.
- AWS, Azure, OCI, and Sitefinity are shown as text abbreviations, not invented brand logos. IaC uses a generic code symbol rather than implying experience with an unverified vendor tool.
- Technical workflow artwork and the monogram placeholder are original CSS/SVG compositions. Workflow illustrations are conceptual, not client architecture or product screenshots.
- Fonts: Geist and Manrope, delivered locally through Next.js font optimization; both distributed under the SIL Open Font License.
- `images/ali-asghar-portrait.webp`: user-supplied, user-approved editorial portrait, converted to WebP without facial retouching. The supplied PNG is preserved in `assets/portraits/ali-asghar-approved.png`; responsive AVIF/WebP delivery is handled by Next Image.
- Original unapproved portrait and application images are preserved outside the public directory in `assets/unpublished/`. They are not served by this site.

To refresh public captures and icons, run `npm run assets:refresh` after installing Playwright Chromium. Review refreshed files before publishing.

The current navy-polo portrait was supplied and approved by Ali Asghar. Its original PNG is archived in assets/portraits/ali-asghar-navy-polo-original.png. The public master is lossless WebP at the original 1254 x 1254 resolution; Next.js delivers responsive variants at quality 90. No facial edits were applied.
