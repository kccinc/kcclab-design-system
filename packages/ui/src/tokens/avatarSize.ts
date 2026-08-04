/** Avatar size tokens (square, width = height) — mirrors `--ds-avatar-*` in tokens.css. */
export const avatarSize = {
  xs: "24px",
  sm: "32px",
  md: "40px",
  lg: "48px",
  xl: "64px",
} as const;

export type AvatarSizeToken = keyof typeof avatarSize;
