/**
 * Control height tokens — mirrors `--ds-control-height-*` in tokens.css.
 * Shared by Button, IconButton, Input, Select and DatePicker so mixed controls
 * in one row always line up.
 */
export const controlHeight = {
  sm: "32px",
  md: "40px",
  lg: "48px",
} as const;

export type ControlHeightToken = keyof typeof controlHeight;
