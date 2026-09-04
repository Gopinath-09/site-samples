import Button from "@/components/ui/Button";
import SystemDiagram, {
  referenceArchitecture,
} from "@/components/graphics/SystemDiagram";
import { ArrowRight } from "@/components/ui/icons";
import { company } from "@/lib/site";
import { services, verifiedProjects } from "@/lib/content";

/**
 * Opening band of the home page.
 *
 * Inverted to ink so the first thing a visitor meets carries weight, and so
 * the schematic reads as a luminous technical drawing rather than an outline
 * floating on white. The sections below stay on paper, which makes this band
 * the anchor of the page rather than one note among several.
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
  {
    label: "Platforms built",
    value: String(verifiedProjects.length).padStart(2, "0"),
  },
  { label: "Base", value: company.location },
];

export default function HeroSection() {
  return (
    <section className="band-dark relative overflow-hidden">
      {/* Backdrop: a light source off the top-right, over an engineering grid */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_0%,#1a2a5c_0%,#0d1226_46%,#0a0e1a_100%)]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
      </div>

      <div className="relative container-page pt-32 pb-16 lg:pt-40 lg:pb-20">
        {/* Section marker — the document's opening line */}
        <div className="marker">
          <span className="marker-index">01</span>
          <span className="marker-title">Enterprise Software Engineering</span>
          <span className="marker-rule" />
          <span className="marker-title hidden sm:inline">
            {company.location}
          </span>
        </div>

        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <h1 className="heading-display text-white">
              Software that
              <br />
              outlives its
              <br />
              first release.
            </h1>

            <p className="lead mt-8 max-w-xl text-muted-dark">
              We are an engineering studio in Coimbatore building enterprise
              platforms, cloud systems and AI for education, healthcare, tourism
              and logistics — designed for the years after launch, not the weeks
              before it.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button variant="light" size="lg" href="/contact">
                Start a project
                <ArrowRight width={18} height={18} />
              </Button>
              <Button variant="ghost-light" size="lg" href="/portfolio">
                See our work
              </Button>
            </div>
          </div>

          {/* The system, drawn rather than photographed */}
          <div className="min-w-0 lg:pl-4">
            <SystemDiagram spec={referenceArchitecture} tone="dark" />
            <p className="mono-label mt-6 hidden lg:block">
              {referenceArchitecture.caption}
            </p>
          </div>
        </div>

        {/* Ruled strip of verifiable facts */}
        <div className="fact-row mt-16 grid-cols-2 md:grid-cols-4 lg:mt-20">
          {facts.map((f) => (
            <div key={f.label} className="fact-cell">
              <div className="mono-label">{f.label}</div>
              <div className="mono-figure mt-2 text-xl font-medium text-white">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
