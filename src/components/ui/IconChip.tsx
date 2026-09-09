import type { ReactNode } from "react";
import type { IconKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

type Tone = "brand" | "solid" | "outline";
type Size = "xs" | "sm" | "md" | "lg";

const iconPx: Record<Size, number> = { xs: 14, sm: 16, md: 20, lg: 24 };

/**
 * The square (or round, for xs) icon tile used at the top of cards, in
 * feature lists and check bullets.
 *
 *  tone  brand   → faint brand tint (default)
 *        solid   → foreground/paper inverse
 *        outline → hairline only
 *  size  xs 24px round · sm 32px · md 44px · lg 56px
 *
 * Pass either `name` (a content IconKey) or custom `children`.
 */
export default function IconChip({
  name,
  children,
  tone = "brand",
  size = "md",
  className,
}: {
  name?: IconKey;
  children?: ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  return (
    <span className={cn("chip", `chip-${tone}`, `chip-${size}`, className)}>
      {name ? <Icon name={name} width={iconPx[size]} height={iconPx[size]} /> : children}
    </span>
  );
}
