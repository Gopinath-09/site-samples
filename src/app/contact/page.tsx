import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { company, socialLinks } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact COBRR TECH LABS",
  description:
    "Get in touch with COBRR TECH LABS. Tell us about your product, platform, or digital transformation goal — we reply within one business day.",
};

const channels = [
  {
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
    desc: "Best for detailed briefs and RFPs.",
  },
  {
    label: "WhatsApp",
    value: company.whatsapp,
    href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
    desc: "For quick questions and scheduling.",
  },
  {
    label: "Phone",
    value: company.phone,
    href: `tel:${company.phone.replace(/\D/g, "")}`,
    desc: "Available Mon–Fri, 9 am – 7 pm IST.",
  },
];

/**
 * Keyless Google Maps embed — no API key or billing account required. Swap for
 * the Embed API URL if you later want styled maps or custom markers.
 */
const mapQuery = encodeURIComponent(company.address);
const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

const offices = [
  {
    city: "Bangalore",
    country: "India",
    address: company.address,
    type: "Headquarters",
    timezone: "IST (UTC +5:30)",
  },
];

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "We reply to every genuine enquiry within one business day. For urgent needs, WhatsApp is the fastest channel.",
  },
  {
    q: "Do you sign NDAs before discovery calls?",
    a: "Yes. We are happy to sign a mutual NDA before any technical or commercial discussions if required.",
  },
  {
    q: "Can I book a free consultation?",
    a: "Absolutely. Fill in the form and mention it is a consultation request — we will arrange a 30-minute video call with a senior engineer.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTACT US"
        title="Let's talk about what you're building."
        description="Share a little about your goals and we will get back to you within one business day with next steps."
      />

      {/* Main contact section */}
      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* Left: contact info */}
          <Reveal>
            <div>
              <h2 className="heading-md">Reach us directly</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Prefer email or a quick call? Use any channel below, or complete
                the form and we will route your message to the right team.
              </p>

              {/* Contact channels */}
              <div className="mt-8 space-y-4">
                {channels.map((ch) => (
                  <div key={ch.label} className="card p-5">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                      {ch.label}
                    </dt>
                    <dd className="mt-2">
                      <Button variant="outline" size="sm" href={ch.href} external>
                        {ch.value}
                      </Button>
                      <p className="mt-1.5 text-xs text-muted">{ch.desc}</p>
                    </dd>
                  </div>
                ))}
              </div>

              {/* Office */}
              {offices.map((o) => (
                <div key={o.city} className="mt-6 card bg-sand p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-ink">
                        {o.city}, {o.country}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{o.address}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                      {o.type}
                    </span>
                  </div>
                  <div className="mt-3 border-t border-line pt-3 text-xs text-muted">
                    Timezone: {o.timezone}
                  </div>
                </div>
              ))}

              {/* Social channels */}
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Follow us
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-2 text-xs font-semibold text-ink/80 transition-colors hover:border-brand/40 hover:text-brand"
                      >
                        {s.label}
                        <ArrowUpRight width={13} height={13} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response SLA */}
              <div className="mt-6 rounded-2xl border border-brand/25 bg-brand-soft/40 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white text-xs font-bold">
                    1d
                  </span>
                  <div>
                    <p className="font-semibold text-ink">One-business-day reply</p>
                    <p className="text-sm text-muted">
                      We reply to every genuine enquiry. No auto-responses, no black holes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: contact form */}
          <Reveal direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Office location map */}
      <section className="border-y border-line bg-sand py-14">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Find us</span>
              <h2 className="heading-md mt-3">{company.location}</h2>
              <p className="mt-2 max-w-md text-sm text-muted">{company.address}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              href={mapsLink}
              external
              className="shrink-0"
            >
              Open in Google Maps
              <ArrowUpRight width={16} height={16} />
            </Button>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-xs">
            <iframe
              title={`Map showing ${company.legalName} office in ${company.location}`}
              src={mapEmbed}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0 grayscale-35 transition-[filter] duration-500 hover:grayscale-0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Pre-call FAQs */}
      <section className="section bg-sand">
        <div className="container-page max-w-3xl">
          <h2 className="heading-md">Before you reach out</h2>
          <p className="mt-3 text-muted">
            Quick answers to the questions we hear most often.
          </p>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-semibold text-ink">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA strip */}
      <section className="section bg-ink text-white">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow text-white/50">Let&apos;s get started</span>
            <h2 className="heading-lg mt-4 text-white">
              Ready to scope your next platform?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              Whether you have a fully-formed brief or just an early idea — we are
              happy to start a conversation and help you figure out what to build next.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button variant="light" size="lg" href={`mailto:${company.email}`} external>
              Email us directly
              <ArrowRight width={18} height={18} />
            </Button>
            <p className="text-sm text-white/40 md:text-right">
              {company.legalName}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
