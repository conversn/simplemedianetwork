import { Logo } from "../../components/core/Logo";
import { Button } from "../../components/core/Button";
import { MetricRow } from "../../components/marketing/MetricRow";

export function PartnerHero() {
  return (
    <section style={{ padding: "96px 0 80px", textAlign: "center" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <Logo variant="mark" size={84} assetBase="/ds/logos" style={{ marginBottom: "var(--sp-6)" }} />
        <span className="smn-eyebrow" style={{ display: "block", marginBottom: "var(--sp-5)" }}>Simple Media Network Partner Program</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px,5.6vw,72px)", fontWeight: "var(--fw-regular)", lineHeight: "var(--lh-hero)", letterSpacing: "var(--ls-hero)", color: "var(--text-strong)", maxWidth: 860, margin: "0 auto var(--sp-6)" }}>
          Work directly with the <em>source of the demand</em>.
        </h1>
        <p style={{ fontSize: "var(--fs-body-lg)", color: "var(--text-muted)", maxWidth: 620, margin: "0 auto var(--sp-8)" }}>
          We own and operate consumer brands across money, retirement, legal, family, and business — and work with companies that can serve the demand they generate.
        </p>
        <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginBottom: "var(--sp-16)", flexWrap: "wrap" }}>
          <Button size="lg" href="#apply">Check availability</Button>
          <Button size="lg" variant="secondary" href="#how">How it works</Button>
        </div>
        <MetricRow align="center" style={{ maxWidth: 820, margin: "0 auto" }} metrics={[
          { value: "Your states", label: "Choose the markets" },
          { value: "Your criteria", label: "Define the fit" },
          { value: "Your volume", label: "Set the daily cap" },
        ]} />
      </div>
    </section>
  );
}
