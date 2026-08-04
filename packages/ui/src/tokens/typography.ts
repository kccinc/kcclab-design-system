/** Typography tokens — mirrors `--ds-font-size-*` / `--ds-line-height-*` in tokens.css. */
export const typography = {
  display: { fontSize: "30px", lineHeight: "40px" },
  heading1: { fontSize: "26px", lineHeight: "35px" },
  heading2: { fontSize: "24px", lineHeight: "33px" },
  heading3: { fontSize: "22px", lineHeight: "31px" },
  heading4: { fontSize: "20px", lineHeight: "29px" },
  subtitle1: { fontSize: "19px", lineHeight: "28px" },
  subtitle2: { fontSize: "18px", lineHeight: "27px" },
  body1: { fontSize: "17px", lineHeight: "25.5px" },
  body2: { fontSize: "16px", lineHeight: "24px" },
  body3: { fontSize: "15px", lineHeight: "22.5px" },
  caption1: { fontSize: "14px", lineHeight: "21px" },
  caption2: { fontSize: "13px", lineHeight: "19.5px" },
  label1: { fontSize: "12px", lineHeight: "18px" },
  label2: { fontSize: "11px", lineHeight: "16.5px" },
} as const;

export type TypographyToken = keyof typeof typography;
