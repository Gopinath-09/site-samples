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

/*
 * Slower than the reference's slide, and a different move: the figure recedes
 * while the description rises through it, with a rule drawing across the top of
 * the panel. Nine hundred milliseconds is long for a hover, which is the point
 * — at three across, a quick snap on every pass of the cursor turns the grid
 * into a flicker.
 */
const SLOW = "duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

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

        <RevealGroup className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {productRoadmap.map((item, i) => (
            <RevealItem key={item.name}>
              <article className="group flex h-full flex-col overflow-hidden bg-paper">
                <div className="p-6 pb-5">
                  <span className="mono-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="heading-md mt-3 text-fg">{item.name}</h3>
                </div>

                {/* One well, two states: the figure recedes, the words rise. */}
                <div className="relative mt-auto h-40 overflow-hidden border-t border-line">
                  {/* The rule draws across as the panel changes */}
                  <span
                    className={`absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-brand transition-transform group-hover:scale-x-100 ${SLOW}`}
                    aria-hidden
                  />

                  <div
                    className={`absolute inset-0 opacity-100 transition-all group-hover:scale-105 group-hover:opacity-0 ${SLOW}`}
                  >
                    {/* Placeholder artwork where we have it; the drawn panel
                        remains the fallback for any entry without a file. */}
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <RoadmapVisual seed={i} />
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 flex translate-y-4 flex-col justify-between bg-paper p-6 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 ${SLOW}`}
                  >
                    <p className="body-sm">{item.blurb}</p>
                    <span className="mono-label flex items-center gap-2 text-brand">
                      In development
                      <ArrowRight width={13} height={13} />
                    </span>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
          {/*
            Eight directions across three columns leave one cell empty, and an
            empty cell in a grid that draws its own rules shows as a grey block.
            The closing note fills it instead of sitting below the grid, so the
            wall ends square.
          */}
          <RevealItem>
            <div className="flex h-full flex-col justify-between bg-sand p-6">
              <div>
                <span className="mono-label">Status</span>
                <p className="body-sm mt-3">
                  Every direction here is in active development. None is a
                  product you can buy today.
                </p>
              </div>
              <Button variant="outline" size="sm" href="/portfolio" className="mt-6 self-start">
                See what we have shipped
                <ArrowRight width={15} height={15} />
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
