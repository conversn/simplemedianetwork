"use client";
import React, { type CSSProperties } from "react";

type Frame = "browser" | "phone";
const CHROME: Record<Frame, number> = { browser: 31, phone: 22 };
const FRAME_RATIO: Record<Frame, number> = { browser: 0.62, phone: 1.94 };

export type ScreenStackItem = {
  src: string;
  alt?: string;
  label?: string;
  caption?: string;
  property?: string;
  frame?: Frame;
  ratio?: number;
};

export function ScreenStack({
  items = [],
  layout = "stack",
  orientation = "vertical",
  frame = "browser",
  ratio = 0,
  autoplay = 0,
  radiant = true,
  style,
}: {
  items?: ScreenStackItem[];
  layout?: "stack";
  orientation?: "vertical" | "horizontal";
  frame?: Frame;
  ratio?: number;
  autoplay?: number;
  radiant?: boolean;
  style?: CSSProperties;
}) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (!autoplay || paused || items.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), autoplay);
    return () => clearInterval(t);
  }, [autoplay, paused, items.length]);

  if (!items.length) return null;

  const go = (n: number) => setI((n + items.length) % items.length);
  const depth = Math.min(items.length - 1, 2);
  const frameOf = (it: ScreenStackItem): Frame => it.frame || frame;
  const front = items[i] || items[0];
  const boxRatio = front.ratio || ratio || FRAME_RATIO[frameOf(front)] || FRAME_RATIO.browser;

  const deck = (
    <div
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", flex: 1, minWidth: 0, paddingBottom: layout === "stack" ? 18 : 0, paddingRight: layout === "stack" ? 18 : 0 }}
    >
      {radiant && (
        <span aria-hidden="true" style={{
          position: "absolute", inset: "-16% -12%", background: "var(--gradient-radiant)",
          filter: "blur(10px)", pointerEvents: "none",
        }} />
      )}
      <div style={{ position: "relative", width: "100%", paddingTop: `${boxRatio * 100}%` }}>
        {items.map((it, n) => {
          const fr = frameOf(it);
          const chrome = CHROME[fr];
          const rel = (n - i + items.length) % items.length;
          const behind = layout === "stack" && rel > 0 && rel <= depth;
          const isFront = rel === 0;
          if (!isFront && !behind) return null;
          const off = rel * 9;
          return (
            <figure key={it.src + n} onClick={() => behind && go(n)}
              style={{
                position: "absolute", inset: 0, margin: 0, cursor: behind ? "pointer" : "default",
                transform: `translate(${off}px,${off}px) scale(${1 - rel * 0.035})`,
                opacity: isFront ? 1 : 0.55 - (rel - 1) * 0.18,
                zIndex: 10 - rel,
                transition: "transform var(--dur-slow) var(--ease-standard), opacity var(--dur-slow) var(--ease-standard)",
              }}>
              <span style={{
                display: "block", height: "100%", width: fr === "phone" ? "auto" : "100%",
                aspectRatio: fr === "phone" ? "435 / 852" : undefined,
                marginInline: fr === "phone" ? "auto" : undefined,
                background: "var(--white)", borderRadius: fr === "phone" ? 26 : "var(--radius-image)",
                overflow: "hidden", boxShadow: isFront ? "var(--glow-asset)" : "var(--shadow-md)",
              }}>
                {fr === "phone" ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: chrome, background: "var(--surface-sunken)", borderBottom: "1px solid var(--border-hairline)", boxSizing: "border-box" }}>
                    <span style={{ width: 54, height: 4, borderRadius: 999, background: "var(--border-default)" }} />
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, height: chrome, padding: "0 12px", background: "var(--surface-sunken)", borderBottom: "1px solid var(--border-hairline)", boxSizing: "border-box" }}>
                    {[0, 1, 2].map((d) => <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--border-default)" }} />)}
                    {it.property && <span style={{ marginLeft: 6, fontFamily: "var(--font-mono)", fontSize: "var(--fs-micro)", color: "var(--text-subtle)" }}>{it.property}</span>}
                  </span>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.src} alt={it.alt || it.label || ""}
                  style={{ display: "block", width: "100%", height: `calc(100% - ${chrome}px)`, objectFit: "cover", objectPosition: "top" }} />
              </span>
            </figure>
          );
        })}
      </div>
    </div>
  );

  const rail = (
    <div className={`smn-rail ${orientation === "vertical" ? "smn-rail-v" : "smn-rail-h"}`}>
      {items.map((it, n) => {
        const on = n === i;
        return (
          <button key={(it.label || "") + n} onClick={() => go(n)} aria-current={on}
            type="button"
            style={{
              display: "flex", alignItems: orientation === "vertical" ? "flex-start" : "center", gap: 10,
              textAlign: "left", border: "none", cursor: "pointer", borderRadius: "var(--radius-sm)",
              padding: orientation === "vertical" ? "10px 12px" : "8px 14px",
              background: on ? "var(--white)" : "transparent",
              boxShadow: on ? "inset 0 0 0 1px var(--border-accent)" : "none",
              transition: "background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
            }}>
            {orientation === "vertical" && (
              <span className="smn-rail-bar" style={{ background: on ? "var(--evergreen)" : "transparent" }} />
            )}
            <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--fw-medium)", color: on ? "var(--text-strong)" : "var(--text-muted)" }}>{it.label}</span>
              {it.caption && orientation === "vertical" && (
                <span className="smn-rail-caption" style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)", lineHeight: 1.45 }}>{it.caption}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className={`smn-stack ${orientation === "vertical" ? "smn-stack-v" : "smn-stack-h"}`} style={style}>
      {orientation === "vertical" ? <>{deck}<div className="smn-stack-rail">{rail}</div></> : <>{deck}{rail}</>}
    </div>
  );
}
