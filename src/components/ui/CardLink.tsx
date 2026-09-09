"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * A whole-card clickable surface that navigates via the router on click.
 *
 * Keeps the "button click navigates, no right-click / new tab" rule while
 * letting an entire card act as the click target. Uses the stretched-button
 * pattern: the content renders normally (valid HTML — headings, lists and
 * paragraphs are allowed) and an invisible <button> is stretched over the
 * card. The button carries the accessible name; the root is the `group` for
 * hover styles.
 */
export default function CardLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  /** Accessible name for the card. Defaults to the destination. */
  ariaLabel?: string;
}) {
  const router = useRouter();
  return (
    <div className={cn("group relative", className)}>
      {children}
      <button
        type="button"
        aria-label={ariaLabel ?? `Open ${href}`}
        onClick={() => {
          if (/^https?:\/\//.test(href)) window.location.href = href;
          else router.push(href);
        }}
        className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      />
    </div>
  );
}
