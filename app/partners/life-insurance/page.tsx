import type { Metadata } from "next";
import {
  VerticalLanderTemplate,
  type VerticalLanderConfig,
} from "../_shared/VerticalLanderTemplate";

export const metadata: Metadata = {
  title: "SMN Partner Program — Family Life-Insurance Consumer Leads",
  description:
    "Buy family life-insurance leads directly from the publisher generating them. ParentSimple → qualified young-family term/whole/IUL prospects on your criteria.",
  robots: { index: true, follow: true },
};

const config: VerticalLanderConfig = {
  slug: "life-insurance",
  program: "life-insurance",
  leadNoun: "life-insurance leads",
  page: "/partners/life-insurance",
  hero: {
    eyebrow: "Simple Media Network Partner Program",
    headlineLead: "Buy life-insurance leads",
    headlineItalic: "directly from the publisher",
    headlineTrail: "generating them.",
    lede: "ParentSimple generates the consumer demand. Simple Media Network partners with life agencies and IMOs to deliver qualified family-protection prospects on your criteria. Choose your states. Set your daily volume. Pay a fixed cost per lead.",
    micro: "For life agencies and IMOs with producing agents.",
  },
  sourceProperty: {
    key: "parentsimple",
    label: "ParentSimple",
    consumerLine:
      "Consumers enter through ParentSimple, our owned family and parenting property. We control the acquisition experience end to end so your agents work closer to the source — not an aged file resold across three IMOs.",
    flowLine: "Ad → Consumer experience → Qualification → Delivery",
    sourceHeading: "Where the demand comes from — ParentSimple.",
    sourceBody:
      "ParentSimple is an owned SMN property for parents and young families navigating decisions around household protection, savings, and the practical parts of family life. Rather than acquiring third-party lists, we generate demand through the property itself — giving partners a direct relationship with the source of the consumer.",
    sourceFlow: "ParentSimple → Qualification → Your agents",
  },
  program_block: {
    heading: "Family life-insurance consumer leads.",
    body: "Built for life agencies and IMOs with producing agents who need steady, workable family-protection flow.",
    qualification: [
      "Age band",
      "Coverage need / face amount",
      "Self-reported health tier",
      "Tobacco use",
      "Product interest (term / whole / IUL / final expense)",
      "Dependents in household",
      "State",
      "Contact information",
      "Consent",
    ],
  },
  moneyChain:
    "We own ParentSimple → we control age, coverage, health, and product qualification → your agents work families that match what they actually write. The outcome: higher placed-policy rate per agent, less wasted quoting time, better persistency.",
  painkiller:
    "Life agencies keep agents productive only with steady, workable prospects — vendor life leads are aged, oversold, and often the wrong demographic. Working direct with the property that generated the consumer removes that friction: agents stay in front of qualified families and placement holds.",
  fit: [
    "Producing agents on a family life-insurance line",
    "Consistent daily-volume capacity",
    "Fast speed-to-lead intake",
    "Defined placement / persistency economics",
    "Existing lead-acquisition activity",
  ],
  formHeading: "Your criteria. Your markets. Your volume.",
  formBody:
    "A short qualifier — organization, capacity, states, contact. Takes about a minute. We'll reply within one business day with current life-insurance availability.",
  compliance:
    "Insurance advertising, state DOI, and TCPA compliance apply; consent captured. Exclusive vs shared available per program.",
  funnelSteps: [
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/parentsimple-life-insurance/00-landing.png",
      alt: "ParentSimple Life Insurance landing",
      label: "Landing",
      caption: "A family-protection explainer on a property we own — not an ad.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/parentsimple-life-insurance/03-step.png",
      alt: "ParentSimple Life Insurance qualification step",
      label: "Qualify",
      caption: "Self-reported age, coverage need, health, and dependents.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/parentsimple-life-insurance/06-step.png",
      alt: "ParentSimple Life Insurance delivery step",
      label: "Delivery",
      caption: "Families handed to your agents while intent is fresh.",
    },
  ],
};

export default function PartnerLifeInsurancePage() {
  return <VerticalLanderTemplate config={config} />;
}
