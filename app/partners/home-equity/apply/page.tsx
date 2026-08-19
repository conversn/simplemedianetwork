import type { Metadata } from "next";
import { ApplyPageShell } from "../../_shared/apply/ApplyPageShell";
import type { WizardConfig } from "../../_shared/apply/WizardConfig";

export const metadata: Metadata = {
  title: "Check Mortgage Program Availability — SMN Partner Program",
  description:
    "Tell us your LOs, capacity, states, and criteria. We'll reply with current SMN mortgage & home-equity lead availability.",
  robots: { index: false, follow: false },
};

const config: WizardConfig = {
  vertical: "home-equity",
  program: "home-equity",
  page: "/partners/home-equity/apply",
  backHref: "/partners/home-equity",
  backLabel: "Back to mortgage program",
  thankYouHref: "/partners/home-equity/thank-you",
  finalCta: "Check mortgage availability →",
  steps: [
    {
      key: "company_type",
      kind: "single-choice",
      eyebrow: "About your business",
      heading: "Which best describes your lender?",
      options: ["Bank", "IMB (independent mortgage bank)", "Broker", "Credit union"],
      autoAdvance: true,
    },
    {
      key: "reps",
      kind: "single-choice",
      eyebrow: "Your loan officers",
      heading: "How many active loan officers do you have?",
      helper: "LOs actively working the phones — not admin.",
      options: ["1–5", "6–25", "26–100", "100+"],
      autoAdvance: true,
    },
    {
      key: "products",
      kind: "multi-choice",
      eyebrow: "Loan products",
      heading: "Which products do you write?",
      helper: "Pick every one that applies.",
      options: ["Purchase", "Refinance", "HELOC", "Cash-out", "Reverse"],
      minRequired: 1,
    },
    {
      key: "daily_capacity",
      kind: "single-choice",
      eyebrow: "Capacity",
      heading: "How many new leads per day can your LOs actually handle?",
      helper: "Be honest — under-buying is better than drowning the floor.",
      options: ["Under 10", "10–25", "25–50", "50–100", "100+"],
      autoAdvance: true,
    },
    {
      key: "currently_buying",
      kind: "single-choice",
      eyebrow: "Buying today",
      heading: "Are you currently purchasing mortgage leads?",
      options: ["Yes", "No"],
      layout: "two-column",
      autoAdvance: true,
    },
    {
      key: "criteria",
      kind: "single-choice",
      eyebrow: "Qualification",
      heading: "What's your minimum loan-amount threshold?",
      options: ["$100k+", "$200k+", "$350k+", "$500k+", "Open"],
      autoAdvance: true,
    },
    {
      key: "states",
      kind: "states",
      eyebrow: "Licensed states",
      heading: "Which states are you licensed to lend in?",
      helper: "Tap to add. Tap again to remove.",
    },
    {
      key: "contact",
      kind: "contact",
      eyebrow: "Almost done",
      heading: "How can we reach you?",
      helper: "We'll reply within one business day with current mortgage availability.",
    },
  ],
};

export default function HomeEquityApplyPage() {
  return <ApplyPageShell config={config} />;
}
