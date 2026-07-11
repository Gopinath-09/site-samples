import { processSteps } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function EngineeringProcess() {
  return (
    <section className="section bg-paper" id="process">
      <div className="container-page">
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
                <h3 className="mt-6 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
