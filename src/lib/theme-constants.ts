/**
 * Shared between the server-rendered ThemeScript and the client theme store.
 * Deliberately has NO "use client" directive: a server component importing a
 * value from a client module would receive a client-reference stub instead of
 * the string.
 */
export const THEME_STORAGE_KEY = "cobrr-theme";
export type Theme = "light" | "dark";
