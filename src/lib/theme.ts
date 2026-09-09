"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "./theme-constants";

/**
 * Tiny theme store. The source of truth is the `data-theme` attribute on
 * <html> (set before first paint by `ThemeScript`); this module lets React
 * components read and change it without a provider.
 */

export type { Theme };
export { THEME_STORAGE_KEY };

const listeners = new Set<() => void>();

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode) — the attribute still applies */
  }
  listeners.forEach((l) => l());
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

const getServerTheme = (): Theme => "light";

/** Current theme, kept in sync with the <html> attribute. SSR renders "light". */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, getServerTheme);
}
