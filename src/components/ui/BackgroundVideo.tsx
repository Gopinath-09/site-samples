"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Ambient footage behind a section.
 *
 * Someone who has asked their system for reduced motion gets the poster frame
 * and nothing else: a looping background is exactly the kind of perpetual
 * movement that request is about, and it cannot be dismissed or paused the way
 * a video with controls can.
 *
 * The poster is also what everyone sees first — it is a fraction of the file
 * size, so the section has its final appearance before the video has finished
 * arriving, and if the video never arrives nothing looks broken.
 *
 * Decorative, so it is hidden from assistive technology.
 */
export default function BackgroundVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt=""
        aria-hidden
        className={className}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    );
  }

  return (
    <video
      aria-hidden
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
    />
  );
}
