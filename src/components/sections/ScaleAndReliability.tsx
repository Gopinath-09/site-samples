import type { LucideIcon } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import IconChip from "@/components/ui/IconChip";
import Button from "@/components/ui/Button";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Activity, ArrowRight, Boxes, Server } from "@/components/ui/icons";
import ScaleIllustration from "@/components/illustrations/ScaleIllustration";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: readonly string[];
}

const heading = {
  eyebrow: "Built for scale",
  title: "Horizontal, vertical and highly available — by design.",
  description:
    "Capacity that grows with demand and an architecture that keeps serving when a zone goes dark. Elastic by default, resilient by design.",
} as const;

const features: readonly Feature[] = [
  {
    icon: Server,
    title: "Scale out",
    description:
      "Stateless services behind a load balancer, so capacity grows by adding replicas. Automatically, the moment traffic asks for it.",
    tags: ["Auto-scaling", "Stateless services"],
  },
  {
    icon: Boxes,
    title: "Scale up",
    description:
      "Right-sized compute for the workloads that need it, with vertical headroom planned in from day one. No surprise ceilings.",
    tags: ["Right-sized compute", "Vertical headroom"],
  },
  {
    icon: Activity,
    title: "Stay up",
    description:
      "Multi-zone deployments with continuous health checks and automatic failover, so a single failure never becomes an outage.",
    tags: ["Multi-zone", "99.9% uptime SLA", "Zero-downtime deploys"],
  },
];

const ctas = {
  primary: { label: "Cloud engineering", href: "/services/cloud-engineering" },
  secondary: { label: "Maintenance & support", href: "/services/maintenance-support" },
} as const;

/**
 * Three scaling principles paired with the composed ScaleIllustration. The
 * illustration comes first on mobile (it sets the scene) and moves to the
 * right column from `lg` up.
 */
export default function ScaleAndReliability() {
  return (
    <Section grid glow="top" id="scale">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <Reveal direction="left" className="lg:order-last">
          <ScaleIllustration className="mx-auto max-w-2xl" />
        </Reveal>

        <RevealGroup className="flex flex-col">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <RevealItem
                key={feature.title}
                className="flex gap-5 border-t border-line py-7 first:border-t-0 first:pt-0 last:pb-0"
              >
                <IconChip tone="brand">
                  <FeatureIcon width={20} height={20} />
                </IconChip>
                <div className="min-w-0">
                  <h3 className="heading-sm text-fg">{feature.title}</h3>
                  <p className="body-sm mt-2 max-w-md">{feature.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <li key={tag} className="pill">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      <Reveal className="mt-14 flex flex-wrap gap-3 lg:mt-16">
        <Button href={ctas.primary.href}>
          {ctas.primary.label}
          <ArrowRight width={18} height={18} />
        </Button>
        <Button variant="outline" href={ctas.secondary.href}>
          {ctas.secondary.label}
        </Button>
      </Reveal>
    </Section>
  );
}
