import Button from "@/components/ui/Button";
import HeroScene from "@/components/graphics/HeroScene";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Reveal, { RevealLines } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { company } from "@/lib/site";
import { services, verifiedProjects } from "@/lib/content";

/**
 * Opening band of the home page.
 *
 * A centred composition on ink: the statement is framed by a soft panel, and a
 * luminous scene grounds the lower half so the band resolves into an image
 * rather than stopping at the buttons. The scene is drawn rather than rendered
 * — see `HeroScene` — so this needs no photography or 3D asset.
 *
 * Everything asserted here is checkable against our own record: the founding
 * year, the number of disciplines we publish, the number of platforms we have
 * delivered. There is no client count and no uptime figure, because neither
 * could be evidenced yet, and a claim a visitor can disprove costs more than
 * the space it fills.
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
      {/*
        Backdrop, in layers: ambient footage, then a scrim, then the grid. The
        scrim is what makes the statement legible over moving imagery — without
        it the headline's contrast changes as the footage does, which is the
        usual reason background video fails.
      */}
      <div className="absolute inset-0" aria-hidden>
        <BackgroundVideo
          src="/hero/ambient.mp4"
          poster="/hero/ambient-poster.jpg"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_45%,transparent_0%,rgba(0,0,0,0.72)_100%)]" />
        <div className="bg-grid-dark absolute inset-0 opacity-20" />
      </div>

      <div className="relative container-page pt-24 lg:pt-28">
        {/*
          One centred column inside a glass frame, following the reference's
          placement: statement, supporting line, then a single action. The
          section marker that used to sit above the frame is gone — it put a
          rule and two labels between the header and the headline, which is
          exactly the space the reference leaves empty so the statement lands
          on its own. Nothing it carried was lost: the location is in the fact
          strip below.
        */}
        <div className="relative rounded-[2rem] border border-white/[0.09] px-5 py-20 sm:rounded-[2.75rem] sm:px-10 lg:py-28">
          {/* A faint inner light, so the frame reads as glass rather than a box */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(70%_120%_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]"
            aria-hidden
          />

          <div className="relative">
            <h1 className="heading-display text-center text-white [text-shadow:0_0_70px_rgba(0,0,0,0.65)]">
              <RevealLines
                lines={["Software that", "outlives its first release."]}
              />
            </h1>

            {/* Delays are keyed to the headline: the supporting line arrives as
                the second line of type settles, and the actions just after. */}
            <Reveal delay={0.45}>
              <p className="body mx-auto mt-7 max-w-sm text-center leading-relaxed text-white/55">
                We are an engineering studio in Coimbatore building enterprise
                platforms, cloud systems and AI for education, healthcare,
                tourism and logistics.
              </p>
            </Reveal>

            {/*
              One action, with the second offered as text beneath it. Two pills
              side by side split the attention the primary is meant to hold —
              the reference carries a single button for the same reason.
            */}
            <Reveal
              delay={0.6}
              className="mt-11 flex flex-col items-center gap-3"
            >
              <Button variant="ghost-light" size="lg" href="/contact">
                Start a project
                <ArrowRight width={18} height={18} />
              </Button>
              <Button variant="link" size="sm" href="/portfolio">
                See our work
              </Button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Luminous scene, bleeding to both edges beneath the statement */}
      <div className="relative -mt-10 sm:-mt-16 lg:-mt-20">
        <HeroScene />
      </div>

      {/* Ruled strip of verifiable facts */}
      <div className="relative container-page pb-14 lg:pb-16">
        <div className="fact-row grid-cols-2 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="fact-cell">
              <div className="mono-label">{f.label}</div>
              <div className="mono-figure mt-2 text-lg font-medium text-white">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
