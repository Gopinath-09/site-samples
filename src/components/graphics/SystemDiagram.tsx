/**
 * The hero's visual: a reference architecture of the kind COBRR actually
 * ships, drawn entirely in SVG.
 *
 * This replaces the stock photography a consultancy site would use here. It
 * needs no asset, scales without loss, costs nothing to load, and shows the
 * work rather than gesturing at it. Routing is deliberately orthogonal — a
 * schematic reads as engineering, whereas diagonals read as decoration.
 */

type Node = {
  x: number;
  y: number;
  w: number;
  label: string;
  /** Marks the spine node that carries the accent. */
  accent?: boolean;
};

const H = 44; // uniform node height, so every row aligns on the same baseline

const NODES: Node[] = [
  { x: 230, y: 24, w: 140, label: "Web" },
  { x: 450, y: 24, w: 140, label: "Mobile" },
  { x: 340, y: 120, w: 140, label: "Edge / CDN" },
  { x: 320, y: 200, w: 180, label: "API Gateway", accent: true },
  { x: 150, y: 288, w: 140, label: "Services" },
  { x: 340, y: 288, w: 140, label: "AI / RAG" },
  { x: 530, y: 288, w: 140, label: "Workers" },
  { x: 230, y: 376, w: 140, label: "Postgres" },
  { x: 450, y: 376, w: 140, label: "Redis" },
];

const GUTTER: { y: number; label: string }[] = [
  { y: 24, label: "Clients" },
  { y: 120, label: "Edge" },
  { y: 200, label: "Gateway" },
  { y: 288, label: "Compute" },
  { y: 376, label: "State" },
];

/** Edges drawn in hairline. The spine is listed separately so it can animate. */
const EDGES = [
  "M300 68 V94 H410 V120",
  "M520 68 V94 H410 V120",
  "M410 244 V266 H220 V288",
  "M410 244 V266 H600 V288",
  "M220 332 V354 H300 V376",
  "M410 332 V354 H520 V376",
  "M600 332 V354 H520 V376",
];

/** Client -> edge -> gateway -> AI -> state: the path the accent traces. */
const SPINE = ["M410 164 V200", "M410 244 V288", "M410 332 V354 H300 V376"];

export default function SystemDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 440"
      role="img"
      aria-label="Reference architecture: web and mobile clients through an edge layer and API gateway to services, AI, workers, Postgres and Redis."
      className={className}
      style={{ width: "100%", height: "auto" }}
    >
      {/* Layer names in the left gutter */}
      {GUTTER.map((g) => (
        <text
          key={g.label}
          x={0}
          y={g.y + H / 2 + 4}
          fill="var(--color-muted)"
          fontFamily="var(--font-mono)"
          fontSize={10}
          letterSpacing={2}
        >
          {g.label.toUpperCase()}
        </text>
      ))}

      {/* Hairline connectors */}
      {EDGES.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={1}
        />
      ))}

      {/* The traced spine, drawn over the hairlines */}
      {SPINE.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-line)" strokeWidth={1} />
          <path
            d={d}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth={1.5}
            className="trace"
          />
        </g>
      ))}

      {/* Nodes */}
      {NODES.map((n) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={H}
            rx={6}
            fill={n.accent ? "var(--color-brand-soft)" : "var(--color-paper)"}
            stroke={n.accent ? "var(--color-brand)" : "var(--color-line)"}
            strokeWidth={1}
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + H / 2 + 4}
            textAnchor="middle"
            fill={n.accent ? "var(--color-brand)" : "var(--color-ink)"}
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
