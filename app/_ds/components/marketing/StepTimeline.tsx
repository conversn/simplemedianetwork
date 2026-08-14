import type { CSSProperties } from "react";

export type TimelineStep = { title: string; body: string };

export function StepTimeline({ steps = [], style }: { steps?: TimelineStep[]; style?: CSSProperties }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length},1fr)`, gap: "var(--sp-6)", ...style }}>
      {steps.map((s, i) => (
        <div key={s.title} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 28, height: 28, borderRadius: "50%", background: "var(--evergreen)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "var(--fs-caption)", fontFamily: "var(--font-ui)",
            }}>{i + 1}</span>
            <span style={{ flex: 1, height: 1, background: i === steps.length - 1 ? "transparent" : "var(--border-default)" }} />
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--text-strong)", lineHeight: 1.2 }}>{s.title}</span>
          <span style={{ fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>{s.body}</span>
        </div>
      ))}
    </div>
  );
}
