"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { verifiedProjects, placeholderClips, type PortfolioProject } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import HoverMedia from "@/components/ui/HoverMedia";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight, Check, Close } from "@/components/ui/icons";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";

/**
 * Delivered work, as expandable cards.
 *
 * At rest this is the same wall of cells as before. Clicking one promotes it
 * into a dialog through a shared-layout transition: the card itself travels to
 * the centre and grows, rather than a separate modal fading in over the top.
 * Framer Motion does this by matching `layoutId` between the two trees, so
 * every shared element needs an id unique to *this* section as well as to the
 * project — hence the `useId` prefix, which keeps a second instance of this
 * component on the same page from animating into the first one's cards.
 *
 * The expanded state carries what the cell has no room for — features,
 * outcome, stack — and still links through to the full case study, so the
 * dialog is a preview rather than a replacement for the page.
 *
 * Dismissal is deliberately over-provided: Escape, the close button, and a
 * press anywhere outside. A dialog that traps someone because they did not
 * find the one affordance that closes it is worse than no dialog.
 */
export default function FeaturedProjects({
  limit,
  showHeading = true,
}: {
  limit?: number;
  /** The portfolio page brings its own page header, so it suppresses this one. */
  showHeading?: boolean;
}) {
  const list = limit ? verifiedProjects.slice(0, limit) : verifiedProjects;
  const [active, setActive] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const uid = useId().replace(/:/g, "");

  const close = useCallback(() => setActive(null), []);
  useOutsideClick(dialogRef, close, active !== null);

  /* Escape closes; the page behind is locked so it cannot scroll away. */
  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* Move focus into the dialog so the keyboard is not left behind it. */
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active, close]);

  if (list.length === 0) return null;

  return (
    <section
      className="section border-b border-line/60 bg-paper"
      id="featured-projects"
    >
      <div className="container-page">
        {showHeading && (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Systems we have built and delivered."
              description="Learning platforms, tourism and school systems, clinic software and AI assistants — each one running for the organisation it was built for. Open any card for the detail."
            />
            <Button variant="outline" href="/portfolio" className="shrink-0">
              View full portfolio
              <ArrowRight width={18} height={18} />
            </Button>
          </div>
        )}

        {/* ---------------- Grid at rest ---------------- */}
        <RevealGroup
          className={cn(
            "grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3",
            showHeading && "mt-14",
          )}
        >
          {list.map((proj, i) => (
            <RevealItem key={proj.slug}>
              <motion.article
                layoutId={`${uid}-card-${proj.slug}`}
                onClick={() => setActive(proj)}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(proj);
                  }
                }}
                className="group relative flex h-full min-h-76 cursor-pointer flex-col justify-between overflow-hidden bg-paper p-7 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
              >
                <HoverMedia
                  seed={i}
                  video={proj.video ?? placeholderClips[i % placeholderClips.length]}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="mono-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono-label text-right">
                    {proj.industry.split("/")[0].trim()}
                  </span>
                </div>

                <div className="relative mt-10">
                  {proj.client && (
                    <motion.span
                      layoutId={`${uid}-client-${proj.slug}`}
                      className="mono-label block text-brand/80"
                    >
                      {proj.client}
                    </motion.span>
                  )}
                  <motion.h3
                    layoutId={`${uid}-title-${proj.slug}`}
                    className={cn(
                      "text-lg font-semibold leading-snug text-fg",
                      proj.client && "mt-2",
                    )}
                  >
                    {proj.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`${uid}-summary-${proj.slug}`}
                    className="body-sm mt-2.5 line-clamp-3 leading-relaxed text-muted"
                  >
                    {proj.summary}
                  </motion.p>
                </div>

                <div className="relative mt-7 flex items-end justify-between gap-4 border-t border-line pt-5">
                  <span className="text-[0.7rem] leading-relaxed text-muted">
                    {proj.status}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight width={15} height={15} />
                  </span>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* ---------------- Expanded dialog ---------------- */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[60] grid place-items-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            />

            <motion.div
              ref={dialogRef}
              layoutId={`${uid}-card-${active.slug}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${uid}-heading`}
              className="relative flex max-h-[88svh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl"
            >
              {/* Header band, tinted with the project's own accent */}
              <div
                className="relative shrink-0 border-b border-line p-7 sm:p-8"
                style={{
                  background: `linear-gradient(135deg, ${active.accent}14, transparent 70%)`,
                }}
              >
                <button
                  ref={closeRef}
                  onClick={close}
                  aria-label="Close project details"
                  className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line bg-paper text-muted transition-colors hover:border-fg/30 hover:text-fg"
                >
                  <Close width={16} height={16} />
                </button>

                <div className="flex flex-wrap items-center gap-2 pr-12">
                  <span className="pill text-[0.68rem]">{active.industry}</span>
                  <span className="pill text-[0.68rem]">{active.projectType}</span>
                </div>

                {active.client && (
                  <motion.span
                    layoutId={`${uid}-client-${active.slug}`}
                    className="mono-label mt-5 block text-brand/80"
                  >
                    {active.client}
                  </motion.span>
                )}

                <motion.h3
                  layoutId={`${uid}-title-${active.slug}`}
                  id={`${uid}-heading`}
                  className="heading-md mt-2 pr-12 font-semibold text-fg"
                >
                  {active.title}
                </motion.h3>

                <motion.p
                  layoutId={`${uid}-summary-${active.slug}`}
                  className="body mt-3 leading-relaxed text-muted"
                >
                  {active.summary}
                </motion.p>
              </div>

              {/* Detail — the part the cell has no room for */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.12 }}
                className="min-h-0 flex-1 overflow-y-auto p-7 sm:p-8"
              >
                <h4 className="mono-label">What it does</h4>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Check width={11} height={11} />
                      </span>
                      <span className="body-sm leading-snug text-fg">{f}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="mono-label mt-8">Why it matters</h4>
                <p className="body-sm mt-3 leading-relaxed text-muted">
                  {active.benefits}
                </p>

                {active.technologies && active.technologies.length > 0 && (
                  <>
                    <h4 className="mono-label mt-8">Stack</h4>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {active.technologies.map((t) => (
                        <li key={t} className="pill text-[0.68rem]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="mono-label mt-8">Status</h4>
                <p className="body-sm mt-3 leading-relaxed text-muted">
                  {active.status}
                </p>
              </motion.div>

              {/* Footer action */}
              <div className="shrink-0 border-t border-line bg-sand/60 p-5">
                <Button
                  variant="dark"
                  size="sm"
                  href={`/portfolio/${active.slug}`}
                  className="w-full sm:w-auto"
                >
                  Read the full case study
                  <ArrowUpRight width={15} height={15} />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
