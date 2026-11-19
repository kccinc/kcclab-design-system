/**
 * Density modes — mirrors the `[data-density="..."]` blocks in tokens.css.
 * Each entry lists only the `--ds-*` variables that mode overrides; anything
 * not listed keeps its `:root` value. Colors never change with density.
 *
 * Enable a mode with `<html data-density="compact">` (on <html>, so portaled
 * Dialog/Tooltip/DropdownMenu content inherits it too).
 */
export const density = {
  compact: {
    "--ds-font-size-display": "22px",
    "--ds-line-height-display": "30px",
    "--ds-font-size-heading1": "19px",
    "--ds-line-height-heading1": "27px",
    "--ds-font-size-heading2": "17px",
    "--ds-line-height-heading2": "24px",
    "--ds-font-size-heading3": "15px",
    "--ds-line-height-heading3": "22px",
    "--ds-font-size-heading4": "14px",
    "--ds-line-height-heading4": "20px",
    "--ds-font-size-subtitle1": "14px",
    "--ds-line-height-subtitle1": "20px",
    "--ds-font-size-subtitle2": "13px",
    "--ds-line-height-subtitle2": "19px",
    "--ds-font-size-body1": "13px",
    "--ds-line-height-body1": "19px",
    "--ds-font-size-body2": "12px",
    "--ds-line-height-body2": "17px",
    "--ds-font-size-body3": "12px",
    "--ds-line-height-body3": "17px",
    "--ds-font-size-caption1": "11px",
    "--ds-line-height-caption1": "16px",
    "--ds-font-size-caption2": "11px",
    "--ds-line-height-caption2": "16px",
    "--ds-font-size-label1": "10px",
    "--ds-line-height-label1": "15px",
    "--ds-font-size-label2": "9px",
    "--ds-line-height-label2": "13px",
    "--ds-space-1": "3px",
    "--ds-space-2": "6px",
    "--ds-space-3": "8px",
    "--ds-space-4": "12px",
    "--ds-space-5": "14px",
    "--ds-space-6": "20px",
    "--ds-space-8": "28px",
    "--ds-space-10": "33px",
    "--ds-space-12": "40px",
    "--ds-space-16": "52px",
    "--ds-space-20": "64px",
    "--ds-radius-lg": "10px",
    "--ds-icon-xs": "10px",
    "--ds-icon-sm": "14px",
    "--ds-icon-md": "16px",
    "--ds-icon-lg": "18px",
    "--ds-icon-xl": "24px",
    "--ds-avatar-xs": "20px",
    "--ds-avatar-sm": "26px",
    "--ds-avatar-md": "32px",
    "--ds-avatar-lg": "40px",
    "--ds-avatar-xl": "52px",
    "--ds-control-height-sm": "28px",
    "--ds-control-height-md": "33px",
    "--ds-control-height-lg": "40px",
  },
} as const;

/** `"comfortable"` is the default (`:root`) — it has no override block. */
export type Density = "comfortable" | keyof typeof density;
