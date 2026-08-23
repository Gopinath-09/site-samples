import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The single image surface for the whole site.
 *
 * Pass `src` and it renders an optimised `next/image`; omit it and it renders a
 * designed placeholder carrying the same dimensions. That means a section can
 * be built, reviewed and shipped before the real photograph or screenshot
 * exists — dropping the asset in later is a one-line data change, never a
 * component change.
 *
 * Images always use `fill`, because every source in `content.ts` is a runtime
 * path string rather than a static import, so intrinsic dimensions are not
 * available at build time. The wrapper owns the aspect ratio instead, which
 * also keeps CLS at zero whether or not the asset has arrived.
 */

export type MediaVariant = "screen" | "plain";

export interface MediaProps {
  /** Path under `public/`, e.g. `/products/workship-board.png`. Omit for a placeholder. */
  src?: string;
  /** Describes the image. Required — also labels the placeholder for assistive tech. */
  alt: string;
  /** Short overlay caption on the placeholder. Defaults to `alt`. */
  label?: string;
  /** CSS colour tinting the placeholder and its label. Defaults to the brand cobalt. */
  accent?: string;
  /** Tailwind aspect-ratio class owned by the wrapper. */
  aspect?: string;
  /** `screen` mimics an app window; `plain` is a soft panel for photography. */
  variant?: MediaVariant;
  /** How a real image fills the frame. */
  fit?: "cover" | "contain";
  /** Responsive width hint. Widen this when the frame is larger than a card. */
  sizes?: string;
  /**
   * Preloads via a `<link>` in the head. Reserve it for the single LCP element
   * — Next 16 deprecated `priority` in favour of this.
   */
  preload?: boolean;
  className?: string;
}

export default function Media({
  src,
  alt,
  label,
  accent = "var(--color-brand)",
  aspect = "aspect-video",
  variant = "screen",
  fit = "cover",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
  className,
}: MediaProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-sand", aspect, className)}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className={fit === "cover" ? "object-cover" : "object-contain"}
        />
      ) : (
        <Placeholder
          label={label ?? alt}
          accent={accent}
          variant={variant}
          alt={alt}
        />
      )}
    </div>
  );
}

/**
 * Stands in for a missing asset. Deliberately reads as an intentional frame
 * rather than a broken image, so an unfinished section still looks composed.
 */
function Placeholder({
  label,
  accent,
  variant,
  alt,
}: {
  label: string;
  accent: string;
  variant: MediaVariant;
  alt: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex flex-col justify-end p-5"
      style={{ backgroundImage: `linear-gradient(140deg, ${accent}18, transparent 60%)` }}
    >
      {variant === "screen" && (
        <>
          {/* Window chrome */}
          <div className="absolute left-5 top-5 flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
          </div>
          {/* Content skeleton */}
          <div className="absolute inset-x-5 top-12 space-y-2 opacity-60" aria-hidden>
            <div className="h-1.5 w-2/3 rounded-full bg-ink/10" />
            <div className="h-1.5 w-1/2 rounded-full bg-ink/10" />
            <div className="h-1.5 w-3/5 rounded-full bg-ink/10" />
          </div>
        </>
      )}
      <span
        className="relative text-xs font-bold uppercase tracking-wider"
        style={{ color: accent }}
      >
        {label}
      </span>
    </div>
  );
}
