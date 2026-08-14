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

export function Partners() {
  return (
    <>
      <div style={{ padding: "0 var(--gutter)" }}>
        <Band id="partners" tone="soft" style={{ maxWidth: "var(--container-max)", margin: "0 auto", textAlign: "center" }}>
          <SectionHeading eyebrow="SMN Partners"
            title={<>Work directly with the <em>source of the demand</em>.</>}
            lede="We generate consumer demand through our owned properties and work with companies that can serve it." />
          <div style={{ marginTop: "var(--sp-8)" }}><Button size="lg" href="/partners">See the partner program</Button></div>
        </Band>
      </div>
      <section style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="Principles"
            title={<>Independent editorially. <em>Transparent commercially.</em></>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--sp-4)", margin: "var(--sp-16) 0 var(--sp-6)" }}>
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
    </>
  );
}
