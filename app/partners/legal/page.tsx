import type { Metadata } from "next";
import {
  VerticalLanderTemplate,
  type VerticalLanderConfig,
} from "../_shared/VerticalLanderTemplate";

// Legal is gated behind noindex until attorney-advertising / bar / TCPA compliance clears.
// Route ships live but stays out of search. Do not remove noindex without a documented
// compliance sign-off.
export const metadata: Metadata = {
  title: "SMN Partner Program — Auto-Accident & Premises-Injury Leads",
  description:
    "Buy MVA and premises-injury leads directly from the publisher generating them. LegalSimple → qualified claimants on your criteria. Mass tort not offered here.",
  robots: { index: false, follow: false },
};

const config: VerticalLanderConfig = {
  slug: "legal",
  program: "legal",
  leadNoun: "MVA or premises-injury leads",
  page: "/partners/legal",
  hero: {
    eyebrow: "Simple Media Network Partner Program",
    headlineLead: "Buy auto-accident and premises-injury leads",
    headlineItalic: "directly from the publisher",
    headlineTrail: "generating them.",
    lede: "LegalSimple generates the consumer demand. Simple Media Network partners with personal-injury firms to deliver qualified claimants on your criteria. Choose your states. Set your daily volume. Pay a fixed cost per lead. Mass tort is not part of this program.",
    micro: "For personal-injury firms with an active intake team.",
  },
  sourceProperty: {
    key: "legalsimple",
    label: "LegalSimple",
    consumerLine:
      "Claimants enter through LegalSimple, our owned consumer-legal property. We control the acquisition experience end to end so your intake works closer to the source — not a claimant already called by six firms.",
    flowLine: "Ad → Consumer experience → Qualification → Delivery",
    sourceHeading: "Where the demand comes from — LegalSimple.",
    sourceBody:
      "LegalSimple is an owned SMN property covering consumer legal decisions, including single-event personal injury (motor-vehicle accidents and premises liability). Rather than acquiring third-party lists, we generate demand through the property itself — giving PI firms a direct relationship with the source of the claimant.",
    sourceFlow: "LegalSimple → Qualification → Your intake",
  },
  program_block: {
    heading: "Auto-accident & premises-injury leads.",
    body: "Built for personal-injury firms and intake centers. Single-event personal injury only — motor-vehicle accident (MVA) and premises liability. Mass tort is not offered through this program.",
    qualification: [
      "Injury type (MVA / premises)",
      "Injury or accident timeframe (within statute)",
      "Injured party",
      "Sought treatment",
      "Not-at-fault indicators",
      "Currently represented (Y/N)",
      "State",
      "Contact information",
      "Consent",
    ],
  },
  moneyChain:
    "We own LegalSimple → we control injury type, geography, statute, and representation qualification → your intake spends time on claimants that fit your case criteria. The outcome: higher signed-case rate, more retained cases per intake hour.",
  painkiller:
    "PI firms need signed cases, not raw leads — vendor claimants are oversold, out-of-statute, or already represented. Working direct with the property that generated the claimant removes that friction: intake signs qualified claimants and cost per signed case holds.",
  fit: [
    "Active intake team",
    "Fast speed-to-lead intake",
    "Consistent case-work capacity",
    "Defined signed-case economics",
    "Existing lead-acquisition activity",
  ],
  formHeading: "Your criteria. Your markets. Your volume.",
  formBody:
    "A short qualifier — firm type, capacity, states, contact. Takes about a minute. We'll reply within one business day with current MVA and premises availability.",
  compliance:
    "Attorney-advertising, state bar, and TCPA compliance apply; consent captured; no outcome or settlement claims. Warm-transfer and exclusive delivery available. Mass tort is explicitly excluded from this program.",
};

export default function PartnerLegalPage() {
  return <VerticalLanderTemplate config={config} />;
}
