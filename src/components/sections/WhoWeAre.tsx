import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ShadedImage from "@/components/ui/ShadedImage";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Raster image slots for this section. Every value is `undefined` until the
 * images exist — ShadedImage renders its procedural placeholder for an
 * undefined `src`. Generate the images with docs/IMAGE_BRIEF.md, drop them
 * under /public and fill in the paths here. Nothing else needs to change.
 */
const IMAGES: Record<"team" | "studio" | "craft" | "partnership", string | undefined> = {
  // /images/about/team.jpg — 1600 × 1200 (4:3). Large tile: ~1:1 on desktop,
  // ~2:1 on tablet, so keep the subject centred. Shade rises from the bottom;
  // keep detail in the upper right.
  team: undefined,
  // /images/about/studio.jpg — 1200 × 1200 (1:1). Text sits bottom-left.
  studio: undefined,
  // /images/about/craft.jpg — 1200 × 1200 (1:1). Text sits bottom-left.
  craft: undefined,
  // /images/about/partnership.jpg — 1600 × 800 (2:1) on desktop, ~16:9 on
  // tablet. Keep the subject in the centre band; text sits bottom-left.
  partnership: undefined,
};

const HEADING = {
  eyebrow: "Who we are",
  title: "Engineers first. Partners for the long run.",
  description:
    "A senior team that designs, builds and operates software for the long term — and runs its own products to the same standard.",
} as const;

const TILES = {
  team: {
    eyebrow: "Our team",
    title: "Senior engineers who own outcomes end to end.",
    description: "No hand-offs to a junior team once the contract is signed.",
    alt: "The COBRR engineering team at work",
  },
  studio: {
    eyebrow: "Our studio",
    title: "Products we build and run ourselves.",
    alt: "The COBRR product studio",
  },
  craft: {
    eyebrow: "Craft",
    title: "Reviewed, tested and observable from week one.",
    alt: "Engineering craft — code review and system design",
  },
  partnership: {
    eyebrow: "Partnership",
    title: "Relationships measured in years, not projects.",
    alt: "A long-term client partnership",
  },
} as const;

const VALUES = [
  { title: "Craftsmanship", body: "Clean, considered and built to last." },
  { title: "Accountability", body: "We own outcomes and say so plainly." },
  { title: "Partnership", body: "Success measured in years, not projects." },
  { title: "Curiosity", body: "New technology only where it truly helps." },
] as const;

const SMALL_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw";
const WIDE_SIZES = "(max-width: 1024px) 100vw, 50vw";

export default function WhoWeAre() {
  return (
    <Section id="who-we-are">
      <SectionHeading
        align="center"
        eyebrow={HEADING.eyebrow}
        title={HEADING.title}
        description={HEADING.description}
      />

      {/* Bento: the team tile spans 2 × 2; studio and craft are squares on
          the first row; partnership fills the remaining 2 × 1 cell. */}
      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:auto-rows-fr lg:grid-cols-4">
        <RevealItem className="md:col-span-2 lg:row-span-2">
          <ShadedImage
            src={IMAGES.team}
            alt={TILES.team.alt}
            eyebrow={TILES.team.eyebrow}
            title={TILES.team.title}
            description={TILES.team.description}
            aspect="auto"
            sizes={WIDE_SIZES}
            className="h-full min-h-[22rem] md:min-h-[26rem] lg:min-h-0"
          />
        </RevealItem>

        <RevealItem>
          <ShadedImage
            src={IMAGES.studio}
            alt={TILES.studio.alt}
            eyebrow={TILES.studio.eyebrow}
            title={TILES.studio.title}
            aspect="square"
            sizes={SMALL_SIZES}
          />
        </RevealItem>

        <RevealItem>
          <ShadedImage
            src={IMAGES.craft}
            alt={TILES.craft.alt}
            eyebrow={TILES.craft.eyebrow}
            title={TILES.craft.title}
            aspect="square"
            sizes={SMALL_SIZES}
          />
        </RevealItem>

        <RevealItem className="md:col-span-2">
          <ShadedImage
            src={IMAGES.partnership}
            alt={TILES.partnership.alt}
            eyebrow={TILES.partnership.eyebrow}
            title={TILES.partnership.title}
            aspect="auto"
            sizes={WIDE_SIZES}
            className="h-full min-h-[16rem] md:min-h-[18rem] lg:min-h-0"
          />
        </RevealItem>
      </RevealGroup>

      <Reveal delay={0.1}>
        <ul className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <li key={v.title}>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-fg">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                {v.title}
              </div>
              <p className="body-sm mt-1.5">{v.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
