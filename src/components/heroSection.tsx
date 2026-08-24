import Button from "@/components/ui/Button";
import SystemDiagram from "@/components/graphics/SystemDiagram";
import { ArrowRight } from "@/components/ui/icons";
import { company } from "@/lib/site";
import { services, products } from "@/lib/content";

/**
 * Opening band of the home page.
 *
 * Everything asserted here is checkable against our own record — the founding
 * year, the number of disciplines we publish, the number of products we run.
 * There is no client count and no uptime figure, because neither could be
 * evidenced yet, and a claim a visitor can disprove costs more than the space
 * it fills.
 */

const facts = [
  { label: "Founded", value: String(company.foundedYear) },
  { label: "Disciplines", value: String(services.length).padStart(2, "0") },
  { label: "Products", value: String(products.length).padStart(2, "0") },
  { label: "Base", value: company.location },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-paper to-transparent"
        aria-hidden
      />

      <div className="relative container-page pt-32 lg:pt-40">
        {/* Section marker — the document's opening line */}
        <div className="marker">
          <span className="marker-index">01</span>
          <span className="marker-title">Enterprise Software Engineering</span>
          <span className="marker-rule" />
          <span className="marker-title hidden sm:inline">{company.location}</span>
        </div>

        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <h1 className="heading-display text-ink">
              Software that
              <br />
              outlives its
              <br />
              first release.
            </h1>

            <p className="lead mt-8 max-w-xl">
              We are an engineering studio in Bangalore building enterprise
              platforms, AI systems and our own SaaS products — designed for the
              years after launch, not the weeks before it.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/contact">
                Start a project
                <ArrowRight width={18} height={18} />
              </Button>
              <Button variant="outline" size="lg" href="/portfolio">
                See our work
              </Button>
            </div>
          </div>

          {/* Reference architecture, drawn rather than photographed */}
          <div className="min-w-0 lg:pl-4">
            <SystemDiagram />
            <p className="mono-label mt-6 hidden lg:block">
              Fig. 01 — Reference architecture
            </p>
          </div>
        </div>

        {/* Ruled strip of verifiable facts */}
        <div className="fact-row mt-16 grid-cols-2 md:grid-cols-4 lg:mt-20">
          {facts.map((f) => (
            <div key={f.label} className="fact-cell">
              <div className="mono-label">{f.label}</div>
              <div className="mono-figure mt-2 text-xl font-medium text-ink">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
