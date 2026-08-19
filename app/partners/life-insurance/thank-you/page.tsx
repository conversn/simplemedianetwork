import type { Metadata } from "next";
import { ThankYouShell, type ThankYouConfig } from "../../_shared/apply/ThankYouShell";

export const metadata: Metadata = {
  title: "Thanks — Life-Insurance Partner request received",
  description: "Your SMN life-insurance partner-program request has been received.",
  robots: { index: true, follow: true },
};

const config: ThankYouConfig = {
  program: "life-insurance",
  vertical: "life-insurance",
  page: "/partners/life-insurance/thank-you",
  backHref: "/partners/life-insurance",
  backLabel: "Back to life-insurance program",
  lede: "We'll review your criteria and reply within one business day with the current family life-insurance availability for your markets and capacity.",
  steps: [
    {
      bold: "We review your intake.",
      body: "States, capacity, and qualification matched against current supply on ParentSimple.",
    },
    {
      bold: "You get a direct reply.",
      body: "A partner-program contact will email you with availability and next steps — usually within one business day.",
    },
    {
      bold: "If it's a fit, we scope a trial.",
      body: "Prepaid daily cap so your agents can measure without flooding the floor.",
    },
  ],
};

export default function LifeInsuranceThankYouPage() {
  return <ThankYouShell config={config} />;
}
