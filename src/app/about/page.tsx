import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import WhoWeAre from "@/components/sections/WhoWeAre";
import SuccessMetrics from "@/components/sections/SuccessMetrics";
import ClientCare from "@/components/sections/ClientCare";
import WhyChoose from "@/components/sections/WhyChoose";
import FinalCta from "@/components/sections/FinalCta";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "COBRR TECH LABS is an engineering-first software partner building enterprise software, AI and cloud platforms.",
};

const values = [
  { title: "Craftsmanship", body: "We take pride in software that is clean, considered and built to last." },
  { title: "Accountability", body: "We own outcomes end to end and communicate honestly, especially about trade-offs." },
  { title: "Partnership", body: "We measure success by our clients' success — and by the relationships that endure." },
  { title: "Curiosity", body: "We keep learning, and apply new technology only where it genuinely improves the result." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About COBRR"
        title="An engineering-first software company."
        description={`${company.legalName} exists to build software organisations can depend on — and to be the kind of long-term partner that's rare in this industry.`}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="eyebrow">Our story</span>
              <h2 className="heading-md mt-4">Built by engineers, for the long term.</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                <p>
                  COBRR was founded on a simple conviction: that most software
                  fails not for lack of features, but for lack of engineering
                  discipline. We set out to be different — a team that treats
                  architecture, security and maintainability as first-class
                  concerns from day one.
                </p>
                <p>
                  Today we design, build and operate enterprise software, AI
                  solutions and cloud platforms for organisations across
                  industries — while running our own SaaS products through an
                  in-house product studio.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <Card padding="lg">
              <h3 className="heading-sm text-fg">Our mission</h3>
              <p className="mt-3 leading-relaxed text-muted">
                To engineer software that creates lasting value — clear, secure
                and dependable — and to build partnerships measured in years, not
                projects.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
                {[
                  ["Founded", String(company.foundedYear)],
                  ["Head office", company.location],
                  ["Focus", "Enterprise & SaaS"],
                  ["Approach", "Engineering-first"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-lg font-semibold text-fg">{v}</div>
                    <div className="text-sm text-muted">{k}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <WhoWeAre />
      <SuccessMetrics />

      <Section>
        <SectionHeading eyebrow="Our values" title="What we hold ourselves to." />
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <RevealItem key={v.title} className="h-full">
              <Card className="h-full">
                <h3 className="heading-sm text-fg">{v.title}</h3>
                <p className="body-sm mt-2">{v.body}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <ClientCare />
      <WhyChoose />
      <FinalCta />
    </>
  );
}
