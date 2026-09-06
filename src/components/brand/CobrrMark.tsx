import { cn } from "@/lib/utils";

/**
 * The COBRR monogram — black marble, cracked through with gold, exactly as
 * supplied: no frame, no badge, just the letterform itself.
 *
 * Drawn as vector rather than shipped as artwork. The two outlines are traced
 * from the supplied mark, so the shape is the real one, but as paths they stay
 * crisp at any size and recolour from the tokens.
 *
 * Three layers, back to front, all clipped to the C and K:
 *
 *   1. Stone. The dark marble fill.
 *   2. Cracks. Fractal noise pushed through a narrow contour band leaves fine
 *      gold threads rather than cloudy fog — the veining, generated rather
 *      than an image, so there is no texture file to load or keep in sync.
 *   3. Shine. A soft diagonal band that sweeps once across the whole glyph
 *      every few seconds and is otherwise parked just off-canvas — an
 *      occasional glint catching the marble, not a continuous animation.
 *
 * A dim gold outline sits on the letterforms themselves, on top of all three.
 *
 * Decorative: the mark is hidden from assistive technology wherever it is used
 * beside a readable wordmark. Where it stands alone the caller passes a label.
 */

/** Squared C — stem, both arms, open to the right. */
const GLYPH_C =
  "M58,92 L47,101 L38,121 L38,889 L43,903 L56,916 L72,921 L486,921 " +
  "L501,916 L514,903 L519,885 L518,754 L210,754 L206,752 L208,751 " +
  "L208,253 L515,252 L515,118 L510,106 L498,94 L480,88 L70,88 Z";

/** Angular K — stem with arms opening to the upper and lower right. */
const GLYPH_K =
  "M664,91 L649,103 L643,120 L643,252 L785,253 L641,404 L633,406 " +
  "L372,406 L362,410 L355,417 L351,427 L352,585 L359,595 L368,599 " +
  "L650,599 L786,753 L643,754 L643,892 L650,907 L659,915 L677,921 " +
  "L951,921 L968,917 L981,907 L989,889 L989,707 L987,700 L969,675 " +
  "L810,491 L965,326 L980,304 L983,287 L984,123 L981,110 L970,96 " +
  "L953,88 L675,88 Z";

export default function CobrrMark({
  className,
  /**
   * Prefix for the filter and clip ids. Two marks on one page would otherwise
   * share a `url(#…)` reference, and the second would silently take the
   * first's definitions.
   */
  uid = "cm",
  label,
}: {
  className?: string;
  uid?: string;
  label?: string;
}) {
  const veins = `${uid}-veins`;
  const clip = `${uid}-glyphs`;
  const stone = `${uid}-stone`;
  const shine = `${uid}-shine`;

  return (
    <svg
      viewBox="0 0 1024 1024"
      className={cn("block h-full w-full overflow-visible", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        {/*
          Veining: noise sliced at a hard edge, not a soft one.

          `type="table"` interpolates linearly between neighbouring entries —
          the first attempt at this used it, and the ramp either side of the
          "on" entry covered roughly a third of the noise range, wide enough
          that the veins' own edges blurred into fog rather than reading as
          cracks. `type="discrete"` has no ramp: each of 30 buckets is either
          fully on or fully off, so the boundary between vein and stone is a
          hard line, however fine the bucket — bucket 19 of 30 was chosen by
          rendering a grid of candidates side by side and picking the one that
          actually reads as thin branching cracks rather than either a wash
          (buckets nearer the noise field's own centre of mass) or almost
          nothing (buckets out in its sparse tails).
        */}
        <filter id={veins} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011"
            numOctaves={4}
            seed={9}
            result="noise"
          />
          {/*
            One line, deliberately. Node's SSR HTML serializer collapses the
            embedded newlines and indentation a multi-line string like this
            would otherwise have, while client-side `setAttribute` keeps them
            verbatim — the two disagree on the attribute value and React flags
            a hydration mismatch. A single line can't drift between them.
          */}
          <feColorMatrix
            in="noise"
            type="matrix"
            result="white"
            values="0 0 0 0 0.95 0 0 0 0 0.75 0 0 0 0 0.25 1 0 0 0 0"
          />
          <feComponentTransfer in="white">
            <feFuncA
              type="discrete"
              tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
        </filter>

        <linearGradient id={stone} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1d" />
          <stop offset="55%" stopColor="#101012" />
          <stop offset="100%" stopColor="#08080a" />
        </linearGradient>

        {/* The glint: transparent, then one bright diagonal band, then
            transparent again — `objectBoundingBox` (the default) keeps it
            relative to the shine rect's own box below, wherever that box is
            translated to. */}
        <linearGradient id={shine} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fdf3d7" stopOpacity="0.85" />
          <stop offset="58%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <clipPath id={clip}>
          <path d={GLYPH_C} />
          <path d={GLYPH_K} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clip})`}>
        {/* 1 — stone */}
        <rect width="1024" height="1024" fill={`url(#${stone})`} />
        {/* 2 — cracks */}
        <rect width="1024" height="1024" filter={`url(#${veins})`} opacity="0.95" />
        {/* 3 — shine: parked off-canvas at rest, see `.mark-shine` */}
        <rect
          width="1024"
          height="1024"
          fill={`url(#${shine})`}
          className="mark-shine"
          style={{ mixBlendMode: "screen" }}
        />
      </g>

      {/* Rail — a gold outline on the letterforms themselves, over everything
          else. */}
      <g fill="none" strokeLinejoin="round" className="mark-rail">
        <path d={GLYPH_C} />
        <path d={GLYPH_K} />
      </g>
    </svg>
  );
}
