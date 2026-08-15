import { Logo } from "../../components/core/Logo";
import { Button } from "../../components/core/Button";

export function PartnerNav({
  ctaHref,
  ctaLabel = "Check availability",
  secondaryHref,
  secondaryLabel,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.9)", backdropFilter: "saturate(150%) blur(10px)", borderBottom: "1px solid var(--border-hairline)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "18px var(--gutter)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--sp-4)", flexWrap: "wrap" }}>
        <a href="/partners" style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-3)", textDecoration: "none" }}>
          <Logo variant="mark" size={28} assetBase="/ds/logos" />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.01em", color: "var(--text-strong)" }}>Simple Media Network</span>
            <span className="smn-eyebrow" style={{ color: "var(--text-muted)" }}>Partner Program</span>
          </span>
        </a>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-4)" }}>
          {secondaryHref && (
            <a href={secondaryHref} style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", textDecoration: "none" }}>
              {secondaryLabel ?? "Back"}
            </a>
          )}
          {ctaHref && <Button size="sm" href={ctaHref}>{ctaLabel}</Button>}
        </div>
      </div>
    </header>
  );
}
