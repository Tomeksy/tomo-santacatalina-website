# Tomo Santa Catalina – Dev Brief

## 0. Purpose of this Document

This dev brief defines the architecture, constraints, and implementation approach for the Tomo Santa Catalina restaurant website. It is written to be executable by coding agents and human developers, with explicit fixed vs. open decisions (TBDs).

### Technical Requirements

**Deployment & Hosting**
- Version Control: GitHub repository
- Hosting: Netlify (continuous deployment from GitHub)
- Build Tool: Vite

**Code Structure**
- Component-based architecture (React)
- Clean, maintainable code
- Accessibility best practices
- Mobile-first, fully responsive

---

## 1. Scope

**Pages (Total: 3)**
- Homepage
- Menu
- About

**Header**
- Navigation for all pages
- Language switcher (EN / ES / DE)
- CTA button: "Reservieren" → opens `tel:` link directly

**Reasoning**
Clean and beautiful restaurant website with clear purpose: present the restaurant, show the signature dishes, tell the story. No booking system, no e-commerce, no complex interactions.

---

## 2. Non-Negotiable Constraints

1. **Homepage first**: Build and complete the Homepage before starting Menu or About pages. No parallel page development.

2. **No i18n libraries**: Implement language switching via JSON files. One JSON file per language containing all UI strings. Browser language (`navigator.language`) determines default; user can override via language switcher.

3. **Brand colors from palette**: All color decisions must derive from `tomo_color_palette.md`. The coding agent extends this palette for backgrounds, hover states, shadows, etc. while maintaining brand consistency.

**Reasoning**
- Homepage-first ensures a working, deployable product early.
- JSON-based i18n keeps dependencies minimal and gives full control.
- Central color palette prevents brand drift across components.

---

## 3. Tech Stack

| Layer | Choice |
|-------|--------|
| Build | Vite |
| Framework | React |
| Styling | TBD (CSS Modules, Tailwind, or Styled Components – coding agent decides) |
| i18n | Custom JSON mapping |
| Deployment | GitHub → Netlify |

**Reasoning**
- Vite + React: Modern, fast, component-based. Familiar workflow.
- Styling left open: Coding agent can choose based on preference and project fit.
- No SSR/SSG framework (Astro, Next): SEO is not critical, and we want a fresh visual approach.

---

## 4. Assets

**Location:** 
- `/assets` folder in repository
- `/assets/logo_and_brand` contains designs, graphics and logo
- `/assets/photos` contains photo shooting images

**Current contents:**
- Logo files (photos empty for now)

**Later additions:**
- Restaurant photos (interior, food, guests)
- Artist/Juri photos
- Any other visual content

**Approach:**
- All assets live in the repo, not external storage (e.g. S3)
- Coding agent can directly optimize (resize, crop, format conversion)
- Netlify serves assets via CDN automatically

**Reasoning**
For a website of this scale (~10-30 images), repo-based assets are simpler and faster. No external storage workflow needed. Direct access for the coding agent enables efficient image optimization.

---

## 5. Style Guide

### Color Palette

**Reference:** See `tomo_color_palette.md` for brand colors. Derive all additional colors (backgrounds, hover states, borders, shadows) from this palette.

### Typography

- Headings: Bold, clear, premium feel
- Body: Easy to read, generous line height
- Font choice: TBD – should feel natural and modern, not generic

### Visual Style

- Natural, warm, premium aesthetic
- Reflects the restaurant interior: moss, wood, calm
- Generous whitespace
- Rounded corners on interactive elements
- Subtle shadows for depth
- Smooth transitions on hover states

### Images

Professional photos available (guests, interior, artist at work, food). These are central to the design and should be prominently featured.

**IMPORTANT FOR CODING AGENT:** Use Placeholder Images, real photos will be added later manually.

---

## 6. Internationalization (i18n)

**Languages:** English, Spanish, German

**Implementation:**
- One JSON file per language (e.g., `en.json`, `es.json`, `de.json`)
- All UI strings referenced by key
- Browser language detection on first load (`navigator.language`)
- Manual override via header language switcher
- Language preference stored in localStorage

**Reasoning**
No external i18n library needed for 3 languages and limited content. JSON mapping is simple, transparent, and fully controllable.

---

## 7. Non-Goals (MVP)

**Out of scope for initial build:**
- Menu page (build after Homepage complete)
- About page (build after Homepage complete)
- Online reservation system (CTA is phone call only)
- Blog or news section
- CMS integration
- Analytics (can be added later)

**Reasoning**
MVP = Homepage live and polished. Subpages follow sequentially.