"use client";
import React from "react";

type Frame = "phone" | "browser";
const FRAME: Record<Frame, { width: number; radius: number; chrome: "notch" | "bar"; maxHeight: number }> = {
  phone: { width: 268, radius: 30, chrome: "notch", maxHeight: 560 },
  browser: { width: 400, radius: 14, chrome: "bar", maxHeight: 300 },
};

export type FunnelStep = {
  src: string;
  alt?: string;
  label?: string;
  caption?: string;
  frame?: Frame;
};

function Screen({ src, alt, frame, tilt, lift, active, onEnter, index }: {
  src: string; alt?: string; frame: Frame; tilt: number; lift: number; active: boolean; onEnter: () => void; index: number;
}) {
  const F = FRAME[frame] || FRAME.phone;
  return (
    <div
      onMouseEnter={onEnter}
      style={{
        position: "relative", width: "100%", maxWidth: F.width,
        transform: `rotate(${tilt}deg) translateY(${active ? lift - 14 : lift}px) scale(${active ? 1.035 : 1})`,
        transition: "transform var(--dur-slow) var(--ease-standard), box-shadow var(--dur-slow) var(--ease-standard), filter var(--dur-base) var(--ease-standard)",
        zIndex: active ? 5 : 4 - index,
        filter: active ? "none" : "saturate(.97)",
      }}
    >
      <span aria-hidden="true" style={{
        position: "absolute", inset: -1, borderRadius: F.radius + 1, padding: 1,
        background: "var(--gradient-radiant-rim)", opacity: active ? 1 : 0.62,
        transition: "opacity var(--dur-base) var(--ease-standard)",
      }} />
      <div style={{
        position: "relative", background: "var(--white)", borderRadius: F.radius, overflow: "hidden",
        boxShadow: active ? "var(--glow-asset-hover)" : "var(--glow-asset)",
      }}>
        {F.chrome === "notch" ? (
          <span style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: 62, height: 5, borderRadius: 999, background: "rgba(21,33,28,.16)", zIndex: 2 }} />
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 12px", background: "var(--surface-sunken)", borderBottom: "1px solid var(--border-hairline)" }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--border-default)" }} />)}
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} style={{ display: "block", width: "100%", maxHeight: F.maxHeight, objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

const MIN_SCREEN = 196;

export function FunnelFlow({ steps = [], frame = "phone", connectors = true, style }: {
  steps?: FunnelStep[]; frame?: Frame; connectors?: boolean; style?: React.CSSProperties;
}) {
  const [active, setActive] = React.useState(0);
  const [stacked, setStacked] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const needed = steps.length * MIN_SCREEN + (steps.length - 1) * 24;
    const ro = new ResizeObserver(([e]) => setStacked(e.contentRect.width < needed));
    ro.observe(el);
    return () => ro.disconnect();
  }, [steps.length]);
  if (!steps.length) return null;
  const lifts = stacked ? [0, 0, 0, 0] : [10, -18, 6, -12];
  const tilts = stacked ? [0, 0, 0, 0] : [-2.4, 0, 2.4, -1.2];
  const showLine = connectors && !stacked;
  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <div style={{ position: "relative", display: "flex", flexDirection: stacked ? "column" : "row", flexWrap: "nowrap", alignItems: "center", justifyContent: "center", gap: "var(--sp-6)" }}>
        {steps.map((s, i) => (
          <div key={s.label || i} style={{ position: "relative", flex: stacked ? "0 0 auto" : "1 1 0", minWidth: 0, maxWidth: stacked ? 320 : undefined, width: stacked ? "100%" : undefined, display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--sp-5)" }}>
            {showLine && i < steps.length - 1 && (
              <span aria-hidden="true" style={{
                position: "absolute", top: "38%", left: "58%", right: "calc(-42% - var(--sp-6))", height: 2,
                borderRadius: 2, background: "var(--gradient-flow)", zIndex: 0, pointerEvents: "none",
              }} />
            )}
            <Screen src={s.src} alt={s.alt} frame={s.frame || frame} index={i}
              tilt={tilts[i % tilts.length]} lift={lifts[i % lifts.length]}
              active={active === i} onEnter={() => setActive(i)} />
            <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, maxWidth: 240, textAlign: "center" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: "var(--radius-pill)",
                background: active === i ? "var(--evergreen)" : "var(--white)",
                color: active === i ? "#fff" : "var(--text-strong)",
                boxShadow: active === i ? "none" : "inset 0 0 0 1px var(--border-default)",
                fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-medium)",
                transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", opacity: 0.8 }}>{String(i + 1).padStart(2, "0")}</span>{s.label}
              </span>
              {s.caption && <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", lineHeight: 1.5 }}>{s.caption}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
