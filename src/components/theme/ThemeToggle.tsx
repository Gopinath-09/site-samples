"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toggleTheme, useTheme } from "@/lib/theme";
import { Moon, Sun } from "@/components/ui/icons";

/**
 * Light / dark switch. A round icon button whose icon rotates in on change.
 * The site has one surface everywhere, so it needs no per-surface tone.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={cn(
        "relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-line text-fg transition-colors hover:bg-elevate",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isDark ? <Sun width={16} height={16} /> : <Moon width={16} height={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
