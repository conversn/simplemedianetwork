import type { Metadata } from "next";
import { ThankYouShell, type ThankYouConfig } from "../../_shared/apply/ThankYouShell";

export const metadata: Metadata = {
  title: "Thanks — Mortgage Partner request received",
  description: "Your SMN mortgage & home-equity partner-program request has been received.",
  robots: { index: true, follow: true },
};

const config: ThankYouConfig = {
  program: "home-equity",
  vertical: "home-equity",
  page: "/partners/home-equity/thank-you",
  backHref: "/partners/home-equity",
  backLabel: "Back to mortgage program",
  lede: "We'll review your criteria and reply within one business day with the current mortgage & home-equity availability for your markets and LO capacity.",
  steps: [
    {
      bold: "We review your intake.",
      body: "States, capacity, and qualification matched against current supply on RateRoots.",
    },
    {
      bold: "You get a direct reply.",
      body: "A partner-program contact will email you with availability and next steps — usually within one business day.",
    },
    {
      bold: "If it's a fit, we scope a trial.",
      body: "Prepaid daily cap so your LOs can measure without flooding the floor.",
    },
  ],
};

export default function HomeEquityThankYouPage() {
  return <ThankYouShell config={config} />;
}
