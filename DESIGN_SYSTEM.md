# TOMO Design System

Modern Mediterranean editorial — premium but unfussy. Every choice below is already in the code; this file is the canonical reference, not a wishlist.

---

## 1. Brand tone

- **Voice:** confident, warm, a little playful. Never corporate, never precious.
- **Look:** editorial magazine meets neighborhood bistro. Upright display serif for presence, sans-serif for clarity, generous whitespace, occasional deep-dark breaks.
- **Do not:** use stock illustrations, emoji as icons, drop shadows without intent, gradients that look like 2012 web 2.0.

---

## 2. Surface system

Three surface tiers alternate to create rhythm. Never mix more than two on a single section.

| Token | Hex | Role | When to use |
|---|---|---|---|
| `tomo-white` | `#FFFFFF` | Primary light surface | Content-dense sections (Introduction, Philosophy, Story) |
| `tomo-cream` | `#FFF8F0` | Warm alt surface | Softer breaks (Testimonials, Experience, Location) |
| `tomo-moss` | `#2F4A3C` | Dark editorial surface | Deep breaks and signature moments (Concept, Footer) |
| `tomo-dark` | `#111827` | Ink / richest dark | Gallery dark stage, primary body text |
| `tomo-red` | `#DA240E` | Brand accent / CTA | Buttons, active nav, accent strokes, hover glows |
| `tomo-green` | `#48BB78` | Secondary accent | Health motif, secondary icon tints |
| `tomo-gray` | `#374151` | Secondary ink | Body copy that is not primary |

**Surface rhythm for the home page** (locked order):

```
Hero            dark moss (image)
Introduction    white
Gallery         tomo-dark
Testimonials    tomo-cream
Philosophy      white
Experience      tomo-cream
Concept         tomo-moss
Story           white
Location        tomo-cream
```

No two identical surfaces in a row.

**Texture:** dark surfaces always get an ambient wash (radial warm spot + cool edge) + a fine noise overlay at 6% opacity with `mix-blend-overlay`. Never leave moss or dark as a flat panel.

---

## 3. Typography

### Fonts

- **Display:** `DM Serif Display` — single weight (400), upright + italic cut. Loaded via Google Fonts. Used upright for all headings; the italic cut is reserved for non-heading editorial accents (pull quotes, taglines).
- **Sans:** `Montserrat` — `300, 400, 500, 600, 700, 800`. Loaded via Google Fonts.
- **Fallback chain:** `'DM Serif Display', Georgia, serif` for display; `Montserrat, sans-serif` for body.

### Type scale

| Role | Size | Weight | Style | Family |
|---|---|---|---|---|
| Hero headline | `clamp(2.5rem, 8vw, 5.75rem)` | 400 (DM Serif is single-weight) | upright | display |
| Section heading (h2) | `text-4xl md:text-5xl` (36/48px) | 400 | upright | display |
| Sub-section (h3) | `text-2xl md:text-3xl` (24/30px) | 400 | upright | display |
| Body large | `text-lg md:text-xl` (18/20px) | 400 | upright | sans |
| Body | `text-base` (16px) | 400 | upright | sans |
| Eyebrow label | `text-xs` (12px) | 600 | upright, **`tracking-[0.3em] uppercase`** | sans |
| Button | `text-base / text-lg` | 500–600 | upright | sans |
| Tabular / counter | `tabular-nums text-sm` | 500 | upright | sans |

**Non-negotiable:** all headings render upright in DM Serif Display. Italic is reserved for editorial pull quotes / taglines on `<p>` elements, never on `<h*>`.

**Line heights:** 1.05–1.1 for display, 1.5 for body, 1.7 for editorial pull quotes.

**Weight note:** DM Serif Display ships a single weight. `font-bold` / `font-semibold` classes on display headings are no-ops and have been removed from the base layer rule. Weight hierarchy now relies on size + color + tracking, not stroke thickness.

---

## 4. Layout & spacing

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Editorial narrow panels (quotes, about blocks) use `max-w-4xl` or `max-w-3xl` inside the 7xl.
- **Section vertical rhythm:** `py-24 md:py-32` for standard sections, `py-28 md:py-36` for editorial dark breaks (Concept, Gallery).
- **Section header to content:** `mb-14` on desktop, `mb-10` on mobile.
- **Grid gaps:** `gap-8` (2-col), `gap-10` (3-col cards), `gap-16` (content-image splits).
- **Breakpoints:** `sm 640 / md 768 / lg 1024 / xl 1280`.

---

## 5. Motion

### Tokens

| Role | Duration | Easing |
|---|---|---|
| Micro-interaction (hover, focus) | `150–300ms` | `ease-out` |
| Component state change | `300–500ms` | `ease-[cubic-bezier(0.22,1,0.36,1)]` |
| Reveal on scroll (float) | `650ms` | `ease-out` |
| Section-level reveal (fade) | `700–900ms` | `ease-[cubic-bezier(0.22,1,0.36,1)]` |
| Carousel crossfade | `320–900ms` | `ease-out` |
| Hero parallax throttle | rAF, cap 120px | linear (scroll-driven) |

### Rules

- **Reveal once, never loop.** `useRevealOnce` unobserves after first intersection.
- **Stagger lists** at 120–140ms per item via inline `animationDelay`. Never at-once.
- **Carousels crossfade, never jump.** Testimonials uses opacity-state swap; Gallery uses stacked-layer opacity.
- **Respect `prefers-reduced-motion`.** Parallax disables, reveals snap to visible, carousels stop auto-advancing. Already wired in `useRevealOnce`, `Hero`, and `Gallery`.
- **Transform-only for performance.** Never animate `width/height/top/left` — use `transform: translate3d()` + `opacity`.

---

## 6. Component patterns

### Section header

The editorial signature. Every major section uses this.

```
[ — ] EYEBROW LABEL [ — ]
    Upright Serif H2
     small subtitle
```

- Eyebrow: sans, `tracking-[0.3em] uppercase text-xs`, flanked by `h-px w-10 bg-current opacity-30` rules.
- H2: DM Serif Display upright, `text-4xl md:text-5xl leading-[1.1]`.
- Subtitle: optional, sans, `text-lg md:text-xl opacity-70`.
- Implemented in `src/components/ui/SectionHeader.tsx` with `variant="light" | "dark"`.

### Card

- **Base:** `bg-white rounded-2xl border border-gray-100 shadow-sm p-8`.
- **Hover:** `shadow-xl -translate-y-1` + 500ms ease-out. Premium cards also gain a red brand glow: `shadow-[0_25px_70px_-20px_rgba(218,36,14,0.35)]`.
- **Dark card (on moss/dark):** `bg-white/5 ring-1 ring-white/10 backdrop-blur-sm` with cream text.

### Button — primary

- `bg-tomo-red text-white px-8 py-4 rounded-full font-medium`
- `shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300`
- Arrow icon with `group-hover:translate-x-1` micro-interaction.

### Button — ghost (on dark)

- `border border-tomo-cream/40 text-tomo-cream px-6 py-3 rounded-full hover:bg-tomo-cream/10 hover:border-tomo-cream`

### Pill / chip

- `inline-flex px-4 py-1.5 border border-white/30 rounded-full bg-white/10 backdrop-blur-md`
- For the small "ITS'S TOMO TIME"-style tag above the hero headline.

### Accent rule

- `<span className="h-px w-10 bg-current opacity-30" aria-hidden />` — used in eyebrows and signatures.
- Never use plain `<hr>`.

### Editorial dark panel

- Section wrapper: `bg-tomo-moss` (or `tomo-dark`), `py-28 md:py-36`, `overflow-hidden relative`.
- **Always** layers: (1) radial ambient wash, (2) noise overlay `opacity-6 mix-blend-overlay`, (3) content.
- Content uses `text-tomo-cream` with body copy at `/90` opacity.

---

## 7. Imagery

- **Format:** local assets in `/assets/photos/`. No external URLs.
- **Aspect ratios:** hero `cover`, cards `aspect-[4/3]`, gallery slots `aspect-[16/9]` desktop / `aspect-[4/3]` mobile.
- **Treatment on dark surfaces:** every image gets a bottom `from-black/25 via-transparent to-transparent` gradient to seat it into the moss/dark.
- **Hover on light surfaces:** `hover:scale-105` (700ms) + optional `ring-tomo-red/40` glow.
- **Lazy-load everything below the fold** (`loading="lazy"`). Hero img is `loading="eager"`.

---

## 8. Accessibility

- **Focus:** `:focus-visible` ring `ring-2 ring-tomo-red/70 ring-offset-2` (already in `index.css`).
- **Contrast:** 4.5:1 minimum. Cream text on moss/dark passes. Red-on-cream is CTA-only.
- **Keyboard:** all carousels support arrow keys + escape (Gallery lightbox already does).
- **ARIA:** icon-only buttons get `aria-label`. Decorative SVGs get `aria-hidden="true"`.
- **Reduced motion:** honored in every keyframe and every JS animation.

---

## 9. Do / Don't

**Do**
- Alternate surfaces — never two whites in a row.
- Use DM Serif Display upright for section headings. Every time.
- Add texture to dark surfaces (noise + radial wash).
- Stagger revealing lists.
- Put a red glow on hover for elevated cards.

**Don't**
- Introduce new colors. The palette above is complete.
- Use `bg-gray-50` for surfaces — it reads as placeholder. Use `bg-tomo-cream`.
- Animate `width`/`height`/`top`/`left`. Transform and opacity only.
- Hardcode user-visible strings. Always route through `useTranslation`.
- Add more than one primary CTA per fold.

---

## 10. File map

| Concern | Path |
|---|---|
| Tokens (colors, fonts) | `tailwind.config.js` |
| Global keyframes + font import | `src/index.css` |
| Reveal orchestration | `src/hooks/useRevealOnce.ts` |
| Section header primitive | `src/components/ui/SectionHeader.tsx` |
| i18n strings | `src/i18n/{en,es,de}.json` |
