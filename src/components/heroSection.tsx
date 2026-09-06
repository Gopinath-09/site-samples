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
 * Full-bleed rather than framed: the ambient footage now fills the whole
 * section instead of a panel within it, drifting slowly across its own frame
 * so the band keeps a pulse even where the light in the clip is still. A gold
 * pool breathes behind the statement, the measuring grid creeps by exactly one
 * cell on an invisible loop, and the second headline line carries a slow sheen
 * once it has settled — instrumentation and light rather than a static poster
 * with a video playing behind it.
 *
 * The fact strip is pulled off the bottom edge into a single glass card that
 * overlaps the drawn scene, so the section resolves into one composition
 * rather than stacking three unrelated bands (statement, scene, strip) the
 * way the previous design did.
 *
 * Everything asserted is checkable against our own record: the founding year,
 * the number of disciplines we publish, the number of platforms delivered.
 * There is no client count and no uptime figure, because neither could be
 * evidenced yet.
 */

/**
 * Three checkable facts, drawn from our own record rather than written by
 * hand — the discipline count and the delivered count move with the data, so
 * the hero cannot drift out of step with the rest of the site.
 */
const proof = [
  `${services.length} engineering disciplines`,
  `${verifiedProjects.length} systems delivered`,
  `Founded ${company.foundedYear}`,
];

export default function HeroSection() {
  return (
    <section className="band-dark relative isolate min-h-svh overflow-hidden">
      {/*
        Backdrop, built as six stacked layers rather than one flat overlay.
        Bottom to top:

          1. the drifting footage
          2. a base tint, which sets the overall darkness
          3. a vertical gradient — near-solid at the top so the header's white
             controls hold, near-solid at the foot so the band resolves into
             the section below, and clearest across the middle where the
             footage is actually meant to be seen
          4. the breathing gold pool
          5. a radial vignette pulling the corners down
          6. the creeping measuring grid

        Layering it this way is what lets the band read as genuinely dark while
        the clip still shows through: the darkness is concentrated at the edges
        and behind the type, instead of one uniform sheet dimming everything
        including the part worth looking at.
      */}
      <div className="absolute inset-0" aria-hidden>
        {/*
          The clip is 4K/25fps. `playbackRate` holds each frame longer rather
          than interpolating, so it sets the effective frame rate directly:

            0.35 →  8.8fps  (stepped; read as robotic)
            0.60 → 15.0fps  (slow, and smooth enough behind a 55% scrim)
            0.85 → 21.3fps  (smooth, but barely slower than real time)

          0.6 is the compromise while the source is 25fps. To go slower than
          this without stepping, the slowdown has to be baked into the file —
          see the ffmpeg note in BackgroundVideo.
        */}
        <div className="hero-drift absolute inset-0">
          <BackgroundVideo
            src="/hero/Hero1.mp4"
            playbackRate={0.6}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* 2 — base tint */}
        <div className="absolute inset-0 bg-black/55" />

        {/* 3 — vertical gradient, densest at the two edges */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.45)_28%,rgba(0,0,0,0.35)_52%,rgba(0,0,0,0.82)_88%,rgba(0,0,0,0.96)_100%)]" />

        {/* 4 — gold pool */}
        <div
          className="hero-pool absolute left-1/2 top-[38%] h-184 w-184 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(227,185,100,0.16),transparent_72%)]"
          style={{ willChange: "transform, opacity" }}
        />

        {/* 5 — vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_42%,transparent_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />

        {/* 6 — measuring grid */}
        <div className="hero-grid bg-grid-dark absolute inset-0 opacity-[0.14]" />
      </div>

      <div className="relative flex min-h-svh flex-col">
        <div className="container-page flex flex-1 flex-col items-center justify-center pt-24 pb-16 lg:pt-28">
          {/* Kicker — states what we are and where, before the claim */}
          <Reveal className="mb-9 flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            <span className="mono-label text-white/70">
              Engineering studio · {company.location}
            </span>
          </Reveal>

          {/*
            `heading-display` is the site's single largest step and is reserved
            for one headline per page — the same class the other page titles
            scale down from, so the hero sits at the top of one scale rather
            than carrying a size of its own.
          */}
          <h1 className="heading-display max-w-4xl text-center text-white [text-shadow:0_0_70px_rgba(0,0,0,0.65)]">
            <RevealLines lines={["We build the systems"]} />
            <RevealLines
              lines={["your business runs on."]}
              delay={0.09}
              lineClassName="type-sheen"
            />
          </h1>

          {/* Delays are keyed to the headline: the supporting line arrives as
              the second line of type settles, and the actions just after. */}
          <Reveal delay={0.5}>
            <p className="body mx-auto mt-7 max-w-lg text-center text-white/65">
              Enterprise platforms, cloud infrastructure and applied AI —
              designed, built and operated by one senior team. From the first
              requirement to the years after launch.
            </p>
          </Reveal>

          {/* Proof, stated as a single line rather than a panel — the numbers
              are checkable against our own record, and nothing here is a
              figure we cannot show. */}
          <Reveal delay={0.6}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {proof.map((p) => (
                <li key={p} className="mono-label flex items-center gap-2.5 text-white/45">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-brand/70" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          {/*
            One action, with the second offered as text beneath it. Two pills
            side by side split the attention the primary is meant to hold.
          */}
          <Reveal
            delay={0.72}
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

        {/* Scroll cue — a bead falling down the rule, resting between runs */}
        
      </div>

      {/* Luminous scene, bleeding to both edges beneath the statement */}
      <div className="relative -mt-6 sm:-mt-10" aria-hidden>
        <HeroScene />
      </div>

      {/* Closing gutter beneath the scene */}
      <div className="relative pb-14 lg:pb-16" />
    </section>
  );
}
