import { products, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import CardLink from "@/components/ui/CardLink";
import { cardClasses } from "@/components/ui/Card";
import Badge, { type BadgeTone } from "@/components/ui/Badge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";

const statusTone: Record<Product["status"], BadgeTone> = {
  Live: "success",
  "In development": "brand",
  Upcoming: "copper",
};

export default function FeaturedProducts() {
  return (
    <Section id="products">
      <SectionHeading
        align="center"
        eyebrow="Products"
        title="Software we've built for the market."
        description="Alongside client work, our product studio ships and operates its own SaaS platforms — proof of the engineering standard we bring to every engagement."
      />

      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
        {products.map((p) => (
          <RevealItem key={p.slug} className="h-full">
            <CardLink
              href={`/products/${p.slug}`}
              ariaLabel={p.name}
              className={cn(
                cardClasses({ interactive: true, padding: "none" }),
                "flex h-full flex-col overflow-hidden",
              )}
            >
              {/* Product visual header — same surface, separated by a hairline.
                  Drop a product screenshot here later (docs/IMAGE_BRIEF.md). */}
              <div className="relative h-40 overflow-hidden border-b border-line">
                <div className="bg-grid absolute inset-0" />
                <div className="glow-brand absolute -right-10 -top-10 h-40 w-40" />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-3xl font-bold tracking-tight text-fg">
                    {p.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                <p className="mt-4 text-sm font-medium leading-relaxed text-fg">
                  {p.tagline}
                </p>
                <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                  Explore {p.name}
                  <ArrowUpRight
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </CardLink>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
