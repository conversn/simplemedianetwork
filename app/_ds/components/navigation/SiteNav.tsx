import { Logo } from "../core/Logo";
import { Button } from "../core/Button";

export type SiteNavLink = { label: string; href: string };

/**
 * The one header for the site. Every route renders this — the homepage, the
 * partner funnel, and the company/legal pages — so the wordmark, the CTA slot,
 * and the sticky behaviour are defined in exactly one place.
 *
 * The eyebrow under the wordmark is what makes it context-aware: partner routes
 * pass "Partner Program", company pages pass nothing. `PartnerNav` is a thin
 * wrapper over this component and exists only so the funnel keeps its own name.
 */
export function SiteNav({
  eyebrow,
  homeHref = "/",
  links = [],
  ctaHref,
  ctaLabel = "Check availability",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow?: string;
  homeHref?: string;
  links?: SiteNavLink[];
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.9)", backdropFilter: "saturate(150%) blur(10px)", borderBottom: "1px solid var(--border-hairline)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "18px var(--gutter)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--sp-4)", flexWrap: "wrap" }}>
        <a href={homeHref} style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-3)", textDecoration: "none" }}>
          <Logo variant="mark" size={28} assetBase="/ds/logos" />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.01em", color: "var(--text-strong)" }}>Simple Media Network</span>
            {eyebrow && <span className="smn-eyebrow" style={{ color: "var(--text-muted)" }}>{eyebrow}</span>}
          </span>
        </a>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-4)" }}>
          {links.length > 0 && (
            <nav className="smn-nav-links" aria-label="Primary">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="smn-nav-link">{l.label}</a>
              ))}
            </nav>
          )}
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

/**
 * The nav shown on every page that is not part of the partner funnel: the
 * homepage and the company/legal pages. Kept here so the link set lives next to
 * the component that renders it and never drifts between routes.
 */
export const SITE_NAV_LINKS: SiteNavLink[] = [
  { label: "Network", href: "/#network" },
  { label: "Verticals", href: "/#verticals" },
  { label: "Audience", href: "/#audience" },
  { label: "Partners", href: "/partners" },
];
