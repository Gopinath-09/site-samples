import { processSteps } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * The delivery methodology, as a stack of pinned rows.
 *
 * Each step sticks at the same offset and the next one slides over it, so the
 * sequence is felt as a sequence rather than scanned as a grid of equal cards.
 * Two details make it work: every row needs an opaque background, or the pinned
 * rows show through each other, and each row is nudged down by its index so the
 * stack keeps a visible edge of every card beneath the current one.
 *
 * The whole effect is CSS position: sticky — there is no scroll listener and
 * nothing to recalculate on resize, so it costs nothing on the main thread.
 * Below `lg` the rows simply flow, because stacking needs viewport height that
 * a phone does not have.
 */
export default function EngineeringProcess() {
  return (
    <section className="section bg-paper" id="process">
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title="A disciplined path from requirement to running software."
          description="Eight stages, in the order we actually run them. The last one lasts longer than the other seven combined."
        />

        <div className="mt-14 lg:mt-20">
          {processSteps.map((s, i) => (
            <div
              key={s.step}
              className="lg:sticky"
              style={{
                // Each row pins slightly lower than the one before, so the
                // stack keeps a visible edge rather than becoming one flush
                // card. The step is deliberately small: any wider and the
                // previous card's number shows through the gap instead of a
                // clean sliver of its edge.
                top: `calc(7rem + ${i * 0.55}rem)`,
              }}
            >
              <Reveal direction="up" className="pb-4 lg:pb-6">
                <article className="grid gap-6 overflow-hidden rounded-3xl border border-line bg-sand p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-9">
                  <div className="flex items-center gap-5">
                    <span className="mono-figure text-4xl font-medium text-brand md:text-5xl">
                      {s.step}
                    </span>
                    <span
                      className="hidden h-12 w-px bg-line md:block"
                      aria-hidden
                    />
                  </div>

                  <div className="md:flex md:items-baseline md:gap-10">
                    <h3 className="text-xl font-semibold text-fg md:w-64 md:shrink-0">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:mt-0">
                      {s.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
