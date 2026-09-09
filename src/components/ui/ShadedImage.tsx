import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Aspect = "video" | "wide" | "square" | "portrait" | "auto";

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  auto: "",
};

interface ShadedImageProps {
  /** Path under /public (e.g. "/images/about/team.jpg"). Omit for a placeholder. */
  src?: string;
  alt: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  aspect?: Aspect;
  /** Preload — only for the LCP image on a page. */
  preload?: boolean;
  /** `sizes` hint for next/image. Defaults to a sensible 2-column value. */
  sizes?: string;
  /** Text block placement. */
  align?: "bottom" | "center";
  className?: string;
  children?: ReactNode;
}

/**
 * Image with its caption laid over it — the site's pattern for "who we are",
 * team, office and campaign visuals.
 *
 * With a real `src`, a dark scrim sits between photo and text: that is the one
 * place a dark overlay is still used, because white type needs it to stay
 * legible over arbitrary photography.
 *
 * Without `src` (the state until images are generated) the tile renders on the
 * normal page surface — hairline border, faint grid, foreground text — so it
 * never reads as a differently-coloured block.
 */
export default function ShadedImage({
  src,
  alt,
  eyebrow,
  title,
  description,
  aspect = "video",
  preload = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  align = "bottom",
  className,
  children,
}: ShadedImageProps) {
  return (
    <figure
      className={cn(
        "group relative isolate overflow-hidden rounded-panel",
        src ? "bg-paper text-white" : "border border-line bg-paper text-fg",
        aspectClass[aspect],
        className,
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
          {/* Scrim — the only dark overlay on the site, needed for legible
              white type over photography. */}
          <div
            className={cn(
              "absolute inset-0",
              align === "center"
                ? "bg-black/55"
                : "bg-linear-to-t from-black/85 via-black/40 to-black/5",
            )}
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0" aria-hidden>
          <div className="bg-grid absolute inset-0" />
          <div className="glow-brand absolute -right-16 -top-16 h-64 w-64" />
        </div>
      )}

      {(eyebrow || title || description || children) && (
        <figcaption
          className={cn(
            "absolute inset-x-0 p-6 md:p-8",
            align === "center"
              ? "inset-y-0 flex flex-col items-center justify-center text-center"
              : "bottom-0",
          )}
        >
          {eyebrow && (
            <span
              className={cn(
                "eyebrow",
                align === "center" && "eyebrow-center",
                src && "text-white/80",
              )}
            >
              {eyebrow}
            </span>
          )}
          {title && (
            <div
              className={cn(
                "heading-md mt-3 max-w-lg text-balance",
                src ? "text-white" : "text-fg",
              )}
            >
              {title}
            </div>
          )}
          {description && (
            <p
              className={cn(
                "mt-2 max-w-md text-sm leading-relaxed",
                src ? "text-white/75" : "text-muted",
              )}
            >
              {description}
            </p>
          )}
          {children}
        </figcaption>
      )}
    </figure>
  );
}
