import { differentiators } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Why COBRR.
 *
 * Takes the reference's treatment for its equivalent section: a category label,
 * the point stated as a full sentence at display size, and the explanation
 * pushed to the foot of the card. The gap between the claim and its support is
 * doing the work — it gives the sentence room to be read as a statement rather
 * than as a heading skimmed on the way to a paragraph.
 *
 * There are seven points and the grid is two columns, so the last one spans
 * both and closes the section rather than sitting beside an empty cell. Which
 * entry does that is a property of the data, not of its position.
 */
export default function WhyChoose() {
  return (
    <section className="section bg-sand" id="why-cobrr">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why COBRR"
          title="The difference is in how we work."
          description="Seven things we hold to. None of them is a number we cannot show you."
        />

        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-2">
          {differentiators.map((d) => (
            <RevealItem
              key={d.label}
              className={cn("h-full", d.wide && "lg:col-span-2")}
            >
              <article className="flex h-full flex-col justify-between rounded-3xl border border-line bg-paper p-8 transition-colors duration-300 hover:border-white/20 lg:min-h-[19rem] lg:p-10">
                <div>
                  <span className="mono-label">{d.label}</span>
                  <h3 className="mt-5 text-balance text-xl font-medium leading-snug tracking-[-0.01em] text-fg lg:text-2xl">
                    {d.title}
                  </h3>
                </div>

                <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
                  {d.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
