import { industries } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function IndustriesServed() {
  return (
    <section className="section bg-sand" id="industries">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Industries"
          title="Depth across the sectors that run on software."
          description="We adapt our engineering to the realities of your industry — its regulations, its data and its pace."
        />

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map((ind) => (
            <RevealItem key={ind.name} className="h-full">
              <div className="card card-hover flex h-full flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={ind.icon} width={20} height={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {ind.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {ind.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
