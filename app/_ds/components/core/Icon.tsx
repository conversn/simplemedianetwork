import type { CSSProperties } from "react";
import { iconPaths } from "./iconPaths";

const warned = new Set<string>();

export type IconName = keyof typeof iconPaths;

type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: CSSProperties;
};

export function Icon({ name, size = 18, strokeWidth = 1.75, color = "currentColor", style }: IconProps) {
  const inner = iconPaths[name];
  if (!inner) {
    if (!warned.has(name)) {
      warned.add(name);
      console.warn(`[Icon] unknown glyph "${name}"`);
    }
    return (
      <span aria-hidden="true" title={`Missing glyph: ${name}`}
        style={{ display: "block", width: size, height: size, flex: "0 0 auto", borderRadius: 3, border: "1px dashed var(--danger)", opacity: 0.7, ...style }} />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ display: "block", flex: "0 0 auto", ...style }}
      dangerouslySetInnerHTML={{ __html: inner }} />
  );
}

export const iconNames = Object.keys(iconPaths);
