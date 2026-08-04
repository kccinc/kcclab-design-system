import type { LabelHTMLAttributes, ReactNode } from "react";

export type LabelSize = "sm" | "md";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** 사이즈. @default "md" */
  size?: LabelSize;
  /**
   * 라벨 텍스트 뒤에 필수 항목 표시(`*`)를 붙입니다. 순수 시각적 요소이므로
   * (`aria-hidden`) — 스크린 리더가 인식하도록 연결된 입력 요소에도 `required`를
   * 함께 설정하세요. @default false
   */
  required?: boolean;
  /** 비활성화된 입력 요소에 맞춰 라벨을 흐리게 표시합니다. @default false */
  disabled?: boolean;
  children?: ReactNode;
}

const sizeClassName: Record<LabelSize, string> = {
  sm: "text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]",
  md: "text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)]",
};

export function Label({
  size = "md",
  required = false,
  disabled = false,
  className,
  children,
  ...rest
}: LabelProps) {
  const classes = [
    "ds-label inline-flex items-center gap-[var(--ds-space-1)] font-medium",
    sizeClassName[size],
    disabled ? "text-[var(--ds-color-text-disabled)]" : "text-[var(--ds-color-text-primary)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} {...rest}>
      {children}
      {required && (
        <span className="text-[var(--ds-color-danger)]" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
