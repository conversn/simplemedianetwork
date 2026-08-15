import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { StepTimeline } from "../../components/marketing/StepTimeline";
import { FeatureCard } from "../../components/marketing/FeatureCard";

const INFRA: [string, string, string][] = [
  ["shield-check", "Qualify", "Screen against your criteria before anything is delivered."],
  ["route", "Route", "Send to the right desk, in the right market, in order."],
  ["phone-call", "Activate", "Reach the consumer while response likelihood is highest."],
  ["trending-up", "Measure", "Report volume, contact rate, and time to delivery."],
];

export function Process() {
  return (
    <>
      <section id="how" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="Getting started"
            title={<>How partnership <em>works</em>.</>} />
          <StepTimeline style={{ marginTop: "var(--sp-16)" }} steps={[
            { title: "Application", body: "Tell us your markets, criteria, and capacity." },
            { title: "Pilot", body: "Launch structured, measured delivery at a controlled volume." },
            { title: "Scale", body: "Expand allocation based on measured performance." },
          ]} />
        </div>
      </section>
      <div style={{ padding: "0 var(--gutter)" }}>
        <Band tone="soft" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="Powered by CallReady"
            title={<>The delivery layer <em>behind every program</em>.</>}
            lede="CallReady powers qualification, routing, activation, delivery, and measurement for Simple Media Network partners." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "var(--sp-4)", marginTop: "var(--sp-12)" }}>
            {INFRA.map(([ic, t, b]) => <FeatureCard key={t} icon={ic} title={t} body={b} tone="onSand" />)}
          </div>
        </Band>
      </div>
    </>
  );
}
