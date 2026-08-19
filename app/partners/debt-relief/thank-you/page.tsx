import type { Metadata } from "next";
import { ThankYouShell, type ThankYouConfig } from "../../_shared/apply/ThankYouShell";

export const metadata: Metadata = {
  title: "Thanks — Partner Program request received",
  description: "Your Simple Media Network Partner Program request has been received.",
  robots: { index: true, follow: true },
};

const config: ThankYouConfig = {
  program: "debt-relief",
  vertical: "debt-relief",
  page: "/partners/debt-relief/thank-you",
  backHref: "/partners/debt-relief",
  backLabel: "Back to overview",
  lede: "We'll review your criteria and reply within one business day with the current debt-relief availability for your markets and capacity.",
  steps: [
    {
      bold: "We review your intake.",
      body: "States, capacity, and qualification are matched against current supply on MoneySimple.",
    },
    {
      bold: "You get a direct reply.",
      body: "A partner-program contact will email you with availability and next steps — usually within one business day.",
    },
    {
      bold: "If it's a fit, we scope a trial.",
      body: "Prepaid daily cap so your team can measure without flooding the floor.",
    },
  ],
};

export default function ThankYouPage() {
  return <ThankYouShell config={config} />;
}
