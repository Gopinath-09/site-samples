import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * COBRR logo — the company mark (`/public/brand/logo-mark-*.png`, derived from
 * `/public/company_logo.png`) inside a white tile, plus the spaced wordmark.
 *
 * The tile stays white in both themes because the mark itself is a black
 * marble glyph; on the matte-black surface it reads as a deliberate brand
 * plate. The wordmark uses the semantic foreground colour.
 */
export default function Logo({
  size = "md",
  wordmark = true,
  className,
}: {
  size?: "sm" | "md" | "lg";
  wordmark?: boolean;
  className?: string;
}) {
  const px = size === "lg" ? 40 : size === "sm" ? 24 : 30;
  const tile =
    size === "lg" ? "rounded-xl p-1.5" : size === "sm" ? "rounded-md p-0.5" : "rounded-lg p-1";
  const text = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center bg-white ring-1 ring-black/10",
          tile,
        )}
      >
        <Image
          src="/brand/logo-mark-128.png"
          alt="COBRR mark"
          width={px}
          height={px}
          draggable={false}
          className="select-none"
        />
      </span>
      {wordmark && (
        <span
          className={cn("font-extrabold leading-none tracking-[0.12em] text-fg", text)}
        >
          COBRR
        </span>
      )}
    </span>
  );
}
