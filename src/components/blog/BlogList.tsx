"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CardLink from "@/components/ui/CardLink";
import { ArrowUpRight } from "@/components/ui/icons";
import { blogCategories, type BlogPost } from "@/lib/content";
import { categoryClass } from "@/components/blog/categoryStyles";
import { cn } from "@/lib/utils";

const ALL = "All";

/**
 * Filterable article grid. Categories with no published posts are omitted, so
 * a filter never leads to an empty result.
 */
export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<string>(ALL);

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

  const visible = active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="eyebrow">Browse by topic</span>
        <span className="text-xs font-medium text-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? "article" : "articles"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
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
                  : "border-line bg-paper text-ink/75 hover:border-brand/40 hover:text-ink",
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

      {/* Article grid */}
      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <CardLink
                href={`/blog/${p.slug}`}
                ariaLabel={p.title}
                className="card card-hover flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                      categoryClass(p.category),
                    )}
                  >
                    {p.category}
                  </span>
                  <span className="text-xs text-muted">{p.read}</span>
                </div>
                <h2 className="mt-5 text-xl font-semibold leading-snug text-ink">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {p.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <span className="text-xs text-muted">
                    {p.date} · {p.author}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-brand">
                    Read
                    <ArrowUpRight
                      width={15}
                      height={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </CardLink>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
