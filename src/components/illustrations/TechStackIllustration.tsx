import { cn } from "@/lib/utils";

/**
 * "Stacked platform" illustration — five isometric slabs, one per layer of
 * the stack, with a request bus flowing down the left edge and engineering
 * leader-lines to labels on the right. Server Component; all motion is the
 * CSS `.anim-*` vocabulary from globals.css so reduced-motion is respected.
 *
 * Designed for a ~560px-wide card at a 4:3 aspect.
 */

type Pt = readonly [number, number];

export interface TechStackIllustrationProps {
  className?: string;
}

interface Palette {
  line: string;
  edge: string;
  face: string;
  side: string;
  text: string;
  textStrong: string;
  brand: string;
}

/** One theme-aware palette — the site has a single surface, so the colours
 *  resolve through CSS variables and flip with the theme automatically. */
const palette: Palette = {
  line: "var(--color-line)",
  edge: "color-mix(in srgb, var(--color-fg) 32%, transparent)",
  face: "var(--color-paper)",
  side: "var(--color-elevate)",
  text: "var(--color-muted)",
  textStrong: "var(--color-fg)",
  brand: "var(--color-brand)",
};

interface Layer {
  name: string;
  caption: string;
}

// Captions are kept ≤ 24 mono chars so they fit the label column at 9px.
const layers: readonly Layer[] = [
  { name: "Experience layer", caption: "web · mobile · UI system" },
  { name: "Application & APIs", caption: "REST · GraphQL · auth" },
  { name: "Domain services", caption: "domain rules · workflows" },
  { name: "Data & events", caption: "SQL · cache · streams" },
  { name: "Cloud infrastructure", caption: "containers · IaC · logs" },
];

/* ---- Geometry: a 2:1 dimetric projection of an L×D rectangle ---- */
const L = 210; // slab length (along x)
const D = 120; // slab depth (along y)
const T = 12; // slab thickness
const STEP = 44; // vertical distance between slabs
const R = 10; // corner radius of the slab face
const OX = 170; // stack origin (top vertex of the top slab)
const OY = 32;
const HIGHLIGHT = 2; // index of the brand-accented slab
const BUS_X = 20;
const LABEL_X = 392; // where leader lines end; text starts just after

// Top face corners: top, right, bottom, left.
const face: Pt[] = [
  [0, 0],
  [L, L / 2],
  [L - D, (L + D) / 2],
  [-D, D / 2],
];
const faceCx = (L - D) / 2;
const faceCy = (L + D) / 4;
// Rounded corners pull the acute (left/right) vertices inwards — used to
// attach vertical edges and leader lines exactly at the outline.
const EDGE_INSET = (R * Math.cos(Math.atan(0.5))) / 2;

const f = (n: number) => (Math.round(n * 10) / 10).toString();

/** Closed polygon with quadratic-rounded corners. */
function roundedPath(pts: Pt[], r: number) {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const [x, y] = pts[i];
    const [px, py] = pts[(i + n - 1) % n];
    const [nx, ny] = pts[(i + 1) % n];
    const lp = Math.hypot(px - x, py - y);
    const ln = Math.hypot(nx - x, ny - y);
    const ax = x + ((px - x) / lp) * r;
    const ay = y + ((py - y) / lp) * r;
    const bx = x + ((nx - x) / ln) * r;
    const by = y + ((ny - y) / ln) * r;
    d += `${i === 0 ? "M" : "L"}${f(ax)} ${f(ay)}Q${f(x)} ${f(y)} ${f(bx)} ${f(by)}`;
  }
  return `${d}Z`;
}

const facePath = roundedPath(face, R);
const insetPath = roundedPath(
  face.map(([x, y]) => [faceCx + (x - faceCx) * 0.8, faceCy + (y - faceCy) * 0.8] as const),
  R * 0.8,
);
const sideEdges = `M${f(L - EDGE_INSET)} ${L / 2}v${T}M${f(-D + EDGE_INSET)} ${D / 2}v${T}`;

const CX = OX + faceCx;
const CY = OY + 2 * STEP + faceCy;
const DELAY = ["", "anim-delay-1", "anim-delay-2", "anim-delay-3", "anim-delay-4"];

export default function TechStackIllustration({
  className,
}: TechStackIllustrationProps) {
  const p = palette;
  const washId = "techstack-wash";
  const slabs = layers.map((layer, i) => ({ ...layer, i, y: OY + i * STEP }));
  const busTop = OY + D / 2 - 18;
  const busBottom = OY + 4 * STEP + D / 2 + 18;

  return (
    <svg
      viewBox="0 0 560 420"
      className={cn("h-auto w-full", className)}
      aria-hidden
      focusable="false"
      fill="none"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: p.text }}
    >
      <defs>
        <radialGradient id={washId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--color-brand)" stopOpacity={0.14} />
          <stop offset="1" stopColor="var(--color-brand)" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Backdrop: soft brand wash + drifting dashed arcs */}
      <circle cx={CX} cy={CY} r={230} fill={`url(#${washId})`} />
      <circle cx={CX} cy={CY} r={186} stroke={p.line} strokeDasharray="3 9" className="anim-spin-slow" />
      <circle cx={CX} cy={CY} r={118} stroke={p.line} opacity={0.7} />

      <g className="anim-float">
        {/* Request bus: packets flow down through the layers */}
        <text x={BUS_X - 8} y={busTop - 10} fontSize={9} letterSpacing="0.08em" className="fill-current font-mono">
          requests
        </text>
        <path d={`M${BUS_X} ${busTop}V${busBottom}`} stroke={p.brand} strokeWidth={1.25} className="anim-dash-flow" />
        <path d={`M${BUS_X - 4} ${busBottom - 5}l4 5 4-5`} stroke={p.brand} strokeWidth={1.25} />
        {slabs.map((s) => {
          const y = s.y + D / 2;
          return (
            <g key={s.i}>
              <path d={`M${BUS_X} ${y}H${f(OX - D + EDGE_INSET - 4)}`} stroke={p.edge} />
              <circle cx={BUS_X} cy={y} r={2.2} fill={p.brand} />
            </g>
          );
        })}

        {/* Slabs, bottom first so upper layers overlap lower ones */}
        {[...slabs].reverse().map((s) => {
          const hot = s.i === HIGHLIGHT;
          return (
            <g key={s.i} transform={`translate(${OX} ${s.y})`}>
              <path d={facePath} transform={`translate(0 ${T})`} fill={p.side} stroke={p.line} />
              <path d={sideEdges} stroke={hot ? p.brand : p.edge} strokeWidth={hot ? 1.5 : 1} />
              <path
                d={facePath}
                fill={hot ? `color-mix(in srgb, var(--color-brand) 12%, ${p.face})` : p.face}
                stroke={hot ? p.brand : p.edge}
                strokeWidth={hot ? 1.5 : 1}
              />
              <path d={insetPath} stroke={hot ? p.brand : p.line} strokeDasharray="2 5" opacity={hot ? 0.6 : 1} />
              {/* status dot near the right vertex */}
              <circle cx={L - 18} cy={L / 2} r={3} fill={p.brand} className={cn("anim-pulse", DELAY[s.i])} />
            </g>
          );
        })}

        {/* Leader lines + labels */}
        {slabs.map((s) => {
          const y = s.y + L / 2;
          return (
            <g key={s.i}>
              <path d={`M${f(OX + L - EDGE_INSET + 4)} ${y}H${LABEL_X}`} stroke={s.i === HIGHLIGHT ? p.brand : p.edge} />
              <circle cx={LABEL_X} cy={y} r={1.8} fill={s.i === HIGHLIGHT ? p.brand : p.edge} />
              <text x={LABEL_X + 6} y={y + 3.5} fontSize={9} className="fill-current font-mono" style={{ color: p.brand }}>
                {`0${s.i + 1}`}
              </text>
              <text x={LABEL_X + 24} y={y + 3.5} fontSize={10.5} className="fill-current font-mono" style={{ color: p.textStrong }}>
                {s.name}
              </text>
              <text x={LABEL_X + 24} y={y + 16} fontSize={9} className="fill-current font-mono">
                {s.caption}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
