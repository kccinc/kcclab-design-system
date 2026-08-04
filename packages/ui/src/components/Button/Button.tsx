import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 비주얼 스타일. @default "primary" */
  variant?: ButtonVariant;
  /** 사이즈 — padding, height, 라벨 타이포그래피를 결정합니다. @default "md" */
  size?: ButtonSize;
  /** 컨테이너 너비에 맞게 늘어납니다. @default false */
  fullWidth?: boolean;
  /** `leftIcon` 자리에 스피너를 표시하고 버튼을 비활성화합니다. @default false */
  isLoading?: boolean;
  /** 라벨 앞에 렌더링되는 아이콘 (`isLoading`일 때는 숨겨지고 스피너로 대체됩니다). */
  leftIcon?: ReactNode;
  /** 라벨 뒤에 렌더링되는 아이콘 (`isLoading`일 때는 숨겨집니다). */
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const baseClassName =
  "ds-button inline-flex cursor-pointer items-center justify-center gap-[var(--ds-space-2)] " +
  "rounded-[var(--ds-radius-sm)] font-medium transition-colors duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[var(--ds-color-border-primary)] " +
  "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]";

const sizeClassName: Record<ButtonSize, string> = {
  sm: "h-8 px-[var(--ds-space-3)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]",
  md: "h-10 px-[var(--ds-space-4)] text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)]",
  lg: "h-12 px-[var(--ds-space-5)] text-[length:var(--ds-font-size-body1)] leading-[var(--ds-line-height-body1)]",
};

const iconSizeClassName: Record<ButtonSize, string> = {
  sm: "w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)]",
  md: "w-[var(--ds-icon-md)] h-[var(--ds-icon-md)]",
  lg: "w-[var(--ds-icon-lg)] h-[var(--ds-icon-lg)]",
};

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ds-color-primary)] text-[var(--ds-color-text-inverse)] hover:bg-[var(--ds-color-primary-hover)] active:bg-[var(--ds-color-primary-active)]",
  secondary:
    "bg-[var(--ds-color-secondary-light)] text-[var(--ds-color-text-primary)] hover:bg-[var(--ds-color-border)] active:bg-[var(--ds-color-border-strong)]",
  outline:
    "bg-transparent text-[var(--ds-color-primary)] border border-[var(--ds-color-border-primary)] hover:bg-[var(--ds-color-primary-light)] active:bg-[var(--ds-color-primary-light)]",
  ghost:
    "bg-transparent text-[var(--ds-color-text-secondary)] hover:bg-[var(--ds-color-grey-opacity-100)] active:bg-[var(--ds-color-grey-opacity-200)]",
  danger:
    "bg-[var(--ds-color-danger)] text-[var(--ds-color-text-inverse)] hover:bg-[var(--ds-color-danger-hover)] active:bg-[var(--ds-color-danger-hover)]",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={["animate-spin", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      baseClassName,
      sizeClassName[size],
      variantClassName[variant],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const iconClasses = ["shrink-0", iconSizeClassName[size]].join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading ? (
          <Spinner className={iconClasses} />
        ) : (
          leftIcon && <span className={iconClasses}>{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className={iconClasses}>{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
