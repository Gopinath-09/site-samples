import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import Button from "@/components/ui/Button";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import TechStackIllustration from "@/components/illustrations/TechStackIllustration";
import { ArrowRight, Check } from "@/components/ui/icons";

const pillars = [
  "Enterprise software & platforms",
  "Applied AI & automation",
  "Cloud & DevOps engineering",
  "Product design & modernisation",
];

const proofPoints: [label: string, value: string][] = [
  ["Uptime", "99.9%"],
  ["Deploys / week", "40+"],
  ["Test coverage", "90%+"],
];

export default function CompanyOverview() {
  return (
    <Section id="overview">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
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
                className="flex items-center gap-3 text-sm font-medium text-fg"
              >
                <IconChip tone="brand" size="xs">
                  <Check width={14} height={14} />
                </IconChip>
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

        {/* Layered platform illustration — the stack every engagement is built on */}
        <Reveal direction="left">
          <div className="relative">
            <div className="bg-grid absolute -inset-4 rounded-panel opacity-70" aria-hidden />
            <Card padding="lg" className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="pill">Platform architecture</span>
                <span className="font-mono text-xs text-muted">layered · observable</span>
              </div>
              <TechStackIllustration className="mt-6" />
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-6 text-center">
                {proofPoints.map(([k, v]) => (
                  <div key={k}>
                    <div className="text-lg font-semibold text-fg">{v}</div>
                    <div className="text-xs text-muted">{k}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
