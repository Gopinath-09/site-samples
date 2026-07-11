"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * A whole-card clickable surface that navigates via the router on click.
 * Keeps the "button click navigates, no right-click / new tab" rule while
 * letting an entire card act as the click target. Renders a semantic button.
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
  ariaLabel?: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        if (/^https?:\/\//.test(href)) window.location.href = href;
        else router.push(href);
      }}
      className={cn("group block w-full cursor-pointer text-left", className)}
    >
      {children}
    </button>
  );
}
