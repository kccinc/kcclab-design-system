import type { CSSProperties, HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circle" | "rect";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** 모양. @default "text" */
  variant?: SkeletonVariant;
  /** 너비 (px 숫자 또는 CSS 값). 지정하지 않으면 모양별 기본값을 사용합니다. */
  width?: number | string;
  /** 높이 (px 숫자 또는 CSS 값). 지정하지 않으면 모양별 기본값을 사용합니다. */
  height?: number | string;
}

const shimmerClassName =
  "bg-[linear-gradient(90deg,var(--ds-color-border)_25%,var(--ds-color-grey-background)_50%,var(--ds-color-border)_75%)] " +
  "bg-[length:200%_100%] animate-[ds-shimmer_1.5s_ease-in-out_infinite]";

const variantClassName: Record<SkeletonVariant, string> = {
  text: "rounded-[var(--ds-radius-xs)] h-[1em] w-full",
  circle: "rounded-[var(--ds-radius-full)] w-[var(--ds-avatar-md)] h-[var(--ds-avatar-md)]",
  rect: "rounded-[var(--ds-radius-sm)] w-full h-[var(--ds-space-20)]",
};

export function Skeleton({
  variant = "text",
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const classes = ["ds-skeleton block", shimmerClassName, variantClassName[variant], className]
    .filter(Boolean)
    .join(" ");

  // variantClassName already sets a default width/height — inline style just
  // overrides whichever dimension the consumer actually provided.
  const inlineStyle: CSSProperties = { ...style };
  if (width !== undefined) inlineStyle.width = width;
  if (height !== undefined) inlineStyle.height = height;

  return <div className={classes} style={inlineStyle} aria-hidden="true" {...rest} />;
}
