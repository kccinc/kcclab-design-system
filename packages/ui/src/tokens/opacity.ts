/** Opacity tokens for non-color state representation — mirrors `--ds-opacity-*` in tokens.css. */
export const opacity = {
  disabled: "0.4",
  hover: "0.8",
  pressed: "0.6",
} as const;

export type OpacityToken = keyof typeof opacity;
