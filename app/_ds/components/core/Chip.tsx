import type { CSSProperties, ReactNode } from "react";

export function Chip({ children, tone = "default", style }: { children: ReactNode; tone?: "default" | "accent"; style?: CSSProperties }) {
  const t: CSSProperties = tone === "accent"
    ? { color: "var(--evergreen)", background: "var(--evergreen-soft)", border: "1px solid var(--border-accent)" }
    : { color: "var(--text-muted)", background: "var(--white)", border: "1px solid var(--border-default)" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "7px 14px", borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-medium)", lineHeight: 1.2, ...t, ...style,
    }}>{children}</span>
  );
}
