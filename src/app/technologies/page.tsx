import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import TechnologiesSection from "@/components/home/TechnologiesSection";
import FinalCta from "@/components/home/FinalCta";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "The modern, proven technology stack COBRR uses to build enterprise software, AI systems and cloud platforms.",
};

const principles = [
  {
    title: "Fit over fashion",
    body: "We choose tools for operational maturity and longevity — not because they trend on social media.",
  },
  {
    title: "Boring where it counts",
    body: "Proven databases, queues and runtimes for the core; innovation reserved for where it creates real value.",
  },
  {
    title: "Portable by design",
    body: "Clean abstractions and infrastructure-as-code keep you free of lock-in and easy to migrate.",
  },
];

export default function TechnologiesPage() {
  return (
    <>
      {/* <PageHeader
        eyebrow="Technologies"
        title="A stack chosen for the long run."
        description="We invest in technologies that stay supportable for years, so the platform we build with you doesn't become tomorrow's legacy."
      /> */}
      <TechnologiesSection />

      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we choose"
            title="Principles behind our technology decisions."
          />
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <RevealItem key={p.title} className="h-full">
                <div className="card h-full p-7">
                  <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
