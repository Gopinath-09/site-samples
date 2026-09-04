import { productRoadmap, services, verifiedProjects } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import HoverMedia from "@/components/ui/HoverMedia";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/**
 * What COBRR is building next.
 *
 * A grid of quiet cells that come alive one at a time: each holds only its
 * number, name and description until the pointer arrives, at which point the
 * media layer fades up behind the text. The restraint is the point — a grid
 * where every cell is already playing something has nothing left to give when
 * you actually look at one.
 *
 * `RoadmapItem.video` feeds the media layer. It is unset on every record today,
 * so the cells fall back to a drawn panel; drop a file in `public/roadmap/` and
 * set the field and that cell plays it instead.
 *
 * The section opens with a statement of what the studio does, because the
 * roadmap only makes sense once a reader knows the work it grows out of.
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

        <RevealGroup className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          {productRoadmap.map((item, i) => (
            <RevealItem key={item.name}>
              <article className="group relative flex h-full min-h-[21rem] flex-col justify-between overflow-hidden bg-paper p-8">
                <HoverMedia video={item.video} seed={i} />

                {/* Text sits above the media layer */}
                <div className="relative flex items-start justify-between">
                  <span className="mono-figure text-2xl font-medium text-muted/70 transition-colors duration-300 group-hover:text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    width={18}
                    height={18}
                    className="text-muted opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg group-hover:opacity-100"
                  />
                </div>

                <div className="relative">
                  <h3 className="text-xl font-semibold text-fg">{item.name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {item.blurb}
                  </p>
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
