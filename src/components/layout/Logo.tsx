import { cn } from "@/lib/utils";

/**
 * The COBRR wordmark.
 *
 * Set as type rather than artwork. There is no image to load, nothing to go
 * missing, and it stays crisp at any size and in any colour the surrounding
 * context sets — the previous mark shipped a PNG that did not exist and fell
 * back to an SVG only after hydration, so the header rendered a broken image
 * on first paint.
 *
 * The letterforms are tightened well past the default and given a slight
 * gradient falloff so the mark reads as one object; the accent stop closes it
 * off, which is what stops five identical-weight capitals from looking like a
 * word rather than a mark.
 */
export default function Logo({
  className,
  size = 38,
}: {
  className?: string;
  /** Rendered cap height in pixels; the mark scales from this. */
  size?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline leading-none",
        className,
      )}
      style={{ fontSize: size * 0.66 }}
    >
      <span className="bg-linear-to-r from-white via-white to-white/65 bg-clip-text font-bold tracking-tighter text-transparent">
        COBRR
      </span>
      <span
        aria-hidden
        className="ml-[0.06em] text-brand"
        style={{ fontSize: "1.15em", lineHeight: 0 }}
      >
        .
      </span>
    </span>
  );
}
