import { verifiedProjects } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CardLink from "@/components/ui/CardLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/**
 * Delivered work on the home page.
 *
 * Reads the proof gate rather than the raw dataset, so a project that has not
 * been cleared for publication cannot appear here, and the section removes
 * itself entirely rather than rendering an empty grid when nothing qualifies.
 */
export default function FeaturedProjects({ limit = 3 }: { limit?: number }) {
  const list = limit ? verifiedProjects.slice(0, limit) : verifiedProjects;

  if (list.length === 0) return null;

  return (
    <section
      className="section border-b border-line/60 bg-paper"
      id="featured-projects"
    >
      <div className="container-page space-y-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems we have built and delivered."
            description="Learning platforms, tourism and school systems, clinic software and AI assistants — each one running for the organisation it was built for."
          />
          <Button variant="outline" href="/portfolio" className="shrink-0">
            View full portfolio
            <ArrowRight width={18} height={18} />
          </Button>
        </div>

        <RevealGroup className="grid gap-8 lg:grid-cols-3">
          {list.map((proj) => (
            <RevealItem key={proj.slug} className="h-full">
              <CardLink
                href={`/portfolio/${proj.slug}`}
                ariaLabel={proj.title}
                className="group card card-hover flex h-full flex-col justify-between overflow-hidden border-line/80 shadow-md transition-all duration-300 hover:border-brand/40 hover:shadow-2xl"
              >
                {/* Project header frame */}
                <div className="relative flex h-48 flex-col justify-between overflow-hidden bg-ink p-5">
                  <div className="bg-grid-dark absolute inset-0 opacity-40" />
                  <div
                    className="absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-30 blur-xl"
                    style={{ background: proj.accent }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="pill border-white/20 bg-white/10 font-bold text-white">
                      {proj.industry}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                      {proj.client ?? proj.projectType}
                    </span>
                    <h4 className="text-lg font-bold text-white transition-colors line-clamp-2 group-hover:text-brand-soft">
                      {proj.title}
                    </h4>
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col justify-between space-y-6 p-6">
                  <div>
                    <p className="text-xs font-medium leading-relaxed text-muted line-clamp-3">
                      {proj.summary}
                    </p>

                    {/* Capabilities rather than a stack: the portfolio document
                        records the company stack, not a per-project one. */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="pill bg-sand-deep/70 text-[0.68rem]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="border-t border-line/60 pt-4">
                      <span className="mono-label">Status</span>
                      <p className="mt-1.5 text-xs font-medium leading-relaxed text-muted">
                        {proj.status}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between pt-2 text-xs font-bold text-brand">
                      <span>View project</span>
                      <ArrowUpRight
                        width={16}
                        height={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
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
