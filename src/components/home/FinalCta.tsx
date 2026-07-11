import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export default function FinalCta() {
  return (
    <section className="section relative bg-ink">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink shadow-[0px_250px_160px] shadow-ink px-8 py-16 text-center text-white md:px-16 md:py-24">
            <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
            <div
              className="absolute left-1/2 bottom-0 h-72 w-[44rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
              style={{ background: "var(--color-brand)" }}
              aria-hidden
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow eyebrow-center" style={{ color: "#7f9dff" }}>
                Start the conversation
              </span>
              <h2 className="heading-xl mt-5 text-balance text-white">
                Ready to build software you can rely on?
              </h2>
              <p className="lead mt-6 text-muted-dark">
                Whether you&apos;re starting fresh or modernising what you have,
                we&apos;ll help you get there with clarity and confidence.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button variant="light" size="lg" href="/contact">
                  Start a project
                  <ArrowRight width={18} height={18} />
                </Button>
                <Button variant="ghost-light" size="lg" href="/services">
                  Explore services
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <h1 className="text-wave absolute bottom-5 left-1/2 z-49 -translate-x-1/2 text-left text-5xl font-extrabold tracking-[0.15em] md:text-7xl">
        COBRR
      </h1>
    </section>
  );
}
