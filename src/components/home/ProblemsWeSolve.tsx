import { problemsWeSolve } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Positioning stated as the situation the visitor is in.
 *
 * Laid out the way the reference lays out its equivalent: the question sits in
 * a narrow left column at reading size, the answer takes the wide middle at
 * display size, and the action closes the row. Ruled rows rather than cards,
 * because these are statements to be read in sequence, not options to compare.
 *
 * The rows are deliberately not pinned. The process section already stacks, and
 * a page that uses its most distinctive device twice spends it.
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

        <div className="mt-14 border-t border-line lg:mt-20">
          {problemsWeSolve.map((p) => (
            <Reveal key={p.question}>
              <article className="grid gap-6 border-b border-line py-10 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-14 lg:py-14">
                <h3 className="text-balance text-lg font-semibold leading-snug text-fg lg:text-xl">
                  {p.question}
                </h3>

                <div>
                  <p className="max-w-3xl text-lg leading-relaxed text-muted lg:text-xl lg:leading-relaxed">
                    {p.answer}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    href={p.href}
                    className="mt-7"
                  >
                    {p.ctaLabel}
                    <ArrowRight width={16} height={16} />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
