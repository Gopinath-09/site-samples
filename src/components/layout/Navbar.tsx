"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { megaMenu } from "@/lib/site";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { ArrowRight, ArrowUpRight, ChevronDown, Close } from "@/components/ui/icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      // Hide when scrolling down (past a small threshold), reveal on scroll up.
      const goingDown = y > lastY.current && y > 140;
      setHidden(goingDown);
      // Scrolling down also closes the mega-menu (desktop).
      if (goingDown) setMegaOpen(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu when the route changes (safety net for navigations
  // that don't go through `go()`).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* The whole site sits on one surface, so the header only ever needs to
     decide whether it is flush (transparent) or floating (surface + shadow +
     hairline). Text colour never changes. */
  const solid = scrolled || megaOpen;

  // `exact` matches only the page itself (used for leaf links like "All
  // Services" so they don't stay active on child routes). Non-exact also
  // matches descendants (used for group headers).
  const isActive = (href: string, exact = false) =>
    href === "/"
      ? pathname === "/"
      : exact
        ? pathname === href
        : pathname === href || pathname.startsWith(href + "/");

  const go = (href: string) => {
    setMegaOpen(false);
    setMobileOpen(false);
    router.push(href);
  };

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const activeLinkClass =
    "border-brand/50 bg-brand-soft shadow-[inset_2px_0_0_var(--color-brand)]";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "border-b border-line bg-paper shadow-header" : "bg-transparent",
        // Hide on scroll-down / reveal on scroll-up (mobile + desktop).
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="container-page flex h-18 items-center justify-between py-4">
        {/* Desktop: logo = brand + hover trigger for the mega-menu */}
        <div
          className="hidden lg:block"
          onMouseEnter={openMega}
          onMouseLeave={scheduleClose}
        >
          <button
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            aria-label="Explore COBRR"
            className="flex cursor-pointer items-center gap-2.5"
          >
            <Logo />
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border border-line text-fg transition-transform duration-300",
                megaOpen && "rotate-180",
              )}
            >
              <ChevronDown width={15} height={15} />
            </span>
          </button>

          {/* Full-width mega panel — reveals top → bottom */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
                animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-full border-t border-line bg-paper"
              >
                <div className="container-page flex gap-10 py-10">
                  {/* "Home" feature tile */}
                  <button
                    onClick={() => go("/")}
                    className={cn(
                      "group relative flex w-64 shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-panel border border-line p-6 text-left transition-colors hover:border-fg/30",
                      isActive("/") && "border-brand/50",
                    )}
                  >
                    <div className="bg-grid absolute inset-0" aria-hidden />
                    <div className="relative">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        COBRR Tech Labs
                      </span>
                      <h3 className="mt-3 text-2xl font-bold text-fg">Home</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Enterprise software, AI and cloud — engineered to last.
                      </p>
                    </div>
                    <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                      Overview
                      <ArrowRight
                        width={16}
                        height={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </button>

                  {/* Section groups */}
                  <div className="grid flex-1 grid-cols-4 gap-8">
                    {megaMenu.map((group) => {
                      const groupActive = isActive(group.href);
                      return (
                        <div key={group.title}>
                          <button
                            onClick={() => go(group.href)}
                            className={cn(
                              "group flex cursor-pointer items-center gap-1.5 text-sm font-semibold uppercase tracking-widest transition-colors",
                              groupActive ? "text-brand" : "text-fg",
                            )}
                          >
                            {group.title}
                            <ArrowUpRight
                              width={14}
                              height={14}
                              className="text-brand opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </button>
                          <p className="mt-2 text-xs leading-relaxed text-muted">
                            {group.blurb}
                          </p>
                          <ul className="mt-4 space-y-1">
                            {group.links.map((link) => {
                              const active = isActive(link.href, true);
                              return (
                                <li key={link.href}>
                                  <button
                                    onClick={() => go(link.href)}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                      "w-full cursor-pointer border-l-2 px-3 py-2 text-left transition-colors",
                                      active
                                        ? activeLinkClass
                                        : "border-transparent hover:bg-elevate",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "block text-sm font-medium",
                                        active ? "text-brand" : "text-fg",
                                      )}
                                    >
                                      {link.label}
                                    </span>
                                    <span className="block text-xs text-muted">
                                      {link.desc}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA strip */}
                <div className="border-t border-line">
                  <div className="container-page flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
                    <p className="text-sm text-muted">
                      Have a project in mind? We reply within one business day.
                    </p>
                    <Button size="sm" href="/contact">
                      Start a project
                      <ArrowRight width={16} height={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: logo is the only drawer opener */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex cursor-pointer items-center gap-2 lg:hidden"
        >
          <Logo />
          <ChevronDown width={16} height={16} className="text-fg" />
        </button>

        {/* Right side: theme + CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            href="/contact"
            className={cn(
              "hidden w-36 justify-center lg:inline-flex",
              isActive("/contact") && "ring-2 ring-brand/50",
            )}
          >
            Contact us
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
      </nav>

      {/* Mobile drawer — slides from the right, 90% width, compact text */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-fg/25 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-50 flex h-svh w-[90%] max-w-sm flex-col border-l border-line bg-paper lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Logo size="sm" />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-fg"
                  >
                    <Close width={18} height={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <button
                  onClick={() => go("/")}
                  aria-current={isActive("/") ? "page" : undefined}
                  className={cn(
                    "mb-2 block w-full cursor-pointer border-l-2 px-3 py-2 text-left text-sm font-semibold transition-colors",
                    isActive("/")
                      ? cn(activeLinkClass, "text-brand")
                      : "border-transparent text-fg hover:bg-elevate",
                  )}
                >
                  Home
                </button>
                {megaMenu.map((group) => (
                  <div key={group.title} className="py-3">
                    <button
                      onClick={() => go(group.href)}
                      className="cursor-pointer px-3 text-[0.68rem] font-semibold uppercase tracking-widest text-brand"
                    >
                      {group.title}
                    </button>
                    <ul className="mt-1.5 space-y-2">
                      {group.links.map((link) => {
                        const active = isActive(link.href, true);
                        return (
                          <li key={link.href}>
                            <button
                              onClick={() => go(link.href)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "w-full cursor-pointer border-l-2 px-3 py-2 text-left transition-colors",
                                active
                                  ? activeLinkClass
                                  : "border-transparent hover:bg-elevate",
                              )}
                            >
                              <span
                                className={cn(
                                  "block text-[0.82rem] font-medium",
                                  active ? "text-brand" : "text-fg",
                                )}
                              >
                                {link.label}
                              </span>
                              <span className="block text-[0.7rem] text-muted">
                                {link.desc}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-line p-4">
                <Button size="sm" href="/contact" className="w-full">
                  Contact us
                  <ArrowRight width={16} height={16} />
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
