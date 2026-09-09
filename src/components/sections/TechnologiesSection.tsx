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
 * Which words render solid instead of outlined.
 *
 *   "none"  every word is hollow (outline only) — the default
 *   "all"   every word is filled in the foreground colour
 *   "even"  words at even positions are filled, the rest hollow
 *   "odd"   words at odd positions are filled, the rest hollow
 *
 * A filled word looks exactly like a hovered one: solid `fg` fill and stroke.
 */
export type MarqueeFill = "even" | "odd" | "all" | "none";

function isFilled(mode: MarqueeFill, indexInSet: number) {
  if (mode === "all") return true;
  if (mode === "none") return false;
  return indexInSet % 2 === (mode === "even" ? 0 : 1);
}

/**
 * One row of etched technology names. CSS marquee: each item carries its own
 * horizontal padding so the duplicated track loops at exactly -50%.
 */
function MarqueeRow({
  items,
  reverse = false,
  duration = 32,
  fullFillColorIn = "none",
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  /** Fill pattern for the words in this row. See `MarqueeFill`. */
  fullFillColorIn?: MarqueeFill;
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
            // Parity comes from the position within ONE set, never the
            // doubled index: the loop maps item i onto item i + items.length,
            // so with an odd-length row the two copies would otherwise flip
            // pattern and the seam would be visible.
            className={cn(
              "tech-glass shrink-0 px-6 text-5xl font-extrabold uppercase tracking-tight md:text-7xl",
              isFilled(fullFillColorIn, i % items.length) && "tech-glass-filled",
            )}
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

      {/* Etched marquee. The two rows use opposite fill patterns so solid and
          hollow words interlock as they pass each other. */}
      <div className="mt-14 flex flex-col gap-4">
        <MarqueeRow items={rowA} duration={34} fullFillColorIn="none" />
        <MarqueeRow items={rowB} reverse duration={40} fullFillColorIn="all" />
      </div>
    </Section>
  );
}
