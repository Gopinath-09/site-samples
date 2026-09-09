import { technologies } from "@/lib/content";
import { cn } from "@/lib/utils";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

// Flatten every technology into one list, then split across two marquee rows.
const allTech = technologies.flatMap((g) => g.items);
const rowA = allTech.filter((_, i) => i % 2 === 0);
const rowB = allTech.filter((_, i) => i % 2 === 1);

/**
 * One row of etched technology names. CSS marquee: each item carries its own
 * horizontal padding so the duplicated track loops at exactly -50%.
 */
function MarqueeRow({
  items,
  reverse = false,
  duration = 32,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn("marquee-track items-center", reverse && "is-reverse")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="tech-glass shrink-0 px-6 text-5xl font-extrabold uppercase tracking-tight md:text-7xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechnologiesSection() {
  return (
    <Section id="technologies" grid container={false}>
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Technologies"
            title="A modern, proven stack — chosen for fit, not fashion."
            description="We pick technologies for their longevity and operational maturity, so your platform stays supportable for years."
          />
          <Button variant="outline" href="/technologies" className="shrink-0">
            Full stack
            <ArrowRight width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* Etched marquee */}
      <div className="mt-14 flex flex-col gap-4">
        <MarqueeRow items={rowA} duration={34} />
        <MarqueeRow items={rowB} reverse duration={40} />
      </div>
    </Section>
  );
}
