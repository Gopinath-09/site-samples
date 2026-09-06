import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SuccessMetrics from "@/components/home/SuccessMetrics";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import WhyChoose from "@/components/home/WhyChoose";
import FinalCta from "@/components/home/FinalCta";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { company } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import {
  teamMembers,
  companyTimeline,
  cultureHighlights,
  verifiedProjects,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us — COBRR Tech Labs",
  description:
    "Learn about COBRR TECH LABS — an international technology startup building software development, AI solutions, web apps, SaaS products, and cloud infrastructure.",
};

const values = [
  { title: "Engineering Craftsmanship", body: "We take pride in writing code that is clean, well-tested, modular, and built to last years without technical debt." },
  { title: "Absolute Accountability", body: "We own outcomes end to end and communicate honestly about architecture trade-offs and project roadmaps." },
  { title: "Long-Term Partnership", body: "We measure our success by our clients' growth and by the enduring technical partnerships we build." },
  { title: "Pragmatic Innovation", body: "We apply cutting-edge technology like GenAI and vector search only where it delivers genuine ROI." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT COBRR TECH LABS"
        title="An International Technology Startup Building Software Built to Last."
        description={`${company.legalName} exists to build high-performance software systems organisations can depend on — pairing senior engineering discipline with modern AI speed.`}
      />

      {/* Story & Why We Started */}
      <section className="section bg-paper border-b border-line/60">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal>
            <div className="space-y-6">
              <span className="eyebrow">OUR STORY & ORIGINS</span>
              <h2 className="heading-lg text-fg">Built by Senior Engineers to Eliminate Software Debt.</h2>
              <div className="body space-y-4">
                <p>
                  COBRR was founded on a simple conviction: most enterprise software fails not for lack of features, but for lack of engineering discipline, clear architecture, and security foresight.
                </p>
                <p>
                  We set out to create a different kind of technology company — a startup studio and software partner that treats maintainability, security, performance, and transparent communication as first-class citizens from Day 1.
                </p>
                <p>
                  Today, our team designs, builds, and operates custom software, AI solutions, SaaS applications, and cloud infrastructure for ambitious startups and market-leading enterprises worldwide.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="card bg-ink p-8 text-white space-y-6 shadow-2xl">
              <span className="pill bg-white/10 text-white font-bold border-white/20">AT A GLANCE</span>
              <h3 className="heading-md font-bold">COBRR Fact Sheet</h3>
              <p className="body-sm leading-relaxed text-white/75">
                We combine deep technical craftsmanship with agile delivery methods to move at startup speed while maintaining enterprise-grade safety.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="heading-md text-white">2026</div>
                  <div className="text-xs text-white/50">Founded</div>
                </div>
                <div>
                  <div className="heading-md text-white">
                    {company.location}
                  </div>
                  <div className="text-xs text-white/50">Headquarters</div>
                </div>
                <div>
                  <div className="heading-md text-white">
                    {verifiedProjects.length}
                  </div>
                  <div className="text-xs text-white/50">Platforms delivered</div>
                </div>
                <div>
                  <div className="heading-md text-white">
                    {teamMembers.length}
                  </div>
                  <div className="text-xs text-white/50">Founding officers</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-sand/60 border-b border-line/60">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-line/80 bg-paper p-8 space-y-4 shadow-sm">
            <span className="pill bg-brand-soft text-brand font-bold border-brand/20">OUR MISSION</span>
            <h3 className="heading-md font-bold text-fg">To Engineer Lasting Value Through Clean Code & AI</h3>
            <p className="body-sm leading-relaxed text-muted">
              To build software platforms that empower businesses to scale securely, automate repetitive work, and lead their industries with state-of-the-art technology.
            </p>
          </div>

          <div className="rounded-2xl border border-line/80 bg-paper p-8 space-y-4 shadow-sm">
            <span className="pill bg-brand-soft text-brand font-bold border-brand/20">OUR VISION</span>
            <h3 className="heading-md font-bold text-fg">To Set the Benchmark for Engineering Transparency</h3>
            <p className="body-sm leading-relaxed text-muted">
              To prove that software agencies can operate with radical honesty, zero technical debt, predictable delivery, and lasting client partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-paper border-b border-line/60">
        <div className="container-page space-y-12">
          <SectionHeading eyebrow="OUR CORE VALUES" title="The Standards We Hold Ourselves To." />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title} className="h-full">
                <div className="card h-full p-7 border-line/80 transition-all duration-300 hover:border-brand/40 hover:shadow-lg">
                  <h3 className="heading-md font-bold text-fg">{v.title}</h3>
                  <p className="body-sm mt-2 leading-relaxed text-muted">{v.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section bg-sand/60 border-b border-line/60">
        <div className="container-page space-y-12">
          <SectionHeading eyebrow="OUR JOURNEY" title="Milestones & Timeline." />
          <div className="grid gap-6 md:grid-cols-3">
            {companyTimeline.map((item) => (
              <div key={item.title} className="card p-6 bg-paper space-y-3">
                <span className="font-mono text-sm font-bold text-brand bg-brand-soft px-3 py-1 rounded-full w-fit block">
                  {item.year}
                </span>
                <h4 className="heading-md font-bold text-fg">{item.title}</h4>
                <p className="body-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section bg-paper border-b border-line/60">
        <div className="container-page space-y-12">
          <SectionHeading eyebrow="LEADERSHIP" title="Senior Engineering & Leadership Team." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="card p-6 space-y-3 border-line/80 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white font-bold text-sm">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h4 className="heading-md font-bold text-fg">{member.name}</h4>
                <span className="text-xs font-bold text-brand block">{member.role}</span>
                <p className="body-sm leading-relaxed text-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="section bg-sand border-b border-line/60">
        <div className="container-page">
          <SectionHeading
            eyebrow="COMPANY CULTURE"
            title="How we actually work day to day."
            description="Culture is what the team does when no one is watching. These are the habits we hire for and protect."
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cultureHighlights.map((c) => (
              <RevealItem key={c.title} className="h-full">
                <div className="card h-full p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon name={c.icon} width={20} height={20} />
                  </span>
                  <h3 className="heading-md mt-5 font-semibold text-fg">{c.title}</h3>
                  <p className="body mt-2 leading-relaxed text-muted">{c.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <SuccessMetrics />
      <EngineeringProcess />
      <WhyChoose />
      <FinalCta />
    </>
  );
}
