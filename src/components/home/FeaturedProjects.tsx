import { verifiedProjects, placeholderClips } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CardLink from "@/components/ui/CardLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import HoverMedia from "@/components/ui/HoverMedia";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Delivered work, as a wall of cells sharing hairline rules.
 *
 * This is the treatment the reference uses for its client wins, and it belongs
 * here rather than on the roadmap: these are the only records that carry a real
 * client, a real sector and a real status. The grid draws the rules itself —
 * the container is the line colour and a one-pixel gap lets it through — which
 * avoids the doubled borders that adjacent bordered cells would produce.
 *
 * Reads the proof gate rather than the raw dataset, so an uncleared project
 * cannot appear, and the section removes itself entirely rather than rendering
 * an empty wall.
 *
 * Where the reference shows a client logo, these cells show the project name.
 * We hold artwork for none of these clients, and a wall of empty logo frames
 * would say less than the names do.
 */
export default function FeaturedProjects({
  limit,
  showHeading = true,
}: {
  limit?: number;
  /** The portfolio page brings its own page header, so it suppresses this one. */
  showHeading?: boolean;
}) {
  const list = limit ? verifiedProjects.slice(0, limit) : verifiedProjects;

  if (list.length === 0) return null;

  return (
    <section
      className="section border-b border-line/60 bg-paper"
      id="featured-projects"
    >
      <div className="container-page">
        {showHeading && (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Systems we have built and delivered."
              description="Learning platforms, tourism and school systems, clinic software and AI assistants — each one running for the organisation it was built for."
            />
            <Button variant="outline" href="/portfolio" className="shrink-0">
              View full portfolio
              <ArrowRight width={18} height={18} />
            </Button>
          </div>
        )}

        <RevealGroup
          className={cn(
            "grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3",
            showHeading && "mt-14",
          )}
        >
          {list.map((proj, i) => (
            <RevealItem key={proj.slug}>
              <CardLink
                href={`/portfolio/${proj.slug}`}
                ariaLabel={proj.title}
                className="group h-full"
              >
                <article className="relative flex h-full min-h-[19rem] flex-col justify-between overflow-hidden bg-paper p-7">
                  {/* Real capture when a project has some; otherwise an
                      abstract clip, which reads as motion rather than as a
                      recording of this particular system. */}
                  <HoverMedia
                    seed={i}
                    video={proj.video ?? placeholderClips[i % placeholderClips.length]}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="mono-label">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Compound sectors like "Tourism / Membership / Activity
                        Management" wrap to two lines and unsettle the row, so
                        the cell shows the primary one; the case study carries
                        the full value. */}
                    <span className="mono-label text-right">
                      {proj.industry.split("/")[0].trim()}
                    </span>
                  </div>

                  <div className="relative mt-10">
                    {/* Named clients are the closest thing we have to the
                        reference's logo row, so they lead the cell. */}
                    {proj.client && (
                      <span className="mono-label block text-brand/80">
                        {proj.client}
                      </span>
                    )}
                    <h3
                      className={cn(
                        "text-lg font-semibold leading-snug text-fg",
                        proj.client && "mt-2",
                      )}
                    >
                      {proj.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted line-clamp-3">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="relative mt-7 flex items-end justify-between gap-4 border-t border-line pt-5">
                    <span className="text-[0.7rem] leading-relaxed text-muted">
                      {proj.status}
                    </span>
                    <ArrowUpRight
                      width={17}
                      height={17}
                      className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                  </div>
                </article>
              </CardLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
