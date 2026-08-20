"use client";
import React, { type CSSProperties } from "react";
import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import type { StyleWithVars } from "../../lib/cssVars";

export type BuyCard = {
  slug: string;
  eyebrow: string;
  title: string;
  source: string;
  body: string;
  criteria: string;
  cta: { href: string; label: string };
  other?: boolean;
};

const CARDS: BuyCard[] = [
  {
    slug: "debt-relief",
    eyebrow: "Debt Relief",
    title: "Consumers exploring solutions for unsecured debt.",
    source: "Source · MoneySimple",
    body: "For debt-settlement and consumer debt-resolution teams with active intake.",
    criteria: "Criteria: debt amount · geography · debt type · intent.",
    cta: { href: "/partners/debt-relief", label: "See the debt-relief program →" },
  },
  {
    slug: "retirement",
    eyebrow: "Retirement & Annuity",
    title: "Retirement-stage consumers exploring income and protection.",
    source: "Source · SeniorSimple + RetirementRescue",
    body: "For FMOs, IMOs, and agencies feeding a producing downline.",
    criteria: "Criteria: age · assets · geography · product interest.",
    cta: { href: "/partners/retirement", label: "See the retirement program →" },
  },
  {
    slug: "life-insurance",
    eyebrow: "Life Insurance",
    title: "Parents and young families evaluating protection.",
    source: "Source · ParentSimple",
    body: "For life agencies and IMOs with producing agents.",
    criteria: "Criteria: age · coverage · health · product interest.",
    cta: { href: "/partners/life-insurance", label: "See the life-insurance program →" },
  },
  {
    slug: "home-equity",
    eyebrow: "Mortgage & Home Equity",
    title: "Homeowners exploring mortgage, refinance, and HELOC.",
    source: "Source · RateRoots",
    body: "For lenders with an active loan-officer floor.",
    criteria: "Criteria: loan amount · equity · credit · geography.",
    cta: { href: "/partners/home-equity", label: "See the mortgage program →" },
  },
  {
    slug: "legal",
    eyebrow: "Legal",
    title: "Injured people after qualifying accidents (MVA + premises).",
    source: "Source · LegalSimple",
    body: "For PI firms with an active intake team. Mass tort not offered.",
    criteria: "Criteria: injury type · statute · representation · geography.",
    cta: { href: "/partners/legal", label: "See the legal program →" },
  },
  {
    slug: "other",
    eyebrow: "Other verticals",
    title: "Tell us what you buy.",
    source: "Source · SMN network",
    body: "Home services, business finance, or something else across the SMN network — the universal form routes it to the right team.",
    criteria: "",
    cta: { href: "#apply", label: "Open the universal form →" },
    other: true,
  },
];

function Card({ card }: { card: BuyCard }) {
  const [hover, setHover] = React.useState(false);
  const base: CSSProperties = {
    display: "flex", flexDirection: "column", gap: "var(--sp-4)",
    padding: "var(--sp-8)", borderRadius: "var(--radius-lg)",
    background: card.other ? "var(--sand)" : "var(--white)",
    border: card.other ? "1px solid transparent" : `1px solid ${hover ? "var(--border-accent)" : "var(--border-hairline)"}`,
    boxShadow: hover && !card.other ? "var(--shadow-md)" : "none",
    textDecoration: "none",
    transition: "box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
    transform: hover ? "translateY(-2px)" : "translateY(0)",
    height: "100%",
  };
  return (
    <a href={card.cta.href}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={base}>
      <span className="smn-eyebrow">{card.eyebrow}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--evergreen)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{card.source}</span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--text-strong)", lineHeight: 1.2, margin: 0 }}>{card.title}</h3>
      <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-body)" }}>{card.body}</p>
      {card.criteria && (
        <span style={{ fontSize: "var(--fs-caption)", color: "var(--text-muted)", letterSpacing: "0.02em", lineHeight: 1.5 }}>{card.criteria}</span>
      )}
      <span style={{
        marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 8,
        color: "var(--evergreen)", fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)",
        fontWeight: "var(--fw-semibold)", paddingTop: 4,
      }}>{card.cta.label}</span>
    </a>
  );
}

export function BuyCards() {
  return (
    <div style={{ padding: "0 var(--gutter)" }}>
      <Band tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading eyebrow="Choose your vertical"
          title={<>What are you <em>buying?</em></>}
          lede="Each vertical routes to its own program page with real deliverable qualification, or start with the universal request form below." />
        <div className="smn-autogrid" style={{ marginTop: "var(--sp-12)", alignItems: "stretch", "--min": "300px" } as StyleWithVars}>
          {CARDS.map((c) => <Card key={c.slug} card={c} />)}
        </div>
      </Band>
    </div>
  );
}
