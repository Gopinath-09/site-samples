import { services } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import CardLink from "@/components/ui/CardLink";
import Button from "@/components/ui/Button";
import ServiceVisual from "@/components/graphics/ServiceVisual";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Core services, laid out as a bento grid.
 *
 * The grid is six columns wide and each service claims its own span from its
 * `span` field rather than from its position in the array, so reordering the
 * dataset cannot silently break the layout. A default card takes two columns,
 * `wide` takes four, and `full` takes four alongside the closing call to
 * action — which together tile six columns exactly however many services there
 * are, provided the spans stay balanced.
 */
export default function CoreServices({
  limit,
  showHeading = true,
}: {
  limit?: number;
  /** The services page supplies its own page header, so it suppresses this one. */
  showHeading?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="section bg-paper" id="services">
      <div className="container-page">
        {showHeading && (
          <SectionHeading
            eyebrow="Core services"
            title="Everything you need to design, build and run software."
            description="Six disciplines, delivered by the same team that operates what it builds."
          />
        )}

        <RevealGroup className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-6", showHeading && "mt-14")}>
          {list.map((service) => (
            <RevealItem
              key={service.slug}
              className={cn(
                "h-full",
                service.span === "wide" && "lg:col-span-4",
                service.span === "full" && "lg:col-span-4",
                !service.span && "lg:col-span-2",
              )}
            >
              <CardLink
                href={`/services/${service.slug}`}
                ariaLabel={service.title}
                className="group h-full"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-linear-to-b from-white/4.5 to-white/1.5 transition-colors duration-300 group-hover:border-white/20">
                  {/* Drawn visual */}
                  <div className="relative h-40 overflow-hidden border-b border-line/60">
                    <div className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                      <ServiceVisual kind={service.visual} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-fg">
                        {service.title}
                      </h3>
                      <ArrowUpRight
                        width={17}
                        height={17}
                        className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>
                </article>
              </CardLink>
            </RevealItem>
          ))}

          {/* Closing cell — fills the two columns the `full` card leaves open */}
          <RevealItem className="h-full lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-sand p-6">
              <div>
                <span className="mono-label">Not sure which?</span>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Most engagements start as one discipline and end up using three.
                  Describe the problem and we will tell you what it actually needs.
                </p>
              </div>
              <Button variant="outline" size="sm" href="/services" className="mt-6 self-start">
                All services
                <ArrowRight width={16} height={16} />
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
