"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import { useTheme } from "@/lib/theme";

/**
 * Client-side providers for the whole app.
 *  - MotionConfig reducedMotion="user": every Framer animation (including the
 *    JS-driven marquees) honours prefers-reduced-motion.
 *  - Toaster follows the active theme.
 */
export default function Providers({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster richColors position="top-center" theme={theme} />
    </MotionConfig>
  );
}
