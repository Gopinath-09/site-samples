import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { company } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-paper text-ink"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
