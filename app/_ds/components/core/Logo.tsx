import type { CSSProperties } from "react";

type Variant = "full" | "mark";
type Tone = "dark" | "light";

export function Logo({ variant = "full", tone = "dark", size = 30, assetBase = "/ds/logos", style }: {
  variant?: Variant;
  tone?: Tone;
  size?: number;
  assetBase?: string;
  style?: CSSProperties;
}) {
  const wordColor = tone === "light" ? "#fff" : "var(--text-strong)";
  // In the full lockup the wordmark beside the mark already carries the name, so
  // the image is decorative there; on its own the mark has to carry it.
  const mark = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${assetBase}/mark.png`} alt={variant === "mark" ? "Simple Media Network" : ""}
      width={size} height={size}
      style={{ display: "block", objectFit: "contain", flex: "0 0 auto" }} />
  );
  if (variant === "mark") return <span style={{ display: "inline-flex", ...style }}>{mark}</span>;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.36, ...style }}>
      {mark}
      <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-medium)", fontSize: size * 0.72, letterSpacing: "-0.01em", color: wordColor, lineHeight: 1, whiteSpace: "nowrap" }}>
        Simple Media Network
      </span>
    </span>
  );
}
