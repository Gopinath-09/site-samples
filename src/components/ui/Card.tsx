import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Padding = "none" | "sm" | "md" | "lg";

const paddingClass: Record<Padding, string> = {
  none: "",
  sm: "p-5",
  md: "p-7",
  lg: "p-8 md:p-9",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift + shadow on hover. */
  interactive?: boolean;
  padding?: Padding;
}

/**
 * The site's card surface.
 *
 * A card sits on the same background as the page — its hairline border and
 * radius are what separate it. There is no tone prop by design: the site uses
 * one surface everywhere (white in light, matte black in dark).
 *
 * For a whole-card navigation target, use `CardLink` with `cardClasses()`.
 */
export default function Card({
  interactive = false,
  padding = "md",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn("card", interactive && "card-hover", paddingClass[padding], className)}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Class string equivalent of <Card> — for CardLink and other custom roots. */
export function cardClasses({
  interactive = false,
  padding = "md",
}: Pick<CardProps, "interactive" | "padding"> = {}) {
  return cn("card", interactive && "card-hover", paddingClass[padding]);
}
