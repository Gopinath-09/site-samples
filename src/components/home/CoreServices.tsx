import { services } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CardLink from "@/components/ui/CardLink";
import Icon from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/**
 * Services index. An editorial list rather than a card grid — numbered rows
 * divided by hairlines, which scales to the full ten disciplines without
 * turning into a wall of boxes. Descriptions stay in the DOM at every
 * breakpoint; hover only changes emphasis, never availability.
 */
export default function CoreServices({
  limit,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="section bg-sand" id="services">
      <div className="container-page">
        {showHeading && (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Core services"
              title="Everything you need to design, build and run software."
              description="Ten focused disciplines, delivered by one senior team with a shared engineering standard."
            />
            <Button variant="outline" href="/services" className="shrink-0">
              All services
              <ArrowRight width={18} height={18} />
            </Button>
          </div>
        )}

        <RevealGroup className="mt-12 border-t border-line">
          {list.map((s, i) => (
            <RevealItem key={s.slug}>
              <CardLink
                href={`/services/${s.slug}`}
                ariaLabel={s.title}
                className="relative flex flex-col gap-4 border-b border-line px-2 py-7 transition-colors duration-300 hover:bg-paper md:grid md:grid-cols-[4rem_1fr_1.15fr_auto] md:items-center md:gap-8 md:px-4"
              >
                {/* Brand rule that draws in from the left on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                />

                {/* Index + icon */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tabular-nums text-muted/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-paper text-muted transition-colors duration-300 group-hover:bg-brand-soft group-hover:text-brand md:bg-sand-deep">
                    <Icon name={s.icon} width={17} height={17} />
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold leading-snug text-ink transition-transform duration-300 md:group-hover:translate-x-1">
                  {s.title}
                </h3>

                {/* Summary + focus tags */}
                <div>
                  <p className="text-sm leading-relaxed text-muted">
                    {s.summary}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="pill text-[0.68rem]">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Affordance */}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight width={16} height={16} />
                </span>
              </CardLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
