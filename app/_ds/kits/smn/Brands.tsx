import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { PropertyTile } from "../../components/marketing/PropertyTile";

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

export function Brands() {
  return (
    <div style={{ padding: "0 var(--gutter)" }}>
      <Band id="brands" tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading eyebrow="The network"
          title={<>Eight consumer brands. <em>One company.</em></>}
          lede="Each property serves a specific set of decisions, with its own audience relationship and editorial voice." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "var(--sp-4)", marginTop: "var(--sp-16)" }}>
          {BRANDS.map((b) => <PropertyTile key={b.name} {...b} />)}
        </div>
      </Band>
    </div>
  );
}
