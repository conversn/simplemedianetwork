import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { PropertyTile } from "../../components/marketing/PropertyTile";
import { FeatureCard } from "../../components/marketing/FeatureCard";
import { ScreenStack, type ScreenStackItem } from "../../components/marketing/ScreenStack";
import { spellCount } from "../../lib/spellCount";
import type { StyleWithVars } from "../../lib/cssVars";

const SCREENS: ScreenStackItem[] = [
  { src: "/ds/screens/moneysimple-hero.png", label: "MoneySimple — home", property: "moneysimple.org", caption: "The editorial entry point for debt and credit decisions." },
  { src: "/ds/screens/moneysimple-view-guides.png", label: "Guides", property: "moneysimple.org", caption: "Explainers a consumer reads before they ever raise a hand." },
  { src: "/ds/screens/moneysimple-view-tools.png", label: "Tools", property: "moneysimple.org", caption: "Where research turns into a stated situation." },
  { src: "/ds/screens/moneysimple-view-footer.png", label: "Where it hands off", property: "moneysimple.org", caption: "The point a reader chooses to speak to someone." },
];

const BRANDS = [
  { name: "SeniorSimple", focus: "Medicare, retirement, and later-life planning", href: "https://seniorsimple.org", logo: "/ds/logos/properties/seniorsimple.png" },
  { name: "MoneySimple", focus: "Debt, credit, and personal finance", href: "https://moneysimple.org", logo: "/ds/logos/properties/moneysimple.png" },
  { name: "RateRoots", focus: "Mortgage and home-equity decisions", href: "https://rateroots.com", logo: "/ds/logos/properties/rateroots.png" },
  { name: "ParentSimple", focus: "Parenting and family decisions", href: "https://parentsimple.org", logo: "/ds/logos/properties/parentsimple.png" },
  { name: "LegalSimple", focus: "Consumer legal decisions", href: "https://legalsimple.org", logo: "/ds/logos/properties/legalsimple-icon.png" },
  { name: "SmallBizSimple", focus: "Small business finance and growth", href: "https://smallbizsimple.org", logo: "/ds/logos/properties/smallbizsimple.png" },
  { name: "HomeSimple", focus: "Home improvement and project guidance", href: "https://homesimple.org", logo: "/ds/logos/properties/homesimple.png" },
  { name: "RetirementRescue", focus: "Retirement planning and retirement income", href: "https://retirementrescue.net", logo: "/ds/logos/properties/retirementrescue.png", logoHeight: 34 },
];

const QUALITIES: [string, string, string][] = [
  ["file-text", "Already educated", "They've read, compared and considered. They are not starting from zero."],
  ["target", "High intent", "They are actively looking for guidance, not casually browsing."],
  ["eye", "Engaged", "They spend real time inside our publications before any outreach."],
  ["fingerprint-pattern", "Identified", "Where permitted, we confirm identity and contact accuracy before routing."],
  ["gauge", "Well timed", "Outreach is prioritized when response likelihood is highest."],
  ["route", "Fewer lost deals", "Structured follow-up reduces conversations that slip through the cracks."],
];

export function DemandSource() {
  return (
    <>
      <section id="network" style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "var(--sp-12)" }}>
          <SectionHeading eyebrow="The source"
            title={<>Demand originates from <em>publications we own</em>.</>}
            lede="We build intent-driven audiences around life's most important decisions. Partners receive that demand from the publisher that created it — not from a marketplace." />
          <ScreenStack items={SCREENS} orientation="vertical" autoplay={5600} />
        </div>
      </section>
      <div style={{ padding: "0 var(--gutter)" }}>
        <Band tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="The network"
            title={<>{spellCount(BRANDS.length)} properties. <em>One standard.</em></>} />
          <div className="smn-autogrid" style={{ marginTop: "var(--sp-12)" }}>
            {BRANDS.map((b) => <PropertyTile key={b.name} {...b} />)}
          </div>
        </Band>
      </div>
      <section style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="Quality"
            title={<>Not all demand is <em>equal</em>.</>}
            lede="The people inside our publications have already taken meaningful steps before we connect them to you." />
          <div className="smn-autogrid" style={{ marginTop: "var(--sp-16)", "--min": "240px" } as StyleWithVars}>
            {QUALITIES.map(([ic, t, b]) => <FeatureCard key={t} icon={ic} title={t} body={b} />)}
          </div>
        </div>
      </section>
    </>
  );
}
