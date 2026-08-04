/** Border radius tokens — mirrors `--ds-radius-*` in tokens.css. */
export const radius = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
} as const;

export type RadiusToken = keyof typeof radius;
