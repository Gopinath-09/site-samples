/**
 * A system drawn as a technical schematic, in place of the stock photography a
 * consultancy site would put here. It needs no asset, scales without loss and
 * shows the work rather than gesturing at it.
 *
 * The drawing is driven entirely by a `SystemSpec`, so replacing the generic
 * reference architecture with a system we actually delivered is a data change
 * rather than a component change. Routing is orthogonal on purpose: schematics
 * read as engineering, diagonals read as decoration.
 *
 * Note there are no figures anywhere in a spec. A latency or uptime number
 * printed on a drawing is a claim like any other, and nothing here is
 * evidenced yet — see the proof gate in `content.ts`.
 */

export interface SystemNode {
  x: number;
  y: number;
  w: number;
  label: string;
  /** Marks the node on the spine, which carries the accent. */
  accent?: boolean;
}

export interface SystemSpec {
  /** Shown beneath the drawing, e.g. "Fig. 01 — Reference architecture". */
  caption: string;
  /** Sentence describing the whole drawing for assistive technology. */
  description: string;
  /** Row names down the left gutter, positioned against their row's `y`. */
  layers: { label: string; y: number }[];
  nodes: SystemNode[];
  /** Hairline connectors, as SVG path data. */
  edges: string[];
  /** The path the accent traces through the system. */
  spine: string[];
}

/** Uniform node height, so every row aligns on the same baseline. */
const H = 44;

/**
 * The generic three-tier architecture. Honest but unspecific: it describes any
 * competent web platform rather than one of ours. Swap it for a delivered
 * system the moment one is cleared for publication.
 */
export const referenceArchitecture: SystemSpec = {
  caption: "Fig. 01 — Reference architecture",
  description:
    "Reference architecture: web and mobile clients through an edge layer and API gateway to services, AI, workers, Postgres and Redis.",
  layers: [
    { label: "Clients", y: 24 },
    { label: "Edge", y: 120 },
    { label: "Gateway", y: 200 },
    { label: "Compute", y: 288 },
    { label: "State", y: 376 },
  ],
  nodes: [
    { x: 230, y: 24, w: 140, label: "Web" },
    { x: 450, y: 24, w: 140, label: "Mobile" },
    { x: 340, y: 120, w: 140, label: "Edge / CDN" },
    { x: 320, y: 200, w: 180, label: "API Gateway", accent: true },
    { x: 150, y: 288, w: 140, label: "Services" },
    { x: 340, y: 288, w: 140, label: "AI / RAG" },
    { x: 530, y: 288, w: 140, label: "Workers" },
    { x: 230, y: 376, w: 140, label: "Postgres" },
    { x: 450, y: 376, w: 140, label: "Redis" },
  ],
  edges: [
    "M300 68 V94 H410 V120",
    "M520 68 V94 H410 V120",
    "M410 244 V266 H220 V288",
    "M410 244 V266 H600 V288",
    "M220 332 V354 H300 V376",
    "M410 332 V354 H520 V376",
    "M600 332 V354 H520 V376",
  ],
  spine: ["M410 164 V200", "M410 244 V288", "M410 332 V354 H300 V376"],
};

type Tone = "light" | "dark";

/**
 * On ink the drawing cannot simply reuse the light palette: hairlines vanish
 * and node fills go muddy. Each tone therefore carries its own set, with the
 * dark one built from translucent white so the schematic reads as luminous
 * rather than as flat boxes sitting on top of the background.
 */
const PALETTE: Record<
  Tone,
  {
    gutter: string;
    edge: string;
    nodeFill: string;
    nodeStroke: string;
    nodeText: string;
    accentFill: string;
    accentStroke: string;
    accentText: string;
  }
> = {
  light: {
    gutter: "var(--color-muted)",
    edge: "var(--color-line)",
    nodeFill: "var(--color-paper)",
    nodeStroke: "var(--color-line)",
    nodeText: "var(--color-ink)",
    accentFill: "var(--color-brand-soft)",
    accentStroke: "var(--color-brand)",
    accentText: "var(--color-brand)",
  },
  dark: {
    gutter: "rgba(255,255,255,0.42)",
    edge: "rgba(255,255,255,0.16)",
    nodeFill: "rgba(255,255,255,0.04)",
    nodeStroke: "rgba(255,255,255,0.20)",
    nodeText: "rgba(255,255,255,0.88)",
    accentFill: "rgba(56,102,240,0.22)",
    accentStroke: "#5b83ff",
    accentText: "#a8c0ff",
  },
};

export default function SystemDiagram({
  spec = referenceArchitecture,
  tone = "light",
  className,
}: {
  spec?: SystemSpec;
  tone?: Tone;
  className?: string;
}) {
  const c = PALETTE[tone];

  return (
    <svg
      viewBox="0 0 700 440"
      role="img"
      aria-label={spec.description}
      className={className}
      style={{ width: "100%", height: "auto" }}
    >
      {/* Layer names in the left gutter */}
      {spec.layers.map((l) => (
        <text
          key={l.label}
          x={0}
          y={l.y + H / 2 + 4}
          fill={c.gutter}
          fontFamily="var(--font-mono)"
          fontSize={10}
          letterSpacing={2}
        >
          {l.label.toUpperCase()}
        </text>
      ))}

      {/* Hairline connectors */}
      {spec.edges.map((d) => (
        <path key={d} d={d} fill="none" stroke={c.edge} strokeWidth={1} />
      ))}

      {/* The traced spine, drawn over the hairlines */}
      {spec.spine.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke={c.edge} strokeWidth={1} />
          <path
            d={d}
            fill="none"
            stroke={c.accentStroke}
            strokeWidth={1.5}
            className="trace"
          />
        </g>
      ))}

      {/* Nodes */}
      {spec.nodes.map((n) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={H}
            rx={6}
            fill={n.accent ? c.accentFill : c.nodeFill}
            stroke={n.accent ? c.accentStroke : c.nodeStroke}
            strokeWidth={1}
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + H / 2 + 4}
            textAnchor="middle"
            fill={n.accent ? c.accentText : c.nodeText}
            fontFamily="var(--font-mono)"
            fontSize={12}
            fontWeight={500}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
