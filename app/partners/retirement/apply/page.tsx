import type { Metadata } from "next";
import { ApplyPageShell } from "../../_shared/apply/ApplyPageShell";
import type { WizardConfig } from "../../_shared/apply/WizardConfig";

export const metadata: Metadata = {
  title: "Check Retirement Program Availability — SMN Partner Program",
  description:
    "Tell us your downline, capacity, states, and criteria. We'll reply with current SMN retirement & annuity lead availability.",
  robots: { index: false, follow: false },
};

const config: WizardConfig = {
  vertical: "retirement",
  program: "retirement",
  page: "/partners/retirement/apply",
  backHref: "/partners/retirement",
  backLabel: "Back to retirement program",
  thankYouHref: "/partners/retirement/thank-you",
  finalCta: "Check retirement availability →",
  steps: [
    {
      key: "company_type",
      kind: "single-choice",
      eyebrow: "About your organization",
      heading: "Which best describes your business?",
      helper: "Pick the one closest to how you'd describe yourselves.",
      options: ["FMO", "IMO", "Agency", "Other"],
      autoAdvance: true,
    },
    {
      key: "reps",
      kind: "single-choice",
      eyebrow: "Your downline",
      heading: "How many producing agents are in your downline?",
      helper: "Agents actively writing business — not admin.",
      options: ["1–5", "6–25", "26–100", "100+"],
      autoAdvance: true,
    },
    {
      key: "products",
      kind: "multi-choice",
      eyebrow: "Products written",
      heading: "Which products do your agents write?",
      helper: "Pick every one that applies.",
      options: ["Annuity", "Life", "Final expense", "Medicare"],
      minRequired: 1,
    },
    {
      key: "daily_capacity",
      kind: "single-choice",
      eyebrow: "Capacity",
      heading: "How many new leads per day can your downline actually handle?",
      helper: "Be honest — under-buying is better than drowning agents.",
      options: ["Under 10", "10–25", "25–50", "50–100", "100+"],
      autoAdvance: true,
    },
    {
      key: "currently_buying",
      kind: "single-choice",
      eyebrow: "Buying today",
      heading: "Are you currently purchasing retirement leads?",
      options: ["Yes", "No"],
      layout: "two-column",
      autoAdvance: true,
    },
    {
      key: "criteria",
      kind: "single-choice",
      eyebrow: "Qualification",
      heading: "What's your minimum investable-asset threshold?",
      options: ["$50k+", "$100k+", "$250k+", "$500k+", "Open"],
      autoAdvance: true,
    },
    {
      key: "states",
      kind: "states",
      eyebrow: "Licensed states",
      heading: "Which states are you licensed in?",
      helper: "Tap to add. Tap again to remove.",
    },
    {
      key: "contact",
      kind: "contact",
      eyebrow: "Almost done",
      heading: "How can we reach you?",
      helper: "We'll reply within one business day with current retirement availability.",
    },
  ],
};

export default function RetirementApplyPage() {
  return <ApplyPageShell config={config} />;
}
