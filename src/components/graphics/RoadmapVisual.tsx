/**
 * The panel beside each roadmap row.
 *
 * The reference plays footage of the product here on hover. Every one of these
 * directions is in development, so there is nothing to film — and dropping in
 * unrelated stock video would read as product footage, which is a claim rather
 * than a placeholder. The panel is drawn instead, and comes alive on hover:
 * the trace runs, the rows fill, the cursor moves. It reads as a system doing
 * something without asserting that it is any particular system.
 *
 * When a direction does have a running product, put the file in
 * `public/roadmap/` and set `video` on the record; the row plays that instead
 * and this is never rendered.
 *
 * Everything here is decorative and hidden from assistive technology; the row's
 * heading and copy carry the meaning.
 */

const STROKE = "rgba(155, 200, 255, 0.28)";
const SOFT = "rgba(155, 200, 255, 0.12)";

export default function RoadmapVisual({ seed = 0 }: { seed?: number }) {
  // Small deterministic variation so adjacent rows do not look identical.
  const bars = [0.82, 0.58, 0.7, 0.44, 0.66].map(
    (b, i) => b * (0.85 + ((seed + i) % 3) * 0.075),
  );

  return (
    <svg
      viewBox="0 0 420 240"
      aria-hidden
      focusable="false"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`rv-glow-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5b83ff" stopOpacity="0" />
          <stop offset="55%" stopColor="#9bdcff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#5b83ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`rv-bg-${seed}`} cx="35%" cy="18%" r="85%">
          <stop offset="0%" stopColor="#1b3f68" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="420" height="240" fill={`url(#rv-bg-${seed})`} />

      {/* Window chrome */}
      <g opacity="0.75">
        <line x1="0" y1="34" x2="420" y2="34" stroke={SOFT} strokeWidth="1" />
        {[22, 36, 50].map((cx) => (
          <circle key={cx} cx={cx} cy={18} r="3.5" fill={SOFT} />
        ))}
      </g>

      {/* Sidebar */}
      <line x1="96" y1="34" x2="96" y2="240" stroke={SOFT} strokeWidth="1" />
      {[54, 74, 94, 114].map((y, i) => (
        <rect
          key={y}
          x="20"
          y={y}
          width={i === 1 ? 58 : 44}
          height="6"
          rx="3"
          fill={i === 1 ? "rgba(91,131,255,0.45)" : SOFT}
        />
      ))}

      {/* Content rows — these fill on hover */}
      {bars.map((w, i) => (
        <g key={i}>
          <rect
            x="120"
            y={58 + i * 30}
            width={270}
            height="8"
            rx="4"
            fill="rgba(255,255,255,0.05)"
          />
          <rect
            className="rv-bar"
            style={{ animationDelay: `${i * 90}ms` }}
            x="120"
            y={58 + i * 30}
            width={270 * w}
            height="8"
            rx="4"
            fill="rgba(155,200,255,0.35)"
          />
        </g>
      ))}

      {/* The trace that runs across on hover */}
      <path
        className="rv-trace"
        d="M120 216 C 190 216, 220 196, 268 194 C 322 192, 350 206, 396 202"
        fill="none"
        stroke={`url(#rv-glow-${seed})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle className="rv-dot" cx="120" cy="216" r="3.5" fill="#cfe9ff" />

      {/* Frame */}
      <rect
        x="0.5"
        y="0.5"
        width="419"
        height="239"
        fill="none"
        stroke={STROKE}
        strokeWidth="1"
      />
    </svg>
  );
}
