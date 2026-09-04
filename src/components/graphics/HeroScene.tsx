/**
 * The luminous scene grounding the hero.
 *
 * The reference for this hero used a rendered 3D image. That would mean an
 * asset to commission, ship and keep in sync with the brand, so the scene is
 * drawn instead: isometric chip forms on a dark plane with a light path sweeping
 * between them. It costs nothing to load, stays sharp at any width, and recolours
 * with the design tokens rather than needing a re-render.
 *
 * Everything here is decorative, so the whole drawing is hidden from assistive
 * technology — it carries no information the surrounding text does not.
 */

type Chip = {
  /** Centre of the top face. */
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

/*
 * Kept deliberately small and low. The scene is the floor of the composition,
 * not its subject: at larger sizes the forms compete with the statement above
 * and push the fact strip off the fold.
 */
const CHIPS: Chip[] = [
  { cx: 720, cy: 128, w: 104, d: 52, h: 20, lit: 1 },
  { cx: 512, cy: 178, w: 66, d: 33, h: 15, lit: 0.55 },
  { cx: 934, cy: 166, w: 54, d: 27, h: 13, lit: 0.7 },
  { cx: 320, cy: 222, w: 40, d: 20, h: 11, lit: 0.4 },
  { cx: 1128, cy: 214, w: 46, d: 23, h: 12, lit: 0.45 },
];

/** Top face as an isometric rhombus. */
function topFace({ cx, cy, w, d }: Chip) {
  return `${cx},${cy - d} ${cx + w},${cy} ${cx},${cy + d} ${cx - w},${cy}`;
}

/** Left wall, dropping from the rhombus. */
function leftFace({ cx, cy, w, d, h }: Chip) {
  return `${cx - w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx - w},${cy + h}`;
}

/** Right wall, catching slightly more light than the left. */
function rightFace({ cx, cy, w, d, h }: Chip) {
  return `${cx + w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx + w},${cy + h}`;
}

export default function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 280"
      aria-hidden
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        {/* Horizon light behind the forms */}
        <radialGradient id="hs-horizon" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#2b6ea8" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#12325a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#070a14" stopOpacity="0" />
        </radialGradient>

        {/* The sweeping light path */}
        <linearGradient id="hs-path" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="30%" stopColor="#5bc8ff" stopOpacity="0.85" />
          <stop offset="62%" stopColor="#9bdcff" stopOpacity="1" />
          <stop offset="100%" stopColor="#5b83ff" stopOpacity="0" />
        </linearGradient>

        {/* Top faces read as polished glass */}
        <linearGradient id="hs-top" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#1b3f68" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0b1830" stopOpacity="0.95" />
        </linearGradient>

        <filter id="hs-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="hs-blur-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Ambient horizon */}
      <ellipse cx="720" cy="120" rx="640" ry="160" fill="url(#hs-horizon)" />

      {/* Light path — a blurred pass under a crisp one, so it glows */}
      <path
        d="M -40 252 C 300 252, 430 172, 720 170 C 1010 168, 1150 214, 1480 206"
        fill="none"
        stroke="url(#hs-path)"
        strokeWidth="16"
        filter="url(#hs-blur)"
        opacity="0.75"
      />
      <path
        d="M -40 252 C 300 252, 430 172, 720 170 C 1010 168, 1150 214, 1480 206"
        fill="none"
        stroke="url(#hs-path)"
        strokeWidth="1.75"
      />

      {CHIPS.map((chip, i) => {
        const edge = `rgba(155, 220, 255, ${0.25 + chip.lit * 0.6})`;
        return (
          <g key={i}>
            {/* Glow pooling beneath the form */}
            <ellipse
              cx={chip.cx}
              cy={chip.cy + chip.d + chip.h + 10}
              rx={chip.w * 1.15}
              ry={chip.d * 0.55}
              fill="#4aa8e0"
              opacity={0.16 * chip.lit}
              filter="url(#hs-blur-sm)"
            />

            {/* Walls, left darker than right */}
            <polygon points={leftFace(chip)} fill="#070c18" opacity="0.95" />
            <polygon points={rightFace(chip)} fill="#0c1526" opacity="0.95" />

            {/* Top face */}
            <polygon
              points={topFace(chip)}
              fill="url(#hs-top)"
              stroke={edge}
              strokeWidth="1"
            />

            {/* Traces across the top face, echoing the grid behind */}
            <line
              x1={chip.cx - chip.w * 0.5}
              y1={chip.cy - chip.d * 0.5}
              x2={chip.cx + chip.w * 0.5}
              y2={chip.cy + chip.d * 0.5}
              stroke={edge}
              strokeWidth="0.75"
              opacity="0.5"
            />
            <line
              x1={chip.cx - chip.w * 0.5}
              y1={chip.cy + chip.d * 0.5}
              x2={chip.cx + chip.w * 0.5}
              y2={chip.cy - chip.d * 0.5}
              stroke={edge}
              strokeWidth="0.75"
              opacity="0.32"
            />

            {/* Lit front edges */}
            <line
              x1={chip.cx - chip.w}
              y1={chip.cy + chip.h}
              x2={chip.cx}
              y2={chip.cy + chip.d + chip.h}
              stroke={edge}
              strokeWidth="1"
              opacity="0.7"
            />
            <line
              x1={chip.cx + chip.w}
              y1={chip.cy + chip.h}
              x2={chip.cx}
              y2={chip.cy + chip.d + chip.h}
              stroke={edge}
              strokeWidth="1"
              opacity="0.7"
            />
          </g>
        );
      })}

          </svg>
  );
}
