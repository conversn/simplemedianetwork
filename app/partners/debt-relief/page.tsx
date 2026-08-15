import type { Metadata } from "next";
import {
  VerticalLanderTemplate,
  type VerticalLanderConfig,
} from "../_shared/VerticalLanderTemplate";

export const metadata: Metadata = {
  title: "SMN Partner Program — Debt Relief Consumer Leads",
  description:
    "Buy debt leads directly from the publisher generating them. Simple Media Network partners with established debt-relief companies to deliver qualified consumer opportunities on your criteria.",
  robots: { index: true, follow: true },
};

const MONEYSIMPLE_CDN =
  "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/funnel-screenshots/moneysimple-debt-relief";

const config: VerticalLanderConfig = {
  slug: "debt-relief",
  program: "debt-relief",
  leadNoun: "debt leads",
  page: "/partners/debt-relief",
  heroVariant: "B",
  hero: {
    eyebrow: "Simple Media Network Partner Program",
    headlineLead: "Buy debt leads directly from",
    headlineItalic: "the publisher",
    headlineTrail: "generating them.",
    lede: "MoneySimple generates the consumer demand. Simple Media Network partners with established debt-relief companies to deliver qualified opportunities on your criteria. Choose your states. Set your daily volume. Pay a fixed cost per lead.",
    micro: "For established debt-relief companies with active sales teams.",
  },
  sourceProperty: {
    key: "moneysimple",
    label: "MoneySimple",
    consumerLine:
      "Consumers enter through MoneySimple, our owned personal-finance publication. We control the acquisition experience end to end, so you're working closer to the source — not buying another anonymous file from somewhere upstream.",
    flowLine: "Ad → Consumer experience → Qualification → Delivery",
    sourceHeading: "Where the demand comes from — MoneySimple.",
    sourceBody:
      "MoneySimple is a consumer personal-finance property from Simple Media Network covering debt, credit, borrowing and other major financial decisions. Rather than acquiring anonymous third-party lists, we generate demand through our own properties — giving partners a direct relationship with the organization responsible for the acquisition source.",
    sourceFlow: "MoneySimple → Qualification → Your sales team",
  },
  program_block: {
    heading: "Debt-relief consumer leads.",
    body: "Built for debt-settlement and consumer debt-resolution teams looking for additional daily volume.",
    qualification: [
      "Consumer-reported unsecured debt amount",
      "Accepted debt types",
      "State",
      "Contact information",
      "Consent",
      "Additional buyer-specific criteria",
    ],
  },
  moneyChain:
    "We own MoneySimple → we control debt, geography, and eligibility qualification → your intake works consumers that match what your team can actually enroll. The outcome: higher enrollment per rep, less wasted dial time, better program retention.",
  painkiller:
    "Debt-relief teams need consistent, workable prospects — vendor leads are aged, oversold, and opaque about qualification. Working direct with the property that generated the consumer removes that friction: reps stay in front of qualified debt-relief prospects and enrollment holds.",
  fit: [
    "An active intake or sales team",
    "Fast speed-to-lead",
    "Consistent follow-up",
    "Defined enrollment economics",
    "Existing customer-acquisition activity",
    "Capacity for ongoing daily volume",
  ],
  formHeading: "Your criteria. Your markets. Your volume.",
  formBody:
    "A short qualifier — company, capacity, states, contact. Takes about a minute. We'll reply within one business day with current debt-relief availability.",
  funnelSteps: [
    { src: `${MONEYSIMPLE_CDN}/00-landing.png`, alt: "MoneySimple debt-relief landing page", label: "Landing", caption: "An editorial explainer on a property we own — not an ad." },
    { src: `${MONEYSIMPLE_CDN}/01-step.png`, alt: "MoneySimple debt-relief qualification step", label: "Qualify", caption: "Consumer-reported debt amount, type and state." },
    { src: `${MONEYSIMPLE_CDN}/02-step.png`, alt: "MoneySimple debt-relief criteria step", label: "Criteria", caption: "Screened against the criteria your team can work." },
  ],
};

export default function PartnerDebtReliefPage() {
  return <VerticalLanderTemplate config={config} />;
}
