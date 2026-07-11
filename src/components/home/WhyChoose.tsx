import { differentiators } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function WhyChoose() {
  return (
    <section className="section bg-sand" id="why-cobrr">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="Why COBRR"
          title="The difference is in how we work."
          description="Anyone can write code. We are chosen for judgement, accountability and software that keeps paying off."
        />

        <RevealGroup className="grid gap-5 sm:grid-cols-2">
          {differentiators.map((d) => (
            <RevealItem key={d.title} className="h-full">
              <div className="card card-hover flex h-full flex-col p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                  <Icon name={d.icon} width={20} height={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {d.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
