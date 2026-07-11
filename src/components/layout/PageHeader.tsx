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
 * Interior-page hero band. Dark, understated, with the engineering grid motif —
 * sits directly under the fixed navbar (note the top padding).
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
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute right-0 top-0 h-72 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-brand)" }}
        aria-hidden
      />
      <div
        className={cn(
          "relative container-page pb-16 pt-36 md:pb-24 md:pt-44",
          centered && "text-center",
        )}
      >
        <Reveal>
          <div className={cn("max-w-3xl", centered && "mx-auto")}>
            {eyebrow && (
              <span
                className={cn("eyebrow", centered && "eyebrow-center")}
                style={{ color: "#7f9dff" }}
              >
                {eyebrow}
              </span>
            )}
            <h1 className="heading-xl mt-5 text-balance text-white">{title}</h1>
            {description && (
              <p className="lead mt-6 text-muted-dark">{description}</p>
            )}
            {children && <div className="mt-9">{children}</div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
