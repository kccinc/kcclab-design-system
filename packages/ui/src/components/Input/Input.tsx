import { forwardRef, useId, useState } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export type InputVariant = "outline" | "filled";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue"> {
  /** 비주얼 스타일. @default "outline" */
  variant?: InputVariant;
  /** 사이즈 — 박스 높이와 타이포그래피를 결정합니다. @default "md" */
  size?: InputSize;
  /** 테두리 박스 안, 텍스트 앞에 렌더링되는 아이콘/장식 요소 (시각적으로 "prefix"). */
  prefixIcon?: ReactNode;
  /** 테두리 박스 안, 텍스트 뒤에 렌더링되는 아이콘/장식 요소 (시각적으로 "suffix"). */
  suffixIcon?: ReactNode;
  /** `errorMessage` 없이도 에러 상태 스타일을 강제로 적용합니다. */
  error?: boolean;
  /** 인풋 아래에 렌더링되며, 인풋을 에러 상태로 만듭니다. */
  errorMessage?: string;
  /** 인풋 아래에 "현재/최대" 글자수 카운터를 표시합니다. `maxLength`가 필요합니다. */
  showCount?: boolean;
  value?: string | number;
  defaultValue?: string | number;
}

const boxBaseClassName =
  "ds-input inline-flex w-full items-center gap-[var(--ds-space-2)] rounded-[var(--ds-radius-sm)] " +
  "border transition-colors duration-150 " +
  "focus-within:border-[var(--ds-color-border-primary)] " +
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-[var(--ds-opacity-disabled)] " +
  "has-[:read-only]:bg-[var(--ds-color-grey-background)]";

const sizeClassName: Record<InputSize, string> = {
  sm: "h-8 px-[var(--ds-space-3)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]",
  md: "h-10 px-[var(--ds-space-4)] text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)]",
  lg: "h-12 px-[var(--ds-space-5)] text-[length:var(--ds-font-size-body1)] leading-[var(--ds-line-height-body1)]",
};

const iconSizeClassName: Record<InputSize, string> = {
  sm: "w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)]",
  md: "w-[var(--ds-icon-md)] h-[var(--ds-icon-md)]",
  lg: "w-[var(--ds-icon-lg)] h-[var(--ds-icon-lg)]",
};

function variantClassName(variant: InputVariant, hasError: boolean) {
  if (hasError) {
    return "border-[var(--ds-color-border-danger)] bg-[var(--ds-color-background)]";
  }
  return variant === "filled"
    ? "border-transparent bg-[var(--ds-color-grey-background)]"
    : "border-[var(--ds-color-border)] bg-[var(--ds-color-background)]";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "md",
      prefixIcon,
      suffixIcon,
      error = false,
      errorMessage,
      showCount = false,
      maxLength,
      className,
      id,
      required,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const hasError = error || Boolean(errorMessage);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? value : uncontrolledValue;

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setUncontrolledValue(e.target.value);
      onChange?.(e);
    }

    const iconClasses = ["shrink-0 text-[var(--ds-color-text-tertiary)]", iconSizeClassName[size]].join(
      " ",
    );

    return (
      <div className="ds-input-wrapper w-full">
        <div className={[boxBaseClassName, sizeClassName[size], variantClassName(variant, hasError)].join(" ")}>
          {prefixIcon && <span className={iconClasses}>{prefixIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={["min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--ds-color-text-placeholder)]", className]
              .filter(Boolean)
              .join(" ")}
            value={currentValue}
            onChange={handleChange}
            maxLength={maxLength}
            required={required}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-describedby={errorMessage ? errorId : undefined}
            {...rest}
          />
          {suffixIcon && <span className={iconClasses}>{suffixIcon}</span>}
        </div>
        {(errorMessage || showCount) && (
          <div className="mt-[var(--ds-space-1)] flex items-start justify-between gap-[var(--ds-space-2)]">
            {errorMessage ? (
              <p
                id={errorId}
                className="text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-danger)]"
              >
                {errorMessage}
              </p>
            ) : (
              <span />
            )}
            {showCount && (
              <span className="ml-auto shrink-0 text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-text-tertiary)]">
                {String(currentValue).length}
                {maxLength ? `/${maxLength}` : ""}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
