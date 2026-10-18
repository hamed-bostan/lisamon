# Update — latest changes (apply on top of previous handoff)

1. Category strips (home): dark overlay sits only on the image layer; on hover the overlay fades out with the image zoom, the title lifts slightly and a "BROWSE" label + circular ↗ arrow button fades in. Titles stay on one line (nowrap).
2. Intro / preloader on page load (~3.7s total), full-screen #faf9f7 layer above everything:
   - 150ms: logo fades in + rises 18px→0 (0.9s, cubic-bezier(.2,.8,.2,1))
   - 650ms: "LISAMON" wordmark (letter-spacing .6em, #8a6e61) fades in + rises 14px→0
   - 1000ms: 160×1px progress line (#e2dfdc track) fills to #1a1a1a over 1.3s, cubic-bezier(.65,0,.35,1)
   - 2600ms: whole layer slides up translateY(-100%) over 1s, cubic-bezier(.76,0,.24,1)
   - 3700ms: layer removed from DOM
3. Welcome statement ("Welcome to LISAMON, where art and design…"): no longer Playfair italic — now the site's regular sans, weight 400, ~2.2cqw, line-height 1.45.

Reference: "Studio Austinn.dc.html" (state key `ip` drives the intro phases).
