import { Logo } from "../../components/core/Logo";
import { Button } from "../../components/core/Button";
import { MetricRow } from "../../components/marketing/MetricRow";
import { spellCount } from "../../lib/spellCount";
import { PROPERTY_COUNT } from "./Brands";
import { VERTICAL_COUNT } from "./Verticals";

/**
 * The homepage hero speaks to buyers and advertisers, not to readers. The
 * consumer brands each own their own front door; this site is the place a
 * company decides whether to work with the publisher behind them.
 *
 * The figures in the metric row are counts derived from the property and
 * vertical lists themselves, so they cannot drift into claims we can't
 * substantiate. Nothing here asserts volume, revenue, or performance.
 */
export function HomeHero() {
  return (
    <section style={{ padding: "104px 0 88px", textAlign: "center" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <Logo variant="mark" size={92} assetBase="/ds/logos" style={{ marginBottom: "var(--sp-8)" }} />
        <span className="smn-eyebrow" style={{ display: "block", marginBottom: "var(--sp-5)" }}>Owned-and-operated consumer media</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px,6vw,78px)", fontWeight: "var(--fw-regular)", lineHeight: "var(--lh-hero)", letterSpacing: "var(--ls-hero)", color: "var(--text-strong)", maxWidth: 940, margin: "0 auto var(--sp-6)" }}>
          We don&rsquo;t resell the audience. <em>We publish it.</em>
        </h1>
        <p style={{ fontSize: "var(--fs-body-lg)", color: "var(--text-muted)", maxWidth: 660, margin: "0 auto var(--sp-8)" }}>
          Simple Media Network owns and operates consumer brands across money, retirement, family, legal, and business decisions. Partners work with the publisher that created the demand — not a marketplace passing it along.
        </p>
        <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginBottom: "var(--sp-16)", flexWrap: "wrap" }}>
          <Button size="lg" href="/partners">Partner with us</Button>
          <Button size="lg" variant="secondary" href="#verticals">See what we sell</Button>
        </div>
        <MetricRow align="center" style={{ maxWidth: 820, margin: "0 auto" }} metrics={[
          { value: spellCount(PROPERTY_COUNT), label: "Properties owned and operated" },
          { value: spellCount(VERTICAL_COUNT), label: "Verticals open to partners" },
          { value: "One", label: "Publisher, start to finish" },
        ]} />
      </div>
    </section>
  );
}
