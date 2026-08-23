import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CardLink from "@/components/ui/CardLink";
import Media from "@/components/ui/Media";
import FinalCta from "@/components/home/FinalCta";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { portfolioProjects } from "@/lib/content";
import { ArrowRight, ArrowUpRight, Check } from "@/components/ui/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proj = portfolioProjects.find((p) => p.slug === slug);
  if (!proj) return {};
  return {
    title: `${proj.title} — Case Study`,
    description: proj.summary,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const proj = portfolioProjects.find((p) => p.slug === slug);

  if (!proj) {
    notFound();
  }

  /* Same-industry work first, then anything else, capped at three. */
  const related = portfolioProjects
    .filter((p) => p.slug !== proj.slug)
    .sort((a, b) => {
      const score = (p: typeof proj) => (p.industry === proj.industry ? 0 : 1);
      return score(a) - score(b);
    })
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`CASE STUDY · ${proj.industry.toUpperCase()}`}
        title={proj.title}
        description={`Client: ${proj.client} · Duration: ${proj.duration}`}
      >
        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="primary" size="lg" href="/contact">
            Build Similar Platform
            <ArrowRight width={18} height={18} />
          </Button>
          <Button variant="ghost-light" size="lg" href="/portfolio">
            All Portfolio Projects
          </Button>
        </div>
      </PageHeader>

      <section className="section bg-paper border-b border-line/60">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {/* Impact Results Bar */}
            <div className="rounded-2xl border border-line/80 bg-sand/80 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-4">
                PROJECT RESULTS & IMPACT METRICS
              </span>
              <div className="grid grid-cols-3 gap-4 text-center">
                {proj.results.map((r) => (
                  <div key={r.label} className="rounded-xl bg-paper p-4 border border-line/60 shadow-xs">
                    <div className="text-2xl font-extrabold text-ink" style={{ color: proj.accent }}>
                      {r.value}
                    </div>
                    <div className="text-xs font-bold text-muted mt-1">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 space-y-3">
                <span className="pill bg-red-100 text-red-700 font-bold border-red-200">THE CHALLENGE</span>
                <h4 className="text-base font-bold text-ink">Problem Statement</h4>
                <p className="text-xs leading-relaxed text-muted font-medium">{proj.problem}</p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-3">
                <span className="pill bg-emerald-100 text-emerald-700 font-bold border-emerald-200">THE SOLUTION</span>
                <h4 className="text-base font-bold text-ink">Engineering Solution</h4>
                <p className="text-xs leading-relaxed text-muted font-medium">{proj.solution}</p>
              </div>
            </div>

            {/* System Architecture */}
            <div className="space-y-4 border-t border-line/60 pt-8">
              <span className="eyebrow">SYSTEM ARCHITECTURE</span>
              <h3 className="text-xl font-bold text-ink">Architectural Blueprint & Cloud Design</h3>
              <p className="text-sm leading-relaxed text-muted">{proj.architecture}</p>

              <div className="rounded-2xl border border-line bg-ink p-6 text-white space-y-3 font-mono text-xs shadow-xl">
                <div className="flex items-center justify-between text-white/50 border-b border-white/10 pb-2">
                  <span>DEPLOYMENT MODEL</span>
                  <span className="text-emerald-400">● 99.99% PRODUCTION SLA</span>
                </div>
                <div className="text-white/90">
                  Client Architecture: {proj.technologies.join(" · ")}
                </div>
              </div>
            </div>

            {/* Key Features Delivered */}
            <div className="space-y-4 border-t border-line/60 pt-8">
              <h3 className="text-lg font-bold text-ink">Key Deliverables & Features</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {proj.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 rounded-xl border border-line/80 bg-paper p-3.5 shadow-xs">
                    <Check width={14} height={14} className="text-brand shrink-0" />
                    <span className="text-xs font-semibold text-ink">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots gallery */}
            <div className="space-y-4 border-t border-line/60 pt-8">
              <span className="eyebrow">PRODUCT SCREENS</span>
              <h3 className="text-xl font-bold text-ink">Inside the platform</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {proj.screenshots.map((shot) => (
                  <figure
                    key={shot.label}
                    className="group overflow-hidden rounded-2xl border border-line/80 bg-paper shadow-xs transition-shadow duration-300 hover:shadow-lg"
                  >
                    <Media
                      src={shot.image}
                      alt={shot.caption}
                      label={shot.label}
                      accent={proj.accent}
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                    <figcaption className="border-t border-line/60 p-4 text-xs leading-relaxed text-muted">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Engineering challenges */}
            <div className="space-y-4 border-t border-line/60 pt-8">
              <span className="eyebrow">CHALLENGES</span>
              <h3 className="text-xl font-bold text-ink">
                What made this build hard — and how we solved it
              </h3>
              <ol className="space-y-3">
                {proj.challenges.map((ch, i) => (
                  <li
                    key={ch.title}
                    className="flex gap-4 rounded-2xl border border-line/80 bg-paper p-5 shadow-xs"
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: proj.accent }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-ink">{ch.title}</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {ch.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Client Feedback Quote */}
            <div className="rounded-2xl border border-line/80 bg-brand-soft/30 p-8 space-y-4">
              <span className="pill bg-brand-soft text-brand font-bold border-brand/20">CLIENT FEEDBACK</span>
              <blockquote className="text-sm sm:text-base font-medium leading-relaxed text-ink italic">
                &ldquo;{proj.clientFeedback.quote}&rdquo;
              </blockquote>
              <div className="text-xs font-bold text-ink">
                {proj.clientFeedback.author} — <span className="text-muted font-normal">{proj.clientFeedback.role}</span>
              </div>
            </div>
          </div>

          {/* Sticky Consultation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-line/80 bg-sand/80 p-7 shadow-lg space-y-6">
              <h4 className="text-lg font-bold text-ink">Project Specs</h4>

              <div className="space-y-3 text-xs border-y border-line/60 py-4">
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Industry:</span>
                  <span className="font-bold text-ink">{proj.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Build Duration:</span>
                  <span className="font-bold text-ink">{proj.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Core Stack:</span>
                  <span className="font-bold text-brand">{proj.technologies.slice(0, 3).join(", ")}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="primary" size="md" href="/contact" className="w-full">
                  Book Architecture Call
                  <ArrowRight width={16} height={16} />
                </Button>
              </div>

              <div className="text-[0.7rem] text-muted space-y-1 pt-2">
                <div>● Senior Engineer-Led Delivery</div>
                <div>● Transparent Timelines & Milestones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="section bg-sand">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Related work"
              title="Other projects you might want to see."
              description="Similar engineering challenges across the industries we serve."
            />
            <Button variant="outline" href="/portfolio" className="shrink-0">
              All projects
              <ArrowRight width={18} height={18} />
            </Button>
          </div>

          <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
            {related.map((r) => (
              <RevealItem key={r.slug} className="h-full">
                <CardLink
                  href={`/portfolio/${r.slug}`}
                  ariaLabel={r.title}
                  className="card card-hover flex h-full flex-col p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="pill" style={{ color: r.accent }}>
                      {r.industry}
                    </span>
                    <ArrowUpRight
                      width={18}
                      height={18}
                      className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {r.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {r.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="pill text-[0.68rem]">
                        {t}
                      </span>
                    ))}
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
