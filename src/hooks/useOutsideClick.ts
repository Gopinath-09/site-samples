"use client";

import { useEffect, type RefObject } from "react";

/**
 * Calls `handler` when a pointer goes down anywhere outside `ref`.
 *
 * Listens for `mousedown` and `touchstart` rather than `click`, so a dialog
 * closes on the press rather than waiting for the release — and so it works on
 * touch, where a `click` only arrives after a delay.
 *
 * The listener is only attached while `active` is true. A modal that is closed
 * has no reason to be measuring every press on the page.
 */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  active = true,
) {
  useEffect(() => {
    if (!active) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [ref, handler, active]);
}

export default useOutsideClick;
