import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { company } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

/**
 * Archivo carries the large editorial headlines: a grotesk with enough width
 * and weight to hold a display size without shouting, and unlike the framework
 * default it is not the typeface every other Next.js site is wearing.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * IBM Plex Mono sets section markers, field labels and figures. The mono is
 * load-bearing in this design rather than decorative: it is what makes the page
 * read as an engineering document instead of a brochure.
 */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/**
 * Space Grotesk sets the wordmark, and nothing else.
 *
 * A logo should not be the same typeface as the page it sits on, or it reads
 * as a heading that happens to be in the corner. Space Grotesk is a technical
 * grotesk with distinctly drawn capitals — narrower and more characterful than
 * Archivo, which keeps the mark compact while still reading as engineering
 * rather than decoration. One typeface, one job, loaded only for five letters.
 */
const wordmark = Space_Grotesk({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cobrr.tech"),
  title: {
    default: `${company.legalName} — Enterprise Software & AI Engineering`,
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
  openGraph: {
    type: "website",
    title: `${company.legalName} — Enterprise Software & AI Engineering`,
    description: company.description,
    siteName: company.legalName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.legalName}`,
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
      className={`${archivo.variable} ${plexMono.variable} ${wordmark.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-paper text-fg"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
