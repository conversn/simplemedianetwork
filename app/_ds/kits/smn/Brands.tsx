import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { PropertyTile } from "../../components/marketing/PropertyTile";
import { spellCount } from "../../lib/spellCount";

const BRANDS = [
  { name: "SeniorSimple", focus: "Senior and retirement decisions", href: "https://seniorsimple.org", logo: "/ds/logos/properties/seniorsimple.png" },
  { name: "MoneySimple", focus: "Debt, credit, borrowing, and personal finance", href: "https://moneysimple.org", logo: "/ds/logos/properties/moneysimple.png" },
  { name: "ParentSimple", focus: "Parenting and family decisions", href: "https://parentsimple.org", logo: "/ds/logos/properties/parentsimple.png" },
  { name: "LegalSimple", focus: "Consumer legal decisions", href: "https://legalsimple.org", logo: "/ds/logos/properties/legalsimple-icon.png" },
  { name: "SmallBizSimple", focus: "Small business finance and growth", href: "https://smallbizsimple.org", logo: "/ds/logos/properties/smallbizsimple.png" },
  { name: "RateRoots", focus: "Mortgage and home-equity decisions", href: "https://rateroots.com", logo: "/ds/logos/properties/rateroots.png" },
  { name: "HomeSimple", focus: "Home improvement and project guidance", href: "https://homesimple.org", logo: "/ds/logos/properties/homesimple.png" },
  { name: "RetirementRescue", focus: "Retirement planning and retirement income", href: "https://retirementrescue.net", logo: "/ds/logos/properties/retirementrescue.png", logoHeight: 34 },
];

export const PROPERTY_COUNT = BRANDS.length;

/**
 * On the B2B homepage this grid is evidence, not a reader directory: it is the
 * answer to "where does your demand actually come from". The tiles still link
 * out to each property, because a buyer's first instinct is to go look.
 */
export function Brands() {
  return (
    <div style={{ padding: "0 var(--gutter)" }}>
      <Band id="network" tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading eyebrow="The network"
          title={<>{spellCount(BRANDS.length)} properties. <em>All owned and operated.</em></>}
          lede="Every property serves a specific set of decisions, with its own audience relationship and editorial voice. None of it is rented, syndicated, or bought in — which is why we can say where a consumer came from." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "var(--sp-4)", marginTop: "var(--sp-16)" }}>
          {BRANDS.map((b) => <PropertyTile key={b.name} {...b} />)}
        </div>
      </Band>
    </div>
  );
}
