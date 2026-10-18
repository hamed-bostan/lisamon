# Handoff: LISAMON Studio Website

> See **CHANGES.md** for the latest updates (intro animation, strip hover, welcome font).

## Overview
Marketing/portfolio site for LISAMON, a Dubai-based creative studio (sculptural walls, installations, murals, bespoke art). Two pages:
1. **Home** (`Studio Austinn.dc.html`) — hero, welcome, 5 catalogue category bars (open gallery modals), About Us, footer, floating WhatsApp button.
2. **Artist** (`Artist.dc.html`) — artist bio, 3-column project grid (some cards open gallery modals), text-only exhibition list.

## About the Design Files
These files are **design references built in HTML** — prototypes showing intended look and behavior, not production code. Recreate them in the target codebase's environment (React/Next.js, Vue, etc.) using its patterns. If no codebase exists, a static Next.js or Astro site is a good fit. `support.js` is only the prototype runtime — do not port it. Open the `.dc.html` files in a browser to view them (serve the folder locally, e.g. `npx serve`).

## Fidelity
**High-fidelity.** Final colors, typography, copy, spacing and interactions. Recreate pixel-accurately.

## Global
- Fonts (Google Fonts): **Montserrat** 300–900 (UI/body/headings), **Playfair Display** italic (editorial accents).
- Sizing is fluid: most dimensions use container-query width units (`cqw`, 1cqw = 1% of page width) with `clamp()` minimums. Keep this proportional scaling.
- Link color inherits; hover `#6b0f2a`.

## Screen 1 — Home
1. **Hero header**: height `50cqw`, full-bleed image `uploads/Wallpaper-02.png` (cover).
   - **Fixed logo** top-left (left 3cqw, top 1.4cqw), `uploads/logo-no text below.png` cropped in an 8.3×7.6cqw box, filter `grayscale(1) brightness(.9) contrast(10) invert(1)` + `mix-blend-mode:difference` so it reads on any background. Below it (top 9cqw) fixed wordmark "LISAMON": Montserrat 500, 1.12cqw, letter-spacing .71cqw, `#8a6e61`.
   - **Fixed Instagram icon** top-right (right 3.4cqw, top 3.6cqw), size max(44px,3.4cqw), radius 28%, Instagram radial gradient, `saturate(.5) brightness(1.05)`, opacity .85.
2. **Welcome**: bg `linear-gradient(90deg,#f3f4f6,#fafafa)`, centered, padding 7cqw/7.5cqw. Eyebrow "WELCOME" (13px max, ls .5em, 500, `#8a6e61`) → 1px×3cqw vertical rule `#bdbdbd` → Playfair italic 2.5cqw quote (max-w 52cqw) → body 15–22px, lh 1.75, `#444`, max-w 48cqw.
3. **Category bars** (5, gap .2cqw): each 8.2cqw tall, cover image + `rgba(0,0,0,.32)` overlay. Left: index ("01") Playfair italic 1.9cqw, white 75%. Center: name Montserrat 900, 2.05cqw, white. Right: 11.2cqw-wide panel `rgba(20,20,20,.45)` "CATALOGUE →" .6cqw, ls .25cqw. Click opens Category Modal; bar 05 "ARTIST" navigates to the Artist page instead.
4. **About Us**: 2-col grid, bg `#f6f6f7`. Left: ghost title "About Us" Playfair italic 5.6cqw `#e4e4e8`; text block with 1px left border `#bdbdbd`, 1cqw, lh 1.7, `#555`; closing line "We give them character." Playfair italic 2cqw `#5c0d24`. Right: image `uploads/IMG_3948.JPG`, min-height 60cqw.
5. **Footer**: bg `#68122c`, white, padding 6cqw 5.5cqw. Grid [22cqw | 1fr]. Left nav (Home/About/Catalogue/Contact, 18–28px, 300). Right: circular founder photo (`uploads/footer.png`), description `#e8d9de`, copyright `#c9adb6`, white pill button "Request a Consultation ↗" (text `#5c0d24`), links Email / Instagram / WhatsApp with ↗ icons.
6. **Floating WhatsApp** (fixed bottom-right): 60px circle button, closed bg `rgba(26,20,22,.82)` + white chat icon; open → white bg + ✕. On open, a white pill (height 60, radius 999, shadow `0 10px 30px rgba(0,0,0,.14)`) expands leftward: max-width 0→320px over .55s `cubic-bezier(.2,.8,.2,1)`, opacity .35s. Content: "DIRECT WHATSAPP" (12px, ls .3em, 600, `#555`) + 44px green circle `#25D366` WhatsApp glyph. Link `https://wa.me/` — **real number still needed**.

### Category Modal (Home)
Fixed overlay `rgba(20,10,14,.55)` + `backdrop-filter:blur(6px)`, scrollable, padding 4vh 4vw. White card max-w 1600px, shadow `0 30px 80px rgba(0,0,0,.25)`. Sticky header: "CATALOGUE 0X" (ls .4em, `#8a8a8a`) + name (900, up to 52px) + 56px round close button `#f2f2f2`. Grid `repeat(auto-fill,minmax(260px,1fr))`, tiles 4:5, cover, hover scale 1.04 (.6s). Empty → "Gallery coming soon" Playfair italic `#888`. Close: ✕, backdrop click, Esc.
Image sets (in order): 01 → `uploads/01.jpg`…`19.jpg`; 02 → `uploads/01-75166bdf.jpg`…(19 hashed files, see `cats`/`g` in the logic script) + `20.jpg`, `21.jpg`; 03 → `01-33ab19bc.jpg`, `02-be5b0267.jpg`; 04 → `01-eefc08ae.jpg`…`08-c3378f7c.jpg`.

## Screen 2 — Artist
1. **Top bar**: white, bottom border `#e4e4e6`; "← BACK" (to Home) left, "LISAMON" (`#8a6e61`, ls .5em) right.
2. **Bio**: 2-col (stacks below ~840px). Left: eyebrow "CATALOGUE 05 — ARTIST", title "About the Artist" Playfair italic up to 68px, name "MAEDEH AKBARI FARIMANI" (900, "FARIMANI" in `#8f8f8f`), 4 paragraphs with left border, 15–19px, lh 1.75, `#444`. Right: `uploads/01-63c23369.jpg` cover.
3. **Project grid**: bg white, 3 equal columns, gap 10–28px. Cards aspect 4:5, cover image, bottom gradient `rgba(0,0,0,.6)→0` over 55%, bottom-left text: year (ls .4em, 600, white 80%) + title (900, 15–24px, white). Order:
   1. 2023–PRESENT · HAND-PAINTED ART — VONTO (`01.png`)
   2. 2022 · ART EXHIBITION — DIFC, DUBAI (`01-560341d0.png`)
   3. 2021 · INTERNATIONAL EXHIBITION — ISTANBUL (`01-9379bcaf.png`)
   4. 2021 · SOLO EXHIBITION — YELLOW RED FISH (`06-fbe24000.jpg`) — **opens modal**
   5. 2019 · A FOLDED WOMAN — GRADUATION THESIS (`01-dac118ee.png`) — degree line + description shown *below* the card — **opens modal**
   6. 2019 · 4TH NATIONAL JOKAL STUDENT PAINTING FESTIVAL (`01-1e173807.png`)
   7. 2016 · DUSTMAN — PUBLIC SCULPTURE (`01-cf96f5a2.png`) — **opens modal**
4. **Exhibition list** (no images): rows separated by 1px `#e4e4e6`; grid [year col | content]. Year `#8a6e61` ls .3em; title 900 uppercase 17–28px; venue ls .15em `#8f8f8f`; description 14–18px `#444`. Four entries (copy in `Artist.dc.html`).

### Gallery Modal (Artist)
Overlay `rgba(20,16,18,.6)` + blur 6px. White card max-w 1280px, 44px round ✕ with `#ddd` border. Eyebrow (ls .5em `#8a6e61`) + title (900). Grid `auto-fill,minmax(220px,1fr)`, square tiles, hover scale 1.05. Close: ✕, backdrop, Esc.
- Yellow Red Fish: `01-c2b06938.png, 02.png, 03.png, 04.png, 05.png, 07-a9e0bd89.jpg, 08.png, 09.png, 10.png, 11.png, 12.png`
- A Folded Woman: `02-be6dccef.png, 03-668339c1.png`
- Dustman: `02-b2e17899.png`

## State
- Home: `openCategory: number|null`, `whatsappOpen: boolean`.
- Artist: `openGallery: 'fish'|'fold'|'dust'|null`.
- Esc closes any open modal. Lock body scroll while a modal is open (recommended).

## Design Tokens
- Burgundy `#68122c` (footer), deep burgundy `#5c0d24`, hover `#6b0f2a`
- Taupe accent `#8a6e61`
- Ink `#1a1a1a`, text `#444` / `#555`, muted `#8f8f8f` / `#888`
- Surfaces `#fff`, `#f6f6f7`, `#f3f4f6`, `#f2f2f2`; borders `#bdbdbd`, `#e4e4e6`, `#eee`
- WhatsApp green `#25D366`
- Radius: pills 999px, circles 50%; images square-cornered
- Shadows: `0 10px 30px rgba(0,0,0,.14)`, `0 30px 80px rgba(0,0,0,.25)`

## Assets
All images are in `uploads/` (supplied by the client). Rename to meaningful names when porting. `Screenshot*.png` and `Ref-*.png` are reference screenshots only, not used on the site.

## Files
- `Studio Austinn.dc.html` — Home page (markup + logic script at bottom)
- `Artist.dc.html` — Artist page
- `support.js` — prototype runtime only
- `uploads/` — images
