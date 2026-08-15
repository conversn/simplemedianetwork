import type { Metadata } from "next";
import {
  VerticalLanderTemplate,
  type VerticalLanderConfig,
} from "../_shared/VerticalLanderTemplate";

export const metadata: Metadata = {
  title: "SMN Partner Program — Mortgage & Home-Equity Consumer Leads",
  description:
    "Buy mortgage and home-equity leads directly from the publisher generating them. RateRoots → qualified homeowner prospects on your criteria.",
  robots: { index: true, follow: true },
};

const config: VerticalLanderConfig = {
  slug: "home-equity",
  program: "home-equity",
  leadNoun: "mortgage or home-equity leads",
  page: "/partners/home-equity",
  hero: {
    eyebrow: "Simple Media Network Partner Program",
    headlineLead: "Buy mortgage and home-equity leads",
    headlineItalic: "directly from the publisher",
    headlineTrail: "generating them.",
    lede: "RateRoots generates the consumer demand. Simple Media Network partners with lenders to deliver qualified homeowner prospects on your criteria. Choose your states. Set your daily volume. Pay a fixed cost per lead.",
    micro: "For licensed lenders with active loan officers.",
  },
  sourceProperty: {
    key: "rateroots",
    label: "RateRoots",
    consumerLine:
      "Consumers enter through RateRoots, our owned mortgage and home-equity property. We control the acquisition experience end to end so your LOs work closer to the source — not a shared file dialed by five other lenders.",
    flowLine: "Ad → Consumer experience → Qualification → Delivery",
    sourceHeading: "Where the demand comes from — RateRoots.",
    sourceBody:
      "RateRoots is an owned SMN property for homeowners exploring mortgage, refinance, HELOC, and cash-out decisions. Rather than acquiring third-party lists, we generate demand through the property itself — giving lenders a direct relationship with the acquisition source.",
    sourceFlow: "RateRoots → Qualification → Your loan officers",
  },
  program_block: {
    heading: "Homeowner mortgage & home-equity leads.",
    body: "Built for lenders with an active loan-officer floor who need predictable, compliant borrower flow.",
    qualification: [
      "Loan purpose (purchase / refinance / HELOC / cash-out)",
      "Estimated loan amount",
      "Estimated equity",
      "Self-reported credit band",
      "Property state",
      "Contact information",
      "Consent",
      "Additional buyer criteria",
    ],
  },
  moneyChain:
    "We own RateRoots → we control equity, credit, geography, and purpose qualification → your LOs work borrowers that fit your products and overlays. The outcome: higher app-to-fund rate per LO, less time on files that can't close.",
  painkiller:
    "Lenders need predictable, compliant borrower flow — vendor leads are aged, shared, and opaque about credit and equity. Working direct with the property that generated the consumer removes that friction: LOs stop dialing dead files and pull-through holds against your cost per funded loan.",
  fit: [
    "Active loan-officer floor",
    "Defined credit / equity overlays",
    "Fast speed-to-lead intake",
    "Known cost per funded loan",
    "Existing lead-acquisition activity",
  ],
  formHeading: "Your criteria. Your markets. Your volume.",
  formBody:
    "A short qualifier — lender type, capacity, states, contact. Takes about a minute. We'll reply within one business day with current mortgage & home-equity availability.",
  compliance:
    "Mortgage advertising, state licensing, and TCPA compliance apply; consent captured.",
  funnelSteps: [
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/rateroots-home-equity/00-landing.png",
      alt: "RateRoots Home Equity landing",
      label: "Landing",
      caption: "A home-equity explainer on a property we own — not an ad.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/rateroots-home-equity/01-step.png",
      alt: "RateRoots Home Equity qualification step",
      label: "Qualify",
      caption: "Self-reported loan purpose, equity, and credit band.",
    },
    {
      src: "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/rateroots-home-equity/03-step.png",
      alt: "RateRoots Home Equity delivery step",
      label: "Delivery",
      caption: "Borrowers handed to your loan officers while intent is fresh.",
    },
  ],
};

export default function PartnerHomeEquityPage() {
  return <VerticalLanderTemplate config={config} />;
}
