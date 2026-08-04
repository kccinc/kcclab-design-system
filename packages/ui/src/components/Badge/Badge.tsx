import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "primary" | "success" | "danger" | "warning" | "info" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 비주얼 스타일. @default "neutral" */
  variant?: BadgeVariant;
  /**
   * 텍스트 없이 작은 점만 표시합니다 (알림/온라인 상태 표시 등). 이 모드에서는
   * `children`이 렌더링되지 않습니다. @default false
   */
  dot?: boolean;
  children?: ReactNode;
}

const variantClassName: Record<BadgeVariant, string> = {
  primary: "bg-[var(--ds-color-primary-light)] text-[var(--ds-color-primary)]",
  success: "bg-[var(--ds-color-success-light)] text-[var(--ds-color-success)]",
  danger: "bg-[var(--ds-color-danger-light)] text-[var(--ds-color-danger)]",
  warning: "bg-[var(--ds-color-warning-light)] text-[var(--ds-color-warning)]",
  info: "bg-[var(--ds-color-info-light)] text-[var(--ds-color-info)]",
  neutral: "bg-[var(--ds-color-grey-background)] text-[var(--ds-color-text-secondary)]",
};

const dotVariantClassName: Record<BadgeVariant, string> = {
  primary: "bg-[var(--ds-color-primary)]",
  success: "bg-[var(--ds-color-success)]",
  danger: "bg-[var(--ds-color-danger)]",
  warning: "bg-[var(--ds-color-warning)]",
  info: "bg-[var(--ds-color-info)]",
  neutral: "bg-[var(--ds-color-text-tertiary)]",
};

export function Badge({ variant = "neutral", dot = false, className, children, ...rest }: BadgeProps) {
  if (dot) {
    const classes = [
      "ds-badge-dot inline-block h-2 w-2 shrink-0 rounded-[var(--ds-radius-full)]",
      dotVariantClassName[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return <span className={classes} {...rest} />;
  }

  const classes = [
    "ds-badge inline-flex items-center rounded-[var(--ds-radius-full)] px-[var(--ds-space-2)] py-[var(--ds-space-1)]",
    "text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)] font-medium",
    variantClassName[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
