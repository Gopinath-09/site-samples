"use client";

import { useRouter } from "next/navigation";
import { company, footerNav } from "@/lib/site";
import Button from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";
import {
  FaInstagram,
  FaEnvelope,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const socials: { label: string; href: string; Icon: IconType }[] = [
  { label: "Instagram", href: "https://instagram.com/cobrr.tech", Icon: FaInstagram },
  { label: "Email", href: `mailto:${company.email}`, Icon: FaEnvelope },
  { label: "YouTube", href: "https://youtube.com/@cobrr", Icon: FaYoutube },
  { label: "WhatsApp", href: "https://wa.me/910000000000", Icon: FaWhatsapp },
  { label: "X", href: "https://x.com/cobrr", Icon: FaXTwitter },
];

/** A footer link that reveals a top-right arrow on hover. */
function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex cursor-pointer items-center gap-1 text-sm text-white/65 transition-colors hover:text-white"
    >
      {label}
      <ArrowUpRight
        width={14}
        height={14}
        className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </button>
  );
}

export default function Footer() {
  const router = useRouter();
  const year = 2026; // Date APIs unavailable at build in this env; keep static.
  const open = (href: string) => (window.location.href = href);

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Brand accent + soft glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
      />
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />

      {/* Call to action band */}
      <div className="relative">
        <div className="container-page flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="heading-lg text-balance text-white">
              Let&apos;s build something durable.
            </h2>
            <p className="lead mt-4 text-muted-dark">
              Tell us about your product, platform or modernisation goal. We
              reply within one business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="light" size="lg" href="/contact">
              Start a project
              <ArrowUpRight width={18} height={18} />
            </Button>
            <Button variant="ghost-light" size="lg" href="/case-studies">
              View our work
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        {/* Brand + socials */}
        <div>
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer text-2xl font-bold tracking-tight text-white"
          >
            Explore <span className="tracking-[0.14em] text-brand">COBRR</span>
          </button>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-dark">
            {company.legalName}. Enterprise software, AI solutions, cloud
            infrastructure and scalable digital platforms.
          </p>
          <button
            onClick={() => open(`mailto:${company.email}`)}
            className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            {company.email}
            <ArrowUpRight width={15} height={15} />
          </button>

          {/* Social buttons */}
          <div className="mt-7 flex gap-2.5">
            {socials.map((s) => (
              <button
                key={s.label}
                onClick={() => open(s.href)}
                aria-label={s.label}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/12 text-white/75 transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <s.Icon size={17} />
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-dark">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href + item.label}>
                    <FooterLink
                      label={item.label}
                      onClick={() => router.push(item.href)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal bar */}
      <div className="relative">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-muted-dark md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <FooterLink label="Privacy" onClick={() => router.push("/privacy")} />
            <FooterLink label="Terms" onClick={() => router.push("/terms")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
