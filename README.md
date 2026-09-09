# COBRR TECH LABS — corporate website

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion 12 · TypeScript · pnpm

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (also validates OG images, sitemap, robots)
pnpm start
pnpm lint
pnpm exec tsc --noEmit
```

## Read first

- `AGENTS.md` — this Next.js version differs from older docs; the bundled docs are in `node_modules/next/dist/docs/`.
- `docs/DESIGN_SYSTEM.md` — tokens, theme, primitives, motion, and the checklist for adding a section.
- `docs/IMAGE_BRIEF.md` — every image slot on the site with sizes and generation prompts.

## Structure

```
src/app/                 routes (page.tsx per route, opengraph-image.tsx per dynamic segment)
src/app/globals.css      design tokens + component classes (source of truth)
src/lib/tokens.ts        TS mirror of the tokens (OG images, SVG, Framer)
src/lib/content.ts       all copy: services, products, industries, case studies, …
src/lib/site.ts          company facts, navigation, siteUrl
src/components/ui/       primitives: Button, Card, CardLink, Section, IconChip, Badge, Field, ShadedImage, …
src/components/layout/   Navbar, Footer, PageHeader, Logo, LegalPage
src/components/sections/ composable page sections
src/components/illustrations/ animated SVG scenes
src/components/theme/    ThemeScript, ThemeToggle, Providers
public/brand/            logo marks derived from public/company_logo.png
```

## House rules

- Every navigation is a **button click through the router**. No `<a>` or `<Link>`.
- All styling goes through tokens and the shared classes/primitives. No hard-coded hex, no Tailwind default palette.
- Light and dark themes are automatic: use semantic classes (`bg-paper`, `text-fg`, `border-line`). `ink` is the always-dark surface.
- Copy lives in `src/lib/content.ts`, not in components.
