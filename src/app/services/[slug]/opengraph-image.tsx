import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { services } from "@/lib/content";

export const alt = "COBRR service";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return renderOgImage({
    eyebrow: "Service",
    title: service?.title ?? "Engineering services",
    description: service?.summary,
  });
}
