import { trustedBy } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Trusted-by wall. A bordered grid of client cells sharing hairline rules —
 * reads like a spec sheet rather than an advertisement. Cells are ready to take
 * real logo artwork: drop an <img> in place of the wordmark span.
 */
export default function TrustedBy() {
  return (
    <section className="border-b border-line bg-paper" id="clients">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
        {/* Left — framing */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Trusted by</span>
          <h2 className="heading-md mt-4 text-balance">
            Teams that shipped with us.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            From early-stage products to plant-floor systems handling live
            production data — organisations rely on the platforms we build.
          </p>

          <dl className="mt-8 flex gap-10 border-t border-line pt-6">
            <div>
              <dt className="text-2xl font-bold tracking-tight text-ink">
                {trustedBy.length}+
              </dt>
              <dd className="mt-1 text-xs text-muted">Client partnerships</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold tracking-tight text-ink">6</dt>
              <dd className="mt-1 text-xs text-muted">Industries served</dd>
            </div>
          </dl>
        </div>

        {/* Right — the wall. Negative margins collapse adjacent borders into
            single hairlines, so the grid reads as one continuous frame. */}
        <RevealGroup className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
          {trustedBy.map((client) => (
            <RevealItem key={client.name}>
              <div className="group relative flex h-28 items-center justify-center border-b border-r border-line px-4 transition-colors duration-300 hover:bg-sand">
                {/* Corner ticks appear on hover — a quiet engineered detail */}
                <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="text-center text-sm font-bold uppercase tracking-widest text-ink/40 transition-colors duration-300 group-hover:text-ink">
                  {client.name}
                </span>
              </div>
            </RevealItem>
          ))}

          {/* Trailing cell keeps the grid rectangular and invites the next name */}
          <RevealItem>
            <div className="flex h-28 items-center justify-center border-b border-r border-line bg-sand/40 px-4">
              <span className="text-center text-xs font-medium leading-snug text-muted">
                Your team
                <span className="mt-0.5 block text-[0.7rem] text-muted/70">
                  next
                </span>
              </span>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
