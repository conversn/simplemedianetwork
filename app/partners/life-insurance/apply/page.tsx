import type { Metadata } from "next";
import { ApplyPageShell } from "../../_shared/apply/ApplyPageShell";
import type { WizardConfig } from "../../_shared/apply/WizardConfig";

export const metadata: Metadata = {
  title: "Check Life-Insurance Program Availability — SMN Partner Program",
  description:
    "Tell us your agents, capacity, states, and criteria. We'll reply with current SMN family life-insurance lead availability.",
  robots: { index: false, follow: false },
};

const config: WizardConfig = {
  vertical: "life-insurance",
  program: "life-insurance",
  page: "/partners/life-insurance/apply",
  backHref: "/partners/life-insurance",
  backLabel: "Back to life-insurance program",
  thankYouHref: "/partners/life-insurance/thank-you",
  finalCta: "Check life-insurance availability →",
  steps: [
    {
      key: "company_type",
      kind: "single-choice",
      eyebrow: "About your organization",
      heading: "Which best describes your business?",
      options: ["Life agency", "IMO", "Agency", "Other"],
      autoAdvance: true,
    },
    {
      key: "reps",
      kind: "single-choice",
      eyebrow: "Your producers",
      heading: "How many producing agents write your book?",
      helper: "Agents actively writing new policies.",
      options: ["1–5", "6–25", "26–100", "100+"],
      autoAdvance: true,
    },
    {
      key: "products",
      kind: "multi-choice",
      eyebrow: "Products written",
      heading: "Which products do your agents write?",
      helper: "Pick every one that applies.",
      options: ["Term", "Whole", "IUL", "Final expense"],
      minRequired: 1,
    },
    {
      key: "daily_capacity",
      kind: "single-choice",
      eyebrow: "Capacity",
      heading: "How many new leads per day can your team actually handle?",
      helper: "Be honest — under-buying is better than drowning agents.",
      options: ["Under 10", "10–25", "25–50", "50–100", "100+"],
      autoAdvance: true,
    },
    {
      key: "currently_buying",
      kind: "single-choice",
      eyebrow: "Buying today",
      heading: "Are you currently purchasing life-insurance leads?",
      options: ["Yes", "No"],
      layout: "two-column",
      autoAdvance: true,
    },
    {
      key: "criteria",
      kind: "single-choice",
      eyebrow: "Qualification",
      heading: "What's your minimum face-amount target?",
      options: ["$100k+", "$250k+", "$500k+", "$1M+", "Open"],
      autoAdvance: true,
    },
    {
      key: "states",
      kind: "states",
      eyebrow: "Licensed states",
      heading: "Which states are your agents licensed in?",
      helper: "Tap to add. Tap again to remove.",
    },
    {
      key: "contact",
      kind: "contact",
      eyebrow: "Almost done",
      heading: "How can we reach you?",
      helper:
        "We'll reply within one business day with current life-insurance availability.",
    },
  ],
};

export default function LifeInsuranceApplyPage() {
  return <ApplyPageShell config={config} />;
}
