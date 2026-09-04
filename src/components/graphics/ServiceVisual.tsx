import type { Service } from "@/lib/content";

/**
 * The illustration at the top of each service card in the home page bento.
 *
 * Each one is drawn rather than rendered, for the same reason as the hero: no
 * asset to commission, nothing to keep in sync with the brand, and it recolours
 * with the tokens. They are all decorative — the card's heading and description
 * carry the meaning — so every one is hidden from assistive technology.
 */

const STROKE = "rgba(155, 200, 255, 0.30)";
const STROKE_SOFT = "rgba(155, 200, 255, 0.14)";
const GLOW = "#5b83ff";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 150"
      aria-hidden
      focusable="false"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

/** Concentric enclosures around a lit core. */
function AiVisual() {
  return (
    <Frame>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={160 - 26 - i * 17}
          y={75 - 26 - i * 17}
          width={52 + i * 34}
          height={52 + i * 34}
          rx={12 + i * 5}
          fill="none"
          stroke={i === 0 ? STROKE : STROKE_SOFT}
          strokeWidth="1"
        />
      ))}
      <rect x={134} y={49} width={52} height={52} rx={12} fill="rgba(91,131,255,0.08)" />
      <text
        x={160}
        y={82}
        textAnchor="middle"
        fill="#9bb6ff"
        fontFamily="var(--font-mono)"
        fontSize="20"
        fontWeight="500"
      >
        AI
      </text>
    </Frame>
  );
}

/** A honeycomb of platform cells — the stack, without naming logos we'd have to license. */
function StackVisual() {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");

  const R = 30;
  const dx = R * Math.sqrt(3);
  const cells: { x: number; y: number; lit: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      cells.push({
        x: 18 + col * dx + (row % 2 ? dx / 2 : 0),
        y: 18 + row * R * 1.5,
        lit: (row * 7 + col) % 5 === 0 ? 1 : 0,
      });
    }
  }

  return (
    <Frame>
      <defs>
        <radialGradient id="sv-hex" cx="42%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2c5f96" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0b1424" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="150" fill="url(#sv-hex)" />
      {cells.map((c, i) => (
        <polygon
          key={i}
          points={hex(c.x, c.y, R - 2)}
          fill={c.lit ? "rgba(91,131,255,0.10)" : "rgba(255,255,255,0.015)"}
          stroke={c.lit ? STROKE : STROKE_SOFT}
          strokeWidth="1"
        />
      ))}
    </Frame>
  );
}

/** Nodes converging on a single deployment target. */
function CloudVisual() {
  const nodes = [
    { x: 60, y: 40 },
    { x: 60, y: 110 },
    { x: 118, y: 75 },
  ];
  return (
    <Frame>
      {nodes.map((n, i) => (
        <line
          key={i}
          x1={n.x}
          y1={n.y}
          x2={190}
          y2={75}
          stroke={STROKE_SOFT}
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <rect
          key={`n${i}`}
          x={n.x - 22}
          y={n.y - 12}
          width={44}
          height={24}
          rx={6}
          fill="rgba(255,255,255,0.03)"
          stroke={STROKE_SOFT}
          strokeWidth="1"
        />
      ))}
      <circle cx={190} cy={75} r={30} fill="rgba(91,131,255,0.10)" stroke={STROKE} strokeWidth="1" />
      <circle cx={190} cy={75} r={5} fill={GLOW} />
      <circle cx={190} cy={75} r={46} fill="none" stroke={STROKE_SOFT} strokeWidth="1" />
    </Frame>
  );
}

/** Two handsets, one behind the other. */
function MobileVisual() {
  return (
    <Frame>
      <rect x={122} y={26} width={62} height={104} rx={12} fill="rgba(255,255,255,0.02)" stroke={STROKE_SOFT} strokeWidth="1" />
      <rect x={152} y={16} width={66} height={118} rx={13} fill="rgba(11,20,36,0.9)" stroke={STROKE} strokeWidth="1" />
      <rect x={172} y={24} width={26} height={4} rx={2} fill={STROKE_SOFT} />
      {[44, 60, 76].map((y) => (
        <rect key={y} x={162} y={y} width={46} height={6} rx={3} fill="rgba(255,255,255,0.06)" />
      ))}
      <rect x={162} y={96} width={46} height={20} rx={6} fill="rgba(91,131,255,0.18)" stroke={STROKE} strokeWidth="1" />
    </Frame>
  );
}

/** A component with its states — the thing a design system actually ships. */
function DesignVisual() {
  return (
    <Frame>
      <rect x={78} y={30} width={164} height={90} rx={10} fill="rgba(11,20,36,0.92)" stroke={STROKE} strokeWidth="1" />
      <rect x={104} y={46} width={112} height={7} rx={3.5} fill="rgba(255,255,255,0.30)" />
      <rect x={92} y={62} width={136} height={5} rx={2.5} fill="rgba(255,255,255,0.10)" />
      <line x1={78} y1={84} x2={242} y2={84} stroke={STROKE_SOFT} strokeWidth="1" />
      <line x1={160} y1={84} x2={160} y2={120} stroke={STROKE_SOFT} strokeWidth="1" />
      <text x={119} y={106} textAnchor="middle" fill="rgba(155,182,255,0.75)" fontFamily="var(--font-mono)" fontSize="9">
        Default
      </text>
      <text x={201} y={106} textAnchor="middle" fill="#9bb6ff" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600">
        Bold
      </text>
    </Frame>
  );
}

/** A curve climbing to a lit point — effort falling, output rising. */
function TransformVisual() {
  const d = "M 40 120 C 90 118, 108 96, 140 88 C 176 79, 196 52, 236 34";
  return (
    <Frame>
      <defs>
        <linearGradient id="sv-curve" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={GLOW} stopOpacity="0.15" />
          <stop offset="100%" stopColor="#9bdcff" stopOpacity="1" />
        </linearGradient>
        <filter id="sv-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      {[36, 66, 96, 126].map((y) => (
        <line key={y} x1={30} y1={y} x2={280} y2={y} stroke={STROKE_SOFT} strokeWidth="0.75" />
      ))}
      <path d={d} fill="none" stroke="url(#sv-curve)" strokeWidth="10" filter="url(#sv-blur)" opacity="0.7" />
      <path d={d} fill="none" stroke="url(#sv-curve)" strokeWidth="2" strokeLinecap="round" />
      <circle cx={236} cy={34} r={12} fill="rgba(155,220,255,0.16)" />
      <circle cx={236} cy={34} r={4.5} fill="#cfe9ff" />
    </Frame>
  );
}

const VISUALS: Record<Service["visual"], () => React.ReactElement> = {
  ai: AiVisual,
  stack: StackVisual,
  cloud: CloudVisual,
  mobile: MobileVisual,
  design: DesignVisual,
  transform: TransformVisual,
};

export default function ServiceVisual({ kind }: { kind: Service["visual"] }) {
  const Visual = VISUALS[kind];
  return <Visual />;
}
