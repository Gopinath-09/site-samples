"use client";

import { motion } from "framer-motion";
import { technologies } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

// Flatten every technology into one list, then split across two marquee rows.
const allTech = technologies.flatMap((g) => g.items);
const rowA = allTech.filter((_, i) => i % 2 === 0);
const rowB = allTech.filter((_, i) => i % 2 === 1);

function MarqueeRow({
  items,
  direction = "left",
  duration = 32,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const doubled = [...items, ...items];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-12 pr-12"
        animate={{ x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="tech-glass shrink-0 text-5xl font-extrabold uppercase tracking-tight md:text-7xl"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechnologiesSection() {
  return (
    <section
      className="section relative overflow-hidden bg-ink text-white"
      id="technologies"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
      <div className="relative container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="Technologies"
            title="A modern, proven stack — chosen for fit, not fashion."
            description="We pick technologies for their longevity and operational maturity, so your platform stays supportable for years."
          />
          <Button variant="ghost-light" href="/technologies" className="shrink-0">
            Full stack
            <ArrowRight width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* Glass marquee */}
      <div className="relative mt-14 flex flex-col gap-4">
        <MarqueeRow items={rowA} direction="left" duration={34} />
        <MarqueeRow items={rowB} direction="right" duration={40} />
      </div>
    </section>
  );
}
