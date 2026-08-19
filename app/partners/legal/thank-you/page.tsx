import type { Metadata } from "next";
import { ThankYouShell, type ThankYouConfig } from "../../_shared/apply/ThankYouShell";

export const metadata: Metadata = {
  title: "Thanks — Legal Partner request received",
  description: "Your SMN legal partner-program request has been received.",
  robots: { index: true, follow: true },
};

const config: ThankYouConfig = {
  program: "legal",
  vertical: "legal",
  page: "/partners/legal/thank-you",
  backHref: "/partners/legal",
  backLabel: "Back to legal program",
  lede: "We'll review your criteria and reply within one business day with the current MVA and premises-injury availability for your markets and intake capacity. Mass tort is not part of this program.",
  steps: [
    {
      bold: "We review your intake.",
      body: "States, case types, and qualifiers matched against current supply on LegalSimple.",
    },
    {
      bold: "You get a direct reply.",
      body: "A partner-program contact will email you with availability and next steps — usually within one business day.",
    },
    {
      bold: "If it's a fit, we scope a trial.",
      body: "Prepaid daily cap so your intake can measure without overrunning case load.",
    },
  ],
};

export default function LegalThankYouPage() {
  return <ThankYouShell config={config} />;
}
