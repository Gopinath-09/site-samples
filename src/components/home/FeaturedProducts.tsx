import { productRoadmap, services, verifiedProjects } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import RoadmapVisual from "@/components/graphics/RoadmapVisual";
import { ArrowRight } from "@/components/ui/icons";

/**
 * What COBRR is building next.
 *
 * The cards use the sliding reveal from the reference: the number and name stay
 * put, and the panel beneath them is a two-frame track. At rest it shows the
 * figure; on hover the track slides one card width so the figure leaves to the
 * left and the description arrives from the right. Same idea as the reference,
 * which animates `left` on a double-width strip — this moves it with a
 * transform instead, so the browser can composite it rather than reflowing the
 * card on every frame.
 *
 * Holding the description back is the point of the device: at rest the grid is
 * a list of directions you can scan, and the detail arrives only for the one
 * you actually pointed at.
 */

/** Matches the reference's 0.55s slide. */
const SLIDE = "duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function FeaturedProducts() {
  return (
    <section className="section bg-paper" id="products">
      <div className="container-page">
        <Reveal>
          <div className="max-w-4xl border-b border-line pb-14">
            <span className="eyebrow">What we do</span>
            <h2 className="heading-lg mt-5 text-balance text-fg">
              From first release to full reinvention.
            </h2>
            <p className="lead mt-6 max-w-2xl">
              Good software does not happen by accident. We are an engineering
              studio in Coimbatore combining product thinking, interface design
              and {services.length} delivery disciplines under one roof — the
              same team from the requirement through to the years after launch.
              {" "}
              {verifiedProjects.length} platforms are running on that basis
              today.
            </p>
          </div>
        </Reveal>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Product roadmap"
            title="What we're building next."
            description="Directions we are investing in, drawn from the systems we already run for clients. These are in active development, not products available today."
          />
        </div>

        <RevealGroup className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          {productRoadmap.map((item, i) => (
            <RevealItem key={item.name}>
              <article className="group flex h-full flex-col overflow-hidden bg-paper">
                {/* Fixed head — this is what stays put while the panel moves */}
                <div className="flex items-start justify-between gap-4 p-8 pb-6">
                  <div>
                    <span className="mono-label">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="heading-md mt-3 text-fg">{item.name}</h3>
                  </div>
                </div>

                {/* Two-frame track: figure at rest, description on hover */}
                <div className="relative mt-auto h-56 overflow-hidden border-t border-line">
                  <div
                    className={`flex h-full w-[200%] transition-transform group-hover:-translate-x-1/2 ${SLIDE}`}
                  >
                    <div className="h-full w-1/2 shrink-0">
                      <RoadmapVisual seed={i} />
                    </div>

                    <div className="flex h-full w-1/2 shrink-0 flex-col justify-between bg-paper p-8">
                      <p className="body">{item.blurb}</p>
                      <span className="mono-label flex items-center gap-2 text-brand">
                        In development
                        <ArrowRight width={14} height={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
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
