/** Font family tokens — mirrors `--ds-font-family-*` in tokens.css. */
export const fontFamily = {
  sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
} as const;

export type FontFamilyToken = keyof typeof fontFamily;
