import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  /** Wrap children in `.container-page`. Default true. */
  container?: boolean;
  /** Apply `.section` vertical padding. Default true. */
  padded?: boolean;
  /** Show the faint engineering grid backdrop. */
  grid?: boolean;
  /** Show a very soft brand glow. Position is relative to the section. */
  glow?: "top" | "bottom" | "right" | false;
  children: ReactNode;
}

/**
 * Page section.
 *
 * Every section on the site sits on the SAME surface (`bg-paper`): corporate
 * white in light theme, matte black in dark. There is deliberately no `tone`
 * prop — separation between sections comes from spacing, hairlines and cards,
 * never from a different background colour.
 */
export default function Section({
  id,
  className,
  container = true,
  padded = true,
  grid = false,
  glow = false,
  children,
}: SectionProps) {
  const glowPos =
    glow === "top"
      ? "left-1/2 top-0 h-64 w-160 -translate-x-1/2"
      : glow === "bottom"
        ? "bottom-0 left-1/2 h-72 w-176 -translate-x-1/2"
        : glow === "right"
          ? "right-0 top-0 h-72 w-96"
          : "";

  return (
    <section
      id={id}
      className={cn(
        // `overflow-clip` clips the backdrops like `hidden` but does NOT create
        // a scroll container, so `position: sticky` keeps working inside.
        "relative overflow-clip bg-paper text-fg",
        padded && "section",
        className,
      )}
    >
      {grid && <div className="bg-grid absolute inset-0" aria-hidden />}
      {glow && <div className={cn("glow-brand absolute", glowPos)} aria-hidden />}
      {container ? (
        <div className="relative container-page">{children}</div>
      ) : (
        <div className="relative">{children}</div>
      )}
    </section>
  );
}
