import { differentiators } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function WhyChoose() {
  return (
    <Section id="why-cobrr">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="Why COBRR"
          title="The difference is in how we work."
          description="Anyone can write code. We are chosen for judgement, accountability and software that keeps paying off."
        />

        <RevealGroup className="grid gap-5 sm:grid-cols-2">
          {differentiators.map((d) => (
            <RevealItem key={d.title} className="h-full">
              <Card interactive className="flex h-full flex-col">
                <IconChip name={d.icon} tone="solid" size="md" />
                <h3 className="heading-sm mt-5 text-fg">{d.title}</h3>
                <p className="body-sm mt-2">{d.description}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
