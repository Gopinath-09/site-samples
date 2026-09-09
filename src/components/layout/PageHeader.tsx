import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "center";
}

/**
 * Interior-page hero band. Sits on the same surface as everything else, with
 * the faint engineering grid for texture — note the top padding, which clears
 * the fixed navbar.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = "left",
}: PageHeaderProps) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper text-fg">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="glow-brand absolute right-0 top-0 h-72 w-96" aria-hidden />
      <div
        className={cn(
          "relative container-page pb-16 pt-36 md:pb-24 md:pt-44",
          centered && "text-center",
        )}
      >
        <Reveal>
          <div className={cn("max-w-3xl", centered && "mx-auto")}>
            {eyebrow && (
              <span className={cn("eyebrow", centered && "eyebrow-center")}>
                {eyebrow}
              </span>
            )}
            <h1 className="heading-xl mt-5 text-balance text-fg">{title}</h1>
            {description && <p className="lead mt-6">{description}</p>}
            {children && <div className="mt-9">{children}</div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
