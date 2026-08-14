import type { CSSProperties, ReactNode } from "react";

export function Stat({ label, value, unit, align = "left", size = "md", style }: {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}) {
  const fs = ({ sm: "var(--fs-h3)", md: "var(--fs-h1)", lg: "var(--fs-display-2)" } as const)[size];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: align === "center" ? "center" : "flex-start", ...style }}>
      <span style={{ display: "flex", alignItems: "baseline", gap: 4, fontFamily: "var(--font-display)", fontWeight: "var(--fw-regular)", fontSize: fs, lineHeight: 1, letterSpacing: "var(--ls-display)", color: "var(--text-strong)" }}>
        {value}{unit && <span style={{ fontSize: "0.6em", color: "var(--text-accent)" }}>{unit}</span>}
      </span>
      <span className="smn-eyebrow" style={{ color: "var(--text-subtle)" }}>{label}</span>
    </div>
  );
}
