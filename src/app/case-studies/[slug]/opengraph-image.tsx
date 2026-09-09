import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { caseStudies } from "@/lib/content";

export const alt = "COBRR case study";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  return renderOgImage({
    eyebrow: study ? `${study.industry} · ${study.client}` : "Case studies",
    title: study?.title ?? "Outcomes, not just deliverables",
    description: study?.summary,
  });
}
