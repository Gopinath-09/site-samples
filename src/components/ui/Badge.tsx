import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "success" | "brand" | "copper" | "neutral";

/** Small status label — product status, categories, availability. */
export default function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("badge", `badge-${tone}`, className)}>{children}</span>
  );
}
