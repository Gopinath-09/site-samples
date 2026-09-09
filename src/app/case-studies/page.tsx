import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real engagements where COBRR's engineering delivered measurable business outcomes across industries.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Work that speaks in outcomes."
        description="We measure success by the difference our software makes. Here's a look at what that has meant for the teams we've partnered with."
      />
      <CaseStudiesSection />
      <FinalCta />
    </>
  );
}
