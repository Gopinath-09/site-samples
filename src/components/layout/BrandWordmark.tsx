/**
 * Decorative outlined wordmark with a sweeping highlight.
 *
 * A full-bleed brand flourish that closes every page, sitting between the last
 * section and the footer. Purely decorative: `aria-hidden`, unselectable and
 * click-through, so it never interferes with content or the tab order.
 *
 * Style notes, in keeping with the rest of the system:
 *  - No background of its own — it sits on the single page surface, and the
 *    footer's own top hairline provides the separation below it.
 *  - `.text-wave` draws the letters as hollow outlines in the foreground
 *    colour and sweeps a highlight through them, so it flips with the theme
 *    and is disabled automatically under `prefers-reduced-motion`.
 *  - Medium display size, centred, with equal breathing room above and below
 *    so it reads as a deliberate pause between the last section and the
 *    footer rather than a full-bleed graphic.
 */
export default function BrandWordmark() {
  return (
    <section
      aria-hidden
      className="relative select-none overflow-hidden bg-paper py-10 md:py-14"
    >
      {/* `text-indent` offsets the trailing letter-space so the five letters
          sit optically centred rather than a hair to the left. */}
      <p className="text-wave pointer-events-none whitespace-nowrap text-center font-extrabold leading-none tracking-[0.15em] text-[clamp(3.5rem,6vw,6rem)] [text-indent:0.075em]">
        COBRR
      </p>
    </section>
  );
}
