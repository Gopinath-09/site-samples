import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { company } from "@/lib/site";

export const alt = `${company.legalName} — Enterprise Software & AI Engineering`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Enterprise software · AI · Cloud",
    title: company.tagline,
    description: company.description,
  });
}
