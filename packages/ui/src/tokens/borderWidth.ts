/** Border width tokens — mirrors `--ds-border-width*` in tokens.css. */
export const borderWidth = {
  DEFAULT: "1px",
  thick: "2px",
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
