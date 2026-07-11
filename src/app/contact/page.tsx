import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with COBRR TECH LABS. Tell us about your product, platform or modernisation goal — we reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you're building."
        description="Share a little about your goals and we'll get back to you within one business day with next steps."
      />

      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className="heading-md">Reach us directly</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Prefer email or a quick call? Use the details below, or fill in
                the form and we&apos;ll route your message to the right team.
              </p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      href={`mailto:${company.email}`}
                    >
                      {company.email}
                    </Button>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Company
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-ink">
                    {company.legalName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Location
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-ink">
                    {company.location}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 card bg-sand p-6">
                <h3 className="font-semibold text-ink">Response time</h3>
                <p className="mt-1.5 text-sm text-muted">
                  We reply to every genuine enquiry within one business day.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
