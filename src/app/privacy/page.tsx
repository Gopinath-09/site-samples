import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.legalName} collects, uses and protects your personal data.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro={`This policy explains how ${company.legalName} collects, uses and safeguards information when you interact with our website and services.`}
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect information you provide directly — such as your name, email, company and message when you contact us or request a proposal.",
            "We also collect limited technical data automatically, including device and usage information, to operate and improve our website.",
          ],
        },
        {
          heading: "How we use information",
          paragraphs: [
            "We use your information to respond to enquiries, deliver our services, and communicate about work you have engaged us for.",
            "We do not sell your personal data. We use it only for the purposes described in this policy or as required by law.",
          ],
        },
        {
          heading: "Data security",
          paragraphs: [
            "We apply appropriate technical and organisational measures to protect your data, including encryption in transit, access controls and regular review of our practices.",
            "While no system is perfectly secure, we take reasonable steps to reduce risk and respond promptly to any incident.",
          ],
        },
        {
          heading: "Data retention",
          paragraphs: [
            "We retain personal data only for as long as necessary to fulfil the purposes it was collected for, or as required by applicable law.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Depending on your location, you may have rights to access, correct, delete or restrict the processing of your personal data.",
            `To exercise these rights, contact us at ${company.email}.`,
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `If you have questions about this policy or our data practices, please reach out to ${company.email}.`,
          ],
        },
      ]}
    />
  );
}
