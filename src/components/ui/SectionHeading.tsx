import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Standard section header — eyebrow, title, optional description.
 * Reused across every page for a consistent editorial rhythm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow", centered && "eyebrow-center")}>
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "heading-lg mt-4 text-balance",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "lead mt-5",
            tone === "dark" && "text-muted-dark",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
