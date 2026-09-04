import { productRoadmap } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";

/**
 * What COBRR is building next.
 *
 * This section used to showcase three SaaS products that did not exist. There
 * is no commercially available product to show, so rather than dress the
 * roadmap up as inventory it is labelled as direction and nothing more — the
 * heading, the eyebrow and the closing note all say so explicitly, because a
 * roadmap presented ambiguously reads as a catalogue.
 *
 * If a real product ships, add it to `products` in `content.ts` and replace
 * this section with a proper showcase.
 */
export default function FeaturedProducts() {
  return (
    <section className="section bg-paper" id="products">
      <SectionHeading
        className="container-page"
        align="center"
        eyebrow="Product roadmap"
        title="What we're building next."
        description="Directions we are investing in, drawn from the systems we already run for clients. These are areas of active development, not products available today."
      />

      <RevealGroup className="container-page mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {productRoadmap.map((item, i) => (
          <RevealItem key={item.name}>
            <div className="flex h-full flex-col bg-paper p-6">
              <span className="mono-label">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{item.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {item.blurb}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="container-page mt-10 flex flex-col items-center gap-4 text-center">
        <p className="mono-label">In development — not yet available</p>
        <Button variant="outline" href="/portfolio">
          See what we have already shipped
          <ArrowRight width={18} height={18} />
        </Button>
      </div>
    </section>
  );
}
