/**
 * The luminous scene grounding the hero.
 *
 * The reference for this hero used a rendered 3D image. That would mean an
 * asset to commission, ship and keep in sync with the brand, so the scene is
 * drawn instead: a lit structure with smaller forms scattered around it and a
 * light path sweeping between them.
 *
 * The composition is deliberately off-centre. A symmetrical scene sits under
 * the headline like a footnote; pushing the mass right of centre and running
 * the path diagonally across it gives the band somewhere to travel, which is
 * what the reference is doing with its perspective.
 *
 * Everything here is decorative, so the whole drawing is hidden from assistive
 * technology — it carries no information the surrounding text does not.
 */

type Chip = {
  cx: number;
  cy: number;
  /** Half-width and half-depth of the isometric top face. */
  w: number;
  d: number;
  /** Extrusion depth of the side walls. */
  h: number;
  /** 0–1, scales how brightly this form is lit. */
  lit: number;
};

/* Clustered right of centre, thinning out to the left along the path. */
const CHIPS: Chip[] = [
  { cx: 880, cy: 96, w: 118, d: 59, h: 24, lit: 1 },
  { cx: 1088, cy: 150, w: 64, d: 32, h: 15, lit: 0.7 },
  { cx: 690, cy: 168, w: 52, d: 26, h: 13, lit: 0.5 },
  { cx: 1252, cy: 196, w: 44, d: 22, h: 11, lit: 0.45 },
  { cx: 468, cy: 206, w: 36, d: 18, h: 10, lit: 0.32 },
  { cx: 262, cy: 236, w: 26, d: 13, h: 8, lit: 0.22 },
];

/** Top face as an isometric rhombus. */
const topFace = ({ cx, cy, w, d }: Chip) =>
  `${cx},${cy - d} ${cx + w},${cy} ${cx},${cy + d} ${cx - w},${cy}`;

const leftFace = ({ cx, cy, w, d, h }: Chip) =>
  `${cx - w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx - w},${cy + h}`;

const rightFace = ({ cx, cy, w, d, h }: Chip) =>
  `${cx + w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx + w},${cy + h}`;

/* Sweeps up from the lower left, passes beneath the lit structure, and runs off
   to the right — the diagonal the reference gets from its camera angle. */
const PATH =
  "M -60 268 C 240 262, 420 232, 640 206 C 820 184, 980 138, 1180 128 C 1320 121, 1400 126, 1500 118";

export default function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 300"
      aria-hidden
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        {/* Key light, sitting behind and to the right of the main structure */}
        <radialGradient id="hs-key" cx="62%" cy="30%" r="52%">
          <stop offset="0%" stopColor="#3a3a42" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#17171b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="hs-path" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9962f" stopOpacity="0" />
          <stop offset="28%" stopColor="#e3b964" stopOpacity="0.7" />
          <stop offset="58%" stopColor="#f5e2b8" stopOpacity="1" />
          <stop offset="100%" stopColor="#e3b964" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="hs-top" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#1d1b16" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0a0a0d" stopOpacity="0.95" />
        </linearGradient>

        <filter id="hs-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id="hs-blur-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Ambient key light */}
      <ellipse cx="890" cy="110" rx="620" ry="185" fill="url(#hs-key)" />

      {/* Light path — a blurred pass beneath a crisp one, so it glows */}
      <path
        d={PATH}
        fill="none"
        stroke="url(#hs-path)"
        strokeWidth="18"
        filter="url(#hs-blur)"
        opacity="0.7"
      />
      <path
        d={PATH}
        fill="none"
        stroke="url(#hs-path)"
        strokeWidth="1.75"
      />

      {CHIPS.map((chip, i) => {
        const edge = `rgba(245, 226, 184, ${0.22 + chip.lit * 0.6})`;
        return (
          <g key={i}>
            {/* Glow pooling beneath the form */}
            <ellipse
              cx={chip.cx}
              cy={chip.cy + chip.d + chip.h + 12}
              rx={chip.w * 1.25}
              ry={chip.d * 0.6}
              fill="#c9962f"
              opacity={0.18 * chip.lit}
              filter="url(#hs-blur-sm)"
            />

            <polygon points={leftFace(chip)} fill="#080703" opacity="0.95" />
            <polygon points={rightFace(chip)} fill="#0d0b07" opacity="0.95" />

            <polygon
              points={topFace(chip)}
              fill="url(#hs-top)"
              stroke={edge}
              strokeWidth="1"
            />

            {/* Traces across the top face */}
            <line
              x1={chip.cx - chip.w * 0.5}
              y1={chip.cy - chip.d * 0.5}
              x2={chip.cx + chip.w * 0.5}
              y2={chip.cy + chip.d * 0.5}
              stroke={edge}
              strokeWidth="0.75"
              opacity="0.45"
            />
            <line
              x1={chip.cx - chip.w * 0.5}
              y1={chip.cy + chip.d * 0.5}
              x2={chip.cx + chip.w * 0.5}
              y2={chip.cy - chip.d * 0.5}
              stroke={edge}
              strokeWidth="0.75"
              opacity="0.28"
            />

            {/* Lit front edges */}
            <line
              x1={chip.cx - chip.w}
              y1={chip.cy + chip.h}
              x2={chip.cx}
              y2={chip.cy + chip.d + chip.h}
              stroke={edge}
              strokeWidth="1"
              opacity="0.65"
            />
            <line
              x1={chip.cx + chip.w}
              y1={chip.cy + chip.h}
              x2={chip.cx}
              y2={chip.cy + chip.d + chip.h}
              stroke={edge}
              strokeWidth="1"
              opacity="0.65"
            />

            {/*
              The largest form carries a lattice on its top face, which is what
              reads as detail at this scale. Both families run between points on
              opposite edges of the rhombus — parametrising from the centre
              instead lets the lines escape the shape, which is exactly what the
              first attempt did.
            */}
            {i === 0 &&
              [0.2, 0.4, 0.6, 0.8].map((t) => (
                <g key={t} opacity="0.3">
                  {/* Parallel to the left-to-bottom edge */}
                  <line
                    x1={chip.cx - chip.w * (1 - t)}
                    y1={chip.cy - chip.d * t}
                    x2={chip.cx + chip.w * t}
                    y2={chip.cy + chip.d * (1 - t)}
                    stroke={edge}
                    strokeWidth="0.5"
                  />
                  {/* Parallel to the top-to-left edge */}
                  <line
                    x1={chip.cx + chip.w * t}
                    y1={chip.cy - chip.d * (1 - t)}
                    x2={chip.cx - chip.w * (1 - t)}
                    y2={chip.cy + chip.d * t}
                    stroke={edge}
                    strokeWidth="0.5"
                  />
                </g>
              ))}
          </g>
        );
      })}
    </svg>
  );
}
