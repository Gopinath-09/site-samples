"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { company, footerNav, socialLinks, type SocialKey } from "@/lib/site";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const socialIcons: Record<SocialKey, IconType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  x: FaXTwitter,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
};

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
  const [email, setEmail] = useState("");

  /**
   * Front-end only for now — swap the toast for a POST to your list provider
   * (or a Server Action) when the newsletter backend is in place.
   */
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed — we'll only email when it's worth reading.");
    setEmail("");
  };

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
            <Button variant="ghost-light" size="lg" href="/portfolio">
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
          <div className="mt-7 flex flex-wrap gap-2.5">
            {socialLinks.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => open(s.href)}
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/12 text-white/75 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon size={17} />
                </button>
              );
            })}
          </div>

          {/* Newsletter */}
          <form onSubmit={subscribe} className="mt-9 max-w-sm">
            <label
              htmlFor="footer-newsletter"
              className="text-xs font-semibold uppercase tracking-widest text-muted-dark"
            >
              Newsletter
            </label>
            <p className="mt-2 text-sm leading-relaxed text-muted-dark">
              Engineering notes and product updates. No more than once a month.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                id="footer-newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <button
                type="submit"
                className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Subscribe
                <ArrowRight width={15} height={15} />
              </button>
            </div>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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
