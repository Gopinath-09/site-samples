import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CardLink from "@/components/ui/CardLink";
import FinalCta from "@/components/home/FinalCta";
import { solutions } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight, Check } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Business Solutions",
  description:
    "Pre-engineered enterprise software solutions including HRMS, CRM, ERP, Healthcare, Education, AI Chatbots, and internal business systems.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="BUSINESS SOLUTIONS"
        title="Pre-Engineered Software Solutions Tailored to Your Industry."
        description="Accelerate software deployment with modular, enterprise-ready business solution frameworks across operations, sales, HR, and AI."
      />

      <section className="section bg-paper">
        <div className="container-page space-y-12">
          <SectionHeading
            align="center"
            eyebrow="SOLUTIONS SUITE"
            title="Comprehensive Business Application Frameworks."
            description="Explore our pre-designed enterprise solutions crafted for rapid deployment, high availability, and seamless customization."
          />

          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => (
              <RevealItem key={sol.slug} className="h-full">
                <CardLink
                  href={`/solutions/${sol.slug}`}
                  ariaLabel={sol.name}
                  className="group card card-hover flex h-full flex-col justify-between p-7 border-line/80 shadow-md transition-all duration-300 hover:border-brand/40 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="pill bg-brand-soft text-brand font-bold border-brand/20">
                        {sol.category}
                      </span>
                      <ArrowUpRight
                        width={20}
                        height={20}
                        className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                      />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-ink group-hover:text-brand transition-colors">
                      {sol.name}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {sol.description}
                    </p>

                    <div className="mt-6 space-y-2">
                      {sol.features.slice(0, 3).map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-ink/80">
                          <Check width={13} height={13} className="text-brand shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-4 text-xs font-bold text-brand">
                    <span>View Solution Architecture</span>
                    <ArrowRight width={15} height={15} />
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
