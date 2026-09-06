import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import CardLink from "@/components/ui/CardLink";
import BlogList from "@/components/blog/BlogList";
import { categoryClass } from "@/components/blog/categoryStyles";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, ArrowRight } from "@/components/ui/icons";
import { blogPosts as posts } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog & Engineering Insights",
  description:
    "Engineering notes, architecture insights, AI research, and product thinking from the COBRR TECH LABS team.",
};

/**
 * Blog index, laid out as a magazine: one cover story given the full width,
 * then the archive underneath with its own search and category rail.
 *
 * The cover story is simply the first record in the dataset, so ordering the
 * data orders the page — there is no separate "featured" flag to keep in sync
 * with it. It appears in the archive below as well, because the archive is
 * filterable and a post missing from its own category would be a bug.
 */
export default function BlogPage() {
  const [cover, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="BLOG & INSIGHTS"
        title="Notes from the engineering floor."
        description="Practical writing on architecture, AI, SaaS, and the craft of building software that lasts. From the engineers who actually ship it."
      />

      {/* ---------------- Cover story ---------------- */}
      <section className="section bg-paper pb-0">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Cover story</span>
          </Reveal>

          <Reveal delay={0.06}>
            <CardLink
              href={`/blog/${cover.slug}`}
              ariaLabel={cover.title}
              className="group mt-6 grid overflow-hidden rounded-3xl border border-line lg:grid-cols-[1.15fr_0.85fr]"
            >
              {/* Plate */}
              <div className="relative min-h-64 overflow-hidden bg-ink p-10 md:p-14">
                <div className="bg-grid-dark absolute inset-0 opacity-40" />
                <div
                  aria-hidden
                  className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-35"
                  style={{ background: "var(--color-brand)" }}
                />
                <div className="relative flex h-full flex-col justify-between">
                  <span
                    className={cn(
                      "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                      categoryClass(cover.category),
                    )}
                  >
                    {cover.category}
                  </span>

                  <div className="mt-10">
                    <h2 className="heading-lg text-balance font-semibold leading-snug text-white">
                      {cover.title}
                    </h2>
                    <p className="body mt-5 max-w-xl leading-relaxed text-white/60">
                      {cover.excerpt}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Read the story
                      <ArrowUpRight
                        width={16}
                        height={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Masthead detail */}
              <div className="flex flex-col justify-center gap-7 bg-sand p-10 md:p-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-xs font-bold text-fg">
                    {cover.author
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-fg">
                      {cover.author}
                    </div>
                    <div className="mono-label mt-0.5">Author</div>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-6 border-t border-line pt-7">
                  <div>
                    <dt className="mono-label">Published</dt>
                    <dd className="mt-1.5 text-sm font-semibold text-fg">
                      {cover.date}
                    </dd>
                  </div>
                  <div>
                    <dt className="mono-label">Reading time</dt>
                    <dd className="mt-1.5 text-sm font-semibold text-fg">
                      {cover.read}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="mono-label">In the archive</dt>
                    <dd className="mt-1.5 text-sm font-semibold text-fg">
                      {rest.length} more {rest.length === 1 ? "article" : "articles"}
                    </dd>
                  </div>
                </dl>
              </div>
            </CardLink>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Archive ---------------- */}
      <section className="section bg-paper">
        <div className="container-page">
          <BlogList posts={posts} />

          {/* Newsletter nudge */}
          <div className="mt-16 rounded-3xl border border-line bg-sand p-10 text-center">
            <span className="eyebrow eyebrow-center">Stay updated</span>
            <h3 className="heading-md mt-4">
              Engineering insights, delivered when they matter.
            </h3>
            <p className="body mt-3 text-muted">
              We write when we have something worth saying — not on a publishing
              schedule. Follow us for deep technical articles and occasional
              company news.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="primary" href="/contact">
                Get in touch
                <ArrowRight width={18} height={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
