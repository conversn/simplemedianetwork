import type { Metadata } from "next";
import { ApplyPageShell } from "../../_shared/apply/ApplyPageShell";
import type { WizardConfig } from "../../_shared/apply/WizardConfig";

export const metadata: Metadata = {
  title: "Check Legal Program Availability — SMN Partner Program",
  description:
    "Tell us your intake, case types, states, and criteria. We'll reply with current SMN MVA & premises-injury lead availability. Mass tort not offered.",
  robots: { index: false, follow: false },
};

const config: WizardConfig = {
  vertical: "legal",
  program: "legal",
  page: "/partners/legal/apply",
  backHref: "/partners/legal",
  backLabel: "Back to legal program",
  thankYouHref: "/partners/legal/thank-you",
  finalCta: "Check legal availability →",
  steps: [
    {
      key: "company_type",
      kind: "single-choice",
      eyebrow: "About your firm",
      heading: "Which best describes your operation?",
      options: ["PI law firm", "Intake center", "Other"],
      autoAdvance: true,
    },
    {
      key: "reps",
      kind: "single-choice",
      eyebrow: "Your intake",
      heading: "How many intake staff actively work leads?",
      helper: "People who screen and sign claimants — not paralegals on cases.",
      options: ["1–5", "6–25", "26+"],
      autoAdvance: true,
    },
    {
      key: "case_types",
      kind: "multi-choice",
      eyebrow: "Case types",
      heading: "Which case types are you buying for?",
      helper: "Single-event only — mass tort is not offered through this program.",
      options: ["Motor-vehicle accident (MVA)", "Premises (slip-and-fall)"],
      minRequired: 1,
    },
    {
      key: "delivery_pref",
      kind: "single-choice",
      eyebrow: "Delivery",
      heading: "How do you prefer to receive claimants?",
      options: ["Long-form lead", "Warm transfer", "Signed retainer"],
      autoAdvance: true,
    },
    {
      key: "daily_capacity",
      kind: "single-choice",
      eyebrow: "Capacity",
      heading: "How many new claimants per day can your intake actually handle?",
      helper: "Be honest — under-buying is better than overrunning intake.",
      options: ["Under 10", "10–25", "25–50", "50+"],
      autoAdvance: true,
    },
    {
      key: "currently_buying",
      kind: "single-choice",
      eyebrow: "Buying today",
      heading: "Are you currently purchasing legal leads?",
      options: ["Yes", "No"],
      layout: "two-column",
      autoAdvance: true,
    },
    {
      key: "qualifiers",
      kind: "multi-choice",
      eyebrow: "Required qualifiers",
      heading: "Which qualifiers must be met?",
      helper: "Pick every qualifier your intake requires before accepting a claim.",
      options: [
        "Within statute",
        "Sought treatment",
        "Not currently represented",
        "Not at fault (MVA)",
      ],
      minRequired: 1,
    },
    {
      key: "states",
      kind: "states",
      eyebrow: "Licensed states",
      heading: "Which states does your firm handle cases in?",
      helper: "Tap to add. Tap again to remove.",
    },
    {
      key: "contact",
      kind: "contact",
      eyebrow: "Almost done",
      heading: "How can we reach you?",
      helper: "We'll reply within one business day with current MVA & premises availability.",
    },
  ],
};

export default function LegalApplyPage() {
  return <ApplyPageShell config={config} />;
}
