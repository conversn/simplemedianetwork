import type { CSSProperties, ReactNode } from "react";
import { Stat } from "../core/Stat";

export type Metric = { label: ReactNode; value: ReactNode; unit?: ReactNode };

export function MetricRow({ metrics = [], align = "left", style }: { metrics?: Metric[]; align?: "left" | "center"; style?: CSSProperties }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${metrics.length},1fr)`, gap: "var(--sp-8)", ...style }}>
      {metrics.map((m, i) => <Stat key={i} value={m.value} unit={m.unit} label={m.label} align={align} />)}
    </div>
  );
}
