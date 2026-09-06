import CobrrMark from "./CobrrMark";
import { cn } from "@/lib/utils";

/**
 * The mark, exactly as supplied — no frame, no badge — beside the wordmark
 * that runs beside it.
 *
 * The letters themselves run: each one slides in from behind the mark, holds
 * in place, then slides on out, forever — not a static word with a highlight
 * passing over it, but the glyphs actually in motion. All five share one
 * keyframe timeline and differ only in `animation-delay` (`--i` steps of
 * 0.3s), which is what turns five identical loops into the sequence "first C,
 * next O, then B, then R then R": C's delay is shortest, so it always leads.
 *
 * The word runs continuously rather than waiting on a hover — a logo that
 * only says its name while a pointer happens to be over it says it on none of
 * the touch devices that see it.
 *
 * All of it is CSS; nothing here needs JavaScript, so the mark and its motion
 * are fully present in the server-rendered page. The name is announced once,
 * from the label on the wrapper — the letters are hidden from assistive
 * technology so it is not read a second time, letter by letter.
 */

const LETTERS = ["C", "O", "B", "R", "R"];

function Word() {
  return (
    <span className="flex items-baseline" aria-hidden>
      {LETTERS.map((ch, i) => (
        <span
          key={i}
          className="lockup-letter"
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function CobrrLockup({
  className,
  /** Rendered size of the mark. The wordmark is sized from it. */
  size = 96,
  uid = "lockup",
  showWord = true,
}: {
  className?: string;
  size?: number;
  uid?: string;
  /**
   * Render the running wordmark beside the mark. Off in the header, where the
   * monogram stands alone. The name is still announced — it lives on the
   * wrapper's `aria-label`, not in the letters, so hiding them costs nothing
   * to a screen reader.
   */
  showWord?: boolean;
}) {
  return (
    <span
      className={cn("lockup group inline-flex items-center", className)}
      role="img"
      aria-label="COBRR"
    >
      <span className="block shrink-0" style={{ width: size, height: size }}>
        <CobrrMark uid={uid} />
      </span>

      {showWord && (
        <span
          className="block whitespace-nowrap font-semibold tracking-tight"
          style={{ fontSize: size * 0.62, lineHeight: 1 }}
        >
          <Word />
        </span>
      )}
    </span>
  );
}
