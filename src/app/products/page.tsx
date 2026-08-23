import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FinalCta from "@/components/home/FinalCta";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Check } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Products — SaaS Built by COBRR",
  description:
    "Workship and Satisfy — production SaaS platforms engineered and operated by COBRR TECH LABS. Battle-tested foundations available for enterprise licensing and pilots.",
};

const studioPoints = [
  {
    title: "Battle-tested foundations",
    body: "Every product runs on the same cloud infrastructure and security posture we apply to client work — so the quality bar is already proven.",
  },
  {
    title: "Real customer feedback",
    body: "Workship and Satisfy have real users. That means features ship because they solve actual workflow problems, not because they sounded good in a roadmap.",
  },
  {
    title: "White-label & licensing available",
    body: "Our products are designed with modularity in mind. Enterprise licensing, white-labeling, and bespoke extensions are available on request.",
  },
];

const pillars = [
  { stat: "2", label: "Live SaaS Products" },
  { stat: "100%", label: "IP Owned by COBRR" },
  { stat: "99.99%", label: "Production Uptime" },
  { stat: "24/7", label: "SLA Monitoring" },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRODUCT STUDIO"
        title="Software we build for the world — not just for clients."
        description="Our in-house SaaS studio ships and operates real products. It keeps our engineering sharp and gives you battle-tested foundations you can trust."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="light" size="lg" href="/contact">
            Request a demo
            <ArrowRight width={18} height={18} />
          </Button>
          <Button variant="ghost-light" size="lg" href="/services">
            Build your own product
          </Button>
        </div>
      </PageHeader>

      {/* Stats strip */}
      <section className="border-b border-line bg-paper py-10">
        <div className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.label} className="text-center">
              <div className="text-3xl font-bold text-ink">{p.stat}</div>
              <div className="mt-1 text-sm text-muted">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product cards */}
      <FeaturedProducts />

      {/* Studio philosophy */}
      <section className="section bg-sand">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Our studio philosophy"
            title="We build the products we wish existed."
            description="Running live SaaS products makes us better engineers. We ship, operate, and iterate — learning things you can only learn when real users depend on your system."
          />

          <RevealGroup className="grid gap-6">
            {studioPoints.map((pt) => (
              <RevealItem key={pt.title}>
                <div className="card flex gap-5 p-6">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                    <Check width={16} height={16} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{pt.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{pt.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Licensing CTA */}
      <section className="section bg-ink text-white">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow text-white/50">Enterprise Licensing</span>
            <h2 className="heading-lg mt-4 text-white">
              Want to deploy Workship or Satisfy inside your organization?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              Both products are available for enterprise licensing with dedicated support, custom
              integrations, single-sign-on, and SLA guarantees tailored to your infrastructure.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button variant="light" size="lg" href="/contact">
              Discuss licensing
              <ArrowRight width={18} height={18} />
            </Button>
            <p className="text-sm text-white/40 md:text-right">
              Response within 1 business day
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
