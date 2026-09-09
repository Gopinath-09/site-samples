import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import CompanyOverview from "@/components/sections/CompanyOverview";
import CoreServices from "@/components/sections/CoreServices";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import ScaleAndReliability from "@/components/sections/ScaleAndReliability";
import IndustriesServed from "@/components/sections/IndustriesServed";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import DeliveryJourney from "@/components/sections/DeliveryJourney";
import ClientCare from "@/components/sections/ClientCare";
import WhyChoose from "@/components/sections/WhyChoose";
import SuccessMetrics from "@/components/sections/SuccessMetrics";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Home. Sections alternate paper / sand / ink so adjacent bands always differ:
 * ink → paper → paper(strip) → sand → paper → ink → sand → ink → sand → paper
 * → sand → ink → paper → sand → paper → ink.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <CompanyOverview />
      <CoreServices limit={6} />
      <FeaturedProducts />
      <ScaleAndReliability />
      <IndustriesServed />
      <TechnologiesSection />
      <DeliveryJourney />
      <ClientCare />
      <WhyChoose />
      <SuccessMetrics />
      <CaseStudiesSection />
      <Testimonials limit={10} />
      <FaqSection />
      <FinalCta />
    </>
  );
}
