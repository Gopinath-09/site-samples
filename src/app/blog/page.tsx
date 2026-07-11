import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FinalCta from "@/components/home/FinalCta";
import CardLink from "@/components/ui/CardLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { blogPosts as posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes, architecture insights and product thinking from the COBRR TECH LABS team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the engineering floor."
        description="Practical writing on architecture, AI, SaaS and the craft of building software that lasts."
      />

      <section className="section bg-paper">
        <RevealGroup className="container-page grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <CardLink
                href={`/blog/${p.slug}`}
                ariaLabel={p.title}
                className="card card-hover flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="pill text-brand">{p.category}</span>
                  <span className="text-xs text-muted">{p.read}</span>
                </div>
                <h2 className="mt-5 text-xl font-semibold leading-snug text-ink">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {p.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read article
                  <ArrowUpRight
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </CardLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <FinalCta />
    </>
  );
}
