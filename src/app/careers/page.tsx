import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import type { IconKey } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join COBRR TECH LABS — an engineering-first team building enterprise software, AI and cloud platforms.",
};

const perks: { title: string; body: string; icon: IconKey }[] = [
  { title: "Real ownership", body: "Own meaningful problems end to end, from architecture to production.", icon: "layers" },
  { title: "Senior craft", body: "Work alongside experienced engineers who care about doing things well.", icon: "code" },
  { title: "Modern stack", body: "Ship with a proven, modern toolchain and healthy engineering practices.", icon: "cpu" },
  { title: "Growth", body: "Clear paths to grow your skills, scope and impact over time.", icon: "chart" },
];

const openings = [
  { role: "Senior Full-Stack Engineer", team: "Engineering", type: "Full-time · Remote" },
  { role: "AI/ML Engineer", team: "AI Solutions", type: "Full-time · Hybrid" },
  { role: "Cloud & DevOps Engineer", team: "Platform", type: "Full-time · Remote" },
  { role: "Product Designer", team: "Design", type: "Full-time · Hybrid" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build software that matters, with people who care."
        description="We're a small, senior team that values craft, ownership and honesty. If that sounds like you, we'd love to talk."
      >
        <Button variant="light" size="lg" href="/contact">
          Introduce yourself
        </Button>
      </PageHeader>

      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading eyebrow="Why COBRR" title="A place to do your best engineering." />
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <RevealItem key={p.title} className="h-full">
                <div className="card h-full p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon name={p.icon} width={20} height={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading eyebrow="Open roles" title="Current openings." />
          <RevealGroup className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
            {openings.map((o) => (
              <RevealItem key={o.role}>
                <button
                  type="button"
                  className="group flex w-full cursor-pointer flex-col gap-2 p-6 text-left transition-colors hover:bg-brand-soft/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold text-ink">{o.role}</div>
                    <div className="text-sm text-muted">
                      {o.team} · {o.type}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Apply
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="text-sm text-muted">
              Don&apos;t see your role? We still want to hear from you.
            </p>
            <Button variant="outline" size="sm" href="/contact">
              Send an open application
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
