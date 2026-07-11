import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";

const pillars = [
  "Enterprise software & platforms",
  "Applied AI & automation",
  "Cloud & DevOps engineering",
  "Product design & modernisation",
];

export default function CompanyOverview() {
  return (
    <section className="section bg-paper">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <span className="eyebrow">Who we are</span>
          <Reveal>
            <h2 className="heading-lg mt-4 text-balance">
              A software engineering partner for the long term.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="lead mt-6">
              COBRR TECH LABS designs, builds and operates software that
              organisations depend on. We combine senior engineering, thoughtful
              architecture and honest partnership to deliver systems that stay
              fast, secure and maintainable long after launch.
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pillars.map((p) => (
              <RevealItem
                key={p}
                className="flex items-center gap-3 text-sm font-medium text-ink"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Check width={14} height={14} />
                </span>
                {p}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-9">
              <Button variant="dark" href="/about">
                More about COBRR
                <ArrowRight width={18} height={18} />
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Architectural illustration — layered geometric stack */}
        <Reveal direction="left">
          <div className="relative">
            <div className="bg-grid absolute -inset-4 rounded-3xl opacity-70" aria-hidden />
            <div className="card relative overflow-hidden p-8">
              <div className="flex items-center justify-between">
                <span className="pill">System architecture</span>
                <span className="font-mono text-xs text-muted">v2.4</span>
              </div>
              <div className="mt-8 space-y-3">
                {[
                  { label: "Experience layer", w: "100%", tone: "bg-ink" },
                  { label: "Application & APIs", w: "88%", tone: "bg-brand" },
                  { label: "Domain services", w: "74%", tone: "bg-brand/70" },
                  { label: "Data & events", w: "62%", tone: "bg-copper" },
                  { label: "Cloud infrastructure", w: "94%", tone: "bg-ink/80" },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="mb-1.5 flex justify-between text-xs font-medium text-muted">
                      <span>{r.label}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-sand-deep">
                      <div
                        className={`h-full rounded-full ${r.tone}`}
                        style={{ width: r.w }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-6 text-center">
                {[
                  ["Uptime", "99.9%"],
                  ["Deploys/wk", "40+"],
                  ["Coverage", "90%+"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-lg font-semibold text-ink">{v}</div>
                    <div className="text-xs text-muted">{k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
