import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import TechnologiesSection from "@/components/home/TechnologiesSection";
import FinalCta from "@/components/home/FinalCta";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { technologies } from "@/lib/content";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Technologies & Tech Stack",
  description:
    "The modern, proven technology stack COBRR uses — React, Next.js, Node.js, Python, AWS, Kubernetes, PostgreSQL, OpenAI, and more.",
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
  {
    title: "Observable from day one",
    body: "Every system ships with metrics, distributed tracing, and structured logging built into the delivery.",
  },
  {
    title: "Security-first posture",
    body: "Threat modelling, OWASP hardening, and SAST scanning are part of every sprint — not the final audit.",
  },
  {
    title: "Evergreen dependencies",
    body: "Automated dependency scanning and proactive patching keeps your platform current without emergency scrambles.",
  },
];

export default function TechnologiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="TECHNOLOGY STACK"
        title="A modern, proven stack — chosen for fit, not fashion."
        description="We invest in technologies with long support windows and broad community depth, so the platform we build with you doesn't become tomorrow's legacy."
      >
        <Button variant="light" size="lg" href="/contact">
          Discuss your stack
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      {/* Marquee – shows full brand impression */}
      <TechnologiesSection />

      {/* Per-category breakdowns */}
      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="Full stack breakdown"
            title="Six disciplines. One consistent engineering standard."
            description="Every layer of the stack is chosen for its maturity, community depth, and long-term supportability."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((group) => (
              <div key={group.category} className="card p-7">
                <h3 className="text-base font-bold uppercase tracking-wider text-brand">
                  {group.category}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{group.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <li key={tech.name} className="flex items-center gap-1.5">
                      <span className="pill">
                        {tech.name}
                      </span>
                      {tech.badge && (
                        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[0.65rem] font-semibold text-brand">
                          {tech.badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering principles */}
      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we choose"
            title="Six principles behind every technology decision."
            description="Our stack selection is governed by principles, not preferences. These guide every architectural review."
          />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <RevealItem key={p.title} className="h-full">
                <div className="card h-full p-7">
                  <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
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
