import { services } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CardLink from "@/components/ui/CardLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

export default function CoreServices({
  limit,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <Section id="services">
      {showHeading && (
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Core services"
            title="Everything you need to design, build and run software."
            description="Fourteen focused disciplines, delivered by one senior team with a shared engineering standard."
          />
          <Button variant="outline" href="/services" className="shrink-0">
            All services
            <ArrowRight width={18} height={18} />
          </Button>
        </div>
      )}

      {/* Tiles share hairlines (no gap); the hovered tile lifts and scales
          above its neighbours. */}
      <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <RevealItem key={s.slug} className="h-full">
            <CardLink
              href={`/services/${s.slug}`}
              ariaLabel={s.title}
              className="flex h-full flex-col overflow-hidden border border-transparent bg-paper p-7 transition-[transform,box-shadow,border-color] duration-300 will-change-transform hover:z-20 hover:-translate-y-1 hover:scale-[1.08] hover:shadow-lift"
            >
              <h3 className="heading-sm pr-14 text-fg">{s.title}</h3>
              <p className="body-sm mt-2">{s.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.points.map((p) => (
                  <li key={p} className="pill text-[0.7rem]">
                    {p}
                  </li>
                ))}
              </ul>

              {/* Arrow, bottom-right */}
              <div className="mt-auto flex justify-end pt-6">
                <ArrowUpRight
                  width={24}
                  height={24}
                  className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                />
              </div>
            </CardLink>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
