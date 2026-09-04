import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FinalCta from "@/components/home/FinalCta";
import { verifiedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description:
    "The platforms COBRR Tech Labs has built and delivered — learning systems, tourism and school platforms, clinic software, transport tracking and AI assistants.",
};

/**
 * The full portfolio.
 *
 * Renders the same wall of cells as the home page rather than a second card
 * design, so a project looks the same wherever it is met. The page supplies its
 * own header, so the section's is suppressed.
 */
export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="OUR WORK & DELIVERED PROJECTS"
        title="Systems built for the organisations that run them."
        description={`${verifiedProjects.length} platforms across education, healthcare, tourism, logistics, retail and internal operations — each one delivered and in use.`}
      />

      <FeaturedProjects showHeading={false} />

      <FinalCta />
    </>
  );
}
