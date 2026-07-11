import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

/** Shared layout for Privacy Policy and Terms — clean, readable, on-brand. */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={`Last updated · ${updated}`} title={title} description={intro} />

      <section className="section bg-paper">
        <div className="container-page max-w-3xl">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.heading}>
                <div>
                  <h2 className="heading-md flex items-baseline gap-3">
                    <span className="font-mono text-sm text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-muted">
                    {s.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
