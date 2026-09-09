import type { LucideIcon } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import Button from "@/components/ui/Button";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  ArrowRight,
  Clock,
  Headset,
  HeartHandshake,
  ListChecks,
} from "@/components/ui/icons";
import ClientCareIllustration from "@/components/illustrations/ClientCareIllustration";

const HEADING = {
  eyebrow: "How we care",
  title: "A partner you can reach, not a vendor you chase.",
  description:
    "Every message gets a considered reply within one business day. Everything we run in production is backed by a written SLA. And we tell you the truth about scope, timelines and trade-offs — even when it isn't what you hoped to hear.",
} as const;

interface CarePoint {
  title: string;
  body: string;
  icon: LucideIcon;
}

const CARE_POINTS: CarePoint[] = [
  {
    title: "One-business-day response",
    body: "A person — not a ticket queue or a bot — replies to every message within one business day, with a real answer or a real plan.",
    icon: Headset,
  },
  {
    title: "SLA-backed support",
    body: "Production systems are covered by written SLAs for uptime, response and resolution, with monitoring that alerts us before you notice.",
    icon: Clock,
  },
  {
    title: "A named senior engineer",
    body: "You get one senior engineer who knows your system, stays on the account and answers for it — not a rotating help desk.",
    icon: HeartHandshake,
  },
  {
    title: "Transparent reporting",
    body: "Clear scope, honest timelines and regular reports on what shipped, what it cost and what comes next. No surprises.",
    icon: ListChecks,
  },
];

const STATS = [
  { value: "< 1 day", label: "First response" },
  { value: "99.9%", label: "Production uptime" },
  { value: "Years", label: "Not months" },
] as const;

const CTA = { label: "Talk to us", href: "/contact" } as const;

export default function ClientCare() {
  return (
    <Section id="client-care">
      <SectionHeading
        eyebrow={HEADING.eyebrow}
        title={HEADING.title}
        description={HEADING.description}
      />

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <Reveal
          direction="right"
          className="mx-auto w-full max-w-[34rem] lg:mx-0"
        >
          <ClientCareIllustration />
        </Reveal>

        <div>
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {CARE_POINTS.map(({ title, body, icon: PointIcon }) => (
              <RevealItem key={title} className="h-full">
                <Card interactive className="flex h-full flex-col">
                  <IconChip tone="brand">
                    <PointIcon width={20} height={20} />
                  </IconChip>
                  <h3 className="heading-sm mt-5 text-fg">{title}</h3>
                  <p className="body-sm mt-2">{body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-muted">{s.label}</dt>
                  <dd className="heading-sm text-fg">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <Button variant="outline" href={CTA.href}>
                {CTA.label}
                <ArrowRight width={18} height={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
