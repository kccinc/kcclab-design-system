import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonVariant = "primary" | "secondary" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  /** 비주얼 스타일. @default "primary" */
  variant?: IconButtonVariant;
  /** 사이즈 — 정사각형 버튼이며, 버튼과 아이콘 크기를 함께 결정합니다. @default "md" */
  size?: IconButtonSize;
  /** 렌더링할 아이콘 — 이 버튼은 텍스트 라벨이 없습니다. */
  icon: ReactNode;
  /**
   * 필수 — IconButton은 눈에 보이는 텍스트가 없어서, 스크린 리더 사용자는
   * 이 값만으로 버튼의 동작을 파악합니다 (예: "삭제", "닫기").
   */
  "aria-label": string;
}

const baseClassName =
  "ds-icon-button inline-flex cursor-pointer shrink-0 items-center justify-center " +
  "rounded-[var(--ds-radius-sm)] transition-colors duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[var(--ds-color-border-primary)] " +
  "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]";

const sizeClassName: Record<IconButtonSize, string> = {
  sm: "w-8 h-8 [&_svg]:w-[var(--ds-icon-sm)] [&_svg]:h-[var(--ds-icon-sm)]",
  md: "w-10 h-10 [&_svg]:w-[var(--ds-icon-md)] [&_svg]:h-[var(--ds-icon-md)]",
  lg: "w-12 h-12 [&_svg]:w-[var(--ds-icon-lg)] [&_svg]:h-[var(--ds-icon-lg)]",
};

const variantClassName: Record<IconButtonVariant, string> = {
  primary:
    "bg-[var(--ds-color-primary)] text-[var(--ds-color-text-inverse)] hover:bg-[var(--ds-color-primary-hover)]",
  secondary:
    "bg-[var(--ds-color-secondary-light)] text-[var(--ds-color-text-primary)] hover:bg-[var(--ds-color-border)]",
  ghost:
    "bg-transparent text-[var(--ds-color-text-secondary)] hover:bg-[var(--ds-color-grey-opacity-100)]",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "primary", size = "md", icon, className, disabled, ...rest }, ref) => {
    const classes = [baseClassName, sizeClassName[size], variantClassName[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} disabled={disabled} {...rest}>
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
