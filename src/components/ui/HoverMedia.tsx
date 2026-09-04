"use client";

import { useRef } from "react";
import RoadmapVisual from "@/components/graphics/RoadmapVisual";

/**
 * The media layer that appears when a cell is hovered.
 *
 * Sits behind the cell's text and is invisible until the pointer arrives, which
 * is the whole effect: an otherwise quiet grid comes alive one cell at a time.
 * A gradient scrim sits over the media so the heading and copy stay readable
 * whatever is playing underneath.
 *
 * Give it `video` and it plays that file, starting only on hover so a grid of
 * these does not decode a dozen streams at once. Without one it falls back to
 * the drawn panel, which animates on hover through the same CSS the roadmap
 * uses. The fallback is not a stand-in for missing footage so much as the
 * honest state: none of these has a running product to film yet.
 *
 * Purely decorative, so it is hidden from assistive technology — the cell's
 * heading and description carry everything a screen reader needs.
 */
export default function HoverMedia({
  video,
  seed = 0,
}: {
  /** Path under `public/`, e.g. `/roadmap/ai-agents.mp4`. */
  video?: string;
  seed?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      aria-hidden
      onMouseEnter={() => {
        const el = ref.current;
        if (!el) return;
        // A rejected play() is normal — autoplay policy, or the pointer left
        // before the file was ready. There is nothing useful to do about it.
        void el.play().catch(() => {});
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.pause();
        el.currentTime = 0;
      }}
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
    >
      {video ? (
        <video
          ref={ref}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <RoadmapVisual seed={seed} />
      )}

      {/* Scrim: the text sits on top of this, so it has to stay readable */}
      <div className="absolute inset-0 bg-linear-to-t from-paper via-paper/80 to-paper/30" />
    </div>
  );
}
