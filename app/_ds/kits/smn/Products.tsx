import { Band } from "../../components/core/Band";
import { SectionHeading } from "../../components/core/SectionHeading";
import { Card } from "../../components/core/Card";
import { Chip } from "../../components/core/Chip";
import { Logo } from "../../components/core/Logo";
import type { StyleWithVars } from "../../lib/cssVars";

/**
 * Below the partner ask on purpose. For a buyer this section answers a narrower
 * question than it does for a reader — whether the audience relationship
 * outlasts one search — so it reads as depth of relationship rather than as a
 * shop.
 *
 * No CTAs here: the newsletter and the Organizer have no destination on this
 * site yet, and a button that goes nowhere is worse than no button. Add them
 * back the day those routes exist.
 */
export function Products() {
  return (
    <>
      <div style={{ padding: "0 var(--gutter)" }}>
        <Band tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="smn-split">
            <div>
              <SectionHeading align="left" rule eyebrow="The Simple Life"
                title={<>The relationship that <em>outlasts</em> a single decision.</>}
                lede="Our flagship editorial relationship keeps people informed long after the search that brought them in — which is why our audiences are reachable again, not spent after one conversion." />
              <div style={{ display: "flex", gap: "var(--sp-2)", marginTop: "var(--sp-6)", flexWrap: "wrap" }}>
                <Chip tone="accent">Weekly newsletter</Chip><Chip>Keepsake edition</Chip><Chip>Large print</Chip>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ds/products/simple-life-organizer-hero.png" alt="The Simple Life Organizer"
              style={{ width: "100%", maxHeight: 520, objectFit: "cover", borderRadius: "var(--radius-image)" }} />
          </div>
        </Band>
      </div>
      <section style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="Products"
            title={<>Publications explain. Products <em>help people finish</em>.</>}
            lede="Where we can solve the problem directly, we build the thing that gets it done — printed, guided, and finishable in an afternoon." />
          <div className="smn-split" style={{ marginTop: "var(--sp-16)", "--split": "minmax(0,1.25fr) minmax(0,1fr)", "--split-gap": "var(--sp-12)" } as StyleWithVars}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ds/products/simple-life-organizer-spread.png" alt="The Simple Life Organizer interior spread"
              style={{ width: "100%", borderRadius: "var(--radius-image)", boxShadow: "var(--shadow-lg)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
              <Card variant="outline">
                <span style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "var(--sp-3)" }}>
                  <Logo variant="mark" size={28} assetBase="/ds/logos" />
                  <h4 style={{ margin: 0 }}>The Simple Life Organizer</h4>
                </span>
                <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
                  A large-print keepsake edition that holds everything a family would need, in one place. A SeniorSimple publication.
                </p>
              </Card>
              <Card variant="outline">
                <h4>Simple Estate Prep</h4>
                <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
                  Guided preparation that takes a household from intention to completed documents.
                </p>
              </Card>
              <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
                Product naming follows <strong>Simple [Outcome]</strong> — the name states what gets finished.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
