"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  verifiedClients,
  verifiedProjects,
  industries,
} from "@/lib/content";
import StatCounter from "@/components/ui/StatCounter";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";

/**
 * Named clients.
 *
 * Two organisations have cleared us to use their name, so this is built as a
 * spotlight rather than a logo wall — a wall of two cells reads as an empty
 * wall, and padding it with unnamed clients would be the exact claim the proof
 * gate exists to prevent.
 *
 * Each card is drawn from the project record that names the client, so the
 * sector, the system and the link to the case study all come from one source
 * and cannot drift apart.
 *
 * The motion is layered rather than decorative: a conic-gradient ring turns
 * continuously behind each card, a soft spotlight tracks the cursor across it,
 * the figures count up when the section arrives, and the sectors we work in
 * run past underneath. The ring and the ticker are CSS animations, so they
 * cost nothing on the main thread; only the spotlight listens for events, and
 * it writes CSS custom properties rather than setting React state, so moving
 * the pointer never triggers a re-render.
 */

/** Projects whose client we are cleared to name, in record order. */
const namedEngagements = verifiedProjects.filter((p) => p.client);

function SpotlightCard({
  client,
  projectType,
  industry,
  summary,
  slug,
  index,
}: {
  client: string;
  projectType: string;
  industry: string;
  summary: string;
  slug: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* Write the pointer position straight to CSS vars — no state, no re-render. */
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div className="group relative rounded-3xl p-px">
      {/* Turning ring. Sits behind the card and is covered everywhere except
          the one-pixel padding, which is what makes it read as a border. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div
          className="trusted-ring absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: `${index * -6}s` }}
        />
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-paper p-7 sm:p-9"
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(18rem circle at var(--x, 50%) var(--y, 50%), var(--color-brand-soft), transparent 65%)",
          }}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <span className="mono-label text-brand">Named client</span>
            <span className="mono-label text-right">{industry.split("/")[0].trim()}</span>
          </div>

          <h3 className="heading-lg mt-7 text-balance text-fg">
            {client}
          </h3>

          <p className="body-sm mt-4 leading-relaxed text-muted">{summary}</p>

          <div className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-5">
            <span className="mono-label">{projectType}</span>
            <Link
              href={`/portfolio/${slug}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
              aria-label={`Read the ${client} case study`}
            >
              <ArrowUpRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrustedBy() {
  if (namedEngagements.length === 0) return null;

  const sectors = industries.map((i) => i.name);
  const ticker = [...sectors, ...sectors];

  return (
    <section className="relative overflow-hidden bg-paper" id="clients">
      {/* Soft brand aurora, breathing behind the band */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-160 w-240 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-brand-soft),transparent_72%)]"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container-page section">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Trusted by</span>
            <h2 className="heading-lg mt-5 text-balance text-fg">
              Organisations that let us use their name.
            </h2>
            <p className="lead mt-6 text-muted">
              We list a client only once they have agreed to it. These two run
              the systems we built for them today.
            </p>
          </div>
        </Reveal>

        {/* Spotlight cards */}
        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-2">
          {namedEngagements.map((p, i) => (
            <RevealItem key={p.slug} className="h-full">
              <SpotlightCard
                client={p.client!}
                projectType={p.projectType}
                industry={p.industry}
                summary={p.summary}
                slug={p.slug}
                index={i}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Figures — counted up on arrival */}
        <Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {[
              { value: verifiedClients.length, label: "Named clients" },
              { value: verifiedProjects.length, label: "Systems delivered" },
              { value: industries.length, label: "Sectors served" },
              { value: 100, suffix: "%", label: "Built in-house" },
            ].map((s) => (
              <div key={s.label} className="bg-paper p-6">
                <dt className="mono-figure text-3xl font-semibold tracking-tight text-fg">
                  <StatCounter value={s.value} suffix={s.suffix ?? ""} />
                </dt>
                <dd className="mono-label mt-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Sector ticker — the breadth behind the two names */}
      <div className="relative border-y border-line bg-sand/50 py-5">
        <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            className="marquee-track flex w-max items-center"
            style={{ ["--marquee-duration" as string]: "42s" }}
          >
            {ticker.map((name, i) => (
              <span key={`${name}-${i}`} className="flex items-center px-7">
                <span className="mono-label whitespace-nowrap text-fg/45">
                  {name}
                </span>
                <span
                  aria-hidden
                  className="ml-7 h-1 w-1 rounded-full bg-brand/40"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
