import HeroSection from "@/components/heroSection";
import TrustedBy from "@/components/home/TrustedBy";
import CompanyOverview from "@/components/home/CompanyOverview";
import CoreServices from "@/components/home/CoreServices";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IndustriesServed from "@/components/home/IndustriesServed";
import TechnologiesSection from "@/components/home/TechnologiesSection";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import WhyChoose from "@/components/home/WhyChoose";
import SuccessMetrics from "@/components/home/SuccessMetrics";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <CompanyOverview />
      <CoreServices limit={6} />
      <FeaturedProducts />
      <IndustriesServed />
      <TechnologiesSection />
      <EngineeringProcess />
      <WhyChoose />
      <SuccessMetrics />
      <CaseStudiesSection />
      <Testimonials limit={10} />
      <FaqSection />
      <FinalCta />
    </>
  );
}
