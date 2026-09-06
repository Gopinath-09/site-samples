import { cn } from "@/lib/utils";

/**
 * The COBRR wordmark — the name set in Space Grotesk, and nothing else.
 *
 * Solid letters and a gold caret. Three layers of motion, all CSS, so the mark
 * is complete in the server-rendered HTML and costs no JavaScript:
 *
 *   1. the letters run a continuous wave, each one offset behind the last
 *   2. the caret pulses on its own slower cycle
 *   3. on hover the word lifts and a gold rule draws beneath it
 *
 * Colour comes from `currentColor`, so the header decides it. The glyphs are
 * painted in that colour directly rather than through a clipped gradient — see
 * the note in `globals.css` for why that mattered.
 *
 * The name is announced once from the wrapper's `aria-label`; the letters are
 * hidden from assistive technology so it is not read out letter by letter.
 */

const LETTERS = ["C", "O", "B", "R", "R"];

export default function CobrrWordmark({
  className,
  /** Font size in pixels for the wordmark's capitals. */
  size = 26,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn("wordmark", className)}
      role="img"
      aria-label="COBRR"
      style={{ fontSize: size }}
    >
      <span className="wordmark-letters" aria-hidden>
        {LETTERS.map((ch, i) => (
          <span
            key={i}
            className="wordmark-letter"
            style={{ "--i": i } as React.CSSProperties}
          >
            {ch}
          </span>
        ))}
      </span>
      <span className="wordmark-caret" aria-hidden />
    </span>
  );
}
