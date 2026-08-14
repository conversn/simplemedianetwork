import type { CSSProperties, ReactNode } from "react";

type BandTone = "sand" | "soft" | "white" | "sunken" | "radiant" | "radiant-warm";

type BandProps = {
  tone?: BandTone;
  padding?: string;
  maxWidth?: number | string;
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
};

export function Band({ tone = "sand", padding = "var(--band-pad)", maxWidth, children, style, id }: BandProps) {
  const radiant = tone === "radiant" || tone === "radiant-warm";
  const bg = radiant
    ? "var(--sand)"
    : ({ sand: "var(--sand)", soft: "var(--evergreen-soft)", white: "var(--white)", sunken: "var(--surface-sunken)" } as const)[tone];
  return (
    <section id={id} style={{ position: "relative", overflow: "hidden", background: bg, borderRadius: "var(--radius-band)", padding, ...style }}>
      {radiant && (
        <span aria-hidden="true" style={{
          position: "absolute", inset: "-14%", pointerEvents: "none",
          background: tone === "radiant-warm" ? "var(--gradient-radiant-warm)" : "var(--gradient-radiant)",
          filter: "blur(6px)",
        }} />
      )}
      <div style={{ position: "relative", maxWidth, marginInline: maxWidth ? "auto" : undefined }}>{children}</div>
    </section>
  );
}
