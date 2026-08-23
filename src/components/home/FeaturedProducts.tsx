import { products } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  Live: "bg-emerald-500/12 text-emerald-700 border-emerald-500/25",
  "In development": "bg-brand-soft text-brand border-brand/25",
  Upcoming: "bg-copper/12 text-copper border-copper/30",
};

/**
 * Product showcase. Alternating full-width rows instead of a card grid — each
 * product gets room for its features and a proper application-window visual,
 * which a third-of-a-row card could never carry.
 */
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

      <div className="container-page mt-16 space-y-20 lg:space-y-28">
        {products.map((p, i) => {
          const flipped = i % 2 === 1;

          return (
            <Reveal key={p.slug}>
              <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* ---- Visual: an application window mock ---- */}
                <div className={cn("group relative", flipped && "lg:order-2")}>
                  {/* Offset frame behind the window adds depth */}
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-line transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
                  />

                  <div className="relative overflow-hidden rounded-2xl border border-line bg-ink shadow-xl">
                    {/* Window chrome */}
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="ml-3 font-mono text-[0.7rem] text-white/35">
                        {p.slug}.cobrr.app
                      </span>
                    </div>

                    {/* Window body */}
                    <div className="relative aspect-16/10 overflow-hidden p-6">
                      <div className="bg-grid-dark absolute inset-0 opacity-50" />
                      <div
                        aria-hidden
                        className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                        style={{ background: "var(--color-brand)" }}
                      />

                      <div className="relative flex h-full flex-col justify-between">
                        <div>
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                            {p.status}
                          </span>
                          <div className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            {p.name}
                          </div>
                        </div>

                        {/* Abstracted UI rows — a hint of the interface without
                            pretending to be a screenshot */}
                        <div className="space-y-2.5">
                          {p.features.slice(0, 3).map((f, j) => (
                            <div
                              key={f}
                              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-2 backdrop-blur-sm"
                              style={{ width: `${100 - j * 12}%` }}
                            >
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                              <span className="truncate text-[0.7rem] font-medium text-white/70">
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---- Copy ---- */}
                <div className={cn(flipped && "lg:order-1")}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tabular-nums text-muted/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-semibold",
                        statusTone[p.status],
                      )}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                    {p.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {p.tagline}
                  </p>

                  <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                          <Check width={12} height={12} />
                        </span>
                        <span className="text-sm leading-snug text-ink">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Button variant="dark" href={`/products/${p.slug}`}>
                      Explore {p.name}
                      <ArrowUpRight width={16} height={16} />
                    </Button>
                    <Button variant="outline" href="/contact">
                      Request a demo
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
