import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import FinalCta from "@/components/home/FinalCta";
import FaqSection from "@/components/home/FaqSection";
import { solutions } from "@/lib/content";
import { ArrowRight, Check, Shield } from "@/components/ui/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sol = solutions.find((s) => s.slug === slug);
  if (!sol) return {};
  return {
    title: `${sol.name} Solution`,
    description: sol.description,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const sol = solutions.find((s) => s.slug === slug);

  if (!sol) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow={`ENTERPRISE SOLUTION · ${sol.category.toUpperCase()}`}
        title={sol.name}
        description={sol.tagline}
      >
        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="primary" size="lg" href="/contact">
            Request Solution Demo
            <ArrowRight width={18} height={18} />
          </Button>
          <Button variant="ghost-light" size="lg" href="/solutions">
            All Solutions
          </Button>
        </div>
      </PageHeader>

      <section className="section bg-paper border-b border-line/60">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <span className="eyebrow">SOLUTION OVERVIEW</span>
              <h2 className="heading-md mt-4 text-ink">
                Engineered for High Reliability & Rapid Enterprise Deployment
              </h2>
              <p className="lead mt-4 leading-relaxed">
                {sol.description}
              </p>
            </div>

            <div className="space-y-4 border-t border-line/60 pt-8">
              <h3 className="text-lg font-bold text-ink">Key Capabilities & Features</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {sol.features.map((feat) => (
                  <div key={feat} className="rounded-xl border border-line/80 bg-sand/60 p-4 flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                      <Check width={14} height={14} />
                    </div>
                    <span className="text-xs font-semibold text-ink leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-line/60 pt-8">
              <h3 className="text-lg font-bold text-ink">Target Use Cases</h3>
              <div className="flex flex-wrap gap-2">
                {sol.useCases.map((uc) => (
                  <span key={uc} className="pill text-xs bg-sand-deep border-line font-medium text-ink">
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Inquiry Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-line/80 bg-sand/80 p-7 shadow-lg space-y-6">
              <div className="flex items-center gap-2">
                <Shield width={18} height={18} className="text-brand" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Customization Ready
                </span>
              </div>

              <h4 className="text-lg font-bold text-ink">Deploy or Tailor {sol.name}</h4>
              <p className="text-xs leading-relaxed text-muted">
                Our engineering team will adapt this solution framework to match your organization&apos;s specific APIs, branding, and compliance standards.
              </p>

              <div className="space-y-3 pt-2">
                <Button variant="primary" size="md" href="/contact" className="w-full">
                  Book a Consultation
                  <ArrowRight width={16} height={16} />
                </Button>
              </div>

              <div className="border-t border-line/60 pt-4 text-[0.7rem] text-muted space-y-1">
                <div>● 100% Source Code Ownership</div>
                <div>● SOC2 & HIPAA Compliant Architecture</div>
                <div>● SLA-backed Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
      <FinalCta />
    </>
  );
}
