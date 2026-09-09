import { cn } from "@/lib/utils";

/**
 * One composed scene with three labelled zones:
 *
 *   SCALE OUT   — a load balancer feeding a row of replicas; the last two are
 *                 still being added (dashed + pulsing). Traffic dash-flows.
 *   SCALE UP    — a single node whose CPU / memory / IO bars grow against a
 *                 headroom axis (the `bar-grow` keyframe from globals.css).
 *   HIGH AVAIL. — Zone A / Zone B with health ticks; one Zone A node has
 *                 failed and traffic is re-routed to Zone B ("failover").
 *
 * Server Component. Motion is the CSS `.anim-*` vocabulary so reduced-motion
 * is honoured for free. Aspect 16:10, designed for a 600–680px column.
 */

export interface ScaleIllustrationProps {
  className?: string;
}

interface Palette {
  line: string;
  edge: string;
  face: string;
  zone: string;
  text: string;
  textStrong: string;
  brand: string;
  ok: string;
}

/** One theme-aware palette — resolves through CSS variables, flips with the theme. */
const palette: Palette = {
  line: "var(--color-line)",
  edge: "color-mix(in srgb, var(--color-fg) 32%, transparent)",
  face: "var(--color-paper)",
  zone: "color-mix(in srgb, var(--color-fg) 2.5%, transparent)",
  text: "var(--color-muted)",
  textStrong: "var(--color-fg)",
  brand: "var(--color-brand)",
  ok: "var(--color-success)",
};

const NW = 36; // node width
const NH = 44; // node height
const DELAY = ["", "anim-delay-1", "anim-delay-2", "anim-delay-3", "anim-delay-4"];
/** Peak heights of the scale-up bars (px); each grows from 25% of this. */
const BAR_HEIGHTS = [46, 60, 40, 56, 50];

type NodeState = "ok" | "pending" | "failed";

/** A small server node: rounded rect, two rack lines, a status dot. */
function Node({
  x,
  y,
  p,
  state = "ok",
  delay = "",
  ping = false,
}: {
  x: number;
  y: number;
  p: Palette;
  state?: NodeState;
  delay?: string;
  ping?: boolean;
}) {
  const cx = x + NW / 2;
  const cy = y + 33;
  return (
    <g
      opacity={state === "failed" ? 0.4 : 1}
      className={state === "pending" ? cn("anim-pulse", delay) : undefined}
    >
      <rect
        x={x}
        y={y}
        width={NW}
        height={NH}
        rx={6}
        fill={p.face}
        stroke={state === "pending" ? p.brand : p.edge}
        strokeDasharray={state === "ok" ? undefined : "3 3"}
      />
      <path d={`M${x + 9} ${y + 12}h18M${x + 9} ${y + 20}h18`} stroke={p.line} />
      {ping && <circle cx={cx} cy={cy} r={5} stroke={p.brand} className={cn("anim-ping", delay)} />}
      {state === "failed" ? (
        <circle cx={cx} cy={cy} r={2.5} stroke={p.edge} />
      ) : (
        <circle
          cx={cx}
          cy={cy}
          r={2.5}
          fill={p.brand}
          className={state === "ok" ? cn("anim-pulse", delay) : undefined}
        />
      )}
    </g>
  );
}

/** Dashed zone frame with a faint fill. */
function Frame({
  x,
  y,
  w,
  h,
  p,
  rx = 12,
  dash = "4 6",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  p: Palette;
  rx?: number;
  dash?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={p.zone} stroke={p.line} strokeDasharray={dash} />;
}

/** Zone header: spaced uppercase title + a muted caption on the same line. */
function Header({
  x,
  y,
  title,
  caption,
  captionX,
  p,
}: {
  x: number;
  y: number;
  title: string;
  caption: string;
  captionX: number;
  p: Palette;
}) {
  return (
    <>
      <text
        x={x}
        y={y}
        fontSize={10}
        letterSpacing="0.14em"
        className="fill-current font-mono"
        style={{ color: p.textStrong }}
      >
        {title.toUpperCase()}
      </text>
      <text x={captionX} y={y} fontSize={9} className="fill-current font-mono">
        {caption}
      </text>
    </>
  );
}

/** Health-check glyph above a node: a tick, or a dim cross when failed. */
function Tick({ cx, y, p, failed = false }: { cx: number; y: number; p: Palette; failed?: boolean }) {
  return failed ? (
    <path d={`M${cx - 4} ${y - 4}l8 8M${cx + 4} ${y - 4}l-8 8`} stroke={p.edge} strokeWidth={1.25} opacity={0.6} />
  ) : (
    <path d={`M${cx - 5} ${y}l3.5 3.5 6.5-7`} stroke={p.ok} strokeWidth={1.5} />
  );
}

export default function ScaleIllustration({ className }: ScaleIllustrationProps) {
  const p = palette;
  const washId = "scale-wash";

  return (
    <svg
      viewBox="0 0 640 400"
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
          <stop offset="0" stopColor="var(--color-brand)" stopOpacity={0.12} />
          <stop offset="1" stopColor="var(--color-brand)" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={480} cy={250} r={260} fill={`url(#${washId})`} />

      {/* ================= SCALE OUT (horizontal) ================= */}
      <Frame x={8} y={8} w={372} h={176} p={p} />
      <Header x={22} y={30} title="Scale out" caption="horizontal" captionX={98} p={p} />

      {/* ingress → load balancer */}
      <path d="M14 110H56" stroke={p.edge} className="anim-dash-flow" />
      <text x={14} y={126} fontSize={9} className="fill-current font-mono">
        ingress
      </text>
      <rect x={56} y={88} width={44} height={44} rx={8} fill={p.face} stroke={p.edge} />
      <path d="M66 101h24M66 119h24" stroke={p.line} />
      <path d="M66 110h24" stroke={p.brand} strokeWidth={1.5} />
      <text x={56} y={150} fontSize={9} className="fill-current font-mono">
        load balancer
      </text>

      {/* traffic bus + drops: live to the healthy replicas, dotted to pending */}
      <path d="M100 110H124V64H260" stroke={p.edge} className="anim-dash-flow" />
      <path d="M260 64H352" stroke={p.edge} strokeDasharray="2 4" opacity={0.5} />
      {[168, 214, 260].map((cx) => (
        <path key={cx} d={`M${cx} 64V88`} stroke={p.edge} className="anim-dash-flow" />
      ))}
      {[306, 352].map((cx) => (
        <path key={cx} d={`M${cx} 64V88`} stroke={p.edge} strokeDasharray="2 4" opacity={0.5} />
      ))}

      {/* replicas: three live, two being added */}
      <Node x={150} y={88} p={p} />
      <Node x={196} y={88} p={p} delay={DELAY[1]} />
      <Node x={242} y={88} p={p} delay={DELAY[2]} />
      <Node x={288} y={88} p={p} state="pending" delay={DELAY[2]} />
      <Node x={334} y={88} p={p} state="pending" delay={DELAY[4]} />
      <text x={150} y={150} fontSize={9} className="fill-current font-mono">
        replicas ×3
      </text>
      <text x={329} y={150} fontSize={9} textAnchor="middle" className="fill-current font-mono" style={{ color: p.brand }}>
        +2 scaling
      </text>

      {/* ================= SCALE UP (vertical) ================= */}
      <Frame x={396} y={8} w={236} h={176} p={p} />
      <Header x={410} y={30} title="Scale up" caption="vertical" captionX={478} p={p} />

      <rect x={430} y={60} width={120} height={96} rx={10} fill={p.face} stroke={p.edge} />
      <text x={440} y={73} fontSize={9} className="fill-current font-mono">
        single node
      </text>
      {BAR_HEIGHTS.map((h, i) => {
        const x = 446 + i * 19;
        return (
          <g key={x}>
            <rect x={x} y={78} width={12} height={60} rx={2} fill={p.line} opacity={0.6} />
            {/* `anim-bar` is only a marker so the global reduced-motion rule
                ([class*="anim-"]) also disables this inline animation. */}
            <rect
              x={x}
              y={138 - h}
              width={12}
              height={h}
              rx={2}
              fill={p.brand}
              opacity={0.85}
              className="anim-bar"
              style={{
                animation: `bar-grow 2.4s ease-in-out ${(-i * 0.45).toFixed(2)}s infinite alternate`,
                transformOrigin: "bottom",
                transformBox: "fill-box",
              }}
            />
          </g>
        );
      })}
      <text x={461} y={151} fontSize={9} textAnchor="middle" className="fill-current font-mono">
        cpu
      </text>
      <text x={499} y={151} fontSize={9} textAnchor="middle" className="fill-current font-mono">
        mem
      </text>
      <text x={528} y={151} fontSize={9} textAnchor="middle" className="fill-current font-mono">
        io
      </text>

      {/* headroom axis */}
      <path d="M572 140V74" stroke={p.edge} strokeDasharray="3 3" />
      <path d="M567 80L572 74L577 80M569 140h6M569 123h6M569 106h6M569 89h6" stroke={p.edge} />
      <text x={580} y={78} fontSize={9} className="fill-current font-mono">
        headroom
      </text>

      {/* ================= HIGH AVAILABILITY ================= */}
      <Frame x={8} y={200} w={624} h={192} p={p} />
      <Header x={22} y={222} title="High availability" caption="multi-zone · automatic failover" captionX={158} p={p} />

      {/* traffic is distributed into both zones */}
      <path d="M164 250V244H474V250" stroke={p.line} />
      <circle cx={319} cy={244} r={3} fill={p.face} stroke={p.edge} />

      <Frame x={40} y={250} w={250} h={122} p={p} rx={10} dash="3 5" />
      <Frame x={350} y={250} w={250} h={122} p={p} rx={10} dash="3 5" />
      <text x={52} y={269} fontSize={9} letterSpacing="0.12em" className="fill-current font-mono" style={{ color: p.textStrong }}>
        ZONE A
      </text>
      <text x={278} y={269} fontSize={9} textAnchor="end" className="fill-current font-mono">
        1 of 3 degraded
      </text>
      <text x={362} y={269} fontSize={9} letterSpacing="0.12em" className="fill-current font-mono" style={{ color: p.textStrong }}>
        ZONE B
      </text>
      <text x={588} y={269} fontSize={9} textAnchor="end" className="fill-current font-mono">
        3 of 3 healthy
      </text>

      {/* Zone A: two healthy nodes + one failed */}
      <Node x={82} y={296} p={p} ping delay={DELAY[0]} />
      <Node x={146} y={296} p={p} ping delay={DELAY[1]} />
      <Node x={210} y={296} p={p} state="failed" />
      <Tick cx={100} y={286} p={p} />
      <Tick cx={164} y={286} p={p} />
      <Tick cx={228} y={286} p={p} failed />

      {/* Zone B: all healthy */}
      <Node x={392} y={296} p={p} ping delay={DELAY[2]} />
      <Node x={456} y={296} p={p} ping delay={DELAY[3]} />
      <Node x={520} y={296} p={p} ping delay={DELAY[4]} />
      <Tick cx={410} y={286} p={p} />
      <Tick cx={474} y={286} p={p} />
      <Tick cx={538} y={286} p={p} />

      {/* Failover: path is authored B→A so the reverse dash-flow travels A→B */}
      <path d="M392 318H246" stroke={p.brand} strokeWidth={1.5} className="anim-dash-flow-reverse" />
      <path d="M385 313l7 5-7 5" stroke={p.brand} strokeWidth={1.5} />
      <text x={319} y={309} fontSize={9} textAnchor="middle" className="fill-current font-mono" style={{ color: p.brand }}>
        failover
      </text>
    </svg>
  );
}
