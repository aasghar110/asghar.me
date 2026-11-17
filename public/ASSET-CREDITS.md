# Asset provenance

- `projects/invo-public.webp`: browser capture of the public https://invo.pk/ homepage, captured for its owner's portfolio. No application login or private customer view was used.
- Technology logos refreshed on 2026-11-17, optimized locally with SVGO 4.1.0, and served from this site. All 12 logo files total approximately 15.7 KB before transfer compression; no icon font, CDN, or third-party request is needed in the browser. Visible text supplies the accessible name, so adjacent logo images are decorative with empty alt text and fixed dimensions.
- `icons/nodedotjs.svg`, `react.svg`, `nextdotjs.svg`, `angular.svg`, `supabase.svg`, `aws.svg`, `azure.svg`: original-color marks from [Devicon](https://github.com/devicons/devicon/tree/32fe1d3b3f36ad11f90ab94f7db59738139c2bf6/icons), pinned to commit `32fe1d3b3f36ad11f90ab94f7db59738139c2bf6`. MIT collection license is retained in `icons/DEVICON-LICENSE`. Angular uses the current gradient mark rather than the previous shield mark.
- `icons/dotnet.svg`, `springboot.svg`, `umbraco.svg`: marks from [Simple Icons](https://github.com/simple-icons/simple-icons/tree/17cd4ee07612198a1d8777a060d4100423762a8b/icons), pinned to commit `17cd4ee07612198a1d8777a060d4100423762a8b`, with brand-primary fills. CC0 collection license is retained in `icons/LICENSE.md`.
- `icons/sitefinity.svg`: the Progress brand glyph extracted from the official [Progress Sitefinity page](https://www.progress.com/sitefinity-cms), retaining its geometry and green branding color.
- `icons/oci.png`: Oracle's official [32px favicon](https://www.oracle.com/asset/web/favicons/favicon-32.png), fetched from the vendor and losslessly recompressed with Sharp. This is the Oracle brand mark associated with OCI, not a fabricated OCI-specific logo. A native small PNG is retained rather than tracing a raster into SVG.
- IaC is a practice, not a vendor product; it keeps a generic code symbol and its expanded name rather than implying experience with an unverified tool. Technology names and marks belong to their respective owners. No endorsement is implied.
- Technical workflow artwork and the monogram placeholder are original CSS/SVG compositions. Workflow illustrations are conceptual, not client architecture or product screenshots.
- Fonts: Geist and Manrope, delivered locally through Next.js font optimization; both distributed under the SIL Open Font License.
- `images/ali-asghar-portrait.webp`: user-supplied, user-approved editorial portrait, converted to WebP without facial retouching. The supplied PNG is preserved in `assets/portraits/ali-asghar-approved.png`; responsive AVIF/WebP delivery is handled by Next Image.
- Original unapproved portrait and application images are preserved outside the public directory in `assets/unpublished/`. They are not served by this site.

To refresh only logos, run `node scripts/refresh-technology-icons.cjs`. To refresh public captures and logos, run `npm run assets:refresh` after installing Playwright Chromium. Review refreshed files before publishing; update pinned source commits deliberately when new branding is verified.

The previously used navy-polo portrait was supplied and approved by Ali Asghar. Its original PNG is archived in assets/portraits/ali-asghar-navy-polo-original.png. The public master is lossless WebP at the original 1254 x 1254 resolution; Next.js delivers responsive variants at quality 90. No facial edits were applied.

The current crewneck portrait is the user-approved original archived at assets/portraits/ali-asghar-approved.png. public/images/ali-asghar-crewneck.webp preserves its full 1122 x 1402 resolution using lossless WebP. Responsive delivery remains at quality 90. No facial edits were applied.
