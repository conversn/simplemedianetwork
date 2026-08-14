import type { Metadata } from "next";
import { ThankYouShell, type ThankYouConfig } from "../../_shared/apply/ThankYouShell";

export const metadata: Metadata = {
  title: "Thanks — Retirement Partner request received",
  description: "Your SMN retirement partner-program request has been received.",
  robots: { index: false, follow: false },
};

const config: ThankYouConfig = {
  program: "retirement",
  vertical: "retirement",
  page: "/partners/retirement/thank-you",
  backHref: "/partners/retirement",
  backLabel: "Back to retirement program",
  lede: "We'll review your criteria and reply within one business day with the current retirement & annuity availability for your markets and capacity.",
  steps: [
    {
      bold: "We review your intake.",
      body: "States, capacity, and qualification matched against current supply on SeniorSimple and RetirementRescue.",
    },
    {
      bold: "You get a direct reply.",
      body: "A partner-program contact will email you with availability and next steps — usually within one business day.",
    },
    {
      bold: "If it's a fit, we scope a trial.",
      body: "Prepaid daily cap so your agents can measure without flooding the downline.",
    },
  ],
};

export default function RetirementThankYouPage() {
  return <ThankYouShell config={config} />;
}
