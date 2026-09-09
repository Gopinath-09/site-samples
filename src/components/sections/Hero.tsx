"use client";

import type React from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { ArrowRight, Sparkle } from "@/components/ui/icons";

interface CarouselSlide {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  tags?: string[];
  /**
   * Optional background image (path under /public, e.g. "/images/hero/genai.jpg").
   * Rendered under a paper-coloured gradient so the type stays legible in both
   * themes. See docs/IMAGE_BRIEF.md for specs.
   */
  image?: string;
  cta: { label: string; href: string };
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    eyebrow: "GenAI Engineering",
    title: "GenAI-Integrated Software",
    subtitle:
      "Production-grade AI woven into real workflows — copilots, retrieval, automation and agents built on solid engineering foundations.",
    tags: ["LLM Copilots", "RAG Systems", "AI Automation"],
    cta: { label: "Explore AI solutions", href: "/services/ai-solutions" },
  },
  {
    id: 2,
    eyebrow: "Web Engineering",
    title: "Web Application Development",
    subtitle:
      "Fast, accessible and maintainable web platforms — from customer portals to complex internal tools, architected for scale.",
    tags: ["Next.js", "Design Systems", "Performance"],
    cta: { label: "See web capabilities", href: "/services/web-applications" },
  },
  {
    id: 3,
    eyebrow: "Platforms",
    title: "SaaS & ERP Applications",
    subtitle:
      "Multi-tenant SaaS products and ERP systems that unify operations, data and teams across the entire organisation.",
    tags: ["Multi-tenant SaaS", "ERP", "CRM"],
    cta: { label: "Discover our platforms", href: "/products" },
  },
  {
    id: 4,
    eyebrow: "Growth",
    title: "Digital Marketing",
    subtitle:
      "Data-driven digital marketing engineered around measurable outcomes — analytics, funnels and performance you can trust.",
    tags: ["SEO", "Analytics", "Conversion"],
    cta: { label: "Grow with COBRR", href: "/services" },
  },
  {
    id: 5,
    eyebrow: "Software Services",
    title: "Software Services",
    subtitle:
      "Specialist engineering support across the product lifecycle — from hardening to architecture to bringing new ideas to market.",
    tags: [
      "Security & Performance Bottleneck Testing",
      "Architecture Solutions",
      "Beta Development Services",
    ],
    cta: { label: "Talk to engineering", href: "/contact" },
  },
];

const AUTOPLAY_MS = 6000;

/**
 * Hero backdrop — ONE shared layer behind the whole carousel.
 *
 * It deliberately lives on the section, not on each slide: the grid and the
 * arc motif are the hero's setting, so they should stay put while only the
 * content slides across them. Rendering it per slide would also mean five
 * copies of the same animated SVG all running at once.
 *
 * Colours come from CSS variables, so the motif flips with the theme.
 */
function HeroBackdrop() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* No colour wash: the hero sits on the same pure surface as every other
          section. Interest comes from the grid and the line-art motif only. */}
      {/* engineering grid */}
      <div className="bg-grid absolute inset-0" />
      {/* concentric arc motif, drifting slowly */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute -right-24 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-60"
        aria-hidden
        animate={reduced ? { rotate: 0 } : { rotate: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        {[60, 110, 160, 195].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="var(--color-brand)"
            strokeOpacity={i === 3 ? 0.35 : 0.22}
            strokeWidth={i === 3 ? 1.5 : 1}
            strokeDasharray={i % 2 ? "3 8" : undefined}
          />
        ))}
        <circle cx="200" cy="200" r="10" fill="var(--color-brand)" fillOpacity={0.35} />
      </motion.svg>
    </div>
  );
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, AUTOPLAY_MS);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, isDragging]);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(clientX);
    setTranslateX(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setTranslateX(clientX - startX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 90;
    if (translateX > threshold) {
      setCurrentIndex((p) => (p === 0 ? slides.length - 1 : p - 1));
    } else if (translateX < -threshold) {
      setCurrentIndex((p) => (p + 1) % slides.length);
    }
    setTranslateX(0);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  }, []);

  const active = slides[currentIndex];

  return (
    <section className="relative h-svh min-h-160 w-full overflow-hidden bg-paper text-fg">
      {/* One backdrop for the whole hero — it stays put while slides move. */}
      <HeroBackdrop />

      {/* Sliding track. Mixing % (slide index) and px (drag) in one calc keeps
          this SSR-safe — no window access during render. Slides now carry only
          their own artwork; the setting behind them is shared. */}
      <div
        ref={containerRef}
        className="relative z-10 flex h-full cursor-grab select-none active:cursor-grabbing"
        style={{
          transform: `translateX(calc(${-currentIndex * 100}% + ${translateX}px))`,
          transition: isDragging
            ? "none"
            : "transform 600ms cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative flex h-full w-full shrink-0 items-center"
          >
            {/* Optional real image sits under the motif when provided */}
            {slide.image && (
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100vw"
                quality={90}
                preload={index === 0}
                draggable={false}
                className="object-cover opacity-25"
              />
            )}
            {/* Surface-coloured gradient keeps the copy readable over a photo */}
            {slide.image && (
              <div className="absolute inset-0 bg-linear-to-t from-paper via-paper/80 to-paper/40" />
            )}
          </div>
        ))}
      </div>

      {/* Foreground content — animates per slide, independent of the track */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <div className="container-page w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <span className="eyebrow">
                <Sparkle width={14} height={14} />
                {active.eyebrow}
              </span>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg md:text-6xl lg:text-7xl">
                {active.title}
              </h1>

              <p className="lead mt-6 max-w-xl text-pretty">{active.subtitle}</p>

              {active.tags && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <li key={t} className="pill">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <div className="pointer-events-auto mt-9 flex flex-wrap gap-3">
                <Button size="lg" href={active.cta.href}>
                  {active.cta.label}
                  <ArrowRight width={18} height={18} />
                </Button>
                <Button variant="outline" size="lg" href="/contact">
                  Book a consultation
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide index + navigation dots */}
      <div className="pointer-events-auto absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
        <span className="font-mono text-xs tabular-nums text-muted">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-all duration-500",
                currentIndex === index
                  ? "w-8 bg-fg"
                  : "w-1.5 bg-fg/25 hover:bg-fg/50",
              )}
            />
          ))}
        </div>
        <span className="font-mono text-xs tabular-nums text-muted">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Top progress bar */}
      <div className="absolute inset-x-0 top-0 z-30 h-0.5 bg-fg/8">
        <motion.div
          key={currentIndex + (isAutoPlaying ? "-play" : "-pause")}
          className="h-full bg-brand"
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlaying && !isDragging ? "100%" : "0%" }}
          transition={{
            duration: isAutoPlaying && !isDragging ? AUTOPLAY_MS / 1000 : 0,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
