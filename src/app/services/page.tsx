import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CoreServices from "@/components/home/CoreServices";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import FinalCta from "@/components/home/FinalCta";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Services & Development Capabilities",
  description:
    "AI solutions, web development, mobile apps, SaaS, cloud solutions, UI/UX design, DevOps, IT consulting, maintenance, and business automation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="ENGINEERING SERVICES"
        title="Full-Stack Engineering Capabilities for Modern Enterprises."
        description="From strategic architecture and UI/UX design to production deployment and 24/7 SLA maintenance — we deliver high-impact software."
      >
        <Button variant="primary" size="lg" href="/contact">
          Book a Consultation
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      <CoreServices limit={10} showHeading={false} />
      <EngineeringProcess />
      <FinalCta />
    </>
  );
}
