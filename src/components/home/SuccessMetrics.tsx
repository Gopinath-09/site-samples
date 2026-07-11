import { metrics } from "@/lib/content";
import StatCounter from "@/components/ui/StatCounter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function SuccessMetrics() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white">
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-brand)" }}
        aria-hidden
      />
      <div className="relative container-page">
        <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((m) => (
            <RevealItem key={m.label} className="text-center">
              <div className="text-5xl font-semibold tracking-tight md:text-6xl">
                <StatCounter
                  value={m.value}
                  suffix={m.suffix}
                  prefix={m.prefix}
                  decimals={m.decimals}
                />
              </div>
              <p className="mt-3 text-sm text-muted-dark">{m.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
