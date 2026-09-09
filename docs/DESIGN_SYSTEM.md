# COBRR design system

How colours, type, buttons, cards and motion are defined and reused across the
site. Read this before adding a component or a page.

## 1. Where things live

| Concern | File | Notes |
| --- | --- | --- |
| Design tokens (CSS) | `src/app/globals.css` → `@theme` | **Source of truth.** Light values in `@theme`, dark values under `:root[data-theme="dark"]`. |
| Design tokens (TS) | `src/lib/tokens.ts` | Mirror for places that cannot read CSS variables: OG images, SVG hex+alpha, Framer values. Keep both files in sync. |
| Component classes | `src/app/globals.css` → `@layer components` | `.btn*`, `.card*`, `.pill*`, `.badge*`, `.chip*`, `.field*`, `.heading-*`, `.eyebrow*`, `.bg-grid*`, `.glow-brand`, `.anim-*` |
| Primitives (React) | `src/components/ui/` | `Button`, `CardLink`, `Card`, `Section`, `IconChip`, `Badge`, `Field`/`TextArea`, `ShadedImage`, `SectionHeading`, `Reveal*`, `StatCounter`, `Icon`, `icons` |
| Layout | `src/components/layout/` | `Navbar`, `Footer`, `PageHeader`, `Logo`, `LegalPage` |
| Theme | `src/lib/theme.ts`, `src/components/theme/` | `ThemeScript` (no-flash), `ThemeToggle`, `Providers` (MotionConfig + Toaster) |
| Sections | `src/components/sections/` | Composable page sections. Home and interior pages assemble these. |
| Illustrations | `src/components/illustrations/` | Animated SVG scenes. Server components, `aria-hidden`, CSS-driven motion. |
| Content | `src/lib/content.ts`, `src/lib/site.ts` | All copy, nav, company facts. Components never hard-code copy that belongs here. |
| Brand assets | `public/brand/`, `src/app/icon.png`, `apple-icon.png`, `favicon.ico` | Derived from `public/company_logo.png` (see `scripts` note below). |

## 2. Colour tokens

**The site has ONE surface.** Light theme is corporate white, dark theme is
matte black. There are no alternating section backgrounds and no permanently
dark bands. Separation between sections comes from spacing, hairlines and
cards — never from a different background colour.

| Token | Utility | Light | Dark | Use |
| --- | --- | --- | --- | --- |
| `paper` | `bg-paper` | `#ffffff` | `#0c0c0d` | **the** surface — every section, every card |
| `elevate` | `bg-elevate` | `#f7f7f8` | `#161618` | small UI feedback only (hover fills, wells) — never a section or card |
| `line` | `border-line` | `#e5e5e8` | `#26262a` | hairlines (default border colour) |
| `fg` | `text-fg` | `#101012` | `#f4f4f5` | primary text |
| `muted` | `text-muted` | `#5b5d64` | `#9c9ca4` | secondary text |
| `brand` | `text-brand`, `bg-brand` | `#2450e6` | `#6d8bff` | the single accent: eyebrows, links, active states |
| `brand-soft` | `bg-brand-soft` | `#eef1fe` | `#171b2c` | faint tint behind icon chips |
| `copper` | `text-copper` | `#b4762c` | `#d29a55` | star ratings only |
| `success` / `danger` | `text-success` … | green / red | lifted | status badges, form errors |

Rules:

- Every section is `bg-paper` (use `<Section>`, which applies it). Never paint a section another colour.
- One accent. `tokens.ts` still exports an `accents` map so content can tag items by name, but every entry resolves to `brand` — that is the one-line switch if per-item colour is ever wanted back.
- Never use Tailwind's default palette (`slate-*`, `gray-*`, `emerald-*`, `red-*`).
- Never hard-code a hex in a component. Add a token instead.
- `text-white` is allowed in exactly two places: on a filled brand element (selected chip, hover state) and over a photo scrim inside `ShadedImage`.
- In SVG use `var(--color-fg)`, `var(--color-line)`, `var(--color-brand)`, `var(--color-paper)` or `color-mix(...)` so illustrations flip with the theme. Illustrations take no `tone` prop — they are theme-aware by construction.

## 3. Theme

`ThemeScript` sets `data-theme="light|dark"` on `<html>` before first paint
(stored preference → OS preference → light). `ThemeToggle` flips it and persists
to `localStorage` (`cobrr-theme`). Because the semantic tokens change value,
components need **no** `dark:` classes. The `dark:` variant exists (keyed to
`data-theme`) for rare exceptions.

The navbar is transparent when flush with the top and gains the surface, a
hairline and a shadow once scrolled; its text colour never changes, because
whatever is behind it is the same surface.

## 4. Typography

| Class | Use |
| --- | --- |
| `.heading-xl` | page h1 (PageHeader, FinalCta) |
| `.heading-lg` | section h2 (SectionHeading) |
| `.heading-md` | sub-section h2/h3 |
| `.heading-sm` | card titles |
| `.lead` | section intro paragraph |
| `.body-sm` | card body copy (muted, 14px) |
| `.eyebrow` (+ `-center`, `-on-dark`) | uppercase label with leading rule |

Prefer these over ad-hoc `text-lg font-semibold` combinations.

## 5. Buttons

`<Button variant size href accentColor>` — always a `<button>`; navigation goes
through the router (site rule: no `<a>` / `<Link>`).

| Variant | Look |
| --- | --- |
| `primary` (default) | solid `fg` on `paper` — black on white, white on matte black |
| `dark` | primary without the shadow (dense layouts, card footers) |
| `outline` | hairline border, fills on hover |
| `accentColor="#hex"` | custom solid fill with white text (rarely needed) |

Three variants work everywhere, because there is only one surface. Blue is
**not** used for large buttons; it is an accent only.

## 6. Cards, chips, badges, fields

- `<Card interactive padding="none|sm|md|lg">` or `cardClasses()` for custom roots. A card sits on the page surface; its hairline is what separates it.
- `<CardLink href ariaLabel className>` — whole-card navigation. Renders content normally plus a stretched invisible button (valid HTML, keyboard-focusable). Use `group-hover:` inside.
- `<IconChip name|children tone="brand|solid|outline" size="xs|sm|md|lg">` — the icon tile at the top of cards and check bullets.
- `<Badge tone="success|brand|copper|neutral">` — status labels; colour lives in the text and border, not a fill.
- `<Field>` / `<TextArea>` — labelled inputs with `error` and `hint`.
- `<Section grid glow="top|bottom|right" container padded>` — every page section. No tone prop: they all share one surface.
- `<ShadedImage src alt eyebrow title description aspect>` — with a photo it applies a dark scrim so white type stays legible; without `src` it renders on the normal surface with a hairline.

## 7. Motion

- Scroll-in: `Reveal`, `RevealGroup` + `RevealItem`.
- Ambient SVG motion: CSS classes `anim-dash-flow`, `anim-dash-flow-reverse`, `anim-pulse`, `anim-float`, `anim-spin-slow`, `anim-ping`, `anim-delay-1..4`. These honour `prefers-reduced-motion` automatically.
- Marquees: `.marquee-track` (+ `.is-reverse`, `--marquee-duration`). Duplicate the items; give each item its own horizontal padding, not flex-gap.
- Framer Motion is wrapped in `MotionConfig reducedMotion="user"` (see `Providers`).
- Easing: `--ease-out-expo` / `motion.easeOutExpo` everywhere.

## 8. Images

- Raster images live under `public/images/<area>/`. Use `next/image`; `fill` + `sizes` for backgrounds, static import for fixed assets.
- Only the hero's first slide gets `preload`. (`priority` is deprecated in Next 16.)
- Allowed qualities: 60 / 75 / 90 (`next.config.ts`). Formats: AVIF, WebP.
- Generation prompts and slot specs: `docs/IMAGE_BRIEF.md`.
- Open Graph images are generated by `src/lib/og.tsx` (root + per dynamic route). Drop `Geist-SemiBold.ttf` in `public/fonts/` to use the brand weight.

## 9. Brand assets

`public/company_logo.png` is the master. Derived files (`public/brand/logo-mark-{128,256,512}.png`,
`src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico`) were
produced with sharp (trim → square pad → resize). Re-run the same steps if the
master changes. `Logo` renders the mark in a white tile so it reads on every
surface in both themes.

## 10. Adding a section — checklist

1. Copy goes in `src/lib/content.ts` (typed).
2. Wrap in `<Section tone=…>`; use `SectionHeading`.
3. Cards via `Card`/`CardLink`; icons via `IconChip`; status via `Badge`.
4. Text classes from §4; colours from §2 only.
5. Motion via `Reveal*` and `.anim-*`.
6. Navigation only through `Button`/`CardLink`.
7. Run `pnpm lint` and `pnpm exec tsc --noEmit`.
