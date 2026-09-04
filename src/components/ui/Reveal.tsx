"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's motion vocabulary.
 *
 * One easing curve and two durations carry everything: content enters on
 * transform and opacity together, and larger media and headings wipe in on
 * clip-path over roughly twice as long. Keeping the set this small is what
 * makes a page feel composed rather than busy — every element that moves is
 * moving the same way, so the eye reads the sequence instead of each animation.
 *
 * Nothing animates for a visitor who has asked their system for reduced
 * motion: each primitive checks, and renders the finished state directly.
 */

/** Roughly ease-out-quint. Fast to start, long settle. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Entering content. */
const ENTER: Transition = { duration: 0.55, ease: EASE };
/** Wipes and headline lines, which need room to read. */
const WIPE: Transition = { duration: 0.85, ease: EASE };

const VIEWPORT = { once: true, margin: "-80px" } as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
}

/** Fades and lifts content into view once, on scroll. */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) return <MotionTag className={className}>{children}</MotionTag>;

  const variants: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { ...ENTER, delay },
    },
  };

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers direct RevealItem children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A single item inside a RevealGroup. */
export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset[direction] },
        visible: { opacity: 1, x: 0, y: 0, transition: ENTER },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Headline lines rising out of their own baseline.
 *
 * Each line sits in its own clipping box, so the text appears to lift off the
 * line below it rather than simply fading. Lines are passed explicitly rather
 * than split from a string, because a break belongs to the writing — letting
 * the component guess where to break would put the fold in a different place
 * at every width.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 0.09,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        // The clipping box has to be a block so the inner span can be moved
        // out of it; `pb` leaves room for descenders, which would otherwise be
        // shaved off by the overflow.
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            data-reveal
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "108%" },
              visible: { y: "0%", transition: WIPE },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Uncovers content with a clip-path sweep rather than a fade — used for media
 * and framed panels, where a fade reads as the image loading slowly.
 */
export function RevealWipe({
  children,
  className,
  from = "bottom",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left";
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const closed =
    from === "bottom" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ clipPath: closed, opacity: 0.6 }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        transition: { ...WIPE, delay },
      }}
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
