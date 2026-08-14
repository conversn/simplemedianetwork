import type { CSSProperties, ReactNode } from "react";

export function ScreenShot({ src, alt = "", caption, chrome = true, tilt = 0, radius = "var(--radius-image)", style }: {
  src: string;
  alt?: string;
  caption?: ReactNode;
  chrome?: boolean;
  tilt?: number;
  radius?: string;
  style?: CSSProperties;
}) {
  return (
    <figure style={{ margin: 0, transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}>
      <div style={{ background: "var(--white)", borderRadius: radius, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
        {chrome && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 14px", background: "var(--surface-sunken)", borderBottom: "1px solid var(--border-hairline)" }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#DFDCD2" }} />)}
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{ display: "block", width: "100%" }} />
      </div>
      {caption && <figcaption style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)" }}>{caption}</figcaption>}
    </figure>
  );
}
