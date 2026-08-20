import type { CSSProperties, ReactNode } from "react";
import { Stat } from "../core/Stat";
import type { StyleWithVars } from "../../lib/cssVars";

export type Metric = { label: ReactNode; value: ReactNode; unit?: ReactNode };

export function MetricRow({ metrics = [], align = "left", style }: { metrics?: Metric[]; align?: "left" | "center"; style?: CSSProperties }) {
  return (
    <div className="smn-metrics" style={{ ...style, "--cols": metrics.length } as StyleWithVars}>
      {metrics.map((m, i) => <Stat key={i} value={m.value} unit={m.unit} label={m.label} align={align} />)}
    </div>
  );
}
