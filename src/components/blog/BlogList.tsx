"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CardLink from "@/components/ui/CardLink";
import { ArrowUpRight, Search } from "@/components/ui/icons";
import { blogCategories, type BlogPost } from "@/lib/content";
import { categoryClass } from "@/components/blog/categoryStyles";
import { cn } from "@/lib/utils";

const ALL = "All";

/**
 * The archive: a search field, a category rail, and the posts as full-width
 * rows rather than a card grid.
 *
 * Rows suit this set better than tiles. We publish long technical pieces, and
 * a row gives the title and the excerpt room to be read before anyone commits
 * to opening one — a three-across grid would truncate both.
 *
 * Search and category compose rather than override: narrowing to a category
 * and then typing searches within it. Categories with no published post are
 * left out of the rail, so a filter can never lead to an empty list; an empty
 * result is therefore always the search, and the empty state says so and
 * offers the way back.
 */

/** Deterministic abstract plate — we hold no artwork for these posts. */
function PostPlate({ index, category }: { index: number; category: string }) {
  const rows = 3 + (index % 3);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <div className="bg-grid-dark absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-25 blur-2xl"
        style={{ background: "var(--color-brand)" }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 120 90"
        fill="none"
        aria-hidden
      >
        {Array.from({ length: rows }, (_, i) => (
          <line
            key={i}
            x1="18"
            y1={30 + i * 12}
            x2={62 + ((index * 17 + i * 23) % 40)}
            y2={30 + i * 12}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-white/20"
          />
        ))}
        <circle cx="18" cy="18" r="3" className="fill-brand" />
      </svg>
      <span className="absolute bottom-3 left-4 font-mono text-[0.6rem] uppercase tracking-widest text-white/40">
        {category}
      </span>
    </div>
  );
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [
      { label: ALL, count: posts.length },
      ...blogCategories
        .filter((c) => counts.has(c))
        .map((c) => ({ label: c as string, count: counts.get(c)! })),
    ];
  }, [posts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (active !== ALL && p.category !== active) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [posts, active, query]);

  return (
    <div>
      {/* Header rail */}
      <div className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">From the archive</span>
          <h2 className="heading-md mt-3 text-fg">Everything we have published.</h2>
        </div>

        <label className="relative w-full sm:max-w-xs">
          <span className="sr-only">Search articles</span>
          <Search
            width={16}
            height={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-sm text-fg transition-colors placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      {/* Category rail */}
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter articles by category"
      >
        {filters.map((f) => {
          const isActive = active === f.label;
          return (
            <button
              key={f.label}
              onClick={() => setActive(f.label)}
              aria-pressed={isActive}
              className={cn(
                "relative cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200",
                isActive
                  ? "border-transparent text-white"
                  : "border-line bg-paper text-fg/70 hover:border-brand/40 hover:text-fg",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="blog-filter-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-brand"
                />
              )}
              <span className="relative">
                {f.label}
                <span className={cn("ml-1.5", isActive ? "text-white/70" : "text-muted")}>
                  {f.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="mono-label mt-6" aria-live="polite">
        {visible.length} {visible.length === 1 ? "article" : "articles"}
      </p>

      {/* Archive rows */}
      <div className="mt-6 border-t border-line">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-line"
            >
              <CardLink
                href={`/blog/${p.slug}`}
                ariaLabel={p.title}
                className="group flex flex-col gap-6 py-7 transition-colors duration-300 hover:bg-sand/50 sm:flex-row sm:items-center sm:px-4"
              >
                {/* Plate */}
                <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-40">
                  <PostPlate index={visible.indexOf(p)} category={p.category} />
                </div>

                {/* Words */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold",
                        categoryClass(p.category),
                      )}
                    >
                      {p.category}
                    </span>
                    <span className="mono-label">{p.date}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
                    <span className="mono-label">{p.read}</span>
                  </div>

                  <h3 className="heading-md mt-3 leading-snug text-fg transition-colors duration-300 group-hover:text-brand">
                    {p.title}
                  </h3>
                  <p className="body-sm mt-2 line-clamp-2 leading-relaxed text-muted">
                    {p.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-2.5">
                    {/* Initials stand in for an author portrait */}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-deep text-[0.6rem] font-bold text-fg">
                      {p.author
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span className="text-xs text-muted">{p.author}</span>
                  </div>
                </div>

                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:flex">
                  <ArrowUpRight width={17} height={17} />
                </span>
              </CardLink>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state — only reachable through search */}
      {visible.length === 0 && (
        <div className="border-b border-line py-16 text-center">
          <p className="body text-fg">
            Nothing matches &ldquo;{query}&rdquo;
            {active !== ALL && <> in {active}</>}.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setActive(ALL);
            }}
            className="mono-label mt-4 cursor-pointer text-brand hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
