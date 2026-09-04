import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import IndustriesServed from "@/components/home/IndustriesServed";
import FinalCta from "@/components/home/FinalCta";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "COBRR builds software for healthcare, education, finance, retail, manufacturing, logistics, real estate, government, hospitality, and travel sectors.",
};

const commitments = [
  {
    title: "Domain-aware architecture",
    body: "We study your industry's regulatory constraints, data sensitivity requirements, and operational workflows before writing a line of code.",
  },
  {
    title: "Compliance from the start",
    body: "HIPAA, GDPR, PCI-DSS, and sector-specific audit requirements are treated as first-class engineering constraints — not afterthoughts.",
  },
  {
    title: "Sector-specific integrations",
    body: "Whether it's a healthcare HL7 standard, a logistics EDI feed, or a retail POS protocol, we have handled the integration before.",
  },
  {
    title: "Dedicated vertical teams",
    body: "Client projects are staffed with engineers who have delivered in your vertical — reducing the learning curve and accelerating delivery.",
  },
];

const caseHighlights = [
  {
    industry: "Healthcare",
    headline: "32% drop in patient no-shows",
    detail: "Built a HIPAA-conscious telehealth and patient portal serving 40,000+ patients.",
  },
  {
    industry: "Retail",
    headline: "+24% checkout conversion",
    detail: "Deployed an AI-driven personalization engine lifting e-commerce revenue in 3 months.",
  },
  {
    industry: "Manufacturing",
    headline: "70% faster reporting",
    detail: "Replaced 12+ fragmented tools with a real-time cloud ERP and shop-floor IoT system.",
  },
  {
    industry: "Finance",
    headline: "98% processing time reduction",
    detail: "Automated credit decisioning engine processing loan applications in under 60 seconds.",
  },
  {
    industry: "Logistics",
    headline: "22% fuel cost savings",
    detail: "IoT fleet tracking and route optimization across 1,200+ vehicles on national highways.",
  },
  {
    industry: "Education",
    headline: "150,000+ concurrent users",
    detail: "Auto-scaling video learning platform with serverless coding assessment sandboxes.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="INDUSTRIES WE SERVE"
        title="Software shaped by the sector it serves."
        description="Every industry has its own constraints, data models, and compliance requirements. We bring engineering that respects your regulations, your data, and the way your business actually works."
      >
        <Button variant="light" size="lg" href="/contact">
          Discuss your industry
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      {/* Industry cards */}
      <IndustriesServed />

      {/* Domain commitments */}
      <section className="section bg-paper">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Our commitment"
            title="Depth before breadth, always."
            description="We don't claim expertise in every industry equally. We go deep in the sectors we serve, and we're honest about where we're still growing."
          />

          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {commitments.map((c) => (
              <RevealItem key={c.title} className="h-full">
                <div className="card h-full flex gap-4 p-6">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    <Check width={14} height={14} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-fg">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Sector impact highlights */}
      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Sector impact"
            title="Outcomes across industries."
            description="Real results from software delivered across six major industry verticals."
          />

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseHighlights.map((h) => (
              <RevealItem key={h.industry} className="h-full">
                <div className="card h-full p-7">
                  <span className="pill">{h.industry}</span>
                  <p className="mt-4 text-2xl font-bold text-fg leading-tight">{h.headline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{h.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 flex justify-center">
            <Button variant="outline" href="/portfolio">
              See full portfolio
              <ArrowRight width={18} height={18} />
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
