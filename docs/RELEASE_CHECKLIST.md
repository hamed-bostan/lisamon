# Release checklist — 15 November 2026

Scope: local Windows checkout and a local production server. The live host, Search Console, and a physical touch device were not available. The technical work and task evidence are in [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) and [TASK_STATUS.md](TASK_STATUS.md). Do not treat local results as a deployed-site sign-off.

## Local verification

| Check | Result | Evidence |
| --- | --- | --- |
| Clean install | Pass | `npm ci` |
| Lint and type/build | Pass | `npm run lint`; `npm run build` reported static `/`, `/artist`, and four prerendered category routes. |
| Production advisories | Pass | `npm audit --omit=dev --json`: zero advisories. Next 16.4.6, sharp 0.35.5, source-map-js 1.2.2. |
| Full dependency audit | Reviewed | Eight development-tool findings (seven moderate, one high); high finding is zod 4.6.5 through `eslint-config-next` → `eslint-plugin-react-hooks`. No reported production finding. Recheck before release. |
| Browser regression | Pass | `npm run test:e2e`: Chromium, Firefox and WebKit, including nested dialogs, focus/scroll, failed and late chunks, broken images, no-JavaScript category discovery, 404/noindex, metadata, headers and image optimizer. |
| Automated accessibility | Pass within scope | axe on initial routes and open catalogue dialog; keyboard and 320px focus tests. Automated scans do not establish full screen-reader or WCAG conformance. |
| Artwork and copy | Pass for compared source | All 65 distinct original `app/data.ts` string literals remain in `content/portfolio.ts` and `content/site.ts`; original biography paragraphs and homepage/artist metadata wording were moved verbatim. `git diff -- public/images` is empty. Category counts 11/11/2/1; shot totals 18/21/2/3. |
| 320px and desktop visual review | Pass | [320px dock](dock-320.png), [desktop dock](dock-1280.png), [601px tile](tile-601.png). The tile remains detailed; no clipped contact text was observed. |
| Reduced motion and no-JavaScript content | Pass | Playwright checks. Hero cover no longer blocks content. |
| Controlled route-error recovery | Not tested | `app/error.tsx` provides retry, but a controlled render failure was not injected into a release build. |

## Lighthouse lab measurements

Lighthouse 13.6.0, Chromium 145, local production server, 15 November 2026. Three fresh Lighthouse runs per route and device; the table reports medians. Lighthouse simulated a 412×823 mobile viewport at DPR 1.75, 150 ms RTT, 1,638 Kbps throughput and 4× CPU slowdown. Desktop used 1350×940 at DPR 1 and the default 40 ms RTT simulation. Lighthouse cold-load runs were separate; gallery interactions were tested in Playwright. The [raw report archive](perf/lighthouse-reports.zip) includes all 18 route/device runs and three image-priority experiment runs. A subsequent build-time artist image-ID validation changed only the lazy gallery adapter; the final browser suite and JS measurement were rerun after it. Local browser caches and the server image cache may warm between runs, so these are lab observations, not cold-host guarantees.

| Route | Device | Performance | LCP | CLS | Total transfer | Script transfer |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Home | Mobile | 0.79 | 3.53 s | 0 | 495 KB | 173 KB |
| Artist | Mobile | 0.95 | 0.81 s | 0 | 281 KB | 187 KB |
| Category 01 | Mobile | 0.90 | 3.35 s | 0 | 491 KB | 182 KB |
| Home | Desktop | 1.00 | 0.72 s | 0 | 688 KB | 173 KB |
| Artist | Desktop | 1.00 | 0.27 s | 0 | 281 KB | 187 KB |
| Category 01 | Desktop | 0.99 | 0.92 s | 0 | 1,041 KB | 182 KB |

The audit baseline did not include pre-change LCP/CLS, so no performance gain is claimed. A three-run priority experiment on the first category image worsened its intermediate-build mobile median LCP from 3.62 s to 3.81 s; the change was reverted. The final build's category median is 3.35 s. Current provisional lab budgets, rounded above the measured medians: home/category mobile LCP ≤4.0 s, artist mobile LCP ≤1.2 s, CLS ≤0.1, initial script transfer ≤220 KB. Field targets remain p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. INP field data is unavailable and is not inferred from Lighthouse TBT.

The [image candidate matrix](perf/image-candidates.json) records tile widths, selected request widths and response bytes at 320, 600, 601, 630, 768, 1024, 1280 and 1600 px, DPR 1 and 2. At 601px/DPR1 the 512px tile requested width 640 (53,269 bytes); the 1536px lightbox image rendered 581px wide and requested width 640 rather than near-full viewport width. A cold Lighthouse home load fetched one hero crop per device. The [JS measurement](perf/js-transfer.json) records three runs and medians of decoded script bodies: home 545,054 bytes initial plus 96,462 on first gallery open; artist 580,127 initial plus 64,880 on first gallery open. First-open bytes varied with browser cache timing. These decoded figures use a different method from Lighthouse transfer bytes. The audit counted 53.5 MB of served-source originals; no destructive recompression was authorized or performed.

## Deployment and owner checks

| Check | Result | Action |
| --- | --- | --- |
| Actual www/non-www and HTTPS redirects | Not tested | Verify the chosen canonical domain and redirect ownership on deployment. |
| Production status codes, compression, cache, optimizer, headers, social cards | Not tested | Check 200/404/noindex, `/_next/image`, caching and `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` on the host. Confirm framing requirements before keeping `SAMEORIGIN`. |
| Production preview indexing | Not tested | Keep preview hosts behind access control or host-level noindex; leave production indexable. |
| Real touch device and screen reader | Not tested | Check gallery swipes, tap targets, 320px reflow and focus with a physical device and assistive technology. |
| Search Console and field CWV | Not tested | Submit `sitemap.xml`, inspect representative URLs and monitor p75 LCP/INP/CLS when traffic allows. |
| Analytics/error reporting | Pending owner choice | No new tracking destination was selected. Review existing host reporting before adding one. |
| Rollback | Documented | Redeploy previous build; verify asset hashes and invalidate CDN/image cache if an image is replaced at a stable URL. |

Release sign-off remains pending the checks above. No deployment or account changes were made.
