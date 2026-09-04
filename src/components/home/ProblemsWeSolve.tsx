import { problemsWeSolve } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Positioning stated as the situation the visitor is in.
 *
 * Each problem is a spread rather than a row: the situation set large on one
 * side, the response boxed on the other, with the sides swapping each time down
 * the section. The alternation is what does the work — it gives the section a
 * rhythm and makes each problem land as its own statement instead of the fourth
 * line of a list the eye has already started skimming.
 *
 * The response is the only boxed thing here, which is deliberate. The situation
 * is the visitor's and sits in open space; the answer is ours, so it is the part
 * that arrives contained, with the action attached to it.
 */
export default function ProblemsWeSolve() {
  return (
    <section className="section bg-sand" id="problems">
      <div className="container-page">
        <SectionHeading
          eyebrow="Problems we solve"
          title="Building software is hard. Choosing who builds it shouldn't be."
          description="Most people arrive with one of these. If yours is not here, it is usually a version of one that is."
        />

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {problemsWeSolve.map((p, i) => {
            const flipped = i % 2 === 1;

            return (
              <Reveal key={p.question}>
                <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                  {/* The situation — unboxed, in open space */}
                  <div className={cn(flipped && "lg:order-2")}>
                    <span className="mono-figure text-sm font-medium text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="heading-lg mt-6 text-balance text-fg">
                      {p.question}
                    </h3>
                  </div>

                  {/* The response — contained, with the action attached */}
                  <div
                    className={cn(
                      "rounded-3xl border border-line bg-paper p-8 lg:p-10",
                      flipped && "lg:order-1",
                    )}
                  >
                    <span className="mono-label">What we do</span>
                    <p className="mt-6 text-base leading-relaxed text-muted">
                      {p.answer}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      href={p.href}
                      className="mt-8"
                    >
                      {p.ctaLabel}
                      <ArrowRight width={16} height={16} />
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
