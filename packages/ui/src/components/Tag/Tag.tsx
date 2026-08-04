import type { HTMLAttributes, ReactNode } from "react";

export type TagVariant = "primary" | "success" | "danger" | "warning" | "info" | "neutral";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** 비주얼 스타일. @default "neutral" */
  variant?: TagVariant;
  /** 삭제(X) 버튼 클릭 시 호출됩니다 — 전달하지 않으면 삭제 버튼이 렌더링되지 않습니다. */
  onRemove?: () => void;
  /** 삭제 버튼의 스크린 리더용 라벨. @default "삭제" */
  removeLabel?: string;
  children?: ReactNode;
}

const variantClassName: Record<TagVariant, string> = {
  primary: "bg-[var(--ds-color-primary-light)] text-[var(--ds-color-primary)]",
  success: "bg-[var(--ds-color-success-light)] text-[var(--ds-color-success)]",
  danger: "bg-[var(--ds-color-danger-light)] text-[var(--ds-color-danger)]",
  warning: "bg-[var(--ds-color-warning-light)] text-[var(--ds-color-warning)]",
  info: "bg-[var(--ds-color-info-light)] text-[var(--ds-color-info)]",
  neutral: "bg-[var(--ds-color-grey-background)] text-[var(--ds-color-text-secondary)]",
};

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function Tag({
  variant = "neutral",
  onRemove,
  removeLabel = "삭제",
  className,
  children,
  ...rest
}: TagProps) {
  const classes = [
    "ds-tag inline-flex items-center gap-[var(--ds-space-1)] rounded-[var(--ds-radius-full)]",
    "py-[var(--ds-space-1)] pl-[var(--ds-space-2)]",
    onRemove ? "pr-[var(--ds-space-1)]" : "pr-[var(--ds-space-2)]",
    "text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)] font-medium",
    variantClassName[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="ds-tag-remove inline-flex h-[var(--ds-icon-xs)] w-[var(--ds-icon-xs)] cursor-pointer items-center justify-center rounded-[var(--ds-radius-full)] hover:bg-[var(--ds-color-grey-opacity-200)]"
        >
          <XIcon />
        </button>
      )}
    </span>
  );
}
