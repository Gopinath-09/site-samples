import { testimonials, type Testimonial } from "@/lib/content";
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

// Avatar gradient palette — deterministic per card index.
const AVATARS: [string, string][] = [
  ["#2450e6", "#6d8bff"],
  ["#c1863c", "#e6b877"],
  ["#7c5cff", "#a78bfa"],
  ["#0ea5a0", "#5eead4"],
  ["#e11d74", "#fb7bb0"],
  ["#f59e0b", "#fcd34d"],
];

function initials(name: string) {
  return name
    .replace(/[^A-Za-z .]/g, "")
    .split(/[ .]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Card({ t, index }: { t: Testimonial; index: number }) {
  const [from, to] = AVATARS[index % AVATARS.length];
  return (
    <figure className="relative mx-2.5 flex w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-paper p-7 shadow-[0_1px_2px_rgba(10,14,26,0.04)] sm:w-[380px]">
      {/* Large faint quote mark, sits behind the content */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 right-3 select-none font-serif text-[9rem] leading-none text-brand/[0.07]"
      >
        &rdquo;
      </span>

      <div className="relative z-10 flex flex-1 flex-col">
        <Stars value={t.rating} />

        <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/90">
          {t.quote}
        </blockquote>
      </div>

      <figcaption className="relative z-10 mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink">
            {t.name}
          </span>
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
    <section className="section bg-sand" id="testimonials">
      <div className="container-page">
        {showHeading && (
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title={title}
            description={subtitle}
          />
        )}
      </div>

      {/* Single infinite carousel */}
      <div className="relative mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div
          className="marquee-track"
          style={{ ["--marquee-duration" as string]: "60s" }}
        >
          {loop.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
