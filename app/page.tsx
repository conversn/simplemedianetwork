import { HomeHero } from "./_ds/kits/smn/HomeHero";
import { Brands } from "./_ds/kits/smn/Brands";
import { Model } from "./_ds/kits/smn/Model";
import { Products } from "./_ds/kits/smn/Products";
import { Partners } from "./_ds/kits/smn/Partners";
import { Footer } from "./_ds/components/navigation/Footer";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Brands />
      <Model />
      <Products />
      <Partners />
      <Footer
        note="Building consumer brands and practical products across money, retirement, family, legal, and business decisions."
        poweredBy="Powered by CallReady"
        columns={[
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
