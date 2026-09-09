import { industries } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function IndustriesServed() {
  return (
    <Section id="industries">
      <SectionHeading
        align="center"
        eyebrow="Industries"
        title="Depth across the sectors that run on software."
        description="We adapt our engineering to the realities of your industry — its regulations, its data and its pace."
      />

      <RevealGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {industries.map((ind) => (
          <RevealItem key={ind.name} className="h-full">
            <Card interactive className="flex h-full flex-col p-6">
              <IconChip name={ind.icon} tone="brand" size="md" />
              <h3 className="heading-sm mt-4 text-fg">{ind.name}</h3>
              <p className="body-sm mt-1.5">{ind.description}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
