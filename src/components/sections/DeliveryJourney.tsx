"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { motion as motionTokens } from "@/lib/tokens";
import {
  JourneyPath,
  STAGE_PROGRESS,
  type JourneyLabels,
  type Methodology,
} from "@/components/illustrations/JourneyPath";

/* ==========================================================================
   DeliveryJourney — "how we plan, build and maintain software".

   Desktop: a sticky left column (heading, methodology switch, the active
   stage's detail) beside a tall right column where the route draws as you
   scroll. Mobile: the heading and switch stack above the same drawn route,
   which carries its own stage labels.

   Scroll linkage: one `useScroll` on the two-column wrapper. Its progress
   drives every path's `pathLength`; crossing a STAGE_PROGRESS threshold
   lights the node and activates the matching stage card. With reduced
   motion the route renders fully drawn and nothing is scroll-linked.
   ========================================================================== */

/* ---------- Copy ---------- */

interface Stage {
  id: string;
  title: string;
  /** One-liner beside the node on desktop. */
  hint: string;
  description: string;
  /** Cadence line — changes with the methodology. */
  cadence: Record<Methodology, string>;
  deliverables: Record<Methodology, readonly [string, string, string]>;
}

const stages: readonly Stage[] = [
  {
    id: "discover",
    title: "Discover",
    hint: "Goals, constraints, success metrics",
    description:
      "We map goals, constraints and the metrics that define success, then choose an architecture and a delivery plan you can hold us to.",
    cadence: {
      agile: "Weeks 1–2 · discovery sprint",
      waterfall: "Phase 1 · requirements sign-off",
    },
    deliverables: {
      agile: ["Discovery report", "Architecture options", "Delivery plan"],
      waterfall: ["Requirements specification", "Architecture options", "Fixed-scope plan"],
    },
  },
  {
    id: "design",
    title: "Design",
    hint: "Product design and architecture, together",
    description:
      "Product design and system architecture move together, so every screen has a data model behind it and every service has a reason to exist.",
    cadence: {
      agile: "Sprints 1–2 · design runs one sprint ahead",
      waterfall: "Phase 2 · design sign-off",
    },
    deliverables: {
      agile: ["UX flows", "System design", "Data model"],
      waterfall: ["UX flows", "System design", "Data model"],
    },
  },
  {
    id: "build",
    title: "Build",
    hint: "Small tested increments, CI/CD from day one",
    description:
      "Small, tested increments land on a CI/CD pipeline from day one, so you see working software early and the release is never a surprise.",
    cadence: {
      agile: "Every sprint · demo every two weeks",
      waterfall: "Phase 3 · build-complete milestone",
    },
    deliverables: {
      agile: ["Working software every sprint", "Automated tests", "Observability"],
      waterfall: ["Build-complete milestone", "Automated tests", "Observability"],
    },
  },
  {
    id: "launch",
    title: "Launch",
    hint: "Hardening, load testing, cut-over with a runbook",
    description:
      "Hardening, load testing and a rehearsed cut-over with a runbook — so go-live is a checklist, not a leap of faith.",
    cadence: {
      agile: "Release train · go-live when ready",
      waterfall: "Phase 4 · acceptance and go-live sign-off",
    },
    deliverables: {
      agile: ["Security review", "Runbook", "Zero-downtime release"],
      waterfall: ["Security review", "Runbook", "Zero-downtime release"],
    },
  },
  {
    id: "maintain",
    title: "Maintain",
    hint: "Monitoring, patching, tuning, continuous improvement",
    description:
      "Monitoring, patching, performance tuning and continuous improvement — the platform keeps getting better long after launch.",
    cadence: {
      agile: "Ongoing · roadmap evolves every sprint",
      waterfall: "Ongoing · change requests through gates",
    },
    deliverables: {
      agile: ["SLA support", "Security patching", "Roadmap evolution"],
      waterfall: ["SLA support", "Security patching", "Change-request roadmap"],
    },
  },
];

const methodologies: Record<Methodology, { label: string; description: string }> = {
  agile: {
    label: "Agile",
    description:
      "Work ships in two-week sprints with a demo at the end of each one. Priorities can shift between sprints, and continuous delivery keeps working software in your hands from the first month.",
  },
  waterfall: {
    label: "Waterfall",
    description:
      "Phases run in sequence, each closed by a formal sign-off gate. Scope, schedule and budget are fixed up front — the right fit for regulated programmes and procurement-led projects.",
  },
};

/** Sign-off names for the four waterfall gates (between consecutive stages). */
const gates = ["Requirements", "Design", "Acceptance", "Go-live"] as const;

const journeyLabels: JourneyLabels = {
  start: "First conversation",
  stages: stages.map((s) => ({ title: s.title, hint: s.hint })),
  sprints: { title: "Sprint loops", hint: "Demo every two weeks" },
  gates,
  loop: ["Monitor", "Patch", "Improve"],
};

const loopCaption = "monitor → patch → improve, on repeat";

const ease = motionTokens.easeOutExpo;
const stageIndex = (v: number) => {
  let i = 0;
  for (let k = 0; k < STAGE_PROGRESS.length; k++) if (v >= STAGE_PROGRESS[k]) i = k;
  return i;
};

/* ---------- Pieces ---------- */

function MethodologySwitch({
  mode,
  onChange,
}: {
  mode: Methodology;
  onChange: (m: Methodology) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Delivery methodology"
      className="inline-flex rounded-full border border-line bg-paper p-1 shadow-card"
    >
      {(Object.keys(methodologies) as Methodology[]).map((m) => {
        const on = m === mode;
        return (
          <button
            key={m}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(m)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              on ? "text-paper" : "text-muted hover:text-fg",
            )}
          >
            {on && (
              <motion.span
                layoutId="delivery-methodology-pill"
                className="absolute inset-0 rounded-full bg-fg"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{methodologies[m].label}</span>
          </button>
        );
      })}
    </div>
  );
}

function StageCard({
  stage,
  index,
  mode,
  gate,
}: {
  stage: Stage;
  index: number;
  mode: Methodology;
  /** Waterfall sign-off that closes this stage (mobile only). */
  gate?: string;
}) {
  const last = index === stages.length - 1;
  return (
    <Card padding="sm">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="font-mono text-xs tabular-nums text-brand">
          {String(index + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            className="text-xs font-medium text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {stage.cadence[mode]}
          </motion.span>
        </AnimatePresence>
      </div>
      <h3 className="heading-sm mt-3 text-fg">{stage.title}</h3>
      <p className="body-sm mt-2">{stage.description}</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={mode}
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {stage.deliverables[mode].map((d) => (
            <li key={d} className="pill">
              {d}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
      {(gate || last) && (
        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          {gate ? (
            <Badge tone="brand">Sign-off · {gate}</Badge>
          ) : (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {loopCaption}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}

/* ---------- Section ---------- */

export default function DeliveryJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [mode, setMode] = useState<Methodology>("agile");
  const [scrolled, setScrolled] = useState(0);
  // A stage chosen from the stepper stays active until scrolling moves on.
  const [picked, setPicked] = useState<{ index: number; when: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 70%", "end 60%"],
  });
  const complete = useMotionValue(1);
  const progress = reduced ? complete : scrollYProgress;
  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(stageIndex(v)));

  const lit = reduced ? stages.length - 1 : scrolled;
  const active = picked && picked.when === scrolled ? picked.index : scrolled;

  return (
    <Section id="delivery" grid>
      <div
        ref={wrapRef}
        className="grid gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-16"
      >
        {/* ---- Left: sticky narrative. The heading and the methodology
             switch show at every width; only the per-stage detail below them
             is desktop-only. ---- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="How we deliver"
            title="First talk to lifetime"
            description="We don't just build and launch your software, We stay to make it continuously better."
          />

          <Reveal delay={0.1} className="mt-8">
            <p className="text-sm font-semibold text-fg">We work in your methodology.</p>
            <div className="mt-3">
              <MethodologySwitch mode={mode} onChange={setMode} />
            </div>
            <div className="mt-4 min-h-18">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={mode}
                  className="body-sm max-w-md"
                  initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {methodologies[mode].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Active stage detail + stepper — desktop only; on mobile the drawn
              route carries the stage labels itself. */}
          <div className="mt-6 hidden lg:block">
            <div className="grid">
              {stages.map((s, i) => {
                const on = i === active;
                return (
                  <motion.div
                    key={s.id}
                    className="[grid-area:1/1]"
                    aria-hidden={!on}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, y: on || reduced ? 0 : 8 }}
                    transition={{ duration: 0.45, ease }}
                    style={{ pointerEvents: on ? "auto" : "none", zIndex: on ? 1 : 0 }}
                  >
                    <StageCard stage={s} index={i} mode={mode} />
                  </motion.div>
                );
              })}
            </div>

            <ol className="mt-2 flex gap-2" aria-label="Delivery stages">
              {stages.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.id} className="flex-1">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPicked({ index: i, when: scrolled })}
                      className="group flex w-full flex-col gap-2 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      <span
                        className={cn(
                          "h-0.5 w-full rounded-full transition-colors duration-500",
                          i <= lit ? "bg-brand" : "bg-line group-hover:bg-muted",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium transition-colors duration-500",
                          on ? "text-fg" : "text-muted group-hover:text-fg",
                        )}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ---- The drawn route: the whole section on mobile, the right-hand
             column on desktop. ---- */}
        <div>
          <JourneyPath
            mode={mode}
            progress={progress}
            lit={lit}
            active={active}
            labels={journeyLabels}
          />
        </div>
      </div>

      <Reveal className="mt-16 flex flex-wrap items-center gap-3 lg:mt-20">
        <Button variant="primary" size="lg" href="/contact">
          Plan your project
          <ArrowRight width={18} height={18} />
        </Button>
        <Button variant="outline" size="lg" href="/services">
          See all services
        </Button>
      </Reveal>
    </Section>
  );
}
