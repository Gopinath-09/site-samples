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

export function generateStaticParams() {
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

/**
 * A single case study.
 *
 * Every optional block below renders only when the record actually carries the
 * data: measured results, an attributed quote, product screens and a per-project
 * stack are all absent for most projects today. The page is written so that a
 * record with nothing but its summary, features and status still reads as a
 * finished document rather than a page with holes in it — which is what makes
 * it possible to publish honest records instead of padded ones.
 */
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
        description={
          proj.client
            ? `${proj.projectType} · ${proj.client}`
            : proj.projectType
        }
      >
        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="primary" size="lg" href="/contact">
            Build something similar
            <ArrowRight width={18} height={18} />
          </Button>
          <Button variant="ghost-light" size="lg" href="/portfolio">
            All projects
          </Button>
        </div>
      </PageHeader>

      <section className="section border-b border-line/60 bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Overview */}
            <div className="space-y-4">
              <span className="eyebrow">Overview</span>
              <p className="lead">{proj.summary}</p>
            </div>

            {/* Outcome, stated in prose because no figure is evidenced */}
            <div className="space-y-4 border-t border-line/60 pt-8">
              <span className="eyebrow">Outcome</span>
              <h3 className="heading-md font-bold text-fg">
                What the platform changed
              </h3>
              <p className="body leading-relaxed text-muted">
                {proj.benefits}
              </p>
            </div>

            {/* Measured results, only where they exist */}
            {proj.results && proj.results.length > 0 && (
              <div className="rounded-2xl border border-line/80 bg-sand/80 p-6">
                <span className="mono-label mb-4 block">Measured results</span>
                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                  {proj.results.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-xl border border-line/60 bg-paper p-4 shadow-xs"
                    >
                      <div
                        className="text-2xl font-extrabold"
                        style={{ color: proj.accent }}
                      >
                        {r.value}
                      </div>
                      <div className="mt-1 text-xs font-bold text-muted">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="space-y-4 border-t border-line/60 pt-8">
              <span className="eyebrow">Core features</span>
              <h3 className="heading-md font-bold text-fg">What was built</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {proj.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2.5 rounded-xl border border-line/80 bg-paper p-3.5 shadow-xs"
                  >
                    <Check width={14} height={14} className="shrink-0 text-brand" />
                    <span className="text-xs font-semibold text-fg">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screens, only where they exist */}
            {proj.screenshots && proj.screenshots.length > 0 && (
              <div className="space-y-4 border-t border-line/60 pt-8">
                <span className="eyebrow">Product screens</span>
                <h3 className="heading-md font-bold text-fg">Inside the platform</h3>
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
            )}

            {/* Attributed quote, only where one has been collected */}
            {proj.clientFeedback && (
              <div className="space-y-4 rounded-2xl border border-line/80 bg-brand-soft/30 p-8">
                <span className="pill border-brand/20 bg-brand-soft font-bold text-brand">
                  Client feedback
                </span>
                <blockquote className="body font-medium italic text-fg">
                  &ldquo;{proj.clientFeedback.quote}&rdquo;
                </blockquote>
                <div className="text-xs font-bold text-fg">
                  {proj.clientFeedback.author} —{" "}
                  <span className="font-normal text-muted">
                    {proj.clientFeedback.role}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Specification sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6 rounded-2xl border border-line/80 bg-sand/80 p-7 shadow-lg">
              <h4 className="heading-md font-bold text-fg">Project details</h4>

              <dl className="space-y-3 border-y border-line/60 py-4 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-muted">Type</dt>
                  <dd className="text-right font-bold text-fg">
                    {proj.projectType}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-muted">Industry</dt>
                  <dd className="text-right font-bold text-fg">
                    {proj.industry}
                  </dd>
                </div>
                {proj.client && (
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-muted">Client</dt>
                    <dd className="text-right font-bold text-fg">
                      {proj.client}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-muted">Status</dt>
                  <dd className="text-right font-bold text-fg">
                    {proj.status}
                  </dd>
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-muted">Stack</dt>
                    <dd className="text-right font-bold text-brand">
                      {proj.technologies.slice(0, 3).join(", ")}
                    </dd>
                  </div>
                )}
              </dl>

              <Button variant="primary" size="md" href="/contact" className="w-full">
                Talk to the team
                <ArrowRight width={16} height={16} />
              </Button>
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
                  <h3 className="heading-md mt-5 font-semibold leading-snug text-fg">
                    {r.title}
                  </h3>
                  <p className="body mt-2 flex-1 leading-relaxed text-muted">
                    {r.summary}
                  </p>
                  <div className="mt-6 border-t border-line pt-5">
                    <span className="mono-label">{r.projectType}</span>
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
