import { processSteps } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Compact four-step process strip. The home and about pages use the richer,
 * scroll-driven `DeliveryJourney`; this stays for pages that need a short
 * summary (e.g. /services).
 */
export default function EngineeringProcess() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Engineering process"
        title="A disciplined path from idea to dependable software."
        description="Predictable delivery comes from a clear process. Ours keeps you close to the work at every step."
      />

      <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <RevealItem key={s.step}>
            <div className="relative">
              {/* connector line */}
              {i < processSteps.length - 1 && (
                <span className="absolute left-0 top-6 hidden h-px w-full bg-linear-to-r from-line to-transparent lg:block" />
              )}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper font-mono text-sm font-semibold text-brand">
                {s.step}
              </div>
              <h3 className="heading-sm mt-6 text-fg">{s.title}</h3>
              <p className="body-sm mt-2">{s.description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
