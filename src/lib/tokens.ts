/**
 * COBRR design tokens as TypeScript.
 *
 * `src/app/globals.css` (`@theme` + the `[data-theme="dark"]` override) is the
 * source of truth for everything rendered in the DOM. This file mirrors those
 * values for the places that cannot read CSS variables:
 *
 *   - Open Graph images generated with `next/og` (`ImageResponse`)
 *   - SVG illustrations that need literal colours (hex + alpha suffixes)
 *   - Framer Motion values
 *
 * The site uses ONE surface (white in light, matte black in dark) and ONE
 * accent. When you change a colour, change it in BOTH files.
 */

/** Brand accent — a single, confident cobalt. */
export const brand = {
  base: "#2450e6",
  strong: "#1b3ec2",
  soft: "#eef1fe",
  /** Lifted variant used on the matte-black surface. */
  onDark: "#6d8bff",
} as const;

/** Light theme — corporate white. */
export const light = {
  paper: "#ffffff",
  elevate: "#f7f7f8",
  line: "#e5e5e8",
  fg: "#101012",
  muted: "#5b5d64",
} as const;

/** Dark theme — matte black (neutral, never navy). */
export const dark = {
  paper: "#0c0c0d",
  elevate: "#161618",
  line: "#26262a",
  fg: "#f4f4f5",
  muted: "#9c9ca4",
} as const;

/** Secondary accent, used very sparingly (star ratings). */
export const copper = "#b4762c";

/** Semantic status colours. */
export const status = {
  success: "#15803d",
  danger: "#dc2626",
} as const;

/**
 * Content still tags items with an accent name (hero slides, case studies).
 * The site currently renders all of them in the single brand accent — this
 * map is what makes that swap a one-line change if per-item colour is ever
 * wanted back.
 */
export const accents = {
  cobalt: brand.base,
  teal: brand.base,
  violet: brand.base,
  copper: brand.base,
  rose: brand.base,
} as const;

export type AccentName = keyof typeof accents;

/** Motion — matches `--ease-out-expo` and the Reveal component. */
export const motion = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  reveal: 0.7,
  fast: 0.25,
} as const;

/** Radius scale in px — matches `--radius-*`. */
export const radius = {
  card: 14,
  panel: 24,
  chip: 12,
  input: 12,
} as const;

/** The engineering grid cell size used by `.bg-grid`. */
export const gridSize = 56;
