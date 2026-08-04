/** Z-index tokens — mirrors `--ds-z-*` in tokens.css. Use these instead of arbitrary numbers. */
export const zIndex = {
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  overlay: 400,
  modal: 500,
  toast: 600,
  tooltip: 700,
} as const;

export type ZIndexToken = keyof typeof zIndex;
