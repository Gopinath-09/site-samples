"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { problemsWeSolve } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { EASE } from "@/components/ui/Reveal";
import ProblemDiagram from "@/components/graphics/ProblemDiagram";

/**
 * Positioning, staged one problem at a time.
 *
 * The section is four viewports tall and its contents pin to the middle one, so
 * scrolling through it advances the stage rather than moving the page. Each
 * change masks the old statement out and the new one in, rolls the number over
 * and fills the rail. Giving one problem the whole stage is what lets the type
 * run this large — and at this size the statement reads as something said
 * rather than something listed.
 *
 * The plain list is not a fallback bolted on afterwards; it is what renders
 * first. The server has no viewport and no motion preference to read, so it
 * emits every problem as ordinary stacked content, which is also what a crawler
 * and a reader with no JavaScript get. The stage replaces it only once the
 * client confirms a wide screen and no request for reduced motion — a pinned
 * section that hijacks four screens of scrolling is precisely what someone
 * asking for reduced motion is asking to avoid.
 */
export default function ProblemsWeSolve() {
  /*
   * Both branches attach this. `useScroll` measures its target when it is set
   * up, and does not re-measure when a ref goes from null to an element — so
   * putting the ref only on the staged markup left it tracking nothing, and the
   * stage never advanced past the first problem.
   */
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [staged, setStaged] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setStaged(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!staged) return;
    // The last panel would only be reached exactly at v === 1, so clamp.
    const i = Math.min(problemsWeSolve.length - 1, Math.floor(v * problemsWeSolve.length));
    setActive(i);
  });

  const heading = (
    <SectionHeading
      eyebrow="Problems we solve"
      title="Building software is hard. Choosing who builds it shouldn't be."
      description="Most people arrive with one of these. If yours is not here, it is usually a version of one that is."
    />
  );

  /* Stacked list: the server render, and what narrow or reduced-motion gets. */
  if (!staged) {
    return (
      <section ref={sectionRef} className="section bg-sand" id="problems">
        <div className="container-page">
          {heading}
          <div className="mt-14 border-t border-line">
            {problemsWeSolve.map((p, i) => (
              <article key={p.question} className="border-b border-line py-10">
                <span className="mono-figure text-sm text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-md mt-4 text-balance text-fg">
                  {p.question}
                </h3>
                <p className="body mt-4 max-w-2xl leading-relaxed text-muted">
                  {p.answer}
                </p>
                <Button variant="outline" size="sm" href={p.href} className="mt-6">
                  {p.ctaLabel}
                  <ArrowRight width={16} height={16} />
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const current = problemsWeSolve[active];

  return (
    <section
      ref={sectionRef}
      id="problems"
      className="relative bg-sand"
      style={{ height: `${problemsWeSolve.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-page">
          {heading}

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="min-w-0">
            {/* The counter rolls as the stage advances */}
            <div className="relative mb-6 h-14 w-24 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mono-figure absolute inset-0 text-5xl font-medium leading-none text-brand"
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>

              {/* Statement — masked out and in on every change */}
              <div className="overflow-hidden pb-[0.12em]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h3
                    key={active}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="heading-lg max-w-3xl text-balance text-fg"
                  >
                    {current.question}
                  </motion.h3>
                </AnimatePresence>
              </div>

              {/* Answer and action follow a beat behind the statement */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
                >
                  <p className="body mt-8 max-w-2xl leading-relaxed text-muted">
                    {current.answer}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    href={current.href}
                    className="mt-9"
                  >
                    {current.ctaLabel}
                    <ArrowRight width={16} height={16} />
                  </Button>
                </motion.div>
              </AnimatePresence>

              {/* Rail: where you are, and how much is left */}
              <div className="mt-14 flex items-center gap-4">
                <span className="relative h-px flex-1 bg-line">
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-brand"
                    animate={{
                      width: `${((active + 1) / problemsWeSolve.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
                <span className="mono-figure text-sm text-muted">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(problemsWeSolve.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/*
              The figure. Keyed on the active problem so React remounts it and
              the drawing replays, which is cheaper than teaching every shape an
              exit state it would only use once.
            */}
            <div className="hidden aspect-4/3 w-full lg:block">
              <ProblemDiagram key={active} kind={current.diagram} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
