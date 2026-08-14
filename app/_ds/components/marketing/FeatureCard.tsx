"use client";
import React, { type CSSProperties, type ReactNode } from "react";
import { Icon } from "../core/Icon";

export function FeatureCard({ icon, title, body, tone = "default", size = "md", style }: {
  icon: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: "default" | "onSand";
  size?: "md" | "lg";
  style?: CSSProperties;
}) {
  const [hover, setHover] = React.useState(false);
  const onSand = tone === "onSand";
  const glyph = size === "lg" ? 22 : 19;
  const plate = size === "lg" ? 52 : 44;
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", flexDirection: "column", gap: "var(--sp-4)", padding: "var(--sp-8)",
        background: "var(--white)",
        borderRadius: "var(--radius-lg)",
        boxShadow: onSand ? (hover ? "var(--shadow-md)" : "none") : `inset 0 0 0 1px ${hover ? "var(--border-accent)" : "var(--border-hairline)"}`,
        transition: "box-shadow var(--dur-base) var(--ease-standard)",
        ...style,
      }}>
      <span style={{
        position: "relative", width: plate, height: plate, flex: "0 0 auto",
        borderRadius: "var(--radius-md)", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--evergreen-soft)",
        boxShadow: `inset 0 0 0 1px ${hover ? "var(--evergreen)" : "var(--border-accent)"}`,
        transition: "box-shadow var(--dur-base) var(--ease-standard)",
      }}>
        <span aria-hidden="true" style={{
          position: "absolute", inset: 0, background: "var(--gradient-plate)",
          opacity: hover ? 1 : 0.9, transition: "opacity var(--dur-base) var(--ease-standard)",
        }} />
        <Icon name={icon} size={glyph} strokeWidth={1.4} color="var(--evergreen)" style={{ position: "relative" }} />
      </span>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-h4)", fontWeight: "var(--fw-semibold)", color: "var(--text-strong)", lineHeight: 1.3 }}>{title}</span>
      {body && <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-body)" }}>{body}</span>}
    </div>
  );
}
