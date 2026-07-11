import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing your use of the ${company.legalName} website and services.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 2026"
      intro={`These terms govern your access to and use of the ${company.legalName} website and services. By using our site, you agree to them.`}
      sections={[
        {
          heading: "Use of our website",
          paragraphs: [
            "You may use this website for lawful purposes only. You agree not to misuse it, interfere with its operation, or attempt to access it in an unauthorised way.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "All content on this website — including text, graphics, logos and code — is owned by or licensed to us and is protected by applicable intellectual property laws.",
            "For client engagements, ownership of delivered work is governed by the specific agreement signed for that project. Unless stated otherwise, clients own the software and IP we build for them.",
          ],
        },
        {
          heading: "Services and agreements",
          paragraphs: [
            "Information on this website is for general purposes and does not constitute a binding offer. Specific services are governed by separate written agreements.",
          ],
        },
        {
          heading: "Disclaimer",
          paragraphs: [
            "This website is provided on an \"as is\" basis. We make no warranties, express or implied, regarding its accuracy, availability or fitness for a particular purpose.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of this website.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `Questions about these terms can be directed to ${company.email}.`,
          ],
        },
      ]}
    />
  );
}
