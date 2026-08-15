import type { Metadata } from "next";
import {
  VerticalLanderTemplate,
  type VerticalLanderConfig,
} from "../_shared/VerticalLanderTemplate";

export const metadata: Metadata = {
  title: "SMN Partner Program — Retirement & Annuity Consumer Leads",
  description:
    "Buy retirement and annuity leads directly from the publisher generating them. SeniorSimple + RetirementRescue → qualified retirement-stage prospects on your criteria.",
  robots: { index: true, follow: true },
};

const config: VerticalLanderConfig = {
  slug: "retirement",
  program: "retirement",
  leadNoun: "retirement or annuity leads",
  page: "/partners/retirement",
  hero: {
    eyebrow: "Simple Media Network Partner Program",
    headlineLead: "Buy retirement and annuity leads",
    headlineItalic: "directly from the publisher",
    headlineTrail: "generating them.",
    lede: "SeniorSimple and RetirementRescue generate the consumer demand. Simple Media Network partners with FMOs and agencies to deliver qualified retirement prospects on your criteria. Choose your states. Set your daily volume. Pay a fixed cost per lead.",
    micro: "For FMOs and agencies with a producing downline.",
  },
  sourceProperty: {
    key: "seniorsimple",
    label: "SeniorSimple + RetirementRescue",
    consumerLine:
      "Consumers enter through SeniorSimple and RetirementRescue, our owned retirement properties. We control the acquisition experience end to end so your agents work closer to the source — not an aged file resold down the line.",
    flowLine: "Ad → Consumer experience → Qualification → Delivery",
    sourceHeading:
      "Where the demand comes from — SeniorSimple + RetirementRescue.",
    sourceBody:
      "SeniorSimple and RetirementRescue are owned SMN properties covering retirement income, annuity, life, and Medicare decisions for retirement-stage households. Rather than acquiring third-party lists, we generate demand through our own properties — giving partners a direct relationship with the source.",
    sourceFlow: "SeniorSimple / RetirementRescue → Qualification → Your downline",
  },
  program_block: {
    heading: "Retirement & annuity consumer leads.",
    body: "Built for FMOs, IMOs, and agencies feeding a producing downline that needs steady, workable retirement flow.",
    qualification: [
      "Age band",
      "Investable-asset range",
      "Product interest (annuity / life / final expense)",
      "State",
      "Contact information",
      "Consent",
      "Additional buyer criteria",
    ],
  },
  moneyChain:
    "We own SeniorSimple and RetirementRescue → we control age, asset, and product qualification → we feed your downline prospects that match what your agents actually write. The outcome: higher placement per agent, less wasted dial time, better downline retention.",
  painkiller:
    "An FMO's downline only stays productive and loyal with consistent, workable lead flow — vendor leads are aged, oversold, and opaque. Working direct with the property that generated the consumer removes that friction: agents stay fed, placement holds, and producers don't leave for another FMO's leads.",
  fit: [
    "Producing downline of licensed agents",
    "Consistent daily-volume capacity",
    "Fast speed-to-lead intake",
    "Defined placement economics",
    "Existing lead-acquisition activity",
  ],
  formHeading: "Your criteria. Your markets. Your volume.",
  formBody:
    "A short qualifier — organization, capacity, states, contact. Takes about a minute. We'll reply within one business day with current retirement & annuity availability.",
  compliance:
    "Insurance / annuity advertising, state DOI, and TCPA compliance apply; consent captured. Exclusive vs shared available per program.",
  funnelSteps: [
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/retirementrescue-quiz/00-landing.png",
      alt: "RetirementRescue RMD Quiz landing",
      label: "Landing",
      caption: "A retirement-planning explainer on a property we own — not an ad.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/retirementrescue-quiz/03-step.png",
      alt: "RetirementRescue RMD Quiz qualification step",
      label: "Qualify",
      caption: "Self-reported age, assets, and product interest.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/retirementrescue-quiz/06-step.png",
      alt: "RetirementRescue RMD Quiz delivery step",
      label: "Delivery",
      caption: "Prospects handed to your producing downline while intent is fresh.",
    },
  ],
};

export default function PartnerRetirementPage() {
  return <VerticalLanderTemplate config={config} />;
}
