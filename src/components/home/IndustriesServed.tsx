"use client";

import { useState } from "react";
import { industries, verifiedProjects } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { ArrowRight, Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Industries, as a tabbed panel.
 *
 * Replaces a flat wall of ten identical cards, which said only that we have
 * heard of these sectors. Each tab now answers the question a visitor from that
 * sector is actually asking: what goes wrong here, and what do you do about it.
 *
 * The reference puts a screenshot beside the two lists. There is none to put
 * here, so the panel gives that column to the sector's headline and its proof
 * link instead — which is the more useful thing anyway, since it is the only
 * part a visitor can go and verify.
 */
export default function IndustriesServed() {
  const [active, setActive] = useState(0);
  const ind = industries[active];

  const proof = ind.proof
    ? verifiedProjects.find((p) => p.slug === ind.proof)
    : undefined;

  return (
    <section className="section bg-sand" id="industries">
      <div className="container-page">
        <SectionHeading
          eyebrow="Key industries"
          title="Our areas of expertise."
          description="Ten sectors we build for. Pick yours to see what usually goes wrong in it, and what we do about that."
        />

        {/* Tab row */}
        <div
          role="tablist"
          aria-label="Industries"
          className="mt-12 flex flex-wrap gap-2 border-b border-line pb-6"
        >
          {industries.map((item, i) => (
            <button
              key={item.name}
              role="tab"
              id={`industry-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`industry-panel-${i}`}
              onClick={() => setActive(i)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200",
                i === active
                  ? "border-brand bg-brand text-ink"
                  : "border-line bg-paper text-muted hover:border-fg hover:text-fg",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`industry-panel-${active}`}
          aria-labelledby={`industry-tab-${active}`}
          /* Keyed on the industry so React remounts it, which replays the
             entrance rather than swapping text inside a static box. */
          key={ind.name}
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16"
        >
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper text-brand">
              <Icon name={ind.icon} width={20} height={20} />
            </span>
            <h3 className="heading-md mt-6 text-balance text-fg">
              {ind.headline}
            </h3>
            <p className="body mt-4 leading-relaxed text-muted">
              {ind.description}
            </p>

            {proof ? (
              <Button
                variant="outline"
                size="sm"
                href={`/portfolio/${proof.slug}`}
                className="mt-7"
              >
                See {proof.title}
                <ArrowRight width={16} height={16} />
              </Button>
            ) : (
              /* No delivered platform is cleared for this sector yet. Saying so
                 is better than a link that implies work we cannot point at. */
              <p className="mono-label mt-7">
                No published case study in this sector yet
              </p>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <h4 className="heading-md mono-label border-b border-line pb-3">
                Challenges
              </h4>
              <ul className="mt-5 space-y-4">
                {ind.challenges.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="heading-md mono-label border-b border-line pb-3">
                How we solve them
              </h4>
              <ul className="mt-5 space-y-4">
                {ind.solutions.map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-fg">
                    <Check
                      width={15}
                      height={15}
                      className="mt-1 shrink-0 text-brand"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
