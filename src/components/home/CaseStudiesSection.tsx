import { caseStudies } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CardLink from "@/components/ui/CardLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

export default function CaseStudiesSection({ limit }: { limit?: number }) {
  const list = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section className="section bg-paper" id="case-studies">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Case studies"
            title="Outcomes, not just deliverables."
            description="A selection of engagements where thoughtful engineering produced measurable business results."
          />
          <Button variant="outline" href="/case-studies" className="shrink-0">
            All case studies
            <ArrowRight width={18} height={18} />
          </Button>
        </div>

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
          {list.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <CardLink
                href={`/case-studies/${c.slug}`}
                ariaLabel={c.title}
                className="card card-hover flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="pill" style={{ color: c.accent }}>
                    {c.industry}
                  </span>
                  <ArrowUpRight
                    width={18}
                    height={18}
                    className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {c.summary}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
                  {c.results.map((r) => (
                    <div key={r.label}>
                      <div className="text-base font-semibold text-ink">
                        {r.value}
                      </div>
                      <div className="text-[0.7rem] leading-tight text-muted">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
