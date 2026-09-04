import { productRoadmap } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";

/**
 * What COBRR is building next.
 *
 * Uses the reference's "featured wins" treatment: a wall of cells sharing
 * hairline rules rather than a set of separate cards, so the group reads as one
 * ruled table of contents. Negative-margin borders would leave doubled lines
 * between cells, so the grid draws them instead — the container is the line
 * colour and a one-pixel gap lets it through.
 *
 * What this section deliberately does not borrow is the reference's content.
 * Those cells carry client logos, funding figures and outcomes; a roadmap has
 * none of those, and dressing intent up in the furniture of proof is exactly
 * the overclaim this site has been stripped of. The cells carry a number, the
 * direction and a plain status instead.
 */
export default function FeaturedProducts() {
  return (
    <section className="section bg-paper" id="products">
      <div className="container-page">
        <SectionHeading
          eyebrow="Product roadmap"
          title="What we're building next."
          description="Directions we are investing in, drawn from the systems we already run for clients. These are in active development, not products available today."
        />

        <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {productRoadmap.map((item, i) => (
            <RevealItem key={item.name}>
              <div className="group flex h-full min-h-[15rem] flex-col justify-between bg-paper p-7 transition-colors duration-300 hover:bg-sand">
                <div className="flex items-start justify-between gap-3">
                  <span className="mono-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono-label text-brand/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    In dev
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-fg">{item.name}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted">
                    {item.blurb}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="mono-label">In development — not yet available</p>
          <Button variant="outline" href="/portfolio">
            See what we have already shipped
            <ArrowRight width={18} height={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
