# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

TOMO Santa Catalina — a React SPA (single-page application) for a restaurant website. No backend, no database, no Docker. Pure client-side with Vite + React 18 + TypeScript + Tailwind CSS.

### Development commands

See `package.json` scripts:

- **Dev server:** `npm run dev` (Vite on port 5173 by default; add `-- --host 0.0.0.0` for network access)
- **Build:** `npm run build` (runs `tsc && vite build`)
- **Preview prod build:** `npm run preview`

### Known issues

- **ESLint config missing:** The repo has ESLint in devDependencies and a `lint` script, but no `.eslintrc.*` config file exists. Running `npm run lint` will fail with "ESLint couldn't find a configuration file." TypeScript type-checking (`npx tsc --noEmit`) works fine as an alternative code-quality check.

### Caveats

- No environment variables or secrets are required.
- The "Reserve Table" button triggers a `tel:` link (phone call), which will produce an `xdg-open` dialog in the cloud VM — this is expected behavior.
- Translations live in JSON files under `src/` (not fetched from an API).
