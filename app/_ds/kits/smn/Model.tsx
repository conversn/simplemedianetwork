import { SectionHeading } from "../../components/core/SectionHeading";
import { StepTimeline } from "../../components/marketing/StepTimeline";
import { ScreenStack, type ScreenStackItem } from "../../components/marketing/ScreenStack";
import { Button } from "../../components/core/Button";

const VIEWS: ScreenStackItem[] = [
  { src: "/ds/screens/moneysimple-hero.png", label: "MoneySimple", property: "moneysimple.org", caption: "Debt, credit and borrowing decisions." },
  { src: "/ds/screens/moneysimple-view-guides.png", label: "Guides", property: "moneysimple.org", caption: "Explainers written for the moment of research." },
  { src: "/ds/screens/moneysimple-view-tools.png", label: "Tools", property: "moneysimple.org", caption: "Where reading turns into preparing." },
];

export function Model() {
  return (
    <>
      <section id="model" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading rule eyebrow="The model"
            title={<>Information is everywhere. <em>Knowing what to do is harder.</em></>}
            lede="We publish explanations, build tools that prepare people, and help them act when they're ready." />
          <StepTimeline style={{ marginTop: "var(--sp-16)" }} steps={[
            { title: "Understand", body: "Our publications explain how the options actually work." },
            { title: "Prepare", body: "Our newsletters, tools, and products help people get ready." },
            { title: "Act", body: "Our products and selected partners help people take the next step." },
          ]} />
        </div>
      </section>
      <section style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.4fr", gap: "var(--sp-16)", alignItems: "center" }}>
          <div>
            <SectionHeading align="left" eyebrow="Understand"
              title={<>Publications people <em>actually finish</em>.</>}
              lede="Every property is built for one decision context, with editorial written for the moment someone is researching it." />
            <div style={{ marginTop: "var(--sp-8)" }}><Button variant="secondary" href="https://moneysimple.org">Visit MoneySimple</Button></div>
          </div>
          <ScreenStack items={VIEWS} orientation="vertical" autoplay={6000} />
        </div>
      </section>
    </>
  );
}
