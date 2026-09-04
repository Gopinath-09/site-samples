import { productRoadmap, services, verifiedProjects } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import RoadmapVisual from "@/components/graphics/RoadmapVisual";
import { ArrowRight } from "@/components/ui/icons";

/**
 * What COBRR is building next.
 *
 * Laid out the way the reference lays out its problem rows: the direction on
 * the left, the explanation in the middle, and a panel on the right that comes
 * alive on hover. Each row is ruled rather than boxed, so the set reads as a
 * list to be gone through rather than a grid of options to compare.
 *
 * The reference plays product footage in that panel. Nothing here has a running
 * product to film — that is the whole point of a roadmap — so the panel is drawn
 * and animates on hover instead. `RoadmapItem.video` is wired for the day one of
 * these does: drop the file in `public/roadmap/`, set the field, and that row
 * plays it.
 *
 * The section opens with a statement of what the studio actually does, because
 * the roadmap only makes sense once a reader knows the work it grows out of.
 */
export default function FeaturedProducts() {
  return (
    <section className="section bg-paper" id="products">
      <div className="container-page">
        {/* Positioning statement, in our own terms and our own facts */}
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

        <div className="mt-12 border-t border-line">
          {productRoadmap.map((item, i) => (
            <Reveal key={item.name}>
              <article className="group grid items-center gap-6 border-b border-line py-8 lg:grid-cols-[3.5rem_minmax(0,17rem)_1fr_minmax(0,18rem)] lg:gap-10 lg:py-9">
                <span className="mono-label">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg font-semibold leading-snug text-fg">
                  {item.name}
                </h3>

                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  {item.blurb}
                </p>

                {/* Media panel — real footage when it exists, drawn until then */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-ink">
                  {item.video ? (
                    <video
                      className="h-full w-full object-cover"
                      src={item.video}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden
                    />
                  ) : (
                    <RoadmapVisual seed={i} />
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

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
