import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { Card } from "../../components/core/Card";
import { Button } from "../../components/core/Button";
import { DisclosureNote } from "../../components/editorial/DisclosureNote";

const PRINCIPLES: [string, string][] = [
  ["Editorial independence", "Editorial decisions are made independently of commercial outcomes."],
  ["Clear disclosure", "Commercial relationships are disclosed plainly, where they apply."],
  ["Selected partners", "Where outside expertise is useful, we connect consumers with selected partners."],
];

/**
 * The independence statement, then the ask. Order matters on a B2B page: a
 * buyer evaluating a publisher wants to know the editorial wall is real before
 * they're asked for anything, and the same wall is what keeps the demand worth
 * buying. The closing band is the page's last conversion point.
 */
export function Principles() {
  return (
    <>
      <section style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="Principles"
            title={<>Independent editorially. <em>Transparent commercially.</em></>}
            lede="The separation is the point. It is what keeps the audience trusting the publication, and it is why the demand that comes out of it is worth buying." />
          <div className="smn-cols" style={{ margin: "var(--sp-16) 0 var(--sp-6)" }}>
            {PRINCIPLES.map(([t, b]) => (
              <Card variant="outline" key={t}>
                <h4>{t}</h4>
                <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>{b}</p>
              </Card>
            ))}
          </div>
          <DisclosureNote title="Disclosure">
            Simple Media Network may earn revenue through advertising, affiliate relationships, owned products, and partner programs. Those relationships are disclosed and do not determine editorial judgment.
          </DisclosureNote>
        </div>
      </section>
      <div style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <Band id="partners" tone="soft" style={{ maxWidth: "var(--container-max)", margin: "0 auto", textAlign: "center" }}>
          <SectionHeading eyebrow="SMN Partners"
            title={<>Work directly with the <em>source of the demand</em>.</>}
            lede="Tell us what you buy, where, and how much volume you can handle. We'll follow up within one business day." />
          <div style={{ marginTop: "var(--sp-8)", display: "flex", justifyContent: "center", gap: "var(--sp-3)", flexWrap: "wrap" }}>
            <Button size="lg" href="/partners#apply">Check availability</Button>
            <Button size="lg" variant="secondary" href="/partners">See the partner program</Button>
          </div>
        </Band>
      </div>
    </>
  );
}
