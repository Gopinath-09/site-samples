"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { motion as motionTokens } from "@/lib/tokens";

/* ==========================================================================
   JourneyPath — the scroll-drawn delivery route used by <DeliveryJourney>.

   Two exports:
     <JourneyPath>  desktop illustration. One tall SVG whose route draws as a
                    `progress` MotionValue (0–1) advances. Five stage nodes sit
                    on the route; the segment between Build and Launch is
                    either sprint loops (agile) or a gated staircase
                    (waterfall). After Launch the route closes into the
                    Maintain loop, which dash-flows forever once revealed.
     <JourneyRail>  mobile gutter piece — node + connector for one stacked
                    stage row, driven by that row's own progress.

   All geometry is pure module-level math (no DOM measurement, no randomness)
   so server and client render identical markup. Colours come from CSS
   variables so the art flips with the theme.
   ========================================================================== */

export type Methodology = "agile" | "waterfall";

/** Scroll progress (0–1) at which each stage node is reached. */
export const STAGE_PROGRESS = [0.04, 0.25, 0.44, 0.63, 0.8] as const;
/** The Maintain loop finishes drawing here; the dash-flow starts just after. */
const LOOP_SPAN: readonly [number, number] = [STAGE_PROGRESS[4], 0.94];
const LOOP_FLOW_AT = 0.95;

/* ---------- Geometry ---------- */

type Pt = readonly [number, number];
type Vec = readonly [number, number];

const VIEW_W = 400;
const VIEW_H = 1800;

/** Stage node centres (Discover → Maintain). Shared by both methodologies. */
const NODES = [
  [100, 130],
  [300, 480],
  [100, 830],
  [300, 1180],
  [200, 1500],
] as const satisfies readonly Pt[];

const LOOP_CENTER: Pt = [200, 1600];
const LOOP_R = 100;
/** monitor → patch → improve: right, bottom and left points of the loop. */
const LOOP_POINTS = [
  [300, 1600],
  [200, 1700],
  [100, 1600],
] as const satisfies readonly Pt[];

const DOWN: Vec = [0, 1];
const SPRINT_R = 18;
const SPRINT_POINTS = [
  [146, 960],
  [200, 1010],
  [254, 1060],
] as const satisfies readonly Pt[];
/** Waterfall gate diamonds — one per phase boundary. */
const GATES = [
  [200, 305],
  [200, 655],
  [200, 1005],
  [250, 1340],
] as const satisfies readonly Pt[];

const fmt = (n: number) => String(Math.round(n * 100) / 100);
const pt = (p: Pt) => `${fmt(p[0])},${fmt(p[1])}`;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const unit = (v: Vec): Vec => {
  const l = Math.hypot(v[0], v[1]);
  return [v[0] / l, v[1] / l];
};

interface Piece {
  /** Relative path command(s), assuming the pen is already at `from`. */
  cmd: string;
  len: number;
  to: Pt;
  /** Centre of a sprint loop, when this piece is one. */
  loopCenter?: Pt;
}

function lineTo(from: Pt, to: Pt): Piece {
  return { cmd: `L${pt(to)}`, len: dist(from, to), to };
}

/** Cubic between two points with given tangent directions (Hermite-style). */
function curveTo(from: Pt, tFrom: Vec, to: Pt, tTo: Vec): Piece {
  const k = dist(from, to) * 0.45;
  const c1: Pt = [from[0] + tFrom[0] * k, from[1] + tFrom[1] * k];
  const c2: Pt = [to[0] - tTo[0] * k, to[1] - tTo[1] * k];
  // Arc length by sampling — good to well under 1%.
  const steps = 24;
  let len = 0;
  let prev = from;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const p: Pt = [
      u * u * u * from[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * to[0],
      u * u * u * from[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * to[1],
    ];
    len += dist(prev, p);
    prev = p;
  }
  return { cmd: `C${pt(c1)} ${pt(c2)} ${pt(to)}`, len, to };
}

/**
 * A full circle tangent to the route at `at`, hanging off the right-hand
 * side of the travel direction `t`. The pen enters it moving forward, goes
 * round and returns to `at` — a sprint iteration.
 */
function loopAt(at: Pt, t: Vec, r: number): Piece {
  const n: Vec = [t[1], -t[0]];
  const dx = 2 * r * n[0];
  const dy = 2 * r * n[1];
  return {
    cmd: `a${r},${r} 0 1 0 ${fmt(dx)},${fmt(dy)} a${r},${r} 0 1 0 ${fmt(-dx)},${fmt(-dy)}`,
    len: 2 * Math.PI * r,
    to: at,
    loopCenter: [at[0] + r * n[0], at[1] + r * n[1]],
  };
}

interface BuiltPiece {
  /** Absolute path (starts with its own `M`). */
  d: string;
  /** Fraction of the whole segment's length at which this piece starts/ends. */
  span: readonly [number, number];
  loopCenter?: Pt;
}
interface Segment {
  d: string;
  pieces: readonly BuiltPiece[];
}

function build(start: Pt, pieces: readonly Piece[]): Segment {
  const total = pieces.reduce((s, p) => s + p.len, 0);
  let from = start;
  let cum = 0;
  const out: BuiltPiece[] = [];
  for (const p of pieces) {
    const a = cum / total;
    cum += p.len;
    out.push({ d: `M${pt(from)} ${p.cmd}`, span: [a, cum / total], loopCenter: p.loopCenter });
    from = p.to;
  }
  return { d: `M${pt(start)} ${pieces.map((p) => p.cmd).join(" ")}`, pieces: out };
}

/** Waterfall step: down, across (through the gate), down. */
function step(from: Pt, to: Pt, gate: Pt): Segment {
  const c1: Pt = [from[0], gate[1]];
  const c2: Pt = [to[0], gate[1]];
  return build(from, [lineTo(from, c1), lineTo(c1, gate), lineTo(gate, c2), lineTo(c2, to)]);
}

const DIAG = unit([54, 50]);

const AGILE_SEGMENTS: readonly Segment[] = [
  build(NODES[0], [curveTo(NODES[0], DOWN, NODES[1], DOWN)]),
  build(NODES[1], [curveTo(NODES[1], DOWN, NODES[2], DOWN)]),
  build(NODES[2], [
    curveTo(NODES[2], DOWN, SPRINT_POINTS[0], DIAG),
    loopAt(SPRINT_POINTS[0], DIAG, SPRINT_R),
    lineTo(SPRINT_POINTS[0], SPRINT_POINTS[1]),
    loopAt(SPRINT_POINTS[1], DIAG, SPRINT_R),
    lineTo(SPRINT_POINTS[1], SPRINT_POINTS[2]),
    loopAt(SPRINT_POINTS[2], DIAG, SPRINT_R),
    curveTo(SPRINT_POINTS[2], DIAG, NODES[3], DOWN),
  ]),
  build(NODES[3], [curveTo(NODES[3], DOWN, NODES[4], DOWN)]),
];

const WATERFALL_SEGMENTS: readonly Segment[] = [
  step(NODES[0], NODES[1], GATES[0]),
  step(NODES[1], NODES[2], GATES[1]),
  step(NODES[2], NODES[3], GATES[2]),
  step(NODES[3], NODES[4], GATES[3]),
];

/** Clockwise from the top: Maintain → monitor → patch → improve → Maintain. */
const LOOP_D = `M${pt(NODES[4])} A${LOOP_R},${LOOP_R} 0 1 1 ${pt(LOOP_POINTS[1])} A${LOOP_R},${LOOP_R} 0 1 1 ${pt(NODES[4])}`;

/** Map a fraction of segment `i` onto global scroll progress. */
function toGlobal(i: number, f: number) {
  const a = STAGE_PROGRESS[i];
  const b = STAGE_PROGRESS[i + 1];
  return a + f * (b - a);
}
const segmentSpan = (i: number): [number, number] => [STAGE_PROGRESS[i], STAGE_PROGRESS[i + 1]];

/** Sprint rings appear the moment their loop is fully drawn. */
const SPRINT_RINGS = AGILE_SEGMENTS[2].pieces
  .filter((p): p is BuiltPiece & { loopCenter: Pt } => p.loopCenter !== undefined)
  .map((p) => ({ center: p.loopCenter, at: toGlobal(2, p.span[1]) }));
/** Gate diamonds appear as the pen crosses them (end of the 2nd piece). */
const GATE_AT = WATERFALL_SEGMENTS.map((s, i) => toGlobal(i, s.pieces[1].span[1]));
const LOOP_POINT_AT = [0.25, 0.5, 0.75].map(
  (f) => LOOP_SPAN[0] + f * (LOOP_SPAN[1] - LOOP_SPAN[0]),
);

function diamond([x, y]: Pt, s: number) {
  return `M${fmt(x)},${fmt(y - s)} L${fmt(x + s)},${fmt(y)} L${fmt(x)},${fmt(y + s)} L${fmt(x - s)},${fmt(y)} Z`;
}

/* ---------- Motion primitives ---------- */

const STROKE = 1.5;
const fade = { duration: 0.5, ease: motionTokens.easeOutExpo } as const;

/** A route piece that draws while `progress` moves through `span`. */
function DrawnPath({
  d,
  progress,
  span,
  settle = 1,
}: {
  d: string;
  progress: MotionValue<number>;
  span: readonly [number, number];
  /** Opacity to settle at once fully drawn (loops soften so the dash-flow reads). */
  settle?: number;
}) {
  const pathLength = useTransform(progress, [span[0], span[1]], [0, 1]);
  const opacity = useTransform(progress, [span[1], span[1] + 0.02], [1, settle]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--color-brand)"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, opacity }}
    />
  );
}

/** Fades children in as `progress` passes `at`. */
function RevealG({
  progress,
  at,
  from = 0,
  children,
}: {
  progress: MotionValue<number>;
  at: number;
  from?: number;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [at - 0.02, at + 0.005], [from, 1]);
  return <motion.g style={{ opacity }}>{children}</motion.g>;
}

function RevealDiv({
  progress,
  at,
  from = 0.4,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>;
  at: number;
  from?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [at - 0.02, at + 0.005], [from, 1]);
  return (
    <motion.div className={className} style={{ ...style, opacity }}>
      {children}
    </motion.div>
  );
}

/** Faint dashed preview of a route — the road ahead. */
function GhostPath({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-fg)"
      strokeOpacity={0.18}
      strokeWidth={1}
      strokeDasharray="2 6"
      strokeLinecap="round"
    />
  );
}

function Node({ at: [x, y], lit, active }: { at: Pt; lit: boolean; active: boolean }) {
  return (
    <g>
      {active && (
        <circle
          cx={x}
          cy={y}
          r={11}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth={1}
          opacity={0.6}
          className="anim-ping"
        />
      )}
      <circle
        cx={x}
        cy={y}
        r={8}
        fill="var(--color-paper)"
        stroke={lit ? "var(--color-brand)" : "var(--color-fg)"}
        strokeOpacity={lit ? 1 : 0.35}
        strokeWidth={STROKE}
        className="transition-colors duration-500"
      />
      <circle
        cx={x}
        cy={y}
        r={3.5}
        fill={lit ? "var(--color-brand)" : "var(--color-line)"}
        className="transition-colors duration-500"
      />
    </g>
  );
}

/** Dashed ring that travels forever — iteration / maintenance never stops. */
function FlowRing({ cx, cy, r, units }: { cx: number; cy: number; r: number; units: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      // A multiple of the 12-unit dash period so the loop is seamless.
      pathLength={units}
      fill="none"
      stroke="var(--color-brand)"
      strokeWidth={STROKE}
      strokeLinecap="round"
      className="anim-dash-flow"
    />
  );
}

/* ---------- Desktop illustration ---------- */

export interface JourneyLabels {
  /** Caption above the route's entry point. */
  start: string;
  stages: readonly { title: string; hint: string }[];
  /** Agile note beside the sprint loops. */
  sprints: { title: string; hint: string };
  /** Waterfall sign-off names, one per gate. */
  gates: readonly string[];
  /** Captions on the Maintain loop: monitor, patch, improve. */
  loop: readonly [string, string, string];
}

export interface JourneyPathProps {
  mode: Methodology;
  /** 0–1 draw progress. Pass a constant 1 for the fully drawn state. */
  progress: MotionValue<number>;
  /** Highest lit stage index — nodes 0..lit are lit. */
  lit: number;
  /** Stage index that carries the ring. */
  active: number;
  labels: JourneyLabels;
  className?: string;
}

export function JourneyPath({ mode, progress, lit, active, labels, className }: JourneyPathProps) {
  const agile = mode === "agile";

  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full" aria-hidden>
        {/* entry — the first conversation */}
        <line
          x1={NODES[0][0]}
          y1={40}
          x2={NODES[0][0]}
          y2={NODES[0][1] - 12}
          stroke="var(--color-fg)"
          strokeOpacity={0.35}
          strokeWidth={1}
          strokeDasharray="2 6"
          strokeLinecap="round"
        />

        {/* Agile route — S-curves with sprint loops */}
        <motion.g initial={false} animate={{ opacity: agile ? 1 : 0 }} transition={fade}>
          {AGILE_SEGMENTS.map((seg, i) => (
            <GhostPath key={i} d={seg.d} />
          ))}
          {AGILE_SEGMENTS.map((seg, i) =>
            seg.pieces.map((p) => (
              <DrawnPath
                key={p.d}
                d={p.d}
                progress={progress}
                span={[toGlobal(i, p.span[0]), toGlobal(i, p.span[1])]}
                settle={p.loopCenter ? 0.35 : 1}
              />
            )),
          )}
          {SPRINT_RINGS.map((ring, k) => (
            <RevealG key={k} progress={progress} at={ring.at}>
              <FlowRing cx={ring.center[0]} cy={ring.center[1]} r={SPRINT_R} units={108} />
            </RevealG>
          ))}
        </motion.g>

        {/* Waterfall route — staircase with sign-off gates */}
        <motion.g initial={false} animate={{ opacity: agile ? 0 : 1 }} transition={fade}>
          {WATERFALL_SEGMENTS.map((seg, i) => (
            <GhostPath key={i} d={seg.d} />
          ))}
          {WATERFALL_SEGMENTS.map((seg, i) => (
            <DrawnPath key={i} d={seg.d} progress={progress} span={segmentSpan(i)} />
          ))}
          {GATES.map((g, k) => (
            <RevealG key={k} progress={progress} at={GATE_AT[k]}>
              <path
                d={diamond(g, 7)}
                fill="var(--color-paper)"
                stroke="var(--color-brand)"
                strokeWidth={STROKE}
                strokeLinejoin="round"
              />
            </RevealG>
          ))}
        </motion.g>

        {/* Maintain loop — shared by both methodologies */}
        <GhostPath d={LOOP_D} />
        <DrawnPath d={LOOP_D} progress={progress} span={LOOP_SPAN} settle={0.35} />
        {LOOP_POINTS.map((p, k) => (
          <RevealG key={k} progress={progress} at={LOOP_POINT_AT[k]}>
            <circle
              cx={p[0]}
              cy={p[1]}
              r={4}
              fill="var(--color-paper)"
              stroke="var(--color-brand)"
              strokeWidth={STROKE}
            />
          </RevealG>
        ))}
        <RevealG progress={progress} at={LOOP_FLOW_AT}>
          <FlowRing cx={LOOP_CENTER[0]} cy={LOOP_CENTER[1]} r={LOOP_R} units={624} />
        </RevealG>

        {/* Stage nodes on top of everything */}
        {NODES.map((n, i) => (
          <Node key={i} at={n} lit={i <= lit} active={i === active} />
        ))}
      </svg>

      {/* HTML labels — positioned in viewBox percentages so they track the art */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span
          className="absolute -translate-x-1/2 -translate-y-full font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted"
          style={{ left: pct(NODES[0][0], VIEW_W), top: pct(28, VIEW_H) }}
        >
          {labels.start}
        </span>

        {labels.stages.map((s, i) => {
          const [x, y] = NODES[i];
          const onRight = x > VIEW_W / 2;
          const last = i === NODES.length - 1;
          const isLit = i <= lit;
          return (
            <div
              key={s.title}
              className={cn(
                "absolute flex items-center gap-3",
                last ? "-translate-y-full" : "-translate-y-1/2",
                onRight && "flex-row-reverse text-right",
              )}
              style={
                onRight
                  ? { right: pct(VIEW_W - x + 22, VIEW_W), top: pct(y, VIEW_H) }
                  : { left: pct(x + 22, VIEW_W), top: pct(last ? y - 8 : y, VIEW_H) }
              }
            >
              <span
                className={cn(
                  "font-mono text-xs tabular-nums transition-colors duration-500",
                  isLit ? "text-brand" : "text-muted",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p
                  className={cn(
                    "heading-sm transition-colors duration-500",
                    isLit ? "text-fg" : "text-muted",
                  )}
                >
                  {s.title}
                </p>
                <p className="text-xs text-muted">{s.hint}</p>
              </div>
            </div>
          );
        })}

        {/* Agile: sprint note */}
        <motion.div initial={false} animate={{ opacity: agile ? 1 : 0 }} transition={fade}>
          <RevealDiv
            progress={progress}
            at={SPRINT_RINGS[0].at}
            className="absolute"
            style={{ left: pct(262, VIEW_W), top: pct(985, VIEW_H) }}
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand">
              {labels.sprints.title}
            </p>
            <p className="mt-0.5 text-xs text-muted">{labels.sprints.hint}</p>
          </RevealDiv>
        </motion.div>

        {/* Waterfall: sign-off labels under each gate */}
        <motion.div initial={false} animate={{ opacity: agile ? 0 : 1 }} transition={fade}>
          {GATES.map((g, k) => (
            <RevealDiv
              key={k}
              progress={progress}
              at={GATE_AT[k]}
              className="absolute -translate-x-1/2 text-center"
              style={{ left: pct(g[0], VIEW_W), top: pct(g[1] + 13, VIEW_H) }}
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand">
                Sign-off
              </p>
              <p className="mt-0.5 text-xs text-muted">{labels.gates[k]}</p>
            </RevealDiv>
          ))}
        </motion.div>

        {/* Maintain loop captions */}
        {labels.loop.map((text, k) => {
          const [x, y] = LOOP_POINTS[k];
          const placement =
            k === 0
              ? { className: "-translate-y-1/2", style: { left: pct(x + 14, VIEW_W), top: pct(y, VIEW_H) } }
              : k === 1
                ? { className: "-translate-x-1/2", style: { left: pct(x, VIEW_W), top: pct(y + 14, VIEW_H) } }
                : {
                    className: "-translate-y-1/2 text-right",
                    style: { right: pct(VIEW_W - x + 14, VIEW_W), top: pct(y, VIEW_H) },
                  };
          return (
            <RevealDiv
              key={text}
              progress={progress}
              at={LOOP_POINT_AT[k]}
              className={cn(
                "absolute font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg",
                placement.className,
              )}
              style={placement.style}
            >
              {text}
            </RevealDiv>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Mobile rail ---------- */

export type RailDecoration = "none" | "sprints" | "gate" | "loop";

export interface JourneyRailProps {
  /** This row's own 0–1 progress. */
  progress: MotionValue<number>;
  lit: boolean;
  decoration: RailDecoration;
}

/**
 * Gutter for one stacked stage row: the node at the top, then a connector
 * that draws down to the next row — or, for the last row, the Maintain loop.
 * Give it the full row height (it sits in a grid cell).
 */
export function JourneyRail({ progress, lit, decoration }: JourneyRailProps) {
  const loopSpan: readonly [number, number] = [0.08, 0.5];
  return (
    <div className="relative h-full w-11" aria-hidden>
      <svg viewBox="0 0 44 44" className="h-auto w-full">
        <Node at={[22, 22]} lit={lit} active={false} />
      </svg>

      {decoration === "loop" ? (
        <svg viewBox="0 0 44 56" className="-mt-0.5 h-auto w-full">
          <GhostPath d="M22,0 L22,8" />
          <GhostPath d="M22,8 A18,18 0 1 1 22,44 A18,18 0 1 1 22,8" />
          <DrawnPath d="M22,0 L22,8" progress={progress} span={[0.02, 0.08]} />
          <DrawnPath
            d="M22,8 A18,18 0 1 1 22,44 A18,18 0 1 1 22,8"
            progress={progress}
            span={loopSpan}
            settle={0.35}
          />
          {(
            [
              [40, 26],
              [22, 44],
              [4, 26],
            ] as const
          ).map((p, k) => (
            <RevealG key={k} progress={progress} at={loopSpan[0] + (0.25 + 0.25 * k) * (loopSpan[1] - loopSpan[0])}>
              <circle
                cx={p[0]}
                cy={p[1]}
                r={2.5}
                fill="var(--color-paper)"
                stroke="var(--color-brand)"
                strokeWidth={STROKE}
              />
            </RevealG>
          ))}
          <RevealG progress={progress} at={loopSpan[1] + 0.02}>
            <FlowRing cx={22} cy={26} r={18} units={108} />
          </RevealG>
        </svg>
      ) : (
        <>
          {/* ghost connector */}
          <div
            className="absolute inset-y-0 left-1/2 top-11 w-px -translate-x-1/2 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--color-fg) 0 2px, transparent 2px 8px)",
            }}
          />
          {/* drawn connector — stretched to the row height, so this one SVG is
              deliberately not aspect-locked; a vertical line survives that. */}
          <svg
            viewBox="0 0 44 100"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-11 bottom-0 w-full"
          >
            <motion.line
              x1={22}
              y1={0}
              x2={22}
              y2={100}
              stroke="var(--color-brand)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>

          {decoration === "sprints" && (
            <svg viewBox="0 0 44 96" className="absolute left-0 top-[38%] h-auto w-full">
              {[12, 44, 76].map((cy, k) => (
                <RevealG key={cy} progress={progress} at={0.42 + k * 0.1}>
                  <FlowRing cx={29} cy={cy} r={7} units={48} />
                </RevealG>
              ))}
            </svg>
          )}

          {decoration === "gate" && (
            <svg viewBox="0 0 44 24" className="absolute inset-x-0 bottom-4 h-auto w-full">
              <RevealG progress={progress} at={0.9}>
                <path
                  d={diamond([22, 12], 6)}
                  fill="var(--color-paper)"
                  stroke="var(--color-brand)"
                  strokeWidth={STROKE}
                  strokeLinejoin="round"
                />
              </RevealG>
            </svg>
          )}
        </>
      )}
    </div>
  );
}
