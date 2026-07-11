import { services } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
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
    <section className="section bg-sand" id="services">
      <div className="container-page">
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

        <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <CardLink
                href={`/services/${s.slug}`}
                ariaLabel={s.title}
                className="relative flex h-full flex-col overflow-hidden border border-transparent bg-paper p-7 transition-[transform,box-shadow,border-color] duration-300 will-change-transform hover:z-20 hover:-translate-y-1 hover:scale-[1.08] hover:border-transparent hover:shadow-[0_30px_60px_-28px_rgba(10,14,26,0.4)]"
              >
                {/* Half-opacity icon watermark, top-right */}
                {/* <span
                  aria-hidden
                  className="pointer-events-none absolute -right-5 -top-5 z-0 flex h-28 w-28 items-center justify-center rounded-3xl bg-ink/[0.04] text-ink/50 opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-soft/60 group-hover:text-brand/60"
                >
                  <Icon name={s.icon} width={52} height={52} />
                </span> */}

                <div className="relative z-10 flex h-full flex-col">
                  <h3 className="pr-14 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="pill text-[0.7rem]">
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow, bottom-right, larger */}
                  <div className="mt-auto flex justify-end pt-6">
                    <ArrowUpRight
                      width={24}
                      height={24}
                      className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                    />
                  </div>
                </div>
              </CardLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
