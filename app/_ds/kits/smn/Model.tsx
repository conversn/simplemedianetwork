import { SectionHeading } from "../../components/core/SectionHeading";
import { StepTimeline } from "../../components/marketing/StepTimeline";
import { ScreenStack, type ScreenStackItem } from "../../components/marketing/ScreenStack";
import { Button } from "../../components/core/Button";
import type { StyleWithVars } from "../../lib/cssVars";

const VIEWS: ScreenStackItem[] = [
  { src: "/ds/screens/moneysimple-hero.png", label: "MoneySimple", property: "moneysimple.org", caption: "The editorial entry point for debt and credit decisions." },
  { src: "/ds/screens/moneysimple-view-guides.png", label: "Guides", property: "moneysimple.org", caption: "Explainers a consumer reads before they ever raise a hand." },
  { src: "/ds/screens/moneysimple-view-tools.png", label: "Tools", property: "moneysimple.org", caption: "Where reading turns into a stated situation." },
];

/**
 * How the audience is built, told for a buyer: the three stages a consumer
 * moves through inside our publications before a partner ever hears from them.
 * It is the same model the consumer sees — the framing is what changes here.
 */
export function Model() {
  return (
    <>
      <section id="audience" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading rule eyebrow="How the audience is built"
            title={<>Demand doesn&rsquo;t start at the form. <em>It starts at the question.</em></>}
            lede="We publish the explanation someone searches for, give them something that makes the decision concrete, and only then introduce a way to act. By the time a partner meets them, that groundwork is already done." />
          <StepTimeline style={{ marginTop: "var(--sp-16)" }} steps={[
            { title: "Understand", body: "Our publications explain how the options actually work." },
            { title: "Prepare", body: "Our newsletters, tools, and products help people get ready." },
            { title: "Act", body: "Our products and selected partners help people take the next step." },
          ]} />
        </div>
      </section>
      <section style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <div className="smn-split" style={{ maxWidth: "var(--container-max)", margin: "0 auto", "--split": "minmax(0,0.85fr) minmax(0,1.4fr)" } as StyleWithVars}>
          <div>
            <SectionHeading align="left" eyebrow="Inside a property"
              title={<>What a consumer reads <em>before you meet them</em>.</>}
              lede="Every property is built for one decision context, with editorial written for the moment someone is researching it. MoneySimple is the example — the others follow the same build." />
            <div style={{ marginTop: "var(--sp-8)" }}><Button variant="secondary" href="https://moneysimple.org">Visit MoneySimple</Button></div>
          </div>
          <ScreenStack items={VIEWS} orientation="vertical" autoplay={6000} />
        </div>
      </section>
    </>
  );
}
