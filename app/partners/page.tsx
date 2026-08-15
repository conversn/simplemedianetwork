import type { Metadata } from "next";

import { PartnerNav } from "../_ds/kits/partners/PartnerNav";
import { PartnerHero } from "../_ds/kits/partners/PartnerHero";
import { DemandSource } from "../_ds/kits/partners/DemandSource";
import { BuyCards } from "../_ds/kits/partners/BuyCards";
import { Proof } from "../_ds/kits/partners/Proof";
import { Process } from "../_ds/kits/partners/Process";
import { SectionHeading } from "../_ds/components/core/SectionHeading";
import { Footer } from "../_ds/components/navigation/Footer";
import { PartnerPageView } from "./_shared/PartnerPageView";
import { UniversalPartnerForm } from "./_shared/UniversalPartnerForm";

export const metadata: Metadata = {
  title: "SMN Partner Program — Buy Consumer Demand Direct from the Publisher",
  description:
    "Simple Media Network owns and operates consumer brands across money, retirement, legal, family and business. We generate demand directly and work with companies that can serve it.",
  robots: { index: true, follow: true },
};

export default function PartnersHubPage() {
  return (
    <>
      <PartnerPageView program="partners-hub" page="/partners" />
      <PartnerNav ctaHref="#apply" ctaLabel="Check availability" />
      <PartnerHero />
      <DemandSource />
      <BuyCards />
      <Proof />
      <Process />
      <section id="apply" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <SectionHeading
            title={<>Check availability in <em>your markets</em>.</>}
            lede="Tell us what you buy, where, and how much volume you can handle. We'll follow up within one business day."
          />
          <div style={{ marginTop: "var(--sp-10)" }}>
            <UniversalPartnerForm defaultVertical="debt-relief" program="partners-hub" />
          </div>
        </div>
      </section>
      <Footer
        note="Editorial decisions are made independently; commercial relationships are disclosed. Where outside expertise is useful, we connect consumers with selected partners."
        poweredBy="Powered by CallReady"
        columns={[
          {
            title: "Partner verticals",
            links: [
              { label: "Debt relief", href: "/partners/debt-relief" },
              { label: "Retirement & annuity", href: "/partners/retirement" },
              { label: "Life insurance", href: "/partners/life-insurance" },
              { label: "Mortgage & home equity", href: "/partners/home-equity" },
              { label: "Legal", href: "/partners/legal" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Home", href: "/" },
              { label: "Editorial principles", href: "/editorial-principles" },
              { label: "Disclosure", href: "/disclosure" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy", href: "/privacy" },
            ],
          },
        ]}
      />
    </>
  );
}
