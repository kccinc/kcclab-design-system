import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, ForwardedRef, TextareaHTMLAttributes } from "react";

export type TextareaVariant = "outline" | "filled";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue"> {
  /** 비주얼 스타일. @default "outline" */
  variant?: TextareaVariant;
  /** `errorMessage` 없이도 에러 상태 스타일을 강제로 적용합니다. */
  error?: boolean;
  /** 텍스트영역 아래에 렌더링되며, 텍스트영역을 에러 상태로 만듭니다. */
  errorMessage?: string;
  /** 텍스트영역 아래에 "현재/최대" 글자수 카운터를 표시합니다. `maxLength`가 필요합니다. */
  showCount?: boolean;
  /** 스크롤 대신 내용에 맞게 텍스트영역 높이가 늘어납니다. @default false */
  autoResize?: boolean;
  value?: string;
  defaultValue?: string;
}

const baseClassName =
  "ds-textarea w-full resize-y rounded-[var(--ds-radius-sm)] border p-[var(--ds-space-3)] " +
  "text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] " +
  "outline-none transition-colors duration-150 " +
  "placeholder:text-[var(--ds-color-text-placeholder)] " +
  "focus:border-[var(--ds-color-border-primary)] " +
  "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]";

function variantClassName(variant: TextareaVariant, hasError: boolean) {
  if (hasError) {
    return "border-[var(--ds-color-border-danger)] bg-[var(--ds-color-background)]";
  }
  return variant === "filled"
    ? "border-transparent bg-[var(--ds-color-grey-background)]"
    : "border-[var(--ds-color-border)] bg-[var(--ds-color-background)]";
}

function setRef<T>(ref: ForwardedRef<T>, node: T) {
  if (typeof ref === "function") ref(node);
  else if (ref) (ref as { current: T }).current = node;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "outline",
      error = false,
      errorMessage,
      showCount = false,
      autoResize = false,
      maxLength,
      className,
      id,
      rows = 3,
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
    const textareaId = id ?? generatedId;
    const errorId = `${textareaId}-error`;

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? value : uncontrolledValue;

    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      if (!autoResize) return;
      const el = internalRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize, currentValue]);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
      if (!isControlled) setUncontrolledValue(e.target.value);
      onChange?.(e);
    }

    return (
      <div className="ds-textarea-wrapper w-full">
        <textarea
          ref={(node) => {
            internalRef.current = node;
            setRef(ref, node);
          }}
          id={textareaId}
          rows={rows}
          className={[baseClassName, variantClassName(variant, hasError), autoResize ? "overflow-hidden resize-none" : "", className]
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
                {currentValue.length}
                {maxLength ? `/${maxLength}` : ""}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
