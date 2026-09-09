import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export default function FinalCta() {
  return (
    <Section className="pb-0">
      <Reveal>
        {/* A bordered panel on the same surface — the hairline and the faint
            grid give it presence without a second background colour. */}
        <div className="relative overflow-hidden rounded-panel border border-line px-8 py-16 text-center md:px-16 md:py-24">
          <div className="bg-grid absolute inset-0" aria-hidden />
          <div
            className="glow-brand absolute bottom-0 left-1/2 h-72 w-176 -translate-x-1/2"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow eyebrow-center">Start the conversation</span>
            <h2 className="heading-xl mt-5 text-balance text-fg">
              Ready to build software you can rely on?
            </h2>
            <p className="lead mt-6">
              Whether you&apos;re starting fresh or modernising what you have,
              we&apos;ll help you get there with clarity and confidence.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button size="lg" href="/contact">
                Start a project
                <ArrowRight width={18} height={18} />
              </Button>
              <Button variant="outline" size="lg" href="/services">
                Explore services
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
