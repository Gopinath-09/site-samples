import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CoreServices from "@/components/sections/CoreServices";
import ScaleAndReliability from "@/components/sections/ScaleAndReliability";
import EngineeringProcess from "@/components/sections/EngineeringProcess";
import FinalCta from "@/components/sections/FinalCta";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, enterprise systems, SaaS, ERP, AI, cloud and more — fourteen engineering disciplines delivered by one senior team.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Engineering capability across the full software lifecycle."
        description="From first line of code to long-term operation, COBRR delivers the disciplines modern organisations depend on — with one consistent standard of quality."
      >
        <Button size="lg" href="/contact">
          Discuss your project
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      <CoreServices showHeading={false} />
      <ScaleAndReliability />
      <EngineeringProcess />
      <FinalCta />
    </>
  );
}
