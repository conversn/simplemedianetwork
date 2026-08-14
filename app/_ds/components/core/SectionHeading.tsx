import type { CSSProperties, ReactNode } from "react";

export function SectionHeading({ eyebrow, title, lede, align = "center", maxWidth = 760, size = "var(--fs-h2)", rule, style }: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  maxWidth?: number | string;
  size?: string;
  rule?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "var(--sp-4)",
      maxWidth, textAlign: align, marginInline: align === "center" ? "auto" : undefined,
      alignItems: align === "center" ? "center" : "flex-start", ...style,
    }}>
      {eyebrow && <span className="smn-eyebrow">{eyebrow}</span>}
      <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: size, fontWeight: "var(--fw-regular)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-display)", color: "var(--text-strong)" }}>{title}</h2>
      {rule && <span style={{ display: "block", width: 72, height: 2, background: "var(--gold)", borderRadius: 2 }} />}
      {lede && <p style={{ margin: 0, fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-muted)", maxWidth: 620 }}>{lede}</p>}
    </div>
  );
}
