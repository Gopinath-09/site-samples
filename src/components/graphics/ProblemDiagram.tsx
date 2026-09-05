"use client";

import { motion } from "framer-motion";
import type { Problem } from "@/lib/content";
import { EASE } from "@/components/ui/Reveal";

/**
 * The figure beside each problem on the stage.
 *
 * Each one draws the shape of the problem rather than illustrating the words:
 * layers coming into alignment, a scope cut down to the piece that ships, a
 * manual relay replaced by a single line, scattered sources resolving into one
 * answer that can be traced back. A picture that restates the sentence would be
 * decoration; these are meant to be the sentence in another form.
 *
 * The stage keys this on the active problem, so the component remounts on every
 * change and the entrance replays without needing exit states or an
 * AnimatePresence wrapper of its own.
 *
 * Decorative, so the whole figure is hidden from assistive technology; the
 * statement and answer beside it carry the meaning.
 */

const STROKE = "rgba(155, 200, 255, 0.34)";
const SOFT = "rgba(155, 200, 255, 0.14)";
const LIT = "#9bb6ff";

/** Paths draw themselves in; shapes fade up. Both share the site easing. */
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.09 },
  }),
};

const pop = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 },
  }),
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <motion.svg
      viewBox="0 0 480 340"
      aria-hidden
      focusable="false"
      initial="hidden"
      animate="show"
      className="h-full w-full"
    >
      {children}
    </motion.svg>
  );
}

/** Crooked layers settling into alignment — a system brought back into order. */
function Outgrown() {
  const rows = [
    { y: 70, from: -26, w: 300 },
    { y: 130, from: 34, w: 260 },
    { y: 190, from: -18, w: 320 },
    { y: 250, from: 22, w: 240 },
  ];
  return (
    <Frame>
      {rows.map((r, i) => (
        <motion.rect
          key={r.y}
          x={80}
          y={r.y}
          width={r.w}
          height={30}
          rx={6}
          fill="rgba(255,255,255,0.03)"
          stroke={i === 0 ? LIT : STROKE}
          strokeWidth="1"
          initial={{ x: r.from, opacity: 0, rotate: r.from / 8 }}
          animate={{
            x: 0,
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.75, ease: EASE, delay: 0.15 + i * 0.1 },
          }}
          style={{ transformOrigin: "240px 50%" }}
        />
      ))}
      {/* The margin that the alignment creates */}
      <motion.line
        x1={80}
        y1={40}
        x2={80}
        y2={300}
        stroke={SOFT}
        strokeWidth="1"
        variants={draw}
        custom={5}
      />
    </Frame>
  );
}

/** Many candidates, one shipped — scope cut to the piece that proves the idea. */
function Launch() {
  const blocks = Array.from({ length: 6 }, (_, i) => ({
    x: 60 + (i % 3) * 130,
    y: 150 + Math.floor(i / 3) * 90,
    lit: i === 1,
  }));
  return (
    <Frame>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={104}
          height={62}
          rx={8}
          fill={b.lit ? "rgba(91,131,255,0.14)" : "rgba(255,255,255,0.025)"}
          stroke={b.lit ? LIT : SOFT}
          strokeWidth="1"
          variants={pop}
          custom={i}
        />
      ))}

      {/* The one that ships, lifted clear of the rest */}
      <motion.rect
        x={190}
        y={44}
        width={104}
        height={62}
        rx={8}
        fill="rgba(91,131,255,0.2)"
        stroke={LIT}
        strokeWidth="1.25"
        initial={{ opacity: 0, y: 110 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: EASE, delay: 0.75 },
        }}
      />
      <motion.path
        d="M242 150 L242 118"
        stroke={LIT}
        strokeWidth="1.25"
        fill="none"
        variants={draw}
        custom={7}
      />
    </Frame>
  );
}

/** A manual relay between systems, replaced by one line that runs itself. */
function Automate() {
  return (
    <Frame>
      {[92, 184, 276, 368].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={i % 2 === 0 ? 96 : 132}
          r={9}
          fill="rgba(255,255,255,0.04)"
          stroke={SOFT}
          strokeWidth="1"
          variants={pop}
          custom={i}
        />
      ))}

      {/* The handoffs, drawn as the crooked path they actually are */}
      <motion.path
        d="M92 96 L184 132 L276 96 L368 132"
        fill="none"
        stroke={SOFT}
        strokeWidth="1"
        strokeDasharray="5 6"
        variants={draw}
        custom={2}
      />

      {/* And the single line that replaces them */}
      <motion.path
        d="M92 236 L368 236"
        fill="none"
        stroke={LIT}
        strokeWidth="1.5"
        variants={draw}
        custom={5}
      />
      {[92, 368].map((x) => (
        <motion.circle
          key={x}
          cx={x}
          cy={236}
          r={9}
          fill="rgba(91,131,255,0.18)"
          stroke={LIT}
          strokeWidth="1"
          variants={pop}
          custom={6}
        />
      ))}

      {/* Something actually moving along it, on a slow loop */}
      <motion.circle
        cy={236}
        r={4}
        fill="#cfe9ff"
        initial={{ opacity: 0, cx: 92 }}
        animate={{
          opacity: [0, 1, 1, 0],
          cx: [92, 368],
          transition: {
            duration: 1.6,
            ease: EASE,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 0.6,
          },
        }}
      />
    </Frame>
  );
}

/** Scattered sources resolving into one answer that can be traced back. */
function Retrieval() {
  const docs = [
    { x: 52, y: 60 },
    { x: 52, y: 150 },
    { x: 52, y: 240 },
  ];
  return (
    <Frame>
      {docs.map((d, i) => (
        <motion.g key={i} variants={pop} custom={i}>
          <rect
            x={d.x}
            y={d.y}
            width={72}
            height={54}
            rx={5}
            fill="rgba(255,255,255,0.03)"
            stroke={SOFT}
            strokeWidth="1"
          />
          {[14, 26, 38].map((o) => (
            <line
              key={o}
              x1={d.x + 12}
              y1={d.y + o}
              x2={d.x + 60}
              y2={d.y + o}
              stroke={SOFT}
              strokeWidth="1"
            />
          ))}
        </motion.g>
      ))}

      {docs.map((d, i) => (
        <motion.path
          key={i}
          d={`M${d.x + 72} ${d.y + 27} C 200 ${d.y + 27}, 210 170, 262 170`}
          fill="none"
          stroke={SOFT}
          strokeWidth="1"
          variants={draw}
          custom={3 + i}
        />
      ))}

      {/* The retrieval step */}
      <motion.circle
        cx={278}
        cy={170}
        r={17}
        fill="rgba(91,131,255,0.16)"
        stroke={LIT}
        strokeWidth="1"
        variants={pop}
        custom={6}
      />
      <motion.path
        d="M295 170 L330 170"
        fill="none"
        stroke={LIT}
        strokeWidth="1.25"
        variants={draw}
        custom={7}
      />

      {/* The answer, and the shorter line that stands for its citation */}
      <motion.g variants={pop} custom={8}>
        <rect
          x={330}
          y={136}
          width={104}
          height={68}
          rx={7}
          fill="rgba(91,131,255,0.1)"
          stroke={LIT}
          strokeWidth="1"
        />
        {[18, 32].map((o) => (
          <line
            key={o}
            x1={344}
            y1={136 + o}
            x2={420}
            y2={136 + o}
            stroke={LIT}
            strokeWidth="1"
            opacity="0.6"
          />
        ))}
        <line
          x1={344}
          y1={182}
          x2={382}
          y2={182}
          stroke={LIT}
          strokeWidth="1"
          opacity="0.35"
        />
      </motion.g>
    </Frame>
  );
}

const FIGURES: Record<Problem["diagram"], () => React.ReactElement> = {
  outgrown: Outgrown,
  launch: Launch,
  automate: Automate,
  retrieval: Retrieval,
};

export default function ProblemDiagram({ kind }: { kind: Problem["diagram"] }) {
  const Figure = FIGURES[kind];
  return <Figure />;
}
