import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CardLink from "@/components/ui/CardLink";
import FinalCta from "@/components/home/FinalCta";
import { portfolioProjects } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description:
    "Explore COBRR's delivered software engineering projects, AI platforms, ERP systems, and cloud infrastructure case studies.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="OUR WORK & DELIVERED PROJECTS"
        title="Software Systems Engineered for Real-World Impact."
        description="A deep dive into platforms we have architected and deployed for manufacturing, healthcare, fintech, retail, and logistics enterprise leaders."
      />

      <section className="section bg-paper">
        <div className="container-page space-y-12">
          <SectionHeading
            align="center"
            eyebrow="CLIENT PORTFOLIO"
            title="Engineered for Scalability, Security & Speed."
            description="Every project represents senior engineering craftsmanship, modern tech choices, and measurable ROI."
          />

          <RevealGroup className="grid gap-8 lg:grid-cols-3">
            {portfolioProjects.map((proj) => (
              <RevealItem key={proj.slug} className="h-full">
                <CardLink
                  href={`/portfolio/${proj.slug}`}
                  ariaLabel={proj.title}
                  className="group card card-hover flex h-full flex-col justify-between overflow-hidden border-line/80 shadow-md transition-all duration-300 hover:border-brand/40 hover:shadow-2xl"
                >
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
                    </div>

                    <div className="relative z-10">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                        {proj.client ?? proj.projectType}
                      </span>
                      <h4 className="text-lg font-bold text-white group-hover:text-brand-soft transition-colors line-clamp-1">
                        {proj.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 justify-between space-y-6">
                    <div>
                      <p className="text-xs leading-relaxed text-muted font-medium line-clamp-3">
                        {proj.summary}
                      </p>

                      {/* Capabilities stand in for a stack list: the portfolio
                          document records the company stack, not a per-project
                          one, so naming technologies here would be guesswork. */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {proj.features.slice(0, 4).map((feature) => (
                          <span key={feature} className="pill text-[0.68rem] bg-sand-deep/70">
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

                      <div className="mt-5 flex items-center justify-between text-xs font-bold text-brand pt-2">
                        <span>View Case Study & Specs</span>
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

      <FinalCta />
    </>
  );
}
