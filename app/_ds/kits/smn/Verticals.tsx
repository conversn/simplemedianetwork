import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { Button } from "../../components/core/Button";

type Vertical = {
  slug: string;
  label: string;
  source: string;
  body: string;
  href: string;
};

/**
 * The five programs a partner can actually buy into today, and the property
 * each one's demand comes from. This is the homepage's routing layer: it gets a
 * buyer to the right program page in one click rather than making them read the
 * whole hub first.
 *
 * The deeper qualification — criteria, deliverables, the form — stays on
 * /partners and the program pages. Keep this list in step with the BuyCards
 * list there; a vertical that appears in one and not the other is a bug.
 */
const VERTICALS: Vertical[] = [
  {
    slug: "debt-relief",
    label: "Debt relief",
    source: "MoneySimple",
    body: "Consumers exploring solutions for unsecured debt.",
    href: "/partners/debt-relief",
  },
  {
    slug: "retirement",
    label: "Retirement & annuity",
    source: "SeniorSimple + RetirementRescue",
    body: "Retirement-stage consumers exploring income and protection.",
    href: "/partners/retirement",
  },
  {
    slug: "life-insurance",
    label: "Life insurance",
    source: "ParentSimple",
    body: "Parents and young families evaluating protection.",
    href: "/partners/life-insurance",
  },
  {
    slug: "home-equity",
    label: "Mortgage & home equity",
    source: "RateRoots",
    body: "Homeowners exploring mortgage, refinance, and HELOC.",
    href: "/partners/home-equity",
  },
  {
    slug: "legal",
    label: "Legal",
    source: "LegalSimple",
    body: "Injured people after qualifying accidents. Mass tort not offered.",
    href: "/partners/legal",
  },
];

export const VERTICAL_COUNT = VERTICALS.length;

/**
 * Deliberately not a client component. The row hover lives in `.smn-vertical-row`
 * so this stays a server component — HomeHero reads VERTICAL_COUNT from this
 * module, and a "use client" boundary would hand it a client reference instead
 * of the number.
 */
export function Verticals() {
  return (
    <div style={{ padding: "0 var(--gutter)" }}>
      <Band id="verticals" tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading
          eyebrow="What partners buy"
          title={<>Five verticals. <em>Each with a publication behind it.</em></>}
          lede="Every program is fed by a property we own, so we can tell you where the demand came from and what the consumer had already read before you hear from them."
        />
        <div style={{ marginTop: "var(--sp-12)", display: "flex", flexDirection: "column" }}>
          {VERTICALS.map((v) => (
            <a key={v.slug} href={v.href} className="smn-vertical-row">
              <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--text-strong)", lineHeight: 1.2 }}>{v.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--evergreen)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Source · {v.source}
                </span>
              </span>
              <span style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-body)" }}>{v.body}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-semibold)", color: "var(--evergreen)", whiteSpace: "nowrap" }}>
                See the program →
              </span>
            </a>
          ))}
        </div>
        <div style={{ marginTop: "var(--sp-10)", display: "flex", justifyContent: "center", gap: "var(--sp-3)", flexWrap: "wrap" }}>
          <Button size="lg" href="/partners">See the full partner program</Button>
          <Button size="lg" variant="secondary" href="/partners#apply">Check availability</Button>
        </div>
      </Band>
    </div>
  );
}
