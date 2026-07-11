import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/content";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return { title: "Case study" };
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyDetailPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${study.industry} · ${study.client}`}
        title={study.title}
        description={study.summary}
      >
        <Button variant="light" size="lg" href="/contact">
          Start a similar project
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      {/* Results band */}
      <section className="border-b border-line bg-paper py-14">
        <div className="container-page grid grid-cols-1 gap-8 sm:grid-cols-3">
          {study.results.map((r) => (
            <Reveal key={r.label} className="text-center">
              <div
                className="text-4xl font-semibold tracking-tight md:text-5xl"
                style={{ color: study.accent }}
              >
                {r.value}
              </div>
              <p className="mt-2 text-sm text-muted">{r.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
          <Reveal>
            <div>
              <span className="eyebrow">Overview</span>
              <div className="mt-6 space-y-6 text-sm text-muted">
                <div>
                  <div className="font-semibold text-ink">Client</div>
                  {study.client}
                </div>
                <div>
                  <div className="font-semibold text-ink">Industry</div>
                  {study.industry}
                </div>
                <div>
                  <div className="font-semibold text-ink">Engagement</div>
                  Design, engineering & ongoing support
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="space-y-8">
              {[
                ["The challenge", `${study.client} needed to move past fragmented tools and manual processes that were slowing the business and obscuring the data leadership needed.`],
                ["Our approach", "We ran a focused discovery, agreed an architecture, and delivered in tested increments — keeping the team close to the work throughout."],
                ["The result", `${study.summary} The system continues to evolve as a long-term platform, supported by our team.`],
              ].map(([h, b]) => (
                <div key={h}>
                  <h2 className="heading-md">{h}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
