# Tomo Santa Catalina – Dev Brief (Code-Truth)

## 0. Purpose of this Document

This dev brief documents the **current, implemented** architecture and constraints of the Tomo Santa Catalina restaurant website.

**Source of truth:** the codebase in this repository. If something is not clearly present in code/config, it must be treated as **unknown / not implemented**.

### Technical Requirements (as implemented)

**Build & runtime**
- Build tool: Vite
- Framework: React (SPA)
- Language: TypeScript
- Routing: React Router (`react-router-dom`)

**Code structure**
- Component-based architecture (React + TS)
- Tailwind utility-first styling
- Some accessibility patterns already present (e.g. `aria-label` on key buttons)

---

## 1. Scope

### Routes / Pages (as implemented)

- **Implemented route(s)**
  - `/` → Homepage (`src/pages/Home.tsx`)
- **Not implemented (in routing)**
  - Menu page route/content (nav item exists but is disabled)
  - About page route/content (nav item exists but is disabled)

### Header (as implemented)

- **Logo**: text “TOMO” linking to `/`
- **Navigation items**
  - Home (link)
  - Menu (disabled, “Coming soon”)
  - About (disabled, “Coming soon”)
- **Language switcher**: `en` / `es` / `de`
- **Primary CTA**
  - Label comes from translations (`t.cta.reserve`)
  - Opens a direct `tel:` link
  - Current `tel:` target in code: `tel:+34000000000`

**Note:** The same `tel:+34000000000` pattern is used in the Hero section and the Location/Contact section.

---

## 2. Non-Negotiable Constraints

The constraints below are what the codebase currently enforces and/or encodes.

1. **No i18n libraries**: Language switching is implemented via in-repo JSON translation files and a custom context/hook.
2. **Phone-only reservation CTA**: “Reserve” actions are implemented as direct `tel:` links (no booking form/system).
3. **Tailwind-based design tokens**: Brand colors and typography tokens are encoded in `tailwind.config.js` (no external palette document referenced by code).

---

## 3. Tech Stack (from `package.json` + config)

| Layer | Choice |
|-------|--------|
| Build | Vite (`^5.1.4`) |
| Framework | React (`^18.2.0`) |
| Language | TypeScript (`^5.2.2`) |
| Routing | React Router DOM (`^6.22.3`) |
| Styling | Tailwind CSS (`^3.4.1`) + PostCSS + Autoprefixer |
| Icons | `lucide-react` |
| Deployment | Unknown / not configured in repo |

**Build scripts**
- `npm run dev` → Vite dev server
- `npm run build` → `tsc && vite build`
- `npm run preview` → `vite preview`

**Notes**
- Path alias is configured:
  - Vite alias `@` → `./src` (`vite.config.ts`)
  - TS path `@/*` → `src/*` (`tsconfig.json`)
- Present but currently unused in `src/` (as of repository scan): `clsx`, `tailwind-merge`

---

## 4. Assets

**Repo folders present**
- `/assets/logo_and_brand`
- `/assets/photos`

**What the UI currently uses (as implemented)**
- Homepage imagery uses **external placeholder images** (e.g. Unsplash URLs), not local `/assets` files.
- The Header logo is currently rendered as text (“TOMO”), not as an image asset.

**Unknown / not implemented**
- Any in-repo image pipeline, resizing/cropping automation, or explicit asset serving strategy is not defined in code/config.

---

## 5. Style Guide (implemented tokens + conventions)

### Design Tokens

**Tailwind theme extension** lives in `tailwind.config.js` under `theme.extend`:
- **Colors**: `tomo.red`, `tomo.green`, `tomo.cream`, `tomo.dark`, `tomo.gray`, `tomo.white`
- **Fonts**
  - `font-sans`: `Montserrat` (loaded via Google Fonts import in `src/index.css`)
  - `font-display`: `Bernoru`, falling back to `Montserrat` (note: Bernoru is referenced but not loaded anywhere in code)

### Typography

- Headings: base layer applies `font-display font-bold` to `h1..h6`
- Body: base layer applies `font-sans` to `body`

### Visual conventions already encoded

- Rounded corners, shadows, hover transitions
- Mobile-first responsiveness via Tailwind breakpoints (`md:`, `lg:`)

### Images

- Remote placeholder images are used throughout the Homepage.
- Key images include `alt` text.

---

## 6. Internationalization (i18n)

**Languages:** English (`en`), Spanish (`es`), German (`de`)

**Translation files**
- `src/i18n/en.json`
- `src/i18n/es.json`
- `src/i18n/de.json`

**Implementation**
- Provider: `LanguageProvider` in `src/context/LanguageContext.tsx`
- Hook: `useTranslation()` returns `{ t, language, setLanguage }`
- Default language:
  - Starts as `'en'`
  - On first mount: reads `localStorage.getItem('tomo-lang')`
  - If missing/invalid: uses `navigator.language.split('-')[0]` when it matches one of `en|es|de`
- Persistence:
  - Saves to `localStorage` under key **`tomo-lang`**

---

## 7. Non-Goals / Not Implemented Yet (as of current code)

- Menu and About routes/pages are not implemented (only shown as disabled nav items).
- Map integration is not implemented:
  - The Location section currently shows a placeholder image with “View on Map” text.
  - No map provider and no outbound map link is implemented.
- No booking system (phone-only `tel:` CTA).
- No CMS, blog/news, or analytics integrations.

---

## 8. Deployment Facts (from repo state)

- No `netlify.toml` is present.
- No redirect configuration files were found (e.g. `_redirects`).
- Any hosting/CI/CD configuration (Netlify or otherwise) appears to be managed **outside** this repository. 
