import { trustedBy } from "@/lib/content";

/**
 * Trusted-by strip. A calm, continuous marquee of client wordmarks —
 * placeholder names ready to be swapped for real logos (monochrome SVG,
 * ~28px tall, `currentColor` so they inherit the muted tone).
 *
 * ── Why the list is repeated more than twice ──────────────────────────────
 * `.marquee-track` loops by translating exactly -50%, so the track must be
 * two identical halves. That only looks seamless if ONE half is wider than
 * the viewport — otherwise the half currently on screen runs out before the
 * next one arrives and a blank gap scrolls past.
 *
 * The seven client names measure ~1280px in total, so a single set left a
 * 161px gap at 1440px wide and 641px at 1920px. Repeating the set
 * `SETS_PER_HALF` times per half makes each half ~5100px, which covers every
 * viewport up to 4K.
 *
 * Speed is defined per set, so changing SETS_PER_HALF keeps the pixels-per-
 * second identical — the duration scales with the width.
 */
const SETS_PER_HALF = 4;
const SECONDS_PER_SET = 32;

export default function TrustedBy() {
  const half = Array.from({ length: SETS_PER_HALF }, () => trustedBy).flat();
  // Two identical halves — the -50% translate lands exactly on the seam.
  const row = [...half, ...half];

  return (
    <section className="border-y border-line bg-paper py-10">
      <div className="container-page">
        <p className="text-center text-2xl font-extrabold uppercase tracking-[0.16em] text-muted">
          Our trusted clients &amp; partners
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="marquee-track"
          style={{
            ["--marquee-duration" as string]: `${SETS_PER_HALF * SECONDS_PER_SET}s`,
          }}
        >
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= trustedBy.length}
              className="flex shrink-0 items-center justify-center px-9 text-xl font-semibold tracking-tight text-muted transition-colors hover:text-fg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
