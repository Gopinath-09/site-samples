import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/content";
import PageHeader from "@/components/layout/PageHeader";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/icons";
import type { Faq } from "@/lib/content";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.tagline };
}

const productFaqs: Faq[] = [
  {
    question: "Is there a free trial or pilot?",
    answer:
      "Yes. We offer guided pilots so your team can evaluate the platform against real workflows before committing.",
  },
  {
    question: "Can it integrate with our existing tools?",
    answer:
      "The platform ships with a documented API and common integrations, and we can build bespoke connectors where needed.",
  },
  {
    question: "How is our data handled?",
    answer:
      "Your data is isolated per tenant, encrypted in transit and at rest, with role-based access and full audit trails.",
  },
];

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHeader eyebrow={`Product · ${product.status}`} title={product.name} description={product.tagline}>
        <div className="flex flex-wrap gap-3">
          <Button variant="light" size="lg" href="/contact">
            Request a demo
            <ArrowRight width={18} height={18} />
          </Button>
          <Button variant="ghost-light" size="lg" href="/products">
            All products
          </Button>
        </div>
      </PageHeader>

      {/* Problem / Solution */}
      <section className="section bg-paper">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <span className="pill text-copper">The problem</span>
              <p className="mt-5 text-lg leading-relaxed text-ink">
                {product.problem}
              </p>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="card h-full bg-ink p-8 text-white">
              <span className="pill border-white/15 bg-white/10 text-white">
                Our solution
              </span>
              <p className="mt-5 text-lg leading-relaxed text-white/90">
                {product.solution}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-sand">
        <div className="container-page">
          <span className="eyebrow">Features</span>
          <Reveal>
            <h2 className="heading-md mt-4">Everything the team needs, in one place.</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <RevealItem key={f}>
                <div className="card flex items-center gap-3 p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Check width={16} height={16} />
                  </span>
                  <span className="text-sm font-medium text-ink">{f}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Benefits</span>
            <Reveal>
              <h2 className="heading-md mt-4">
                What changes once {product.name} is in place.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 leading-relaxed text-muted">
                Outcomes teams report after adopting the platform — measured
                against how they worked before, not against a feature list.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-4">
            {product.benefits.map((b, i) => (
              <RevealItem key={b}>
                <div className="card flex items-start gap-4 p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1.5 text-sm font-semibold leading-snug text-ink">
                    {b}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Product gallery */}
      <section className="section bg-sand">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Gallery</span>
              <Reveal>
                <h2 className="heading-md mt-4">A look inside {product.name}.</h2>
              </Reveal>
            </div>
            <Button variant="outline" href="/contact" className="shrink-0">
              Book a live demo
              <ArrowRight width={18} height={18} />
            </Button>
          </div>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {product.gallery.map((shot) => (
              <RevealItem key={shot.label} className="h-full">
                <figure className="group h-full overflow-hidden rounded-2xl border border-line bg-paper shadow-xs transition-shadow duration-300 hover:shadow-lg">
                  <Media
                    src={shot.image}
                    alt={shot.caption}
                    label={shot.label}
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="border-t border-line p-5 text-xs leading-relaxed text-muted">
                    {shot.caption}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Architecture + pricing placeholder */}
      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="eyebrow">Architecture highlights</span>
              <h2 className="heading-md mt-4">Engineered to scale safely.</h2>
              <ul className="mt-6 space-y-4">
                {[
                  ["Multi-tenant core", "Strict tenant isolation with per-tenant configuration."],
                  ["Event-driven services", "Decoupled services communicate over a durable event backbone."],
                  ["Observability built in", "Metrics, tracing and logging from day one."],
                  ["Zero-downtime releases", "Continuous delivery with automated rollbacks."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <Check width={13} height={13} />
                    </span>
                    <div>
                      <div className="font-semibold text-ink">{t}</div>
                      <div className="text-sm text-muted">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="card p-8">
              <span className="pill">Pricing</span>
              <h3 className="mt-5 heading-md">Flexible plans</h3>
              <p className="mt-3 text-sm text-muted">
                Pricing is tailored to your team size and needs. Get in touch for
                a plan that fits.
              </p>
              <div className="mt-6 space-y-3">
                {["Starter", "Growth", "Enterprise"].map((tier, i) => (
                  <div
                    key={tier}
                    className="flex items-center justify-between rounded-xl border border-line px-5 py-4"
                  >
                    <span className="font-semibold text-ink">{tier}</span>
                    <span className="font-mono text-sm text-muted">
                      {i === 2 ? "Custom" : "On request"}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="dark" href="/contact" className="mt-6 w-full">
                Get pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection
        items={productFaqs}
        tone="sand"
        title={`${product.name} — common questions.`}
      />
      <FinalCta />
    </>
  );
}
