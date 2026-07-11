import { products } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import CardLink from "@/components/ui/CardLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  Live: "bg-emerald-500/12 text-emerald-700 border-emerald-500/25",
  "In development": "bg-brand-soft text-brand border-brand/25",
  Upcoming: "bg-copper/12 text-copper border-copper/30",
};

export default function FeaturedProducts() {
  return (
    <section className="section bg-paper" id="products">
      <SectionHeading
        className="container-page"
        align="center"
        eyebrow="Products"
        title="Software we've built for the market."
        description="Alongside client work, our product studio ships and operates its own SaaS platforms — proof of the engineering standard we bring to every engagement."
      />

      <RevealGroup className="container-page mt-12 grid gap-6 lg:grid-cols-3">
        {products.map((p) => (
          <RevealItem key={p.slug} className="h-full">
            <CardLink
              href={`/products/${p.slug}`}
              ariaLabel={p.name}
              className="card card-hover flex h-full flex-col overflow-hidden"
            >
              {/* Product visual header */}
              <div className="relative h-40 overflow-hidden bg-ink">
                <div className="bg-grid-dark absolute inset-0 opacity-50" />
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
                  style={{ background: "var(--color-brand)" }}
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-3xl font-bold tracking-tight text-white">
                    {p.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span
                  className={cn(
                    "w-fit rounded-full border px-2.5 py-1 text-xs font-semibold",
                    statusTone[p.status],
                  )}
                >
                  {p.status}
                </span>
                <p className="mt-4 text-sm font-medium leading-relaxed text-ink">
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
    </section>
  );
}
