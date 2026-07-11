"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "light" | "outline" | "ghost-light";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  light: "btn-light",
  outline: "btn-outline",
  "ghost-light": "btn-ghost-light",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant;
  size?: Size;
  /** Internal route or external URL to navigate to on click. */
  href?: string;
  /** Open external links in the same tab by default (no right-click / new tab). */
  external?: boolean;
  /** Solid fill colour override (e.g. a hero slide's accent). Forces white text. */
  accentColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Primary interactive element for the site.
 *
 * Per the design brief every navigation is triggered by a real button click
 * (via the router) rather than an anchor tag — so there is no right-click /
 * "open in new tab" affordance. Use `href` for navigation or `onClick` for
 * custom behaviour.
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  accentColor,
  onClick,
  className,
  style,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !href) return;

    if (external || /^https?:\/\//.test(href) || href.startsWith("mailto:")) {
      window.location.href = href;
      return;
    }
    router.push(href);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn(
        "btn",
        !accentColor && variantClass[variant],
        sizeClass[size],
        className,
      )}
      style={
        accentColor
          ? { background: accentColor, color: "#fff", ...style }
          : style
      }
      {...rest}
    >
      {children}
    </button>
  );
}
