import { PartnerNav } from "./_ds/kits/partners/PartnerNav";
import { Band } from "./_ds/components/core/Band";
import { Footer } from "./_ds/components/navigation/Footer";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export function SharedInfoPage({ eyebrow, title, intro, sections }: InfoPageProps) {
  return (
    <>
      <PartnerNav secondaryHref="/" secondaryLabel="← Network overview" />
      <main style={{ padding: "var(--sp-16) var(--gutter) var(--section-y)" }}>
        <div style={{ maxWidth: "var(--container-narrow)", margin: "0 auto" }}>
          <Band tone="sand" padding="var(--sp-16) var(--sp-12)">
            <span className="smn-eyebrow" style={{ display: "block", marginBottom: "var(--sp-5)" }}>{eyebrow}</span>
            <h1 style={{
              margin: "0 0 var(--sp-6)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "var(--fw-regular)",
              lineHeight: "var(--lh-hero)",
              letterSpacing: "var(--ls-hero)",
              color: "var(--text-strong)",
              maxWidth: "22ch",
            }}>
              {title}
            </h1>
            <p style={{
              margin: 0,
              maxWidth: "56ch",
              fontSize: "var(--fs-body-lg)",
              lineHeight: "var(--lh-body)",
              color: "var(--text-muted)",
            }}>
              {intro}
            </p>
            {sections.map((section) => (
              <section key={section.heading} style={{
                marginTop: "var(--sp-10)",
                paddingTop: "var(--sp-8)",
                borderTop: "1px solid var(--border-default)",
              }}>
                <h2 style={{
                  margin: "0 0 var(--sp-4)",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-h3)",
                  fontWeight: "var(--fw-regular)",
                  color: "var(--text-strong)",
                  letterSpacing: "var(--ls-display)",
                }}>
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} style={{
                    margin: "0 0 var(--sp-4)",
                    fontSize: "var(--fs-body)",
                    lineHeight: "var(--lh-body)",
                    color: "var(--text-body)",
                  }}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </Band>
        </div>
      </main>
      <Footer
        note="Editorial decisions are made independently; commercial relationships are disclosed."
        poweredBy="Powered by CallReady"
        columns={[
          {
            title: "Company",
            links: [
              { label: "Home", href: "/" },
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
