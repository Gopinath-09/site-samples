import { cn } from "@/lib/utils";

/**
 * COBRR wordmark. A precise, monospaced-feeling geometric mark ("C" carved
 * from a rounded square) paired with the wordmark — reads as engineered, not
 * decorative.
 */
export default function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const text = tone === "dark" ? "text-white" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          className="fill-brand"
        />
        <path
          d="M22 11.5A7 7 0 1 0 22 20.5"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="16" cy="16" r="2.2" fill="#fff" />
      </svg>
      <span
        className={cn(
          "text-[1.35rem] font-bold tracking-[-0.04em] leading-none",
          text,
        )}
      >
        COBRR
      </span>
    </span>
  );
}
