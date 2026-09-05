import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import FaqSection from "@/components/home/FaqSection";
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
            <span className="eyebrow">Overview</span>
            <Reveal>
              <h2 className="heading-lg mt-4">
                Outcomes engineered around your goals.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="lead mt-5">{service.description}</p>
            </Reveal>

            {/* Benefits */}
            <h3 className="heading-md mt-10 font-bold uppercase tracking-wider text-muted">
              What you gain
            </h3>
            <RevealGroup className="mt-5 grid gap-3">
              {service.benefits.map((b) => (
                <RevealItem
                  key={b}
                  className="flex items-start gap-3 text-sm font-medium text-fg"
                >
                  <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check width={14} height={14} />
                  </span>
                  {b}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal direction="left">
            <div className="card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white">
                <Icon name={service.icon} width={22} height={22} />
              </span>
              <h3 className="heading-md mt-6 font-semibold text-fg">Focus areas</h3>
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

      {/* Capabilities & technologies */}
      <section className="section bg-sand">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="eyebrow">Capabilities</span>
            <h2 className="heading-lg mt-4">What&apos;s included</h2>
            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.features.map((f) => (
                <RevealItem key={f} className="h-full">
                  <div className="card h-full p-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
                      <Check width={15} height={15} />
                    </span>
                    <p className="body mt-4 font-semibold leading-snug text-fg">
                      {f}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal direction="left">
            <div className="card p-8">
              <span className="eyebrow">Technologies used</span>
              <h3 className="heading-md mt-3 font-semibold text-fg">
                The stack behind this service
              </h3>
              <p className="body mt-2 leading-relaxed text-muted">
                Chosen for operational maturity and long-term supportability —
                not novelty.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <li key={t}>
                    <span className="pill">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-line pt-6">
                <Button variant="outline" href="/technologies" className="w-full">
                  Explore our full stack
                  <ArrowRight width={16} height={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Delivery process */}
      <section className="section bg-paper">
        <div className="container-page">
          <span className="eyebrow">How we work</span>
          <h2 className="heading-lg mt-4 max-w-2xl">
            A clear path from first conversation to production.
          </h2>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((step, i) => (
              <RevealItem key={step} className="h-full">
                <div className="relative h-full rounded-2xl border border-line bg-paper p-6 shadow-xs">
                  <span className="text-xs font-bold tracking-widest text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="heading-md mt-3 font-semibold leading-snug text-fg">
                    {step}
                  </h3>
                  {i < service.processSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute right-0 top-1/2 hidden h-px w-6 translate-x-full bg-line lg:block"
                    />
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Service-specific FAQs */}
      <FaqSection
        items={service.faqs}
        tone="sand"
        eyebrow="FAQ"
        title={`${service.title} — common questions.`}
        description="The questions we are asked most often before starting this kind of engagement."
      />

      {/* Related services */}
      <section className="section bg-paper">
        <div className="container-page">
          <h2 className="heading-lg">Related services</h2>
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
