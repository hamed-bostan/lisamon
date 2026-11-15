# LISAMON project audit

Reviewed 15 November 2026. Scope: the local repository and its production build, not an independently verified deployed website. Application code and dependencies were not changed during this review.

**Owner's subsequent constraint:** preserve all existing site information and wording. Editorial suggestions in this audit are observations only, not permission to rewrite or add content. The mandatory content-preservation rule and revised tasks in [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) take precedence; technical improvements must reuse existing content verbatim.

**Verdict:** the project has a sound foundation for a small portfolio, but it is not ready for an unconditional production sign-off. Fix the dependency findings, mobile clipping, accessibility, and gallery failure handling first. Improve search visibility by making important content available without opening dialogs. A wholesale architecture rewrite is unnecessary.

The executable handoff is [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md). It separates confirmed defects, robustness gaps, and optional product improvements.

## Verification performed

| Check | Result |
| --- | --- |
| `npm run lint` | Passed, no reported warnings/errors |
| `npm run build` | Passed compilation and TypeScript checking |
| Rendering | `/` and `/artist` prerendered; both have `initialRevalidateSeconds: false` |
| Production HTTP | `/`, `/artist`, `/robots.txt`, `/sitemap.xml`, `/icon.png`: 200; unknown route: 404 |
| Metadata | Generated HTML includes distinct page titles and correct configured canonicals |
| Image optimizer | Mobile hero at width 640/quality 75 returned WebP, 79,940 bytes, immutable caching |
| Dependency audit | `npm audit --omit=dev --json`: 3 affected packages, 1 critical and 2 high by npm's package-level classification |
| Browser | Local production server in Chrome; desktop, 375px and 320px viewport checks |
| Catalogue flow | Open category, open image, Escape to category, restore tile focus, Escape to page all worked in the tested flow |
| Console | No warning/error entries reported for the inspected flow |
| Asset inventory | 76 JPG/PNG/WebP files under `public/images`, totaling 53,508,562 bytes |

The first sandboxed server was unreachable. Browser and HTTP checks succeeded using a localhost-only production server outside that restriction. The initial dependency-audit network failure was resolved and the audit completed.

Not performed: Lighthouse or a throttled performance trace; field Core Web Vitals; Safari/Firefox or physical-device testing; a full screen-reader audit; exploit testing; deployed CDN/DNS/TLS/redirect checks; Search Console inspection; complete dependency audit including development-only packages. Passing lint/build does not establish those properties. No invented performance score is supplied.

## What is already implemented well

- App Router pages and layout use Server Components; SSG fits the local, public content. Client Components are used for interaction. Client Components also have prerendered HTML, so the homepage and project lists are not empty JavaScript shells.
- `next/image` and `getImageProps` provide optimized sources, responsive candidates and intrinsic asset metadata. The hero uses art direction with one `<picture>`, eager loading and high fetch priority. This is not a raw unoptimized hero implementation.
- Fonts are self-hosted through `next/font/local`; dimensions/aspect ratios reserve image space.
- Titles, descriptions, canonical URLs, Open Graph/Twitter metadata, robots, sitemap, language and Organization JSON-LD exist. JSON-LD escapes `<` safely.
- Native buttons/links, dialog labels, focus handling, Escape handling and many reduced-motion variants already exist.
- Strict TypeScript, a lockfile, Next ESLint rules, relatively few production dependencies, and useful rendering documentation are present.
- There is no database, authentication, form backend, external CMS or business workflow that needs repository interfaces, service layers or a dependency-injection container today.

## Findings and impact

### F01 — P1: resolve reported vulnerable dependencies before the next release

**Evidence:** `package.json:13`, `package-lock.json`; installed `next@16.3.5`, `sharp@0.35.4`, `source-map-js@1.2.1`. `npm ls next sharp source-map-js --all` shows sharp under Next and source-map-js through PostCSS. npm reports three affected packages, not three independently proven attack paths. Its suggested Next fix was `16.4.6` on the audit date.

The Next SVG image-optimization advisory affects versions through 16.4.0; it identifies 16.4.1 as patched and sharp >=0.35.5 as the relevant upstream fix. The sharp issue depends on runtime conditions on glibc Linux. This Windows checkout and its raster-only assets do **not** demonstrate exploitability on the eventual host. [Next advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw), [sharp advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w).

The separate remote-image SSRF advisory explicitly excludes applications without `images.remotePatterns`; this project's empty Next config has none. Other reported Next advisories involve `next/og`, Server Actions, Draft Mode or `use cache`, which the application source does not use. SSG/cache advisories warrant host-specific review. [SSRF applicability](https://github.com/advisories/GHSA-cjq9-62q9-8jv4).

The source-map-js advisory is fixed in 1.2.2 and concerns hostile indexed source maps; no application endpoint accepting them was found. Updating remains appropriate, but package presence alone is not evidence of an externally reachable DoS. [Source-map advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

**Plan:** T01.

### F02 — P1: narrow screens clip the WhatsApp control

**Evidence:** `app/components/whatsapp-button.styles.ts:4–5`. At viewport 320px, the expanded dock measured 335.5px wide with its left edge at approximately -46.7px. The screenshot showed the beginning of “DIRECT WHATSAPP” cut off. At 375px it fitted, with little spare space.

The horizontal, non-wrapping pill and toggle have no viewport-aware width limit. **Plan:** T02.

### F03 — P1: text contrast and touch controls need correction

**Evidence:** `app/globals.css:10`, `app/artist/artist.styles.ts:20`, `app/components/catalogue.styles.ts` (`modalEyebrow`), `app/components/lightbox.styles.ts:9–13`.

- Artist venue text was observed at 11px with `#8f8f8f` on white: about **3.23:1** contrast. Catalogue eyebrow `#8a8a8a` on white is about **3.45:1**. Neither reaches 4.5:1 for normal text. The existing `#6b6b6b` gives about 5.33:1 on white.
- Lightbox dot buttons are 9×9px, with a 10px gap. Their 19px center spacing also fails the spacing alternative for 24px targets. On non-hover devices the large arrow controls are hidden, leaving swipes and tiny dots. Keep a simple tap alternative. [WCAG target-size rules and exceptions](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- No skip-to-main link exists. Fixed/sticky elements also deserve explicit anchor and focus-obscuring checks.

**Plan:** T02.

### F04 — P1: dialog isolation is incomplete

**Evidence:** `app/components/use-modal.ts:7–65` and its callers. Normal nested Escape and focus restoration passed. However, the homepage and footer remained in the browser accessibility tree while a dialog was open. Background DOM is not made inert; only the lower gallery gets `aria-hidden` when its lightbox opens.

The hook separately snapshots/restores body overflow for each instance. That works for the tested last-opened/first-closed sequence, but teardown of all dialogs or a different unmount order merits a regression test before claiming correctness. This is a robustness concern, not a reproduced scroll-lock failure.

Prefer one shared dialog primitive with background isolation and well-defined nested focus/scroll ownership. A portal alone does not provide accessibility. [WAI modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

**Plan:** T03.

### F05 — P1: opening galleries has no recoverable asynchronous state

**Evidence:** `app/artist/artist-rows.tsx:122–126` directly awaits `import('../gallery-data')`, without pending feedback, catch/retry, cancellation or a guard against competing selections. `app/components/catalogue.tsx:11` lazy-loads its modal without an explicit loading state or local error recovery.

A failed chunk request can leave a click doing nothing useful; multiple slow artist selections can resolve into inconsistent modal state. These failure paths are evident in code but were not fault-injected in this audit. Add regression coverage with a failed/delayed chunk request. An image failing to load also has no useful fallback. **Plan:** T04, T05.

### F06 — P1 for search growth: important content requires a click

**Evidence:** `app/components/catalogue.tsx`, `catalogue-modal.tsx`, `app/artist/artist-rows.tsx:41–65`, `app/sitemap.ts`. The generated HTML has the catalogue names and artist project list, but no catalogue work images and no full artist biography. There are only two indexable pages, and category buttons provide no navigable category URL. Artwork alt text is mostly “category — work N”, without meaningful descriptions.

This limits discoverable content and prevents direct sharing of a category/project. Google does not click controls to reveal content; ordinary image lazy-loading is fine when the image markup is discoverable. This finding does **not** mean the existing two pages cannot be indexed. [Google's lazy-content guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading).

Render the biography as page content and add static category pages with visible descriptions and images. Preserve dialogs as an enhancement if desired. Unique project pages are a later editorial decision, not a prerequisite to fixing category discoverability. **Plan:** T07, T08, T09.

### F07 — P2: opening animation delays useful access

**Evidence:** `app/components/intro.styles.ts:4`, `intro.tsx:12–19`. A full-screen overlay waits 2.6 seconds and then animates away for 1 second; component removal is scheduled 3.7 seconds after its effect. It replays on full reloads. Reduced-motion users skip it, which is good.

It visually blocks useful content irrespective of asset readiness. `aria-hidden` does not prevent underlying controls receiving keyboard focus while visually covered. This is a confirmed design behavior; its exact effect on LCP was **not measured**. Prefer immediate content with a brief, nonblocking brand animation. **Plan:** T06.

### F08 — P2: image slot estimates do not consistently match layout

**Evidence:** `app/components/catalogue-modal.tsx:26`, `catalogue.styles.ts` (`modalGrid`), `lightbox.tsx:10`, `app/artist/artist-rows.tsx:85`.

Catalogue sizes switch to `30vw` above 600px while the auto-fill grid can still have one wide column around 601–629px. At 601px, the CSS gives roughly 510px of grid content but the unscaled slot hint is only 180px. `coverSizes` corrects cropping ratios, not this column mismatch. Conversely the lightbox always requests `92vw` even for a narrow portrait constrained by viewport height; desktop inspection showed an image about 430px wide in a 1536px viewport.

Measure grid and contain-box sizes at breakpoints before changing quality or formats. The source image total (53.5MB) is storage/build input, **not initial page transfer**: the actual mobile hero response was only 79,940 bytes. The 10,694-byte unoptimized logo is not a priority. Do not blindly re-encode artwork or delete originals. **Plan:** T10.

### F09 — P2: content and media relationships can drift

**Evidence:** `app/data.ts:7–19`, `app/images.ts`, `app/gallery-data.ts:5–28`, `app/artist/artist-rows.tsx:20–23`.

Category IDs are arbitrary strings, image groups are assembled from positional shot counts, and artist gallery counts are duplicated manually. The current category groups consume the expected assets (18, 21, 2, 3); no current grouping loss was found. A future mismatch can silently drop assets or create empty groups, which callers then destructure as nonempty. The shared gallery module includes catalogue and artist assets together, creating a coarse lazy-load boundary; actual cross-feature chunk cost needs measurement before optimization claims.

Use stable typed identifiers and explicit work/image associations. Keep framework-free text/content types separate from Next image adapters. **Plan:** T07, T11.

### F10 — P2: regression and release checks are manual

**Evidence:** `package.json:5–10`; no tracked test suite or CI workflow found. Lint and build do not exercise dialog stacking, failed imports, small-screen clipping, accessibility or discoverable HTML. Add a small behavior-focused browser suite and CI, not snapshots for every style utility. **Plan:** T05, T13.

### F11 — P2: production hardening and fallback UX are incomplete

**Evidence:** `next.config.ts`, production response headers and absent custom error/not-found components. Local responses had no `X-Content-Type-Options`, `X-Frame-Options`, explicit Referrer-Policy or CSP. The default unknown-route response correctly returned 404. Missing custom pages are an experience/recovery improvement, not evidence of broken routing. A deployed proxy may already add headers; verify there before duplicating policy.

Add modest headers, useful route-level fallback UI, and deployment checks. Do not blindly add per-request CSP nonces: installed Next guidance says these require dynamic rendering, sacrificing the current SSG strategy. **Plan:** T12, T13.

## Architecture assessment

This is a small, component-oriented Next application, not a full implementation of Clean Architecture's concentric layers. That is appropriate to its current scope. Colocating components/styles in `app` is supported by the installed Next documentation; neither an `src` folder nor CSS Modules is mandatory.

Uncle Bob's relevant principles are separation of concerns, independent policy/data, and testability. Apply those by keeping content definitions independent of React/Next, resolving image imports in adapters, and separating dialog state from page composition. Adding empty entities/use-cases/repositories folders would not create meaningful business boundaries here. This is a project-specific recommendation based on [the original Clean Architecture description](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

`artist-rows.tsx` currently owns list rendering, biography, gallery rendering, media loading, and several modal states. Split it only at those concrete boundaries. The `*.styles.ts` convention is verbose but consistent; migrating every style is low value. The shared Button supports unused variants and every present caller uses `canvas`; simplification is optional and should follow measured bundle evidence.

## Further opportunities, not release blockers

- Improve home H1/service description and visible category copy using truthful approved language; there is already an H1, so this is not a missing-H1 defect.
- Add accurate Person/ProfilePage structured data once the full biography is visible. Centralize the duplicated organization origin. Never invent an address, reviews, exhibition dates or client claims.
- Prepare dedicated social preview images with known dimensions. Existing metadata is valid; custom previews improve cropping and branding, not guaranteed ranking.
- Add an obvious contact path to `/artist` and service pages. The artist page currently offers only a back link for this journey.
- Collect performance and conversion evidence before further optimization. Good field targets at the 75th percentile are LCP <=2.5s, INP <=200ms, CLS <=0.1, separately for mobile and desktop. These are targets, not measured results here. [Web Vitals](https://web.dev/articles/vitals).
- Arabic/Persian localization, individual case-study routes, a CMS, a form backend, analytics vendors, PWA features and advanced animations should follow a real business requirement. None is required simply to make this implementation “best practice”.

Relevant installed references: `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`, `05-server-and-client-components.md`, `03-api-reference/02-components/image.md`, and `02-guides/{production-checklist,lazy-loading,content-security-policy}.md`. Read the updated installed guides after any framework upgrade.
