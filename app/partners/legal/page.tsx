import type { Metadata } from "next";
import {
  VerticalLanderTemplate,
  type VerticalLanderConfig,
} from "../_shared/VerticalLanderTemplate";

// Indexing enabled 2026-08-19 at Keenan's direction, lifting the prior noindex gate.
// That gate required a documented attorney-advertising / bar / TCPA sign-off; no such
// sign-off is on record — the decision was made with that stated. Attorney-advertising,
// state bar, and TCPA obligations still apply to this page and to the LegalSimple
// captures it republishes (see WO-733 re: the "4.9 / 12,847+ case reviews" and
// "maximum compensation" claims inside those screenshots).
export const metadata: Metadata = {
  title: "SMN Partner Program — Auto-Accident & Premises-Injury Leads",
  description:
    "Buy MVA and premises-injury leads directly from the publisher generating them. LegalSimple → qualified claimants on your criteria. Mass tort not offered here.",
  robots: { index: true, follow: true },
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
  funnelSteps: [
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/legalsimple-vehicle-accident/00-landing.png",
      alt: "LegalSimple vehicle-accident landing",
      label: "Landing",
      caption: "A vehicle-accident case-review explainer on a property we own — not an ad.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/legalsimple-vehicle-accident/01-step.png",
      alt: "LegalSimple vehicle-accident qualification step",
      label: "Qualify",
      caption: "Self-reported fault and accident cause.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/legalsimple-vehicle-accident/02-step.png",
      alt: "LegalSimple vehicle-accident injury step",
      label: "Delivery",
      caption: "Claimants handed to your intake team while intent is fresh.",
    },
  ],
};

export default function PartnerLegalPage() {
  return <VerticalLanderTemplate config={config} />;
}
