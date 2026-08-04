import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "success" | "danger" | "warning" | "info";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 비주얼 스타일. @default "info" */
  variant?: AlertVariant;
  title?: ReactNode;
  /** 닫기(X) 버튼 클릭 시 호출됩니다 — 전달하지 않으면 닫기 버튼이 렌더링되지 않습니다. */
  onClose?: () => void;
  children?: ReactNode;
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

const iconByVariant: Record<AlertVariant, ReactNode> = {
  success: <CheckCircleIcon />,
  danger: <AlertCircleIcon />,
  warning: <AlertCircleIcon />,
  info: <AlertCircleIcon />,
};

const variantClassName: Record<AlertVariant, string> = {
  success: "border-[var(--ds-color-success)] bg-[var(--ds-color-success-light)] text-[var(--ds-color-success)]",
  danger: "border-[var(--ds-color-danger)] bg-[var(--ds-color-danger-light)] text-[var(--ds-color-danger)]",
  warning: "border-[var(--ds-color-warning)] bg-[var(--ds-color-warning-light)] text-[var(--ds-color-warning)]",
  info: "border-[var(--ds-color-info)] bg-[var(--ds-color-info-light)] text-[var(--ds-color-info)]",
};

export function Alert({ variant = "info", title, onClose, className, children, ...rest }: AlertProps) {
  const classes = [
    "ds-alert flex items-start gap-[var(--ds-space-2)] rounded-[var(--ds-radius-md)] border-l-4 p-[var(--ds-space-4)]",
    variantClassName[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="alert" className={classes} {...rest}>
      <span className="w-[var(--ds-icon-md)] h-[var(--ds-icon-md)] shrink-0">{iconByVariant[variant]}</span>
      <div className="flex-1">
        {title && (
          <p className="text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] font-medium">
            {title}
          </p>
        )}
        {children && (
          <div className="mt-[var(--ds-space-1)] text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)] text-[var(--ds-color-text-secondary)]">
            {children}
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="ds-alert-close inline-flex h-[var(--ds-icon-md)] w-[var(--ds-icon-md)] shrink-0 cursor-pointer items-center justify-center rounded-[var(--ds-radius-full)] text-[var(--ds-color-text-tertiary)] hover:bg-[var(--ds-color-grey-opacity-100)]"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}
