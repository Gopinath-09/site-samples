import { portfolioProjects } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CardLink from "@/components/ui/CardLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

export default function FeaturedProjects({ limit = 3 }: { limit?: number }) {
  const list = limit ? portfolioProjects.slice(0, limit) : portfolioProjects;

  return (
    <section className="section bg-paper border-b border-line/60" id="featured-projects">
      <div className="container-page space-y-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="FEATURED PORTFOLIO PROJECTS"
            title="Systems We Have Built & Delivered."
            description="Explore our track record of enterprise systems, cloud platforms, and AI engines engineered for market leaders."
          />
          <Button variant="outline" href="/portfolio" className="shrink-0">
            View Full Portfolio
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
                {/* Project Header Frame */}
                <div className="relative h-48 overflow-hidden bg-ink p-5 flex flex-col justify-between">
                  <div className="bg-grid-dark absolute inset-0 opacity-40" />
                  <div
                    className="absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-30 blur-xl"
                    style={{ background: proj.accent }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="pill bg-white/10 text-white font-bold border-white/20">
                      {proj.industry}
                    </span>
                    <span className="font-mono text-xs text-white/50">{proj.duration} Build</span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                      {proj.client}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-brand-soft transition-colors line-clamp-1">
                      {proj.title}
                    </h4>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 justify-between space-y-6">
                  <div>
                    <p className="text-xs leading-relaxed text-muted font-medium line-clamp-3">
                      {proj.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="pill text-[0.68rem] bg-sand-deep/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics & Link */}
                  <div>
                    <div className="grid grid-cols-3 gap-2 border-t border-line/60 pt-4 text-center">
                      {proj.results.map((r) => (
                        <div key={r.label} className="rounded-xl bg-sand/80 p-2">
                          <div className="text-sm font-bold text-ink" style={{ color: proj.accent }}>
                            {r.value}
                          </div>
                          <div className="text-[0.65rem] font-semibold text-muted leading-tight mt-0.5">
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between text-xs font-bold text-brand pt-2">
                      <span>View Project Details</span>
                      <ArrowUpRight
                        width={16}
                        height={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
