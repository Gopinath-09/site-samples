import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import IndustriesServed from "@/components/home/IndustriesServed";
import FinalCta from "@/components/home/FinalCta";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/icons";
import { industries, verifiedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "COBRR Tech Labs builds software for education, healthcare, government, tourism, manufacturing, retail, logistics, enterprise operations, startups and NGOs.",
};

/**
 * Sectors we build for.
 *
 * The substance of this page is the tabbed panel, which states each sector's
 * challenges and what we do about them. What used to sit beneath it was a set
 * of invented outcome cards — a 32% drop in patient no-shows, a portal serving
 * 40,000 patients — alongside claimed HIPAA, GDPR and PCI-DSS certifications
 * and dedicated per-vertical teams. None of that is supported by anything, and
 * certification claims in particular are the kind a buyer verifies.
 */

const commitments = [
  {
    title: "We learn the operation first",
    body: "Before any architecture is proposed we map how the work is actually done — who does what, in what order, and where it currently breaks.",
  },
  {
    title: "Regulatory constraints are design inputs",
    body: "Where a sector imposes rules on access, retention or auditability, they shape the data model from the start rather than being bolted on late.",
  },
  {
    title: "We say where we have not been",
    body: "Six of these ten sectors have a delivered platform behind them. The other four we build for without a published case study, and the panel above says so.",
  },
  {
    title: "One team, across sectors",
    body: "We are a small studio, not a set of vertical practices. The same engineers work across sectors, which is why patterns move between them.",
  },
];

export default function IndustriesPage() {
  const withProof = industries.filter((i) => i.proof).length;

  return (
    <>
      <PageHeader
        eyebrow="INDUSTRIES WE SERVE"
        title="Built for the sector, not adapted to it."
        description={`${industries.length} sectors, ${withProof} of them with a delivered platform behind them. Each one has its own constraints, and those constraints belong in the architecture rather than in a later revision.`}
      />

      <IndustriesServed />

      {/* How we approach a sector */}
      <section className="section bg-paper">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Our commitment"
            title="Depth before breadth, always."
            description="We do not claim equal expertise in every sector. We go deep where we have delivered, and we are explicit about where we have not."
          />

          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {commitments.map((c) => (
              <RevealItem key={c.title} className="h-full">
                <div className="card flex h-full gap-4 p-6">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Check width={14} height={14} />
                  </span>
                  <div>
                    <h3 className="heading-md font-semibold text-fg">{c.title}</h3>
                    <p className="body mt-1.5 leading-relaxed text-muted">
                      {c.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Point at the work rather than describing outcomes we cannot evidence */}
      <section className="section bg-sand">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <SectionHeading
            align="center"
            eyebrow="The evidence"
            title="What we have actually delivered."
            description={`${verifiedProjects.length} platforms across these sectors — each with what it does, who it was built for where we can name them, and where it currently stands.`}
          />
          <Button variant="outline" href="/portfolio">
            View the portfolio
            <ArrowRight width={18} height={18} />
          </Button>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
