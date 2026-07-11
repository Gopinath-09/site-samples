"use client";

import type React from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { ArrowRight, Sparkle } from "@/components/ui/icons";

interface CarouselSlide {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  tags?: string[];
  /** Optional background image (drop a path in /public and reference it here). */
  image?: string;
  /** Accent hue used for the slide's geometric motif + gradient. */
  accent: string;
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
    accent: "#2450e6",
    cta: { label: "Explore AI solutions", href: "/services/ai-solutions" },
  },
  {
    id: 2,
    eyebrow: "Web Engineering",
    title: "Web Application Development",
    subtitle:
      "Fast, accessible and maintainable web platforms — from customer portals to complex internal tools, architected for scale.",
    tags: ["Next.js", "Design Systems", "Performance"],
    accent: "#0ea5a4",
    cta: { label: "See web capabilities", href: "/services/web-applications" },
  },
  {
    id: 3,
    eyebrow: "Platforms",
    title: "SaaS & ERP Applications",
    subtitle:
      "Multi-tenant SaaS products and ERP systems that unify operations, data and teams across the entire organisation.",
    tags: ["Multi-tenant SaaS", "ERP", "CRM"],
    accent: "#7c5cff",
    cta: { label: "Discover our platforms", href: "/products" },
  },
  {
    id: 4,
    eyebrow: "Growth",
    title: "Digital Marketing",
    subtitle:
      "Data-driven digital marketing engineered around measurable outcomes — analytics, funnels and performance you can trust.",
    tags: ["SEO", "Analytics", "Conversion"],
    accent: "#c1863c",
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
    accent: "#e0567a",
    cta: { label: "Talk to engineering", href: "/contact" },
  },
];

/** Per-slide geometric backdrop — subtle, engineered line-art, no particles. */
function SlideBackdrop({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* radial wash */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(120% 120% at 78% 15%, ${accent}2e 0%, transparent 55%), radial-gradient(90% 90% at 10% 90%, ${accent}1c 0%, transparent 50%)`,
        }}
      />
      {/* engineering grid */}
      <div className="bg-grid-dark absolute inset-0 opacity-40" />
      {/* concentric arc motif, slowly drifting when active */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute -right-24 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-[0.35]"
        aria-hidden
        animate={active ? { rotate: [0, 8, 0] } : { rotate: 0 }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        {[60, 110, 160, 195].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth={i === 3 ? 1.5 : 1}
            strokeDasharray={i % 2 ? "3 8" : undefined}
          />
        ))}
        <circle cx="200" cy="200" r="10" fill={accent} />
      </motion.svg>
    </div>
  );
}

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 6000);
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
    <section className="relative h-svh min-h-160 w-full overflow-hidden bg-ink text-white">
      {/* Sliding track. Mixing % (slide index) and px (drag) in one calc keeps
          this SSR-safe — no window access during render. */}
      <div
        ref={containerRef}
        className="flex h-full cursor-grab select-none active:cursor-grabbing"
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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                draggable={false}
              />
            )}
            <SlideBackdrop accent={slide.accent} active={index === currentIndex} />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/30" />
          </div>
        ))}
      </div>

      {/* Foreground content — animates per slide, independent of the track */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
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
              <span
                className="eyebrow"
                style={{ color: active.accent, filter: "brightness(1.5)" }}
              >
                <Sparkle width={14} height={14} />
                {active.eyebrow}
              </span>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                {active.title}
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
                {active.subtitle}
              </p>

              <div className="pointer-events-auto mt-9 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  href={active.cta.href}
                  accentColor={active.accent}
                >
                  {active.cta.label}
                  <ArrowRight width={18} height={18} />
                </Button>
                <Button variant="ghost-light" size="lg" href="/contact">
                  Book a consultation
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide index + navigation dots */}
      <div className="pointer-events-auto absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <span className="font-mono text-xs tabular-nums text-white/50">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentIndex === index
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/35 hover:bg-white/60",
              )}
            />
          ))}
        </div>
        <span className="font-mono text-xs tabular-nums text-white/50">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Top progress bar */}
      <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-white/10">
        <motion.div
          key={currentIndex + (isAutoPlaying ? "-play" : "-pause")}
          className="h-full"
          style={{ background: active.accent }}
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlaying && !isDragging ? "100%" : "0%" }}
          transition={{
            duration: isAutoPlaying && !isDragging ? 6 : 0,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
