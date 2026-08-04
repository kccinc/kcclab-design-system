import { useId } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { ReactNode } from "react";

export type SelectVariant = "outline" | "filled";
export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  /** 선택된 값 (controlled). */
  value?: string;
  /** 선택된 값 (uncontrolled) 초기값. */
  defaultValue?: string;
  /** 선택된 값이 바뀔 때 호출됩니다. */
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** 비주얼 스타일. @default "outline" */
  variant?: SelectVariant;
  /** 사이즈. @default "md" */
  size?: SelectSize;
  /** 필수 선택 여부 (폼 검증용). @default false */
  required?: boolean;
  disabled?: boolean;
  /** `errorMessage` 없이도 에러 상태 스타일을 강제로 적용합니다. */
  error?: boolean;
  /** 트리거 아래에 렌더링되며, 트리거를 에러 상태로 만듭니다. */
  errorMessage?: string;
  id?: string;
  name?: string;
  className?: string;
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const sizeClassName: Record<SelectSize, string> = {
  sm: "h-[var(--ds-space-8)] px-[var(--ds-space-3)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]",
  md: "h-[var(--ds-space-10)] px-[var(--ds-space-4)] text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)]",
  lg: "h-[var(--ds-space-12)] px-[var(--ds-space-5)] text-[length:var(--ds-font-size-body1)] leading-[var(--ds-line-height-body1)]",
};

function variantClassName(variant: SelectVariant, hasError: boolean) {
  if (hasError) return "border-[var(--ds-color-border-danger)] bg-[var(--ds-color-background)]";
  return variant === "filled"
    ? "border-transparent bg-[var(--ds-color-grey-background)]"
    : "border-[var(--ds-color-border)] bg-[var(--ds-color-background)]";
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "선택하세요",
  variant = "outline",
  size = "md",
  required = false,
  disabled = false,
  error = false,
  errorMessage,
  id,
  name,
  className,
}: SelectProps) {
  const hasError = error || Boolean(errorMessage);
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="ds-select-wrapper w-full">
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
        name={name}
      >
        <SelectPrimitive.Trigger
          id={selectId}
          className={[
            "ds-select flex w-full cursor-pointer items-center justify-between gap-[var(--ds-space-2)] rounded-[var(--ds-radius-sm)]",
            "border transition-colors duration-150 outline-none",
            "data-[state=open]:border-[var(--ds-color-border-primary)]",
            "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]",
            "data-[placeholder]:text-[var(--ds-color-text-placeholder)]",
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
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="shrink-0 w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)] text-[var(--ds-color-text-tertiary)]">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="ds-select-content z-[var(--ds-z-dropdown)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[var(--ds-radius-md)] border border-[var(--ds-color-border)] bg-[var(--ds-color-floated-background)] shadow-[var(--ds-shadow-elevation-2)]"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-[var(--ds-space-1)]">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={[
                    "ds-select-item flex cursor-pointer items-center justify-between gap-[var(--ds-space-2)]",
                    "rounded-[var(--ds-radius-xs)] px-[var(--ds-space-3)] py-[var(--ds-space-2)]",
                    "text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] text-[var(--ds-color-text-primary)]",
                    "outline-none transition-colors duration-150 data-[highlighted]:bg-[var(--ds-color-grey-background)]",
                    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[var(--ds-opacity-disabled)]",
                  ].join(" ")}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="w-[var(--ds-icon-xs)] h-[var(--ds-icon-xs)] text-[var(--ds-color-primary)]">
                    <CheckIcon />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
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
