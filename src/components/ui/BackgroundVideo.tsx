"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient footage behind a section, looping continuously.
 *
 * ACCESSIBILITY NOTE — this deliberately does *not* honour
 * `prefers-reduced-motion`, at the site owner's explicit direction. Two earlier
 * versions did: the first hid the video and swapped in a poster image (which
 * left the band empty once the poster file was deleted), the second paused it
 * on its first frame. Both were reported as "the video is not working", because
 * the machine reviewing the site has Reduced Motion switched on.
 *
 * The trade-off being accepted: visitors who have asked their system to reduce
 * motion will still get a permanently moving background they cannot pause. If
 * that is ever revisited, the fix is to pause rather than hide — a still frame
 * satisfies the request without risking a blank section.
 *
 * Playback is defended rather than assumed. `muted` is set as a property (React
 * does not reliably set it before autoplay is attempted, and an unmuted video
 * is refused), a rejected play is retried on `canplay`, and `pause`/`ended` are
 * watched so a stall while buffering cannot silently end the loop.
 *
 * Decorative, so it is hidden from assistive technology.
 */
export default function BackgroundVideo({
  src,
  poster,
  className,
  playbackRate = 1,
}: {
  src: string;
  /** Optional. Shown before the first frame decodes; the section works without it. */
  poster?: string;
  className?: string;
  /**
   * Playback speed. Below 1 slows the footage down — but note that this holds
   * each source frame on screen for longer rather than generating new ones, so
   * the effective frame rate drops in direct proportion:
   *
   *     shown fps = source fps × playbackRate
   *
   * A 25fps clip at 0.35 shows under 9 frames a second, which reads as stepped
   * or "robotic". Keep the product above roughly 20fps for smooth motion; to go
   * genuinely slower than that, re-encode the clip slowed down instead, so the
   * file itself carries the extra frames.
   */
  playbackRate?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    /*
     * Set `muted` as a DOM property, not just a JSX attribute. React renders
     * `muted` into the HTML but does not reliably set the property before the
     * element tries to autoplay, and an unmuted video is refused autoplay by
     * every browser. Without this the play() below rejects and — because the
     * rejection is swallowed — the section silently shows the poster forever.
     */
    video.muted = true;

    const start = () =>
      video.play().catch(() => {
        /* Autoplay can be refused before the first frame is decoded.
           Retry once the browser says it can play. */
        video.addEventListener("canplay", () => video.play().catch(() => {}), {
          once: true,
        });
      });

    start();

    /*
     * Restart only on `ended` and on becoming visible again.
     *
     * An earlier version also restarted on every `pause`, which was actively
     * harmful: a large clip pauses itself constantly while it rebuffers, and
     * calling play() into a stall produces a start-stop stutter far worse than
     * the pause it was trying to correct. The `loop` attribute already handles
     * the normal wrap; this is only a backstop for the case where it does not
     * fire because the source was still loading.
     */
    const onEnded = () => {
      video.currentTime = 0;
      start();
    };
    const onVisible = () => {
      if (document.visibilityState === "visible" && video.paused) start();
    };

    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  /*
   * `playbackRate` is reset to 1 whenever a new source finishes loading, so it
   * has to be reapplied on `loadedmetadata` rather than set once on mount.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const apply = () => {
      video.playbackRate = playbackRate;
    };

    apply();
    video.addEventListener("loadedmetadata", apply);
    return () => video.removeEventListener("loadedmetadata", apply);
  }, [playbackRate]);

  return (
    <video
      ref={videoRef}
      aria-hidden
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      /*
       * `auto` rather than `metadata`: with only metadata requested the browser
       * may hold off fetching frames until playback is forced, which leaves the
       * band empty on a slow connection and entirely empty when playback is
       * suppressed for reduced motion.
       */
      preload="auto"
      className={className}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
    />
  );
}
