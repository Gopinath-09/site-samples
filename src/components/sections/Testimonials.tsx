import { testimonials, type Testimonial } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "@/components/ui/icons";

/** Dynamic star rating: `value` filled (copper), the rest outline-only. */
function Stars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            width={20}
            height={20}
            strokeWidth={1.75}
            style={{
              color: filled
                ? "var(--color-copper)"
                : "color-mix(in srgb, var(--color-copper) 45%, transparent)",
              fill: filled ? "var(--color-copper)" : "transparent",
            }}
          />
        );
      })}
    </span>
  );
}

function initials(name: string) {
  return name
    .replace(/[^A-Za-z .]/g, "")
    .split(/[ .]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="card relative mx-2.5 flex w-85 shrink-0 flex-col overflow-hidden p-7 sm:w-95">
      {/* Large faint quote mark, sits behind the content */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 right-3 select-none font-serif text-[9rem] leading-none text-brand/[0.07]"
      >
        &rdquo;
      </span>

      <div className="relative z-10 flex flex-1 flex-col">
        <Stars value={t.rating} />
        <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-fg">
          {t.quote}
        </blockquote>
      </div>

      <figcaption className="relative z-10 mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="chip chip-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold">
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-fg">{t.name}</span>
          <span className="block truncate text-xs text-muted">
            {t.role} · {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({
  limit,
  showHeading = true,
  title = "Trusted by teams who don't switch vendors lightly.",
  subtitle = "What leaders say after shipping to production with COBRR.",
}: {
  /** Cap how many testimonials feed the carousel. Omit to use all. */
  limit?: number;
  showHeading?: boolean;
  title?: string;
  subtitle?: string;
}) {
  const list = limit ? testimonials.slice(0, limit) : testimonials;
  // Duplicate the row so the -50% translate loops seamlessly.
  const loop = [...list, ...list];

  return (
    <Section id="testimonials" container={false}>
      {showHeading && (
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title={title}
            description={subtitle}
          />
        </div>
      )}

      {/* Single infinite carousel — CSS-driven, pauses on hover, honours
          prefers-reduced-motion. */}
      <div className="relative mt-12 flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track" style={{ ["--marquee-duration" as string]: "60s" }}>
          {loop.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </Section>
  );
}
