import { metrics } from "@/lib/content";
import Section from "@/components/ui/Section";
import StatCounter from "@/components/ui/StatCounter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function SuccessMetrics() {
  return (
    <Section padded={false} className="border-y border-line py-20">
      <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {metrics.map((m) => (
          <RevealItem key={m.label} className="text-center">
            <div className="text-5xl font-semibold tracking-tight text-fg md:text-6xl">
              <StatCounter
                value={m.value}
                suffix={m.suffix}
                prefix={m.prefix}
                decimals={m.decimals}
              />
            </div>
            <p className="mt-3 text-sm text-muted">{m.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
