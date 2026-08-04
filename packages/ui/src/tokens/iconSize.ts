/** Icon size tokens (square, width = height) — mirrors `--ds-icon-*` in tokens.css. */
export const iconSize = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px",
} as const;

export type IconSizeToken = keyof typeof iconSize;
