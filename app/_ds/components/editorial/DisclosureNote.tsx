import type { CSSProperties, ReactNode } from "react";
import { Icon } from "../core/Icon";

export function DisclosureNote({ title = "Editorial independence", children, style }: {
  title?: string; children: ReactNode; style?: CSSProperties;
}) {
  return (
    <aside style={{ display: "flex", gap: 12, background: "var(--surface-sunken)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", padding: "var(--sp-5)", ...style }}>
      <Icon name="info" size={18} color="var(--text-subtle)" style={{ marginTop: 2 }} />
      <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>{title}</span>
        <span style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-body)" }}>{children}</span>
      </span>
    </aside>
  );
}
