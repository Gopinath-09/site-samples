import HeroSection from "@/components/heroSection";
import TrustedBy from "@/components/home/TrustedBy";
import WhoWeAre from "@/components/home/WhoWeAre";
import CoreServices from "@/components/home/CoreServices";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TechnologiesSection from "@/components/home/TechnologiesSection";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trusted By / Clients */}
      <TrustedBy />

      {/* 3. Who We Are (Overview, Mission, Vision, Core Values) */}
      <WhoWeAre />

      {/* 4. Services (Interactive 10 Cards) */}
      <CoreServices />

      {/* 5. Products (SaaS Highlights) */}
      <FeaturedProducts />

      {/* 6. Technologies (Categorized Frontend, Backend, DB, Cloud, AI, DevOps) */}
      <TechnologiesSection />

      {/* 7. Development Process (7 Steps Timeline) */}
      <EngineeringProcess />

      {/* 8. Featured Projects (Portfolio Showcase) */}
      <FeaturedProjects limit={6} />

      {/* 9. Why Choose Us (8 Icon Cards) */}
      <WhyChoose />

      {/* 10. Testimonials Carousel */}
      <Testimonials limit={8} />

      {/* 11. Frequently Asked Questions */}
      <FaqSection />

      {/* 12. Final Call to Action */}
      <FinalCta />
    </>
  );
}
