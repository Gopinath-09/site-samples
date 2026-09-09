import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Standard section header — eyebrow, title, optional description.
 * Reused across every page for a consistent editorial rhythm.
 *
 * No tone prop: the whole site sits on one surface, so the heading always
 * uses the semantic foreground colour.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <span className={cn("eyebrow", centered && "eyebrow-center")}>{eyebrow}</span>
      )}
      <h2 className="heading-lg mt-4 text-balance text-fg">{title}</h2>
      {description && <p className="lead mt-5">{description}</p>}
    </Reveal>
  );
}
