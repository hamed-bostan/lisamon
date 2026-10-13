# Lisamon

Artist portfolio built with Next.js App Router, React, and Tailwind CSS.

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The homepage is in `app/page.tsx`, shared artwork components are in `app/components/art.tsx`, and images are in `public/`.

## Rendering strategy

The homepage uses **static site generation (SSG)** through Next.js automatic prerendering. Its artwork listings, copy, metadata, and imported images are available at build time and shared by every visitor. The page and layout remain Server Components; the portfolio content is included in the generated HTML.

| Strategy | Current decision | When to reconsider |
| --- | --- | --- |
| SSG | Already enabled automatically; appropriate for the portfolio. | Rebuild and deploy when local content or images change. |
| Request-time SSR | Unnecessary: there is no personalized or request-dependent content. | Add it for authenticated or request-specific content, keeping public portfolio content static where possible. |
| ISR | Unnecessary: there is no external content source to refresh. | Add it if artwork or availability comes from a CMS or database and must update between deployments. Choose a freshness interval or authenticated publication-triggered invalidation based on actual requirements. |

No forced rendering flags or timed revalidation are required. ISR cannot pick up edits to source files or bundled image imports without a rebuild. Server Components alone do not imply request-time SSR; the production build determines whether a route can be prerendered.

Keep browser interactivity in small Client Components if it is introduced. Reassess rendering when adding runtime APIs, uncached data, authentication, or URL-dependent server content.

## Production verification

```bash
npm run lint
npm run build
npm start
```

The build should report `○ /` (prerendered as static content). In `.next/prerender-manifest.json`, the `/` entry should have `compute: "static"` and `initialRevalidateSeconds: false`. Use the production build to verify rendering; development mode does not represent production caching.

Deploy using a Next.js-compatible host or `npm start`. The app uses the default `next/image` optimizer, so a static homepage does not mean the deployment can serve only files. A static-only export would also require a compatible image loader or another image optimization strategy.

Consult the installed version's guides in `node_modules/next/dist/docs/` before changing rendering or caching APIs, as required by `AGENTS.md`.
