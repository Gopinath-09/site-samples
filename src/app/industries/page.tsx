import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import IndustriesServed from "@/components/home/IndustriesServed";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "COBRR builds software for startups, SMEs, enterprises, education, government, manufacturing, healthcare and retail.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Software shaped by the sector it serves."
        description="Every industry has its own constraints. We bring engineering that respects your regulations, your data and the way your business actually works."
      />
      <IndustriesServed />
      <CaseStudiesSection />
      <FinalCta />
    </>
  );
}
