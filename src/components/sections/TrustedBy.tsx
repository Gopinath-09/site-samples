import { trustedBy } from "@/lib/content";

/**
 * Trusted-by strip. A calm, continuous marquee of client wordmarks —
 * placeholder names ready to be swapped for real logos (monochrome SVG,
 * ~28px tall, `currentColor` so they inherit the muted tone).
 *
 * Each item owns its own horizontal spacing (padding, not flex-gap) so the
 * duplicated track loops seamlessly at exactly -50% with no drift at the seam.
 * The animation is CSS (`.marquee-track`) so reduced-motion is honoured.
 */
export default function TrustedBy() {
  const row = [...trustedBy, ...trustedBy];

  return (
    <section className="border-y border-line bg-paper py-10">
      <div className="container-page">
        <p className="text-center text-2xl font-extrabold uppercase tracking-[0.16em] text-muted">
          Our trusted clients &amp; partners
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track" style={{ ["--marquee-duration" as string]: "32s" }}>
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
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
