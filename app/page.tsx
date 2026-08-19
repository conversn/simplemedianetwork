import type { Metadata } from "next";

import { SiteNav, SITE_NAV_LINKS } from "./_ds/components/navigation/SiteNav";
import { HomeHero } from "./_ds/kits/smn/HomeHero";
import { Verticals } from "./_ds/kits/smn/Verticals";
import { Brands } from "./_ds/kits/smn/Brands";
import { Model } from "./_ds/kits/smn/Model";
import { Products } from "./_ds/kits/smn/Products";
import { Principles } from "./_ds/kits/smn/Principles";
import { Footer } from "./_ds/components/navigation/Footer";

export const metadata: Metadata = {
  title: "Simple Media Network — Owned-and-Operated Consumer Media",
  description:
    "Simple Media Network owns and operates consumer brands across money, retirement, family, legal, and business decisions. Partners buy demand direct from the publisher that created it.",
  robots: { index: true, follow: true },
};

/**
 * The homepage is the B2B front door. Order is the argument: state the position
 * (we publish the audience), show what can be bought, prove the properties
 * exist, explain how the demand is built, show the relationship has depth, then
 * state the editorial wall and ask.
 *
 * Consumers arrive at the individual properties, not here — which is why the
 * reader-facing product story sits below the partner ask rather than above it.
 */
export default function HomePage() {
  return (
    <>
      <SiteNav links={SITE_NAV_LINKS} ctaHref="/partners" ctaLabel="Partner with us" />
      <HomeHero />
      <Verticals />
      <Brands />
      <Model />
      <Products />
      <Principles />
      <Footer
        note="An owned-and-operated consumer media network across money, retirement, family, legal, and business decisions."
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
            title: "Network",
            links: [
              { label: "SeniorSimple", href: "https://seniorsimple.org" },
              { label: "MoneySimple", href: "https://moneysimple.org" },
              { label: "ParentSimple", href: "https://parentsimple.org" },
              { label: "LegalSimple", href: "https://legalsimple.org" },
              { label: "RateRoots", href: "https://rateroots.com" },
              { label: "HomeSimple", href: "https://homesimple.org" },
              { label: "SmallBizSimple", href: "https://smallbizsimple.org" },
              { label: "RetirementRescue", href: "https://retirementrescue.net" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Partners", href: "/partners" },
              { label: "Editorial principles", href: "/editorial-principles" },
              { label: "Disclosure", href: "/disclosure" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
            ],
          },
        ]}
      />
    </>
  );
}
