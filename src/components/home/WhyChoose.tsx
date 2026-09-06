import { differentiators } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Why COBRR, as a bento grid.
 *
 * Twelve columns, with each cell claiming a span from a fixed pattern rather
 * than from its own position, so the rows always close square. The pattern
 * tiles the seven points as 6+6 / 4+4+4 / 6+6; anything beyond the pattern
 * falls back to a quarter-width cell, which keeps the layout valid if the
 * dataset grows.
 *
 * Every cell carries a drawn figure above the words. They are decorative and
 * deliberately abstract — a diagram that pretended to describe the specific
 * point would be inventing detail we have not stated. All motion is CSS on
 * hover, so the whole section stays a server component with no JavaScript of
 * its own.
 */

/** Column spans over a 12-column grid, in order. */
const SPANS = [6, 6, 4, 4, 4, 6, 6];

/**
 * Abstract figure for a cell. Five variants, chosen by index, so adjacent
 * cells never repeat a drawing.
 */
function BentoFigure({ variant }: { variant: number }) {
  const common = "absolute inset-0 h-full w-full";

  if (variant === 0) {
    /* Concentric arcs, widening on hover */
    return (
      <svg className={common} viewBox="0 0 200 100" fill="none" aria-hidden>
        {[18, 30, 42, 54].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="86"
            r={r}
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-fg/15 transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ transformOrigin: "100px 86px", transitionDelay: `${i * 60}ms` }}
          />
        ))}
      </svg>
    );
  }

  if (variant === 1) {
    /* Stacked planes, separating on hover */
    return (
      <svg className={common} viewBox="0 0 200 100" fill="none" aria-hidden>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={62 + i * 6}
            y={34 + i * 14}
            width="76"
            height="26"
            rx="4"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-fg/15 transition-transform duration-700 ease-out group-hover:-translate-y-1"
            style={{ transitionDelay: `${(2 - i) * 70}ms` }}
          />
        ))}
      </svg>
    );
  }

  if (variant === 2) {
    /* Bar series, rising on hover */
    return (
      <svg className={common} viewBox="0 0 200 100" fill="none" aria-hidden>
        {[24, 40, 30, 56, 44, 68, 52].map((h, i) => (
          <rect
            key={i}
            x={52 + i * 14}
            y={90 - h}
            width="7"
            height={h}
            rx="2"
            className="fill-fg/12 transition-all duration-700 ease-out group-hover:fill-brand/30"
            style={{ transitionDelay: `${i * 55}ms` }}
          />
        ))}
      </svg>
    );
  }

  if (variant === 3) {
    /* Node mesh, brightening on hover */
    return (
      <svg className={common} viewBox="0 0 200 100" fill="none" aria-hidden>
        <path
          d="M60 74 L100 40 L140 74 M100 40 L100 86 M60 74 L140 74"
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-fg/15 transition-colors duration-500 group-hover:text-brand/40"
        />
        {[
          [100, 40],
          [60, 74],
          [140, 74],
          [100, 86],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="3.5"
            className="fill-fg/20 transition-all duration-500 group-hover:fill-brand/60"
            style={{ transitionDelay: `${i * 80}ms` }}
          />
        ))}
      </svg>
    );
  }

  /* Ruled field, drifting on hover */
  return (
    <svg className={common} viewBox="0 0 200 100" fill="none" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={30 + i * 18}
          y1="24"
          x2={30 + i * 18}
          y2="88"
          stroke="currentColor"
          strokeWidth="0.7"
          className="text-fg/12 transition-transform duration-700 ease-out group-hover:translate-y-1"
          style={{ transitionDelay: `${i * 45}ms` }}
        />
      ))}
    </svg>
  );
}

export default function WhyChoose() {
  return (
    <section className="section bg-sand" id="why-cobrr">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why COBRR"
          title="The difference is in how we work."
          description="Seven things we hold to. None of them is a number we cannot show you."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {differentiators.map((d, i) => (
            <RevealItem
              key={d.label}
              className={cn(
                "h-full",
                SPANS[i] === 6 && "lg:col-span-6",
                SPANS[i] === 4 && "lg:col-span-4",
                SPANS[i] === undefined && "lg:col-span-3",
              )}
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-colors duration-300 hover:border-brand/30">
                {/* Figure */}
                <div className="relative h-28 shrink-0 overflow-hidden border-b border-line/60 bg-sand/40">
                  <BentoFigure variant={i % 5} />
                  {/* Warm-up wash on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-brand/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Words */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                      <Icon name={d.icon} width={14} height={14} />
                    </span>
                    <span className="mono-label">{d.label}</span>
                  </div>

                  <h3 className="heading-md mt-4 text-balance font-medium leading-snug tracking-[-0.01em] text-fg">
                    {d.title}
                  </h3>
                  <p className="body-sm mt-3 leading-relaxed text-muted">
                    {d.description}
                  </p>
                </div>

                {/* Rule that draws across the foot on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
              </article>
            </RevealItem>
          ))}

          {/* Closing cell — squares off the final row */}
          <RevealItem className="h-full sm:col-span-2 lg:col-span-12">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-fg/3 p-7 sm:flex-row sm:items-center">
              <p className="body max-w-xl leading-relaxed text-muted">
                None of this is a claim you have to take on trust. Ask about any
                of it and we will show you the system it came from.
              </p>
              <Button variant="dark" size="sm" href="/contact" className="shrink-0">
                Talk to an engineer
                <ArrowRight width={15} height={15} />
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
