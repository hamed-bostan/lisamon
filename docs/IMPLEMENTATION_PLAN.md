# Implementation handoff for a smaller model

Baseline: 15 November 2026. Evidence and limitations: [PROJECT_AUDIT.md](./PROJECT_AUDIT.md).

This is a plan, not a claim that these fixes have been implemented. Work one task at a time. Existing paths below are relative to `C:/Users/Soprano/lisamon`; read only the named files and their direct dependencies. New paths are explicitly labeled. Each task is intended to fit a separate small context.

## Full technical scope remains required

The owner's content-preservation constraint does not reduce the original improvement scope. Execute T01–T13 in dependency order, covering project structure, proportionate Clean Architecture, best practices, technical SEO, image optimization, performance, accessibility, security, reliability and verification. A task may legitimately conclude that a measured optimization is unnecessary, but must record the evidence; it must not be silently skipped.

Refactoring, server/client boundary changes, improved rendering, semantic markup, accessible interactions, responsive fixes, technical metadata and additional routes exposing existing content remain in scope. Implement these using the same site information. If one substep would require editorial changes, first use an approach that preserves the content; defer only the inseparable editorial substep and continue the rest of the task. Do not mark a task complete without its applicable acceptance checks, or describe checks needing a deployed site/account as passed.

T14 remains a separate optional product/editorial backlog, as in the original plan. It is not a substitute for completing the technical tasks.

## Mandatory constraint: preserve existing site information

The owner requires all existing site information and wording to remain unchanged. This constraint overrides any conflicting recommendation in the audit, task descriptions or earlier prompts.

- Preserve all existing copy verbatim: headings, biography, category/project names, descriptions, dates (including blank dates), venue names, labels, alt text, and existing metadata titles/descriptions. Do not rewrite, translate, correct, expand or remove them as part of optimization.
- Preserve all artwork and images, their associations, order and existing crops, and all contact details and external destinations. Technical asset delivery changes may not substitute or alter the artwork.
- Moving existing content into shared data, semantic HTML, server-rendered sections or category routes is allowed only if the same information remains available. New routes must reuse existing names, text and images; do not invent introductions, captions, claims or facts from visual inference.
- Technical SEO fields such as canonicals, sitemap entries, image dimensions and structured-data properties may be added or corrected using existing information only. Preserve the wording of existing SEO copy. Minimal new operational UI text (loading, retry, error, skip link and image position) is allowed; it must not add business/editorial information.
- Before each task, identify the affected original text/data and image mappings. Afterward compare them with the pre-task version, including dialog-only content. Acceptance requires no unapproved content changes or omissions. Use existing strings verbatim for relocated or newly exposed content.
- If a recommendation needs new or changed information, leave that part unimplemented and record it as requiring a separate explicit content-change request. Continue the independent technical work.

## Reusable worker prompt

```text
Implement task TXX from docs/IMPLEMENTATION_PLAN.md only.
Read AGENTS.md, the task, and the listed files. Read the relevant installed
Next.js guides before code changes. Inspect git status and preserve unrelated work.
Keep the current design and SSG unless this task explicitly changes behavior.
Preserve all existing site information and wording verbatim, following the
mandatory content-preservation constraint above. Reuse content; do not rewrite it.
Do not refactor adjacent features or introduce speculative infrastructure.
Run this task's acceptance checks and npm run lint; run npm run build when
dependencies, routing, server/client boundaries or image imports change.
Report files changed, checks passed, checks not run, and any remaining blocker.
Do not claim completion if acceptance checks fail. Update this task's status
and record the exact verification commands/results in a short handoff note.
```

Do not pass the entire audit, source tree and conversation to every worker. Supply this prompt, the one task block, and its files. Keep one commit-sized scope per task; do not commit unless requested. If a prerequisite changed a file location, consult its short handoff note instead of re-auditing the project.

## Order and constraints

| Order | Task | Priority | Dependencies | Size |
| --- | --- | --- | --- | --- |
| 1 | T01 dependencies | P1 before release | None | Small/medium |
| 2 | T02 mobile/accessibility | P1 | None | Small |
| 3 | T03 shared dialog behavior | P1 | T02 | Medium |
| 4 | T04 gallery loading/recovery | P1 | T03 | Medium |
| 5 | T05 regression suite/CI | P1 | T01–T04 | Medium |
| 6 | T06 nonblocking intro | P2 | T05 | Small |
| 7 | T07 content integrity | P2 | T04, T05 | Medium |
| 8 | T08 indexable content | P1 for SEO growth | T07 | Medium/large; use two passes |
| 9 | T09 metadata/social | P2 | T08 | Small/medium |
| 10 | T10 image sizing | P2 | T05, T08 | Medium |
| 11 | T11 client boundaries | P2, measure first | T07–T10 | Medium |
| 12 | T12 hardening/fallbacks | P2 | T01, T05 | Small/medium |
| 13 | T13 release measurements | Release gate | T01–T12 | Medium |
| Later | T14 product improvements | Optional | Content/business inputs | Separate scope |

Preserve: existing artwork order/crops, correct labels and contact destinations, static rendering, local fonts, responsive image optimization, metadata, reduced-motion support, and nested gallery Escape behavior. Do not add SSR/ISR, authentication, a CMS, DI containers, generic repositories, mass CSS rewrites or blanket `unoptimized`. Do not add fake dates, ratings or addresses. Existing `design/` files are references, not production components to migrate.

## T01 — Patch reported dependencies

Status: verified locally. Files: `package.json`, `package-lock.json`; read `next.config.ts`, `README.md`, `AGENTS.md`.

1. Re-run `npm audit --omit=dev --json` and inspect official advisories. On the audit date, npm suggested Next **16.4.6**; use this as a starting candidate, not an eternal latest-version claim. Verify the matching `eslint-config-next` release and runtime requirements.
2. Upgrade Next and its ESLint config together to a compatible, supported patched 16.x release. Refresh transitive resolutions so `sharp >=0.35.5` and `source-map-js >=1.2.2` are installed. Prefer normal dependency resolution; avoid `npm audit fix --force`, unrelated major upgrades or unexamined overrides.
3. Read the new version's bundled guides and handle relevant migration changes only. Keep React/React DOM aligned; change them only when required by peer requirements or a verified advisory.
4. Record advisory applicability: no remotePatterns, no Server Actions, no `next/og`, no Draft Mode/use-cache features in this source. Host-specific exploitability is not proven.

Acceptance: fresh `npm ci`, `npm ls next sharp source-map-js --all`, audit, lint and build succeed; no remaining high/critical production advisory without documented review; both pages remain static; homepage, artist page and an optimized image return 200. Check a full `npm audit` separately for tooling risk. Do not deploy as part of this task.

## T02 — Fix mobile clipping, contrast and navigation access

Status: verified locally. Files: `app/components/whatsapp-button.styles.ts`, `whatsapp-button.tsx`, `lightbox.styles.ts`, `lightbox.tsx`, `app/globals.css`, `app/artist/artist.styles.ts`, `app/components/catalogue.styles.ts`, `app/layout.tsx`, `app/page.tsx`, `app/artist/page.tsx`.

1. Constrain the WhatsApp dock to available viewport width. On narrow screens place the pill above the toggle or make it shrink/wrap without clipping its text. Keep the destination and accessible name. Restore focus to the toggle when Escape collapses an open link.
2. Replace small-text grays that fail 4.5:1 on their actual backgrounds. Start with `--color-muted` and `modalEyebrow`; retain the gray palette. Check footer/focus/hover contrast rather than globally darkening every decorative element.
3. Make dot **hit areas** at least 24×24px, preferably 44×44px, while retaining small visual dots. Keep usable previous/next buttons on touch devices; preserve disabled state. Add an accessible current-image status without excessively announcing scroll events.
4. Add a shared skip link targeting `main#main-content` on each route. It must appear on focus and land on a focusable main target. Add appropriate scroll margin/padding for anchor targets under fixed chrome.

Acceptance: 320, 375, 768 and desktop widths show the entire expanded dock; keyboard Escape restores usable focus; no new horizontal overflow; small text >=4.5:1; all image controls operable by tapping and keyboard; skip link works on both pages; reduced motion still works. Keep screenshots for 320px and desktop review.

## T03 — Consolidate accessible dialogs

Status: verified locally. Files: `app/components/use-modal.ts`, `catalogue-modal.tsx`, `lightbox.tsx`, `app/artist/artist-rows.tsx`; new `app/components/ui/modal.tsx` if needed.

1. Replace repeated dialog mechanics with one primitive. Prefer native `<dialog>.showModal()` with a portal to `document.body`, retaining existing inner layouts and CSS; use a well-tested dialog library only if native behavior cannot satisfy nested requirements. Read relevant current browser/React guidance for whichever approach is selected.
2. Let the top dialog own Escape and focus. Background content, including a lower dialog, must be inert while the top dialog is active. Initial focus must be deliberate and visible. Return focus to the exact opener when still connected; use a sensible surviving fallback otherwise.
3. Put body-scroll locking under one owner/ref-count with original-style restoration after the last modal closes. Clean up correctly on route unmount and Strict Mode effect replay. Do not merely add another independent overflow snapshot.
4. Preserve backdrop close, image-click non-close, accessible titles, nested gallery/lightbox flow and scrollable long content. Portal placement must not lose style variables; test class ancestor selectors.

Acceptance: Tab/Shift+Tab stay in top dialog; background cannot be browsed/focused; one Escape closes only the top layer; close returns focus to tile then category trigger; all dialogs unmounting restores scrolling; tall biography/gallery scrolls at 320px; no hydration warnings. Add meaningful regression cases now or supply them to T05. Do not assert the old happy path was broken—it passed.

## T04 — Handle loading, rejection and stale gallery requests

Status: verified locally. Files: `app/artist/artist-rows.tsx`, `app/components/catalogue.tsx`, `catalogue-modal.tsx`, `lightbox.tsx`; reuse T03 modal.

1. Give artist selection one discriminated state: idle, loading(project), ready(project/media), or error(project/message). Prevent simultaneous gallery and standalone-image dialogs. Use a request token or equivalent so a late response cannot reopen a closed/replaced selection. Preserve caching of successful imports.
2. Show accessible pending feedback immediately; provide close/cancel. Catch import failure, display a human-readable message and retry/reload action. A rejected dynamic import can remain cached by the browser; a full-page reload is an acceptable final recovery path. Never create an endless retry loop.
3. Provide loading and local error recovery for the dynamically imported category modal too. Place loading UI outside the failing lazy boundary. A route `error.tsx` alone will not catch a rejected event-handler promise.
4. Show a useful fallback when an image request fails; preserve navigation and close controls.

Acceptance: delay the gallery chunk, select A then B, then close before completion; only the latest live selection may open. Abort a chunk request: visible recovery UI, no unhandled rejection, retry/reload path works. Broken image leaves usable controls. Normal artwork counts/order remain unchanged.

## T05 — Add a small regression suite and CI

Status: verified locally. Files: `package.json`; new `playwright.config.ts`, `tests/portfolio.spec.ts`, `.github/workflows/ci.yml` (if GitHub is the repository host); update `README.md` and `.gitignore` for test artifacts.

Use Playwright against a production build and axe-core integration for critical accessibility states. Read current official tool documentation and pin compatible versions. Avoid tests that merely duplicate class strings.

Cover: both routes and unknown 404; catalogue -> nested image -> Escape/focus/scroll restoration; artist image/gallery/biography; delayed and failed chunk imports from T04; broken images; WhatsApp at 320px; skip link; reduced motion; initial HTML metadata and visible content. After T08, add category routes and no-JavaScript discovery tests. Use roles/names and narrowly scoped network failure interception, not brittle generated chunk filenames.

Acceptance: documented commands run locally; CI uses `npm ci`, lint, production build and browser tests; reports/screenshots are retained on failure. Start with Chromium, add WebKit/Firefox for modal/layout coverage when practical. Axe passes in initial and modal states, with manual focus/contrast checks where automation cannot establish correctness. Do not require an arbitrary coverage percentage or snapshots for every component.

## T06 — Make the intro nonblocking

Status: verified locally. Files: `app/components/intro.tsx`, `intro.styles.ts`, `app/page.tsx`, `app/globals.css`.

Remove the mandatory full-screen 3.6-second cover. Default recommendation: animate the existing brand mark briefly without obscuring content or intercepting pointer/keyboard access. Keep static content visible before hydration and with JavaScript disabled. Honor reduced motion. Remove obsolete timers/keyframes/imports only when unused elsewhere; avoid storage-based tricks that introduce hydration mismatch.

Acceptance: first load, full reload and client return from `/artist` immediately expose usable content; keyboard focus is never hidden behind branding; no overlay remains when scripts fail; reduced-motion state has no animation. Record before/after performance in T13; do not assert an LCP gain without measurement.

## T07 — Give content and media one reliable structure

Status: verified locally. Files: `app/data.ts`, `app/images.ts`, `app/gallery-data.ts`, `app/artist/artist-rows.tsx`, `app/components/catalogue.tsx`, `catalogue-modal.tsx`; new `content/portfolio.ts`, `content/site.ts`, `lib/media/catalogue.ts`, `lib/media/artist.ts` as needed.

1. Move framework-free types and text into `content/`. Distinguish gallery categories from the artist navigation entry using a discriminated union. Use stable slugs/IDs; keep the display numbers separately.
2. Define works explicitly with ID, the existing description/alt strings verbatim, and ordered image IDs. Preserve currently generated labels exactly; do not author new artwork descriptions. Model nonempty image sets as `[ImageId, ...ImageId[]]`. Derive gallery counts from this canonical manifest rather than hardcoding 11/2/1. Preserve project cover-first ordering.
3. Keep `StaticImageData` and static file imports in `lib/media/` adapters. Separate catalogue/artist adapters; do not invent storage repositories. Components depend on content types/adapters, never the reverse.
4. Replace positional `works(images, shots)` slicing with explicit associations, or validate totals and reject empty groups during a temporary migration. All IDs must resolve, be unique where required, and retain current ordering.

Acceptance: current work counts remain 11/11/2/1 for categories 01–04, with total shot counts 18/21/2/3; artist displayed counts remain correct including each leading project cover. Build fails clearly on missing/empty mappings. Add small content-integrity checks; content files do not import React/Next. No dependency changes unless justified.

## T08 — Make service content and biography discoverable

Status: verified locally. Files: `app/page.tsx`, `app/components/catalogue.tsx`, `app/artist/page.tsx`, `artist-rows.tsx`, `app/sitemap.ts`, `lib/site.ts`, T07 content/media files; new `app/catalogue/[slug]/page.tsx` and scoped presentation components.

Pass A: render the existing full artist biography verbatim in `/artist` server HTML with semantic headings using existing text. Keep expandable native content if preserving compactness, provided the text is already in the HTML. Avoid duplicated biography copy in a dialog and page without dropping any paragraphs. Preserve the homepage H1 wording exactly. Improve heading hierarchy through markup, using existing labels rather than writing new copy.

Pass B: add statically generated category pages for `bas-relief-sculptural-walls`, `sculptures-installations`, `decorative-textured-walls`, and `murals-wall-paintings`. Category bars become real links. Each page reuses its existing category name as the visible H1, its existing images in the same order, and existing labels/alt text. Do not add introductions or captions that do not already exist. Reuse existing back/contact labels and destinations. Image enlargement remains an optional client interaction. The artist entry still links to `/artist`. Use `generateStaticParams`, async params and unknown-slug behavior exactly as documented by the installed Next version. Add canonical metadata and sitemap entries.

Acceptance: raw page HTML includes the unchanged full biography and category image `src`/`srcset`/existing alt text; categories are reachable through `<a href>` without JavaScript; direct reload/share works; unknown slugs return 404; build reports static routes. Preserve existing page titles/descriptions. For new category routes, use the existing category name verbatim as title and, if a description is needed, an existing relevant string verbatim; do not require unique newly written descriptions. Each new route has its own canonical. Compare original and resulting content/artwork mappings and confirm nothing was rewritten, omitted or added as editorial information.

## T09 — Finish metadata and social previews

Status: verified locally. Files: `lib/site.ts`, `app/layout.tsx`, `app/artist/page.tsx`, T08 category pages, `app/sitemap.ts`; new social assets under `public/images/social/` if needed.

Centralize origin/name/contact without changing their values and use the shared origin for Organization URLs/logo. Keep homepage metadata on its page and shared defaults in layout so future routes do not accidentally inherit the home canonical; preserve existing title/description/alt wording exactly. Add image width/height and reuse existing alt strings. Retain current social images and crops; dedicated redesigned previews are deferred. Add Person/ProfilePage data only by mapping information already present on `/artist`, without inferring relationships or adding facts. Keep JSON-LD escaping.

Acceptance: production HTML has correct route-specific canonicals/OG URLs and reachable existing social assets; existing SEO copy is unchanged; every structured-data fact maps to existing site information; robots points to the canonical sitemap; sitemap contains actual public routes only. Do not manufacture `lastModified` timestamps on every request/build. Confirm real domain/redirect ownership during T13, without changing the current canonical speculatively.

## T10 — Correct image sizes before tuning formats

Status: verified locally. Files: `app/components/cover-sizes.ts`, `catalogue-modal.tsx`, `catalogue.styles.ts`, `lightbox.tsx`, `lightbox.styles.ts`, `app/artist/artist-rows.tsx`, T08 gallery components, `next.config.ts` only if measurements warrant it.

1. Measure tile dimensions at 320, 600, 601, 630, 768, 1024, 1280 and 1600px. Align CSS grid breakpoints with explicit `sizes`, or use documented `calc` expressions that conservatively represent the actual columns. Include overlay padding/gaps and object-cover scale. Do not use viewport thirds while a single column remains.
2. For lightbox object-contain images, compute a source-specific slot constrained by both available viewport width and height/aspect ratio. Account for modal padding. Keep `getImageProps` optimization, intrinsic aspect ratio and DPR needs; prioritize the visible slide without eagerly downloading every shot.
3. Compare selected candidates, response bytes and visual detail at DPR 1 and 2. Keep the hero's working art direction/eager/high-priority setup; avoid preloading both crops. Check photo quality before choosing AVIF or lower quality—neither is a mandatory optimization.
4. Inventory large originals separately. Archive originals outside served assets before any destructive compression, with owner-approved quality. This is a later optimization if storage/build cost justifies it.

Acceptance: no visibly soft 601px tile; portrait viewer no longer advertises near-full viewport width when height limits it; no duplicate hero crop request on a cold load; no CLS regression; failed images remain recoverable; record exact request widths/bytes. Preserve full artwork detail where needed. Keep narrow unit coverage for nontrivial sizing math.

## T11 — Reduce client responsibilities where measured

Status: verified locally. Files: `app/artist/artist-rows.tsx`, T07 media adapters, T08 category components, `app/components/ui/button.tsx`, `lib/utils.ts` only if bundle evidence justifies changes.

Keep route composition, biography and static lists on the server; use focused client components for gallery triggers and modal state. Extract biography/gallery/lightbox responsibilities from `artist-rows.tsx` into feature-scoped files. Lazy-load interactive viewer code after selection, with T04 recovery preserved. Avoid a single client media import that pulls unrelated categories and artist assets; inspect actual output before deciding whether to split further per gallery.

Acceptance: compare initial and first-open JS bytes with the same production measurement method; important content stays in HTML; opening one feature does not need unrelated feature metadata when a reasonable split avoids it; no route becomes dynamic. Do not count image files as bundled JS. Do not remove the shared Button/CVA/Radix abstraction just because variants are unused—simplify only if a measured benefit outweighs churn. Maintain current styles; no directory rename for its own sake.

## T12 — Add modest hardening and useful fallback pages

Status: partial; controlled route-error recovery and host policy remain unverified. Files: `next.config.ts`; new `app/not-found.tsx`, `app/error.tsx`; `app/global-error.tsx` only if justified by layout-error handling; update README deployment notes.

Add `X-Content-Type-Options: nosniff`, explicit `Referrer-Policy: strict-origin-when-cross-origin`, and a framing policy consistent with the host's embedding requirements (`X-Frame-Options: SAMEORIGIN` is a conservative default). Optionally disable unused browser capabilities through Permissions-Policy. Verify host headers first when deploying.

Use a branded accessible 404 with home/contact navigation and a recoverable route error boundary with no raw error/stack disclosure. Retain local event-handler error handling from T04. Consider CSP in a separate measured rollout: read installed guidance, preserve hydration/dynamic imports/JSON-LD and SSG. Do not silently force dynamic rendering for nonces or add a blanket script policy that breaks the site. HSTS belongs after validating production HTTPS and host policy.

Acceptance: verify HTTP status and headers over production HTTP; 404 remains 404/noindex; error recovery works in a controlled failure; all galleries and optimized images still load; static generation preserved. Report hosting-dependent policy decisions separately.

## T13 — Production measurement and release checklist

Status: partial; deployment and owner-operated checks remain open. Files: `README.md`; new `docs/RELEASE_CHECKLIST.md`, optional `docs/performance-baseline.md`; change application code only for a specific reproduced issue.

1. On a production server, run repeatable Lighthouse mobile/desktop audits for home, artist and a category. Record tool version, viewport/device/throttling, cold/warm cache, date and median of at least three runs. Test open gallery interactions separately. Keep scores as evidence, not universal guarantees.
2. Record LCP/CLS lab values, initial transfer/JS, hero and gallery requests, keyboard focus, 320px reflow, touch navigation, reduced motion, and no-JavaScript content. Validate WebKit/Firefox and at least one real touch device when available. Add a performance budget based on the measured baseline instead of an arbitrary “100” score.
3. On the actual deployment verify canonical www/non-www and HTTPS redirects, status codes, compression/cache behavior, image optimizer hosting, security headers, 404/noindex and social previews. Keep previews out of search with host-level noindex/access control. Do not guess the host or add blanket noindex to production.
4. Owner-operated Search Console: submit sitemap, inspect representative URLs and watch indexing/CWV. Field targets: p75 LCP <=2.5s, INP <=200ms, CLS <=0.1. If traffic is insufficient, report unavailable field data. Do not infer INP from a Lighthouse TBT score.
5. Decide whether existing hosting analytics/error reporting is enough. Add a small privacy-conscious integration only if a destination and purpose are chosen. Document deployment, rollback and image cache invalidation after replacing assets.

Acceptance: release checklist contains real pass/fail/not-tested results and residual risks; final lint/build/test/audit pass; compare against the original implementation baseline and confirm all existing copy, metadata wording, contact details, images and artwork associations/order were preserved. Exclude only the explicitly allowed operational UI additions from the copy comparison. No claim of full compliance based solely on automated tools. Deployment and account changes are a separate authorized action.

## T14 — Optional product/editorial work

Status: deferred, not authorized by this plan. Content additions, corrections and translations require a separate explicit content-change request. They must not be performed while executing T01–T13.

- An additional contact CTA may reuse an existing label and mail/WhatsApp destination verbatim. New marketing wording requires a separate content-change request. Measure inquiry conversion before building a form backend.
- Add approved case studies with project URLs, descriptive artwork text, process and verifiable locations/materials. Source missing dates from the owner; the blank exhibition year in current data must not be guessed.
- Consider language variants only if audience/business requirements justify translating navigation, content, metadata and hreflang together.
- Add a CMS only when nontechnical publishing is needed; then introduce a content-source adapter and revisit ISR based on freshness requirements.

No pricing claims, testimonials, tracking vendors, translations, uploaded imagery or contact forms are implied by this audit plan.
