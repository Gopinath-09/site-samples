import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/content";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import CardLink from "@/components/ui/CardLink";
import { categoryClass } from "@/components/blog/categoryStyles";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`${post.category} · ${post.read}`}
        title={post.title}
        description={post.excerpt}
      />

      <article className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.32fr] lg:gap-16">

          {/* Article body */}
          <Reveal>
            <div className="prose-custom space-y-6 text-[1.05rem] leading-relaxed text-ink/85">
              {post.body.map((para, i) => (
                <p key={i} className={i === 0 ? "text-xl font-medium text-ink" : ""}>
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-12 border-t border-line pt-8">
              <Button variant="outline" href="/blog">
                <ArrowRight width={18} height={18} className="rotate-180" />
                Back to all articles
              </Button>
            </div>
          </Reveal>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author card */}
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">Author</h3>
              <p className="mt-2 font-semibold text-ink">{post.author}</p>
              <p className="mt-1 text-sm text-muted">{post.date} · {post.read}</p>
              <span
                className={`mt-3 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryClass(post.category)}`}
              >
                {post.category}
              </span>
            </div>

            {/* Share nudge */}
            <div className="card bg-sand p-6">
              <h3 className="font-semibold text-ink">Found this useful?</h3>
              <p className="mt-2 text-sm text-muted">
                Share it with your team or reach out if you would like to discuss any of these ideas.
              </p>
              <Button variant="outline" href="/contact" className="mt-5 w-full">
                Talk to us
                <ArrowRight width={16} height={16} />
              </Button>
            </div>
          </aside>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section bg-sand">
          <div className="container-page">
            <h2 className="heading-md">More from the blog</h2>
            <RevealGroup className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <RevealItem key={r.slug} className="h-full">
                  <CardLink
                    href={`/blog/${r.slug}`}
                    ariaLabel={r.title}
                    className="card card-hover flex h-full flex-col p-6"
                  >
                    <span
                      className={`inline-flex self-start items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryClass(r.category)}`}
                    >
                      {r.category}
                    </span>
                    <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{r.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">{r.excerpt}</p>
                    <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-brand">
                      Read
                      <ArrowUpRight
                        width={15}
                        height={15}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                  </CardLink>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
