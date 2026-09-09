import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { company } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandWordmark from "@/components/layout/BrandWordmark";
import ThemeScript from "@/components/theme/ThemeScript";
import Providers from "@/components/theme/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = `${company.legalName} — Enterprise Software & AI Engineering`;

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  applicationName: company.name,
  title: {
    default: siteTitle,
    template: `%s — ${company.name}`,
  },
  description: company.description,
  keywords: [
    "enterprise software development",
    "custom software",
    "SaaS development",
    "ERP solutions",
    "AI solutions",
    "cloud engineering",
    "COBRR Tech Labs",
  ],
  authors: [{ name: company.legalName }],
  // Open Graph / Twitter images come from app/opengraph-image.tsx and
  // app/twitter-image.tsx (plus per-route files under dynamic segments).
  openGraph: {
    type: "website",
    title: siteTitle,
    description: company.description,
    siteName: company.legalName,
    url: company.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: company.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-paper text-fg"
      >
        {/* Sets data-theme before first paint — must be the first child. */}
        <ThemeScript />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* Decorative sign-off between the last section and the footer. */}
          <BrandWordmark />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
