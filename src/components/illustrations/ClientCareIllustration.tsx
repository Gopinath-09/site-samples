import { useId } from "react";
import { cn } from "@/lib/utils";

interface Palette {
  fg: string;
  muted: string;
  line: string;
  surface: string;
  brand: string;
}

/**
 * One theme-aware palette — colours resolve through CSS variables so the
 * scene flips with the site theme.
 */
const palette: Palette = {
  fg: "var(--color-fg)",
  muted: "var(--color-muted)",
  line: "var(--color-line)",
  surface: "var(--color-paper)",
  brand: "var(--color-brand)",
};

/** Motion not covered by the global `.anim-*` vocabulary. Class names keep the
 *  `anim-` prefix so the global prefers-reduced-motion rule disables them. */
const LOCAL_MOTION =
  "@keyframes cc-draw{0%{stroke-dashoffset:100}45%,70%{stroke-dashoffset:0}100%{stroke-dashoffset:-100}}" +
  "@keyframes cc-bar{from{transform:scaleY(.4)}to{transform:scaleY(1)}}" +
  ".anim-cc-draw{stroke-dasharray:100;animation:cc-draw 4.5s ease-in-out infinite}" +
  ".anim-cc-bar{transform-box:fill-box;transform-origin:50% 100%;animation:cc-bar 2.6s ease-in-out infinite alternate}";

const C = 260; // centre of the 520 × 520 scene
const TICKS = Array.from({ length: 12 }, (_, i) => i * 30);

/** Spokes run from each touchpoint inward to the client node. */
const SPOKES = [
  { d: `M${C} 134 V210`, delay: "" },
  { d: `M386 ${C} H310`, delay: "anim-delay-1" },
  { d: `M${C} 386 V310`, delay: "anim-delay-2" },
  { d: `M134 ${C} H210`, delay: "anim-delay-3" },
];

/** Ports on the client node where the spokes land. */
const PORTS: [number, number][] = [
  [C, 213],
  [307, C],
  [C, 307],
  [213, C],
];

const LABELS: { x: number; y: number; text: string }[] = [
  { x: C, y: 40, text: "24/7 monitoring" },
  { x: 420, y: 314, text: "Response time" },
  { x: C, y: 486, text: "Named engineer" },
  { x: 100, y: 314, text: "Transparent reporting" },
];

interface ClientCareIllustrationProps {
  /** `light` sits on paper/sand (theme-aware); `dark` sits on ink. */
  className?: string;
}

/**
 * "Care loop" — a client at the centre, an orbit of four touchpoints
 * (monitoring, response time, a named engineer, reporting) and dashed
 * spokes that flow toward the client. Line-art, one accent, calm motion.
 */
export default function ClientCareIllustration({
  className,
}: ClientCareIllustrationProps) {
  const p = palette;
  const washId = `cc-wash-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 520 520"
      className={cn("h-auto w-full", className)}
      aria-hidden
      focusable="false"
    >
      <style>{LOCAL_MOTION}</style>
      <defs>
        <radialGradient id={washId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.brand} stopOpacity="0.16" />
          <stop offset="0.55" stopColor={p.brand} stopOpacity="0.05" />
          <stop offset="1" stopColor={p.brand} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft radial wash */}
      <circle cx={C} cy={C} r="244" fill={`url(#${washId})`} />

      {/* Outer dial + ticks */}
      <g stroke={p.line} strokeWidth="1">
        <circle cx={C} cy={C} r="206" fill="none" />
        {TICKS.map((a) => (
          <line
            key={a}
            x1={C}
            y1="54"
            x2={C}
            y2="61"
            transform={`rotate(${a} ${C} ${C})`}
          />
        ))}
      </g>

      {/* Orbit ring — slowly rotating dashes */}
      <circle
        cx={C}
        cy={C}
        r="160"
        fill="none"
        stroke={p.brand}
        strokeWidth="1.25"
        strokeDasharray="4 10"
        strokeLinecap="round"
        opacity="0.7"
        className="anim-spin-slow"
      />

      {/* Spokes — dashes flow inward toward the client */}
      <g
        fill="none"
        stroke={p.brand}
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.85"
      >
        {SPOKES.map((s) => (
          <path key={s.d} d={s.d} className={cn("anim-dash-flow", s.delay)} />
        ))}
      </g>

      {/* Gentle ping behind the client node */}
      <circle
        cx={C}
        cy={C}
        r="56"
        fill="none"
        stroke={p.brand}
        strokeWidth="1"
        opacity="0.5"
        className="anim-ping"
      />

      {/* Client node — inverse tile with a small building glyph */}
      <rect x="216" y="216" width="88" height="88" rx="22" fill={p.fg} />
      <g
        fill="none"
        stroke={p.surface}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M240 284 H280" />
        <path d="M246 284 V248 H274 V284" />
        <path d="M252 248 V242 H268 V248" />
        <path d="M257 284 V275 H263 V284" />
        <rect x="252" y="254" width="5" height="5" strokeWidth="1.25" />
        <rect x="263" y="254" width="5" height="5" strokeWidth="1.25" />
        <rect x="252" y="264" width="5" height="5" strokeWidth="1.25" />
        <rect x="263" y="264" width="5" height="5" strokeWidth="1.25" />
      </g>
      {PORTS.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="3"
          fill={p.surface}
          stroke={p.brand}
          strokeWidth="1.25"
        />
      ))}

      {/* Touchpoint nodes */}
      <g fill={p.surface} stroke={p.line} strokeWidth="1.25">
        <circle cx={C} cy="100" r="34" />
        <circle cx="420" cy={C} r="34" />
        <circle cx={C} cy="420" r="34" />
        <circle cx="100" cy={C} r="34" />
      </g>

      {/* 24/7 monitoring — heartbeat trace */}
      <path d="M240 100 H280" fill="none" stroke={p.line} strokeWidth="1" />
      <path
        d="M240 100 h9 l4 -9 l6 18 l5 -13 l3 4 h13"
        fill="none"
        stroke={p.brand}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="anim-dash-flow"
      />

      {/* Response time — clock with an arc that draws */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="420" cy={C} r="12" stroke={p.fg} strokeWidth="1.5" />
        <path d="M420 261 V253 M420 261 H426" stroke={p.fg} strokeWidth="1.5" />
        <path
          d="M420 242 A18 18 0 1 1 402 260"
          pathLength={100}
          stroke={p.brand}
          strokeWidth="1.5"
          className="anim-cc-draw"
        />
      </g>

      {/* Named engineer — person glyph with an accent mark */}
      <g fill="none" stroke={p.fg} strokeWidth="1.5" strokeLinecap="round">
        <circle cx={C} cy="411" r="6" />
        <path d="M246 434 a14 14 0 0 1 28 0" />
      </g>
      <circle
        cx="270"
        cy="409"
        r="4"
        fill={p.brand}
        stroke={p.surface}
        strokeWidth="1.5"
      />

      {/* Transparent reporting — small bar chart */}
      <path d="M84 274 H116" fill="none" stroke={p.line} strokeWidth="1" />
      <g fill={p.fg} opacity="0.55">
        <rect x="86" y="262" width="5" height="12" rx="1" className="anim-cc-bar" />
        <rect x="94" y="256" width="5" height="18" rx="1" className="anim-cc-bar anim-delay-1" />
        <rect x="102" y="260" width="5" height="14" rx="1" className="anim-cc-bar anim-delay-2" />
      </g>
      <rect
        x="110"
        y="250"
        width="5"
        height="24"
        rx="1"
        fill={p.brand}
        className="anim-cc-bar anim-delay-3"
      />

      {/* Labels */}
      <g
        fill={p.muted}
        fontSize="10"
        fontWeight="600"
        letterSpacing="1.4"
        textAnchor="middle"
      >
        {LABELS.map((l) => (
          <text key={l.text} x={l.x} y={l.y}>
            {l.text.toUpperCase()}
          </text>
        ))}
      </g>
    </svg>
  );
}
