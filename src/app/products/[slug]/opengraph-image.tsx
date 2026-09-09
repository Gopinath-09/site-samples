import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { products } from "@/lib/content";

export const alt = "COBRR product";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return renderOgImage({
    eyebrow: product ? `Product · ${product.status}` : "Products",
    title: product?.name ?? "COBRR products",
    description: product?.tagline,
  });
}
