"use client";

import { useEffect, useRef } from "react";
import RoadmapVisual from "@/components/graphics/RoadmapVisual";

/**
 * The media layer that appears when a cell is hovered.
 *
 * Sits behind the cell's text and is invisible until the pointer arrives, which
 * is the whole effect: an otherwise quiet grid comes alive one cell at a time.
 * A gradient scrim sits over the media so the heading and copy stay readable
 * whatever is playing underneath.
 *
 * Playback starts on hover rather than on load, so a grid of these never
 * decodes a dozen streams at once. Without a `video` it falls back to the drawn
 * panel, which animates through the same CSS the roadmap uses.
 *
 * Purely decorative, so it is hidden from assistive technology — the cell's
 * heading and description carry everything a screen reader needs.
 */
export default function HoverMedia({
  video,
  seed = 0,
}: {
  /** Path under `public/`, e.g. `/roadmap/placeholder-flow.mp4`. */
  video?: string;
  seed?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  /*
   * The listeners go on the hovered ancestor, not on this layer.
   * This layer is `pointer-events-none` so it cannot swallow the click meant
   * for the card, and an element that takes no pointer events also receives no
   * mouseenter — handlers here would simply never fire.
   */
  useEffect(() => {
    const el = ref.current;
    const host = el?.closest(".group");
    if (!el || !host) return;

    // A rejected play() is normal: autoplay policy, or the pointer left before
    // the file was ready. There is nothing useful to do about it.
    const play = () => void el.play().catch(() => {});
    const stop = () => {
      el.pause();
      el.currentTime = 0;
    };

    host.addEventListener("mouseenter", play);
    host.addEventListener("mouseleave", stop);
    return () => {
      host.removeEventListener("mouseenter", play);
      host.removeEventListener("mouseleave", stop);
    };
  }, [video]);

  return (
    <div
      aria-hidden
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
