import type { CSSProperties, ReactNode } from "react";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

const tones: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: "var(--sand)", fg: "var(--text-muted)" },
  accent: { bg: "var(--evergreen-soft)", fg: "var(--evergreen)" },
  success: { bg: "var(--success-soft)", fg: "var(--success)" },
  warning: { bg: "var(--warning-soft)", fg: "var(--warning)" },
  danger: { bg: "var(--danger-soft)", fg: "var(--danger)" },
};

export function Badge({ tone = "neutral", dot, children, style }: { tone?: Tone; dot?: boolean; children: ReactNode; style?: CSSProperties }) {
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, background: t.bg, color: t.fg,
      fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-medium)",
      padding: "5px 12px", borderRadius: "var(--radius-pill)", lineHeight: 1.35, ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}
      {children}
    </span>
  );
}
