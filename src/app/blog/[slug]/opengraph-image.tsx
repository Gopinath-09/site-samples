import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { blogPosts } from "@/lib/content";

export const alt = "COBRR engineering blog";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return renderOgImage({
    eyebrow: post ? `${post.category} · ${post.read}` : "Blog",
    title: post?.title ?? "Notes from the engineering floor",
    description: post?.excerpt,
  });
}
