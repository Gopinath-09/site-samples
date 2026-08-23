"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";

interface Capability {
  id: string;
  label: string;
  context: string;
  href: string;
}

/** Sidebar entries in the console mock — each links to its service page. */
const capabilities: Capability[] = [
  { id: "ai", label: "AI Solutions", context: "LLM copilots, RAG & automation", href: "/services/ai-solutions" },
  { id: "web", label: "Web Development", context: "Portals, platforms & design systems", href: "/services/web-applications" },
  { id: "saas", label: "SaaS Platforms", context: "Multi-tenant products & billing", href: "/products" },
  { id: "cloud", label: "Cloud & DevOps", context: "IaC, CI/CD & observability", href: "/services/cloud-engineering" },
  { id: "support", label: "Managed Support", context: "SLA-backed operations", href: "/services/maintenance-support" },
];

const metrics = [
  { label: "Uptime", value: "99.99%" },
  { label: "p95 latency", value: "34ms" },
  { label: "Deploys / mo", value: "128" },
];

const activity = [
  { label: "Deployment", detail: "production · succeeded" },
  { label: "Test suite", detail: "248 passed · 0 failed" },
  { label: "Security scan", detail: "0 critical findings" },
];

/** Fixed sparkline sample — a plausible throughput curve, not random noise. */
const trend = [12, 18, 15, 24, 21, 30, 27, 36, 33, 42, 39, 48];

const ROTATE_MS = 3800;

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const active = capabilities[index];

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % capabilities.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [paused, reduced]);

  const select = useCallback((i: number) => setIndex(i), []);

  /* Sparkline geometry on a 100×32 box */
  const max = Math.max(...trend);
  const points = trend
    .map((v, i) => `${(i / (trend.length - 1)) * 100},${32 - (v / max) * 28}`)
    .join(" ");

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* ---------- Backdrop ---------- */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(110%_85%_at_72%_0%,#16224a_0%,#0c1024_45%,#0a0e1a_100%)]" />
        <div className="bg-grid-dark absolute inset-0 opacity-35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div
        className="relative container-page grid items-start gap-16 pb-24 pt-36 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:pb-28 lg:pt-40"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ================= Left — deliberately spare ================= */}
        <div className="lg:pt-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Enterprise Software Engineering
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.035em] md:text-5xl lg:text-6xl"
          >
            Software your business can bet on.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/60"
          >
            AI, web, cloud and SaaS platforms — built and operated by senior
            engineers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button variant="light" size="lg" href="/contact">
              Book a consultation
              <ArrowRight width={18} height={18} />
            </Button>
            <Button variant="ghost-light" size="lg" href="/portfolio">
              View our work
            </Button>
          </motion.div>
        </div>

        {/* ================= Right — platform console ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Offset frame for depth */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-white/10"
          />

          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-ink-soft/90 shadow-2xl backdrop-blur-sm">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/4 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3 truncate font-mono text-[0.7rem] text-white/40">
                console.cobrr.dev
              </span>
              <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[0.65rem] text-white/40">
                  all systems operational
                </span>
              </span>
            </div>

            <div className="grid sm:grid-cols-[10.5rem_1fr]">
              {/* Sidebar — capabilities */}
              <nav
                aria-label="Capabilities"
                className="border-b border-white/10 p-3 sm:border-b-0 sm:border-r"
              >
                <span className="block px-2 pb-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
                  Capabilities
                </span>
                <ul className="flex gap-1 overflow-x-auto sm:block sm:space-y-0.5 sm:overflow-visible">
                  {capabilities.map((c, i) => {
                    const isActive = i === index;
                    return (
                      <li key={c.id} className="shrink-0 sm:shrink">
                        <button
                          onClick={() => select(i)}
                          onMouseEnter={() => select(i)}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium whitespace-nowrap transition-colors duration-200",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-white/45 hover:bg-white/5 hover:text-white/75",
                          )}
                        >
                          <span
                            className={cn(
                              "h-1 w-1 shrink-0 rounded-full transition-colors",
                              isActive ? "bg-brand" : "bg-white/25",
                            )}
                          />
                          {c.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Main panel */}
              <div className="p-5">
                {/* Context line for the selected capability */}
                <div className="flex min-h-10 items-start justify-between gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-sm font-semibold text-white">
                        {active.label}
                      </h2>
                      <p className="mt-0.5 text-xs text-white/45">
                        {active.context}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <Button
                    variant="ghost-light"
                    size="sm"
                    href={active.href}
                    className="shrink-0"
                  >
                    Open
                  </Button>
                </div>

                {/* Metric tiles */}
                <dl className="mt-5 grid grid-cols-3 gap-2.5">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-white/10 bg-white/4 p-3"
                    >
                      <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-white/35">
                        {m.label}
                      </dt>
                      <dd className="mt-1.5 text-base font-bold tracking-tight text-white">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Throughput sparkline */}
                <div className="mt-4 rounded-lg border border-white/10 bg-white/4 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/35">
                      Release throughput
                    </span>
                    <span className="font-mono text-[0.6rem] text-emerald-400">
                      +18%
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 100 32"
                    preserveAspectRatio="none"
                    className="mt-2.5 h-12 w-full"
                    aria-hidden
                  >
                    <motion.polyline
                      points={points}
                      fill="none"
                      stroke="var(--color-brand)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      initial={reduced ? undefined : { pathLength: 0 }}
                      animate={reduced ? undefined : { pathLength: 1 }}
                      transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                    />
                  </svg>
                </div>

                {/* Pipeline activity */}
                <ul className="mt-4 space-y-1.5">
                  {activity.map((a) => (
                    <li
                      key={a.label}
                      className="flex items-center gap-2.5 rounded-lg border border-white/8 px-3 py-2"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <Check width={10} height={10} />
                      </span>
                      <span className="text-xs font-medium text-white/80">
                        {a.label}
                      </span>
                      <span className="ml-auto truncate font-mono text-[0.65rem] text-white/35">
                        {a.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Floating status card — the standard layered-UI hero detail */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-xl border border-white/12 bg-ink/95 px-4 py-3 shadow-2xl backdrop-blur-sm md:flex"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
              <Check width={15} height={15} />
            </span>
            <div>
              <div className="text-xs font-semibold text-white">
                Build passed
              </div>
              <div className="font-mono text-[0.65rem] text-white/40">
                shipped in 2m 14s
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
