"use client";
import React, { type CSSProperties, type ReactNode } from "react";

type Variant = "default" | "outline" | "sand" | "soft";

export function Card({ variant = "default", interactive, padding = "var(--sp-8)", children, onClick, style }: {
  variant?: Variant;
  interactive?: boolean;
  padding?: string;
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const [hover, setHover] = React.useState(false);
  const base: CSSProperties = ({
    default: { background: "var(--white)", border: "1px solid transparent" },
    outline: { background: "var(--white)", border: "1px solid var(--border-hairline)" },
    sand: { background: "var(--sand)", border: "1px solid transparent" },
    soft: { background: "var(--evergreen-soft)", border: "1px solid var(--border-accent)" },
  } as const)[variant];
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: "var(--radius-lg)", padding, ...base,
        cursor: interactive ? "pointer" : undefined,
        boxShadow: interactive && hover ? "var(--shadow-md)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-standard)",
        ...style,
      }}>
      {children}
    </div>
  );
}
