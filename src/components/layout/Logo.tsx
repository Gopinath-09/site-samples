"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * COBRR monogram. Mark only — no wordmark or tagline — so the top-left corner
 * stays a single, quiet brand anchor.
 *
 * Artwork resolution order:
 *   1. `public/cobrr-logo.png`  — drop the official export here and it is used
 *      automatically, no code change required. (`.png`, or swap PRIMARY below
 *      for `.svg` / `.webp`.)
 *   2. `public/cobrr-mark.svg`  — vector stand-in, used only if the file above
 *      is missing, so the header never renders a broken image.
 */
const PRIMARY = "/cobrr-logo.png";
const FALLBACK = "/cobrr-mark.svg";

export default function Logo({
  className,
  size = 36,
}: {
  className?: string;
  /** Rendered height in pixels. Width follows the mark's aspect ratio. */
  size?: number;
}) {
  const [src, setSrc] = useState(PRIMARY);
  const ref = useRef<HTMLImageElement>(null);

  /*
   * `onError` alone is not enough: the browser requests the image while parsing
   * the server-rendered HTML, so a 404 can fire and be discarded before React
   * hydrates and attaches the handler, leaving a permanently broken mark. On
   * mount we therefore ask the element whether it already failed.
   */
  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth === 0) setSrc(FALLBACK);
  }, []);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt="COBRR"
        onError={() => setSrc(FALLBACK)}
        style={{ height: size, width: "auto" }}
        className="shrink-0 select-none"
        draggable={false}
      />
    </span>
  );
}
