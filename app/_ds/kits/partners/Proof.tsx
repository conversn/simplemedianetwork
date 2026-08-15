import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { Card } from "../../components/core/Card";
import { MetricRow } from "../../components/marketing/MetricRow";

export function Proof() {
  return (
    <div style={{ padding: "0 var(--gutter)" }}>
      <Band tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading eyebrow="In practice"
          title={<>Activation, <em>measured</em>.</>}
          lede="A recent operational snapshot inside the network." />
        <Card padding="var(--sp-12)" style={{ marginTop: "var(--sp-12)" }}>
          <blockquote style={{ margin: 0 }}>
            <p style={{
              margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)",
              fontWeight: "var(--fw-regular)", lineHeight: 1.4, color: "var(--text-strong)",
              letterSpacing: "var(--ls-display)",
            }}>
              &ldquo;Before this, I struggled with vendors selling me shared junk. These conversations are consistently qualified and engaged.&rdquo;
            </p>
            <footer style={{ marginTop: "var(--sp-5)", display: "flex", flexDirection: "column", gap: 2 }}>
              <cite style={{ fontStyle: "normal", fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>Partner testimonial</cite>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)" }}>placeholder, pending approval</span>
            </footer>
          </blockquote>
          <MetricRow align="left" style={{ marginTop: "var(--sp-10)", paddingTop: "var(--sp-8)", borderTop: "1px solid var(--border-hairline)" }} metrics={[
            { value: "78", label: "Inbound inquiries" },
            { value: "63", unit: "%", label: "Contact rate" },
            { value: "41", label: "Live conversations" },
            { value: "3m 08s", label: "Median activation time" },
          ]} />
        </Card>
        <p style={{ margin: "var(--sp-5) 0 0", fontSize: "var(--fs-caption)", color: "var(--text-subtle)", textAlign: "center" }}>
          Placeholder figures — replace with a real reported snapshot before this page ships.
        </p>
      </Band>
    </div>
  );
}
