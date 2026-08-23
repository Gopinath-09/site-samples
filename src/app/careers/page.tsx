import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight, ArrowRight, Check } from "@/components/ui/icons";
import type { IconKey } from "@/lib/content";
import { openRoles, hiringProcess, internships } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers — Join COBRR TECH LABS",
  description:
    "Join COBRR TECH LABS — an engineering-first team building enterprise software, AI solutions, and cloud platforms. View open roles and apply.",
};

const perks: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "Real ownership",
    body: "Own meaningful problems end-to-end, from architecture to production delivery. No ticket-to-ticket isolation.",
    icon: "layers",
  },
  {
    title: "Senior craft",
    body: "Work alongside experienced engineers who care deeply about doing things well — and who will invest in your growth.",
    icon: "code",
  },
  {
    title: "Modern stack",
    body: "Ship with a proven, modern toolchain (Next.js, Node.js, Python, AWS, Kubernetes) with healthy engineering practices.",
    icon: "cpu",
  },
  {
    title: "Growth paths",
    body: "Clear progression from individual contributor to technical lead or principal. We are building careers, not just filling seats.",
    icon: "chart",
  },
  {
    title: "Remote-friendly",
    body: "Most roles are fully remote or hybrid. We care about output quality and professional growth, not office attendance.",
    icon: "grid",
  },
  {
    title: "Mission-aligned work",
    body: "Work on software that actually matters — systems that hospitals, manufacturers, and financial platforms depend on.",
    icon: "sparkle",
  },
];

const values = [
  { label: "Craft over velocity", desc: "We write software that lasts." },
  { label: "Honest by default", desc: "No surprise scope creep, ever." },
  { label: "Deep ownership", desc: "You own the outcome, not the task." },
  { label: "Continuous learning", desc: "Engineering evolves. We do too." },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="CAREERS"
        title="Build software that matters, with people who care."
        description="We are a small, senior team that values craft, ownership, and honesty. If that sounds like you, we would love to talk."
      >
        <Button variant="light" size="lg" href="/contact">
          Introduce yourself
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      {/* Culture values strip */}
      <section className="border-b border-line bg-paper py-10">
        <div className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          {values.map((v) => (
            <div key={v.label} className="text-center">
              <div className="text-base font-bold text-ink">{v.label}</div>
              <div className="mt-1 text-sm text-muted">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks / Why COBRR */}
      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why COBRR"
            title="A place to do your best engineering."
            description="We have built an environment where senior engineers have the space to do careful, impactful work."
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Hiring process */}
      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="Hiring process"
            title="Six steps, roughly two weeks, no black holes."
            description="You will always know where you stand and what happens next. Every stage is scheduled around your availability, not ours."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hiringProcess.map((step) => (
              <RevealItem key={step.step} className="h-full">
                <div className="card h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-widest text-brand">
                      {step.step}
                    </span>
                    <span className="pill text-[0.68rem]">{step.duration}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Internships */}
      <section className="section relative overflow-hidden bg-ink text-white">
        <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
        <div className="relative container-page grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <span className="eyebrow text-white/50">Internships</span>
            <h2 className="heading-lg mt-4 text-white">
              Six months. Real production work.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              {internships.intro}
            </p>
            <ul className="mt-8 space-y-3">
              {internships.commitments.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    <Check width={13} height={13} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <Button variant="light" size="lg" href="/contact" className="mt-9">
              Apply for an internship
              <ArrowRight width={18} height={18} />
            </Button>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:content-start">
            {internships.tracks.map((t) => (
              <RevealItem key={t.name} className="h-full">
                <div className="h-full rounded-2xl border border-white/12 bg-white/4 p-6 transition-colors duration-300 hover:border-brand/50 hover:bg-white/8">
                  <h3 className="text-base font-semibold text-white">{t.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {t.focus}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Open roles */}
      <section className="section bg-paper">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Open roles"
              title="Current openings."
              description="We are growing our team with people who care as much about the craft as the outcome."
            />
            <Button variant="outline" size="sm" href="/contact" className="shrink-0">
              Open application
              <ArrowRight width={16} height={16} />
            </Button>
          </div>

          <RevealGroup className="mt-12 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
            {openRoles.map((role) => (
              <RevealItem key={role.title}>
                <button
                  type="button"
                  className="group flex w-full cursor-pointer flex-col gap-2 p-6 text-left transition-colors hover:bg-brand-soft/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold text-ink">{role.title}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted">
                      <span>{role.department}</span>
                      <span className="h-1 w-1 rounded-full bg-muted/40" />
                      <span>{role.location}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Apply now
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 rounded-2xl border border-dashed border-line bg-sand p-8 text-center">
            <h3 className="text-lg font-semibold text-ink">Don&apos;t see your role?</h3>
            <p className="mt-2 text-sm text-muted">
              We are always interested in hearing from exceptional engineers and designers.
              Send us an open application and tell us how you could contribute.
            </p>
            <Button variant="outline" href="/contact" className="mt-6">
              Send an open application
              <ArrowRight width={16} height={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Team values dark panel */}
      <section className="section bg-ink text-white">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow text-white/50">Our hiring bar</span>
            <h2 className="heading-lg mt-4 text-white">
              We hire for judgement, not just skills.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              A strong résumé gets you an interview. Demonstrated product thinking,
              attention to system design trade-offs, and a collaborative attitude
              get you an offer. We look for people who will still be here — and
              thriving — five years from now.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button variant="light" size="lg" href="/contact">
              Start a conversation
              <ArrowRight width={18} height={18} />
            </Button>
            <p className="text-sm text-white/40 md:text-right">
              We reply to every genuine application
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
