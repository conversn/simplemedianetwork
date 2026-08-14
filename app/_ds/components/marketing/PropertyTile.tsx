"use client";
import React, { type CSSProperties } from "react";

export function PropertyTile({ name, focus, logo, logoHeight = 30, href, style }: {
  name: string;
  focus: string;
  logo?: string;
  logoHeight?: number;
  href?: string;
  style?: CSSProperties;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href || "#"} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", flexDirection: "column", gap: "var(--sp-4)", justifyContent: "space-between",
        padding: "var(--sp-8)", minHeight: 172, background: "var(--white)",
        borderRadius: "var(--radius-lg)", boxShadow: hover ? "var(--shadow-md)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-standard)", ...style,
      }}>
      <span style={{ display: "flex", alignItems: "center", height: 40, maxWidth: "100%", overflow: "hidden" }}>
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} style={{ height: logoHeight, width: "auto", maxWidth: "100%", objectFit: "contain", objectPosition: "left", display: "block" }} />
        ) : (
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h4)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>{name}</span>
        )}
      </span>
      <span style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>{focus}</span>
    </a>
  );
}
