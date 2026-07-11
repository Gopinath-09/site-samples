import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service" };
  return { title: service.title, description: service.summary };
}

const deliverables = [
  "Discovery & technical strategy",
  "System architecture & design",
  "Iterative, tested delivery",
  "Security review & hardening",
  "Documentation & handover",
  "Ongoing support & evolution",
];

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow="Service" title={service.title} description={service.summary}>
        <Button variant="light" size="lg" href="/contact">
          Request a proposal
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <span className="eyebrow">What we deliver</span>
            <Reveal>
              <h2 className="heading-md mt-4">
                Outcomes engineered around your goals.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="lead mt-5 text-base">
                Every {service.title.toLowerCase()} engagement is scoped to your
                context. We combine senior engineering with a clear process so
                you get software that is reliable, secure and built to evolve.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2">
              {deliverables.map((d) => (
                <RevealItem
                  key={d}
                  className="flex items-center gap-3 text-sm font-medium text-ink"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check width={14} height={14} />
                  </span>
                  {d}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal direction="left">
            <div className="card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white">
                <Icon name={service.icon} width={22} height={22} />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink">Focus areas</h3>
              <ul className="mt-4 space-y-3">
                {service.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-line pt-6">
                <Button variant="dark" href="/contact" className="w-full">
                  Talk to an engineer
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      <section className="section bg-sand">
        <div className="container-page">
          <h2 className="heading-md">Related services</h2>
          <RevealGroup className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <RevealItem key={r.slug} className="h-full">
                <Button
                  variant="outline"
                  href={`/services/${r.slug}`}
                  className="h-full w-full justify-between rounded-2xl px-6 py-5"
                >
                  <span className="text-left font-semibold">{r.title}</span>
                  <ArrowRight width={18} height={18} />
                </Button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
