import HeroSection from "@/components/heroSection";
import TrustedBy from "@/components/home/TrustedBy";
import WhoWeAre from "@/components/home/WhoWeAre";
import CoreServices from "@/components/home/CoreServices";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProblemsWeSolve from "@/components/home/ProblemsWeSolve";
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
      {/* 01 — Hero */}
      <HeroSection />

      {/* 02 — Clients we can name */}
      <TrustedBy />

      {/* 03 — Who we are */}
      <WhoWeAre />

      {/* 04 — Core services */}
      <CoreServices />

      {/* 05 — Problems we solve */}
      <ProblemsWeSolve />

      {/* 06 — Product roadmap */}
      <FeaturedProducts />

      {/* 07 — Technologies */}
      <TechnologiesSection />

      {/* 08 — How we work */}
      <EngineeringProcess />

      {/* 09 — Delivered systems */}
      <FeaturedProjects limit={6} />

      {/* 10 — Why COBRR */}
      <WhyChoose />

      {/* 11 — Testimonials (hidden until one is verified) */}
      <Testimonials limit={8} />

      {/* 12 — FAQ */}
      <FaqSection />

      {/* 13 — Closing call to action */}
      <FinalCta />
    </>
  );
}
