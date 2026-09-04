import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Shield, Sparkle, Cpu, Layers } from "@/components/ui/icons";

const coreValues = [
  {
    title: "Craftsmanship & Code Quality",
    desc: "We write clean, well-tested, self-documenting code built for long-term supportability.",
    icon: Sparkle,
  },
  {
    title: "Uncompromising Security",
    desc: "Threat modeling, OWASP hardening, and compliance (SOC2/HIPAA) built in by default.",
    icon: Shield,
  },
  {
    title: "Agile & Transparent Delivery",
    desc: "Bi-weekly sprint demos and transparent progress tracking — no hidden surprises.",
    icon: Cpu,
  },
  {
    title: "Client-Centric Partnership",
    desc: "We measure our success by your platform's operational performance and business ROI.",
    icon: Layers,
  },
];

export default function WhoWeAre() {
  return (
    <section className="section bg-paper border-b border-line/60" id="who-we-are">
      <div className="container-page space-y-16">
        <SectionHeading
          eyebrow="WHO WE ARE"
          title="An International Technology Startup Building High-Impact Systems."
          description="COBRR TECH LABS is an agile team of senior software engineers, AI specialists, and cloud architects dedicated to transforming business capabilities."
        />

        {/* Mission & Vision Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-line/80 bg-sand/60 p-8 space-y-4">
              <span className="pill bg-brand-soft text-brand font-bold border-brand/20">OUR MISSION</span>
              <h3 className="text-xl font-bold text-fg">
                To Engineer Software & AI Platforms That Power Tomorrow&apos;s Tech Leaders.
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Our mission is to give ambitious startups and forward-thinking enterprises the architectural foundation, rapid execution, and technical clarity required to launch and scale world-class digital products.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-line/80 bg-ink p-8 text-white space-y-4 shadow-xl">
              <span className="pill bg-white/10 text-white font-bold border-white/20">OUR VISION</span>
              <h3 className="text-xl font-bold text-white">
                To Be the World&apos;s Most Trusted Technology & AI Engineering Partner.
              </h3>
              <p className="text-sm leading-relaxed text-white/75">
                We envision a technology landscape where software is built with discipline, AI empowers human workflows, and long-term partnership replaces short-sighted vendor relationships.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Core Values Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-6">
            OUR CORE VALUES
          </h3>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val) => {
              const IconComp = val.icon;
              return (
                <RevealItem key={val.title} className="h-full">
                  <div className="card h-full p-6 border-line/80 transition-all duration-300 hover:border-brand/40 hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand mb-4">
                      <IconComp width={20} height={20} />
                    </div>
                    <h4 className="text-base font-bold text-fg">{val.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{val.desc}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
