import type { CSSProperties } from "react";

/**
 * An inline style object that may also carry CSS custom properties.
 *
 * The layout classes in `_ds/tokens/base.css` own the breakpoints; the column
 * count or column template that varies per instance is handed to them as a
 * `--cols` / `--min` / `--split` variable from the component. React writes
 * `--*` keys through to the element untouched, but `CSSProperties` alone does
 * not admit them, so layout components type their style object as this.
 */
export type StyleWithVars = CSSProperties & { [key: `--${string}`]: string | number };
