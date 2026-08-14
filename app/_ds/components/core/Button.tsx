"use client";
import React, { type CSSProperties, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: "10px 18px", fontSize: "var(--fs-caption)", gap: "7px" },
  md: { padding: "13px 24px", fontSize: "var(--fs-body-sm)", gap: "9px" },
  lg: { padding: "16px 30px", fontSize: "var(--fs-body-sm)", gap: "10px" },
};

const variants: Record<Variant, CSSProperties> = {
  primary: { background: "var(--evergreen)", color: "#fff", border: "1px solid var(--evergreen)" },
  secondary: { background: "transparent", color: "var(--evergreen)", border: "1px solid var(--border-accent)" },
  quiet: { background: "var(--white)", color: "var(--text-strong)", border: "1px solid var(--border-default)" },
  ghost: { background: "transparent", color: "var(--text-strong)", border: "1px solid transparent" },
  link: { background: "transparent", color: "var(--evergreen)", border: "none", padding: 0 },
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  block?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
};

export function Button({ variant = "primary", size = "md", disabled, block, iconLeft, iconRight, href, onClick, children, style }: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const hoverStyle: CSSProperties | null = !disabled && hover ? (
    variant === "primary" ? { background: "var(--evergreen-mid)", borderColor: "var(--evergreen-mid)" }
    : variant === "secondary" ? { background: "var(--evergreen-soft)" }
    : variant === "quiet" ? { borderColor: "var(--border-strong)" }
    : { color: "var(--evergreen)" }
  ) : null;
  const shared: CSSProperties = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    ...sizes[size],
    ...v,
    ...(hoverStyle || {}),
    fontFamily: "var(--font-ui)",
    fontWeight: "var(--fw-medium)",
    lineHeight: 1.2,
    borderRadius: variant === "link" ? 0 : "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
    ...style,
  };
  if (href) {
    return (
      <a href={href} onClick={disabled ? undefined : onClick}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={shared}>
        {iconLeft}{children}{iconRight}
      </a>
    );
  }
  return (
    <button type="button" onClick={disabled ? undefined : onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={shared}>
      {iconLeft}{children}{iconRight}
    </button>
  );
}
