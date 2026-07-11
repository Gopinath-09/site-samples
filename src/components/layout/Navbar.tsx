"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { megaMenu } from "@/lib/site";
import Button from "@/components/ui/Button";
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

  // Solid (sand) header when scrolled or the mega-menu is open.
  const solid = scrolled || megaOpen;
  const dark = solid; // dark text/logo on the light (sand) header

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-sand shadow-[0_10px_30px_-24px_rgba(10,14,26,0.5)]" : "bg-transparent",
        // Hide on scroll-down / reveal on scroll-up (mobile + desktop).
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="container-page flex h-18 items-center justify-between py-4">
        {/* Desktop: "Explore COBRR" wordmark = brand + hover trigger */}
        <div
          className="hidden lg:block"
          onMouseEnter={openMega}
          onMouseLeave={scheduleClose}
        >
          <button
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            className={cn(
              "flex cursor-pointer items-center gap-2 text-lg font-bold tracking-tight transition-colors",
              dark ? "text-ink" : "text-white",
            )}
          >
            <span>
              {/* Explore{" "} */}
              <span  className={cn(dark ? "text-ink" : "text-white","tracking-[0.12em] text-2xl font-extrabold")}>COBRR</span>
            </span>
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300",
                dark ? "border-line" : "border-white/30",
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
                className="absolute inset-x-0 top-full border-t border-line bg-sand"
              >
                <div className="container-page flex gap-10 py-10">
                  {/* Professional "Home" feature tile */}
                  <button
                    onClick={() => go("/")}
                    className={cn(
                      "group flex w-64 cursor-pointer shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-left text-white transition-shadow",
                      isActive("/") && "ring-2 ring-brand ring-offset-2 ring-offset-sand",
                    )}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                        COBRR Tech Labs
                      </span>
                      <h3 className="mt-3 text-2xl font-bold">Home</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Enterprise software, AI and cloud — engineered to last.
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors group-hover:text-white">
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
                              groupActive ? "text-brand" : "text-ink",
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
                                        ? "border-brand/40 bg-linear-to-r from-brand-soft to-transparent shadow-[inset_2px_0_0_var(--color-brand)]"
                                        : "border-transparent hover:bg-sand",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "block text-sm font-medium",
                                        active ? "text-brand" : "text-ink",
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
                <div className="border-t border-line/70 bg-sand-deep/50">
                  <div className="container-page flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
                    <p className="text-sm text-muted">
                      Have a project in mind? We reply within one business day.
                    </p>
                    <Button size="sm" variant="primary" href="/contact">
                      Start a project
                      <ArrowRight width={16} height={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: "Explore COBRR" wordmark is the only opener */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className={cn(
            "flex items-center gap-2 text-base font-bold tracking-tight lg:hidden",
            dark ? "text-ink" : "text-white",
          )}
        >
          {/* Explore  */}<span className="tracking-[0.12em] text-2xl font-extrabold">COBRR</span>
          <ChevronDown width={16} height={16} />
        </button>

        {/* Desktop CTAs — equal width */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* <Button
            variant={dark ? "outline" : "ghost-light"}
            size="sm"
            href="/careers"
            className={cn(
              "w-36 justify-center",
              isActive("/careers") && "ring-2 ring-brand/50",
            )}
          >
            Careers
          </Button> */}
          <Button
            variant={dark ? "primary" : "light"}
            size="sm"
            href="/contact"
            className={cn(
              "w-36 justify-center",
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
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-50 flex h-svh w-[90%] max-w-sm flex-col bg-paper shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-end border-b border-line px-5 py-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
                >
                  <Close width={18} height={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <button
                  onClick={() => go("/")}
                  aria-current={isActive("/") ? "page" : undefined}
                  className={cn(
                    "mb-2 block w-full cursor-pointer border-l-2 px-3 py-2 text-left text-sm font-semibold transition-colors",
                    isActive("/")
                      ? "border-brand/40 bg-linear-to-r from-brand-soft to-transparent text-brand shadow-[inset_2px_0_0_var(--color-brand)]"
                      : "border-transparent text-ink hover:bg-sand",
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
                                  ? "border-brand/40 bg-linear-to-r from-brand-soft to-transparent shadow-[inset_2px_0_0_var(--color-brand)]"
                                  : "border-transparent hover:bg-sand",
                              )}
                            >
                              <span
                                className={cn(
                                  "block text-[0.82rem] font-medium",
                                  active ? "text-brand" : "text-ink",
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
                {/* <Button variant="outline" size="sm" href="/careers" className="w-full">
                  Careers
                </Button> */}
                <Button variant="primary" size="sm" href="/contact" className="w-full">
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
