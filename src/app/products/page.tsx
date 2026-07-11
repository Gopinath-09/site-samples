import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FinalCta from "@/components/home/FinalCta";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Workship, Satisfy and upcoming SaaS platforms — products built and operated by the COBRR product studio.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Platforms built by the same team you'd hire."
        description="Our product studio ships and runs its own SaaS software. It keeps our engineering honest — and gives you battle-tested foundations."
      >
        <Button variant="light" size="lg" href="/contact">
          Request a demo
          <ArrowRight width={18} height={18} />
        </Button>
      </PageHeader>

      <FeaturedProducts />
      <FinalCta />
    </>
  );
}
