import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import CardLink from "@/components/ui/CardLink";
import BlogList from "@/components/blog/BlogList";
import { categoryClass } from "@/components/blog/categoryStyles";
import Button from "@/components/ui/Button";
import { ArrowUpRight, ArrowRight } from "@/components/ui/icons";
import { blogPosts as posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog & Engineering Insights",
  description:
    "Engineering notes, architecture insights, AI research, and product thinking from the COBRR TECH LABS team.",
};

export default function BlogPage() {
  const [featured] = posts;

  return (
    <>
      <PageHeader
        eyebrow="BLOG & INSIGHTS"
        title="Notes from the engineering floor."
        description="Practical writing on architecture, AI, SaaS, and the craft of building software that lasts. From the engineers who actually ship it."
      />

      <section className="section bg-paper">
        <div className="container-page">

          {/* Featured post */}
          <div className="mb-12">
            <span className="eyebrow mb-6 block">Featured article</span>
            <CardLink
              href={`/blog/${featured.slug}`}
              ariaLabel={featured.title}
              className="card card-hover grid overflow-hidden md:grid-cols-[1fr_0.55fr]"
            >
              {/* Visual accent panel */}
              <div className="relative overflow-hidden bg-ink p-10 md:p-14">
                <div className="bg-grid-dark absolute inset-0 opacity-40" />
                <div
                  className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full opacity-20 blur-3xl"
                  style={{ background: "var(--color-brand)" }}
                />
                <div className="relative">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryClass(featured.category)}`}
                  >
                    {featured.category}
                  </span>
                  <h2 className="heading-lg mt-6 font-bold leading-snug text-white">
                    {featured.title}
                  </h2>
                  <p className="body mt-4 leading-relaxed text-white/60">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/80">
                    Read article
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Meta panel */}
              <div className="flex flex-col justify-center gap-6 bg-sand p-10">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted">Author</dt>
                  <dd className="mt-1 font-semibold text-fg">{featured.author}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted">Published</dt>
                  <dd className="mt-1 font-semibold text-fg">{featured.date}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted">Reading time</dt>
                  <dd className="mt-1 font-semibold text-fg">{featured.read}</dd>
                </div>
              </div>
            </CardLink>
          </div>

          {/* All posts, filterable by category */}
          <BlogList posts={posts} />

          {/* Newsletter nudge */}
          <div className="mt-16 rounded-2xl border border-line bg-sand p-10 text-center">
            <span className="eyebrow eyebrow-center">Stay updated</span>
            <h3 className="heading-md mt-4">
              Engineering insights, delivered when they matter.
            </h3>
            <p className="body mt-3 text-muted">
              We write when we have something worth saying — not on a publishing schedule. Follow us for deep technical articles and occasional company news.
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
