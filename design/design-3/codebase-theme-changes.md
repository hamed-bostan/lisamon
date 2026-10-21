# Gray / black theme — codebase edits (lisamon)

Images untouched. Only colour values change.

## 1. `app/globals.css` — tokens (covers most of the site)

```css
@theme {
  --color-burgundy: #6e6e6e;        /* was #68122c — footer, bar end */
  --color-burgundy-deep: #707070;   /* was #5c0d24 — bar start, consultation text */
  --color-burgundy-hover: #6b6b6b;  /* was #6b0f2a — link/title hover */
  --color-taupe: #6b6b6b;           /* was #8a6e61 — small labels, years */
  --color-ink: #1a1a1a;
  --color-muted: #8f8f8f;
  --color-line: #e4e4e6;
}
```

Focus ring: in `:is(a, button):focus-visible` replace `outline-burgundy-hover` with `outline-ink`.

## 2. Hard-coded warm/burgundy values

`app/home.module.css`
- L106, L145 `#68122c85` → `#1a1a1a85`
- L230 `#e8d9de` → `#ffffff`
- L237 `#c9adb6` → `#f0f0f0`

`app/components/catalogue.module.css`
- L141 `rgba(20, 10, 14, 0.55)` → `rgba(17, 17, 17, 0.55)`

`app/components/lightbox.module.css`
- L5 `rgba(18, 14, 15, 0.82)` → `rgba(17, 17, 17, 0.82)`
- L50 `rgba(40, 36, 38, 0.9)` → `rgba(38, 38, 38, 0.9)`

`app/artist/artist.module.css`
- L249 `rgba(20, 16, 18, 0.6)` → `rgba(17, 17, 17, 0.6)`

`app/components/whatsapp-button.module.css`
- L66 `rgba(26, 20, 22, 0.82)` → `rgba(17, 17, 17, 0.82)`
- L48 `#25d366` is WhatsApp's brand green — left as is.

`app/components/intro.module.css`
- L10 `#faf9f7` → `#f7f7f7`
- L49 `#e2dfdc` → `#e2e2e2`

## 3. Artist row hover (if you apply the new artist page)

Row title and cue on hover use `--color-burgundy-hover` (now gray #6b6b6b).
