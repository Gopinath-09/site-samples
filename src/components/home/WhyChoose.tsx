"use client";

import { useEffect, useRef, useState } from "react";
import { differentiators } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Why COBRR, as a pinned heading against a scrolling list.
 *
 * The left column stays put while the seven points move past it, so the
 * heading has time to land and the reader always knows where they are in the
 * set. Only the point crossing the middle of the viewport is lit; the rest are
 * held back, which turns a list that would otherwise be read all at once into
 * one that is read in order.
 *
 * The active point is found with an IntersectionObserver rather than a scroll
 * handler, so nothing runs on the main thread between intersections. The root
 * margin crops the viewport to a narrow band across its middle, which means at
 * most one point qualifies at a time and "active" needs no distance maths.
 */
export default function WhyChoose() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = items.current.indexOf(entry.target as HTMLElement);
          if (i !== -1) setActive(i);
        }
      },
      // Only the middle 10% of the viewport counts as "here".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const observed = items.current.filter(Boolean) as HTMLElement[];
    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section bg-sand" id="why-cobrr">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-24">
        {/* Pinned side */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">Why COBRR</span>
          <h2 className="heading-lg mt-5 text-balance text-fg">
            The difference is in how we work.
          </h2>
          <p className="body mt-6 max-w-sm leading-relaxed text-muted">
            Seven things we hold to. None of them is a number we cannot show
            you.
          </p>

          {/* Position in the set, and how far through it we are */}
          <div className="mt-10 hidden items-center gap-4 lg:flex">
            <span className="mono-figure text-sm text-fg">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="relative h-px flex-1 bg-line">
              <span
                className="absolute inset-y-0 left-0 bg-brand transition-[width] duration-500 ease-out"
                style={{
                  width: `${((active + 1) / differentiators.length) * 100}%`,
                }}
              />
            </span>
            <span className="mono-figure text-sm text-muted">
              {String(differentiators.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Scrolling side */}
        <ol className="space-y-16 lg:space-y-24">
          {differentiators.map((d, i) => (
            <li
              key={d.label}
              ref={(el) => {
                items.current[i] = el;
              }}
              className={cn(
                "border-t pt-8 transition-all duration-500 ease-out",
                i === active
                  ? "border-brand/60 opacity-100"
                  : "border-line opacity-45",
              )}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={cn(
                    "mono-figure text-sm transition-colors duration-500",
                    i === active ? "text-brand" : "text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono-label">{d.label}</span>
              </div>

              <h3 className="heading-md mt-5 text-balance font-medium leading-snug tracking-[-0.01em] text-fg">
                {d.title}
              </h3>
              <p className="body mt-4 max-w-2xl leading-relaxed text-muted">
                {d.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
