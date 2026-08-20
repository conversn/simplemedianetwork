import type { CSSProperties, ReactNode } from "react";
import { Logo } from "../core/Logo";
import type { StyleWithVars } from "../../lib/cssVars";

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

export function Footer({ columns = [], note, poweredBy, assetBase = "/ds/logos", style }: {
  columns?: FooterColumn[]; note?: ReactNode; poweredBy?: ReactNode; assetBase?: string; style?: CSSProperties;
}) {
  return (
    <footer style={{ padding: "0 var(--gutter) var(--sp-10)", ...style }}>
      <div className="smn-footer-inner" style={{ maxWidth: "var(--container-max)", margin: "0 auto", background: "var(--sand)", borderRadius: "var(--radius-band)" }}>
        <div className="smn-footer-grid" style={{ "--cols": Math.max(columns.length, 1) } as StyleWithVars}>
          <div className="smn-footer-brand" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-5)", maxWidth: 340 }}>
            <Logo size={30} assetBase={assetBase} />
            <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>{note}</p>
          </div>
          {columns.map((c) => (
            <div key={c.title} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              <span className="smn-eyebrow">{c.title}</span>
              {c.links.map((l) => <a key={l.label} href={l.href} className="smn-footer-link" style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>{l.label}</a>)}
            </div>
          ))}
        </div>
        <div className="smn-footer-bar" style={{ marginTop: "var(--sp-16)", paddingTop: "var(--sp-6)", borderTop: "1px solid var(--border-default)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)" }}>
          <span>© {new Date().getFullYear()} Simple Media Network</span>
          {poweredBy && <span>{poweredBy}</span>}
        </div>
      </div>
    </footer>
  );
}
