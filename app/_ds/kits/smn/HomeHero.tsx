import { Logo } from "../../components/core/Logo";
import { Button } from "../../components/core/Button";

export function HomeHero() {
  return (
    <section style={{ padding: "104px 0 88px", textAlign: "center" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <Logo variant="mark" size={92} assetBase="/ds/logos" style={{ marginBottom: "var(--sp-8)" }} />
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px,6vw,78px)", fontWeight: "var(--fw-regular)", lineHeight: "var(--lh-hero)", letterSpacing: "var(--ls-hero)", color: "var(--text-strong)", maxWidth: 900, margin: "0 auto var(--sp-6)" }}>
          Making important decisions <em>simpler</em>.
        </h1>
        <p style={{ fontSize: "var(--fs-body-lg)", color: "var(--text-muted)", maxWidth: 600, margin: "0 auto var(--sp-8)" }}>
          Simple Media Network builds consumer brands and practical products across money, retirement, family, legal, and business decisions.
        </p>
        <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", flexWrap: "wrap" }}>
          <Button size="lg" href="#brands">See the network</Button>
          <Button size="lg" variant="secondary" href="#model">How we work</Button>
        </div>
      </div>
    </section>
  );
}
