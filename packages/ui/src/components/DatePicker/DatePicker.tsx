import { useId, useState } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { Popover } from "../Popover";

export type DatePickerVariant = "outline" | "filled";
export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps {
  /** 선택된 날짜 (controlled). */
  value?: Date;
  /** 선택된 날짜 (uncontrolled) 초기값. */
  defaultValue?: Date;
  /** 선택된 날짜가 바뀔 때 호출됩니다. */
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** 비주얼 스타일. @default "outline" */
  variant?: DatePickerVariant;
  /** 사이즈. @default "md" */
  size?: DatePickerSize;
  /** 필수 선택 여부 (폼 검증용). @default false */
  required?: boolean;
  disabled?: boolean;
  /** `errorMessage` 없이도 에러 상태 스타일을 강제로 적용합니다. */
  error?: boolean;
  /** 트리거 아래에 렌더링되며, 트리거를 에러 상태로 만듭니다. */
  errorMessage?: string;
  /** 선택 가능한 가장 이른 날짜. */
  fromDate?: Date;
  /** 선택 가능한 가장 늦은 날짜. */
  toDate?: Date;
  id?: string;
  className?: string;
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

const sizeClassName: Record<DatePickerSize, string> = {
  sm: "h-[var(--ds-space-8)] px-[var(--ds-space-3)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]",
  md: "h-[var(--ds-space-10)] px-[var(--ds-space-4)] text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)]",
  lg: "h-[var(--ds-space-12)] px-[var(--ds-space-5)] text-[length:var(--ds-font-size-body1)] leading-[var(--ds-line-height-body1)]",
};

function variantClassName(variant: DatePickerVariant, hasError: boolean) {
  if (hasError) return "border-[var(--ds-color-border-danger)] bg-[var(--ds-color-background)]";
  return variant === "filled"
    ? "border-transparent bg-[var(--ds-color-grey-background)]"
    : "border-[var(--ds-color-border)] bg-[var(--ds-color-background)]";
}

export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "날짜 선택",
  variant = "outline",
  size = "md",
  required = false,
  disabled = false,
  error = false,
  errorMessage,
  fromDate,
  toDate,
  id,
  className,
}: DatePickerProps) {
  const hasError = error || Boolean(errorMessage);
  const generatedId = useId();
  const datePickerId = id ?? generatedId;
  const errorId = `${datePickerId}-error`;

  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<Date | undefined>(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;

  function handleSelect(date: Date | undefined) {
    if (!isControlled) setUncontrolledValue(date);
    onValueChange?.(date);
    setOpen(false);
  }

  return (
    <div className="ds-date-picker-wrapper w-full">
      <Popover
        open={disabled ? false : open}
        onOpenChange={setOpen}
        side="bottom"
        align="start"
        trigger={
          <button
            type="button"
            id={datePickerId}
            disabled={disabled}
            className={[
              "ds-date-picker-trigger flex w-full cursor-pointer items-center justify-between gap-[var(--ds-space-2)]",
              "rounded-[var(--ds-radius-sm)] border transition-colors duration-150",
              currentValue ? "text-[var(--ds-color-text-primary)]" : "text-[var(--ds-color-text-placeholder)]",
              "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]",
              sizeClassName[size],
              variantClassName(variant, hasError),
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-describedby={errorMessage ? errorId : undefined}
          >
            {currentValue ? format(currentValue, "yyyy년 M월 d일", { locale: ko }) : placeholder}
            <span className="w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)] shrink-0 text-[var(--ds-color-text-tertiary)]">
              <CalendarIcon />
            </span>
          </button>
        }
      >
        <DayPicker
          mode="single"
          locale={ko}
          selected={currentValue}
          onSelect={handleSelect}
          startMonth={fromDate}
          endMonth={toDate}
          disabled={[
            ...(fromDate ? [{ before: fromDate }] : []),
            ...(toDate ? [{ after: toDate }] : []),
          ]}
        />
      </Popover>
      {errorMessage && (
        <p
          id={errorId}
          className="mt-[var(--ds-space-1)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-danger)]"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
