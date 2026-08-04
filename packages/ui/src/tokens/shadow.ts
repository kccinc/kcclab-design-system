/** Elevation (box-shadow) tokens — mirrors `--ds-shadow-elevation-*` in tokens.css. */
export const shadow = {
  "elevation-1": "0px 1px 2px rgba(15, 23, 42, 0.06)",
  "elevation-2": "0px 2px 8px rgba(15, 23, 42, 0.08)",
  "elevation-3": "0px 4px 16px rgba(15, 23, 42, 0.1)",
  "elevation-4": "0px 8px 24px rgba(15, 23, 42, 0.12)",
} as const;

export type ShadowToken = keyof typeof shadow;
