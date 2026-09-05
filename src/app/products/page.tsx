import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FinalCta from "@/components/home/FinalCta";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Check } from "@/components/ui/icons";
import { verifiedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Product Roadmap — COBRR Tech Labs",
  description:
    "The directions COBRR Tech Labs is investing in next — AI agents, enterprise automation, cloud SaaS, and sector platforms for healthcare, education, logistics, tourism and government.",
};

/**
 * The roadmap page.
 *
 * This was previously a product studio page selling two SaaS products that did
 * not exist, complete with a 99.99% uptime figure and licensing terms for
 * software nobody could buy. It now states plainly what is being built and
 * points at the delivered work as the actual evidence.
 */

const groundedIn = [
  {
    title: "Built on delivered systems",
    body: "Each roadmap direction extends something already running — the learning platform, the transport tracker, the clinic system — rather than starting from a blank page.",
  },
  {
    title: "Client work comes first",
    body: "Products emerge from problems encountered on real engagements. Nothing here is speculative market research.",
  },
  {
    title: "Nothing is for sale yet",
    body: "These are areas of active development. When something ships, it will appear as a product with a demo behind it, not as a promise.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRODUCT ROADMAP"
        title="What we're building next."
        description="Directions we are investing in, grown out of the platforms we already run for clients. These are in development, not products available today."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="light" size="lg" href="/portfolio">
            See delivered work
            <ArrowRight width={18} height={18} />
          </Button>
          <Button variant="ghost-light" size="lg" href="/contact">
            Talk to the team
          </Button>
        </div>
      </PageHeader>

      {/* What is actually shipped today, stated up front */}
      <section className="border-b border-line bg-paper py-10">
        <div className="container-page fact-row grid-cols-2 md:grid-cols-3">
          <div className="fact-cell">
            <div className="mono-label">Platforms delivered</div>
            <div className="mono-figure mt-2 text-xl font-medium text-fg">
              {String(verifiedProjects.length).padStart(2, "0")}
            </div>
          </div>
          <div className="fact-cell">
            <div className="mono-label">Products for sale today</div>
            <div className="mono-figure mt-2 text-xl font-medium text-fg">00</div>
          </div>
          <div className="fact-cell">
            <div className="mono-label">Roadmap directions</div>
            <div className="mono-figure mt-2 text-xl font-medium text-fg">08</div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* How the roadmap is grounded */}
      <section className="section bg-sand">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="How this roadmap is set"
            title="Direction that comes from delivery."
            description="Every line on this roadmap traces back to a system already in use. That is what keeps it a plan rather than a wish list."
          />

          <RevealGroup className="grid gap-6">
            {groundedIn.map((pt) => (
              <RevealItem key={pt.title}>
                <div className="card flex gap-5 p-6">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                    <Check width={16} height={16} />
                  </span>
                  <div>
                    <h3 className="heading-md font-semibold text-fg">{pt.title}</h3>
                    <p className="body mt-1.5 leading-relaxed text-muted">
                      {pt.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Early-access CTA */}
      <section className="section bg-ink text-white">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow text-white/50">Early access</span>
            <h2 className="heading-lg mt-4 text-white">
              Want one of these built for your organisation?
            </h2>
            <p className="body mt-5 leading-relaxed text-white/65">
              Several roadmap directions are already being built as client
              engagements. If one matches a problem you have, that is usually the
              fastest route to having it.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button variant="light" size="lg" href="/contact">
              Start a conversation
              <ArrowRight width={18} height={18} />
            </Button>
            <p className="body text-white/40 md:text-right">
              Response within 1 business day
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
