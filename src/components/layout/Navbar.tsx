"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { primaryNav, megaMenu, megaFeature } from "@/lib/site";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";
import { ArrowRight, ArrowUpRight, Close, Menu as MenuIcon } from "@/components/ui/icons";

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
      setScrolled(y > 30);
      const goingDown = y > lastY.current && y > 160;
      setHidden(goingDown);
      if (goingDown) setMegaOpen(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Close both menus whenever the route changes — including back/forward
   * navigation, which never goes through `go()`. Adjusting state during render
   * rather than in an effect avoids a second render pass with the menu still
   * open. See https://react.dev/reference/react/useState#storing-information-from-previous-renders
   */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Escape closes the mega panel — it has no other keyboard dismissal. */
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  /**
   * The header is transparent until it scrolls, so at the top of the home page
   * it sits directly on the hero's ink band and has to invert. This is coupled
   * to the hero's background: if `HeroSection` ever stops being dark, the
   * controls here go white on white and the menu icon disappears. Change both
   * together.
   */
  const overDarkHero = pathname === "/" && !scrolled && !megaOpen;

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
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false);
    }, 150);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || megaOpen
          ? "border-b border-line/60 bg-paper/90 shadow-sm backdrop-blur-md"
          : "bg-transparent",
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="container-page flex h-20 items-center justify-between py-3">
        {/* Brand mark — hovering it opens the mega menu, clicking goes home.
            Focus opens it too, so keyboard users reach the navigation without
            a separate toggle control. */}
        <div
          className="relative flex items-center"
          onMouseEnter={openMega}
          onMouseLeave={scheduleClose}
        >
          <button
            onClick={() => go("/")}
            onFocus={openMega}
            aria-expanded={megaOpen}
            aria-controls="brand-mega-menu"
            aria-label="COBRR — go to home page, or browse the site menu"
            className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
          >
            <Logo size={38} />
          </button>
        </div>

        {/* Action CTA — navigation itself lives in the brand mega menu */}
        <div className="flex items-center gap-3">
          <Button
            variant={overDarkHero ? "light" : "dark"}
            size="sm"
            href="/contact"
            className="hidden sm:inline-flex"
          >
            Contact us
            <ArrowRight width={15} height={15} />
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors lg:hidden",
              overDarkHero
                ? "border-white/20 bg-white/10 text-white"
                : "border-line bg-sand text-ink",
            )}
          >
            <MenuIcon width={20} height={20} />
          </button>
        </div>
      </nav>

      {/* Brand mega menu — full-width panel anchored under the header */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id="brand-mega-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-b border-line/70 bg-paper shadow-2xl lg:block"
          >
            <div className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,18rem)_1fr]">
              {/* Feature card */}
              <button
                onClick={() => go(megaFeature.href)}
                className="group flex flex-col justify-between rounded-2xl bg-ink p-8 text-left text-white ring-2 ring-brand/70 transition-shadow duration-300 hover:shadow-xl"
              >
                <div>
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/45">
                    {megaFeature.eyebrow}
                  </span>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-white">
                    {megaFeature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {megaFeature.blurb}
                  </p>
                </div>
                <span className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {megaFeature.cta}
                  <ArrowRight
                    width={15}
                    height={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>

              {/* Link columns */}
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {megaMenu.map((group) => (
                  <div key={group.title}>
                    <button
                      onClick={() => go(group.href)}
                      className="group/title flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-brand"
                    >
                      {group.title}
                      <ArrowUpRight
                        width={13}
                        height={13}
                        className="text-brand opacity-0 transition-opacity group-hover/title:opacity-100"
                      />
                    </button>
                    <p className="mt-3 text-[0.8rem] leading-snug text-muted">
                      {group.blurb}
                    </p>
                    <ul className="mt-5 space-y-0.5 border-l border-line">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <button
                            onClick={() => go(link.href)}
                            className={cn(
                              "-ml-px w-full cursor-pointer border-l-2 py-2 pl-4 text-left transition-colors duration-200",
                              isActive(link.href, true)
                                ? "border-brand"
                                : "border-transparent hover:border-brand/50",
                            )}
                          >
                            <span className="block text-sm font-semibold text-ink">
                              {link.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted">
                              {link.desc}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer band */}
            <div className="border-t border-line/70 bg-sand/60">
              <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  Have a project in mind? We reply within one business day.
                </p>
                <Button variant="dark" size="sm" href="/contact" className="shrink-0">
                  Start a project
                  <ArrowRight width={15} height={15} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm xl:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-50 flex h-svh w-[88%] max-w-sm flex-col bg-paper shadow-2xl xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Logo size={32} />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
                >
                  <Close width={18} height={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-muted">
                  Navigation
                </span>
                <div className="space-y-1">
                  {primaryNav.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => go(item.href)}
                      className={cn(
                        "block w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                        isActive(item.href, item.href === "/")
                          ? "bg-brand text-white"
                          : "text-ink hover:bg-sand",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-line p-5 bg-sand">
                <Button variant="primary" size="md" href="/contact" className="w-full">
                  Book a Consultation
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
