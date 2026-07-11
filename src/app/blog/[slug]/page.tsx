import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/content";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

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

  return (
    <>
      <PageHeader eyebrow={`${post.category} · ${post.read}`} title={post.title} />

      <article className="section bg-paper">
        <div className="container-page max-w-2xl">
          <Reveal>
            <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink/85">
              <p className="text-xl font-medium text-ink">{post.excerpt}</p>
              {post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 border-t border-line pt-8">
            <Button variant="outline" href="/blog">
              <ArrowRight width={18} height={18} className="rotate-180" />
              Back to all articles
            </Button>
          </div>
        </div>
      </article>

      <FinalCta />
    </>
  );
}
