import { useId, useState } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ReactNode } from "react";

export type CheckboxCheckedState = boolean | "indeterminate";

export interface CheckboxProps {
  /** 체크 상태 (controlled). `"indeterminate"`는 부분 선택 상태를 나타냅니다. */
  checked?: CheckboxCheckedState;
  /** 체크 상태 (uncontrolled) 초기값. @default false */
  defaultChecked?: CheckboxCheckedState;
  /** 체크 상태가 바뀔 때 호출됩니다. */
  onCheckedChange?: (checked: CheckboxCheckedState) => void;
  /** 비활성화 여부. @default false */
  disabled?: boolean;
  /** 필수 선택 여부 (폼 검증용). @default false */
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  /** 체크박스 오른쪽에 표시할 라벨 텍스트 — 클릭 가능한 영역에 함께 포함됩니다. */
  children?: ReactNode;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  required = false,
  id,
  name,
  value,
  className,
  children,
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState<CheckboxCheckedState>(defaultChecked);
  const currentChecked = isControlled ? checked : uncontrolledChecked;

  function handleCheckedChange(next: CheckboxCheckedState) {
    if (!isControlled) setUncontrolledChecked(next);
    onCheckedChange?.(next);
  }

  const root = (
    <CheckboxPrimitive.Root
      id={checkboxId}
      name={name}
      value={value}
      checked={currentChecked}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      required={required}
      className={[
        "ds-checkbox inline-flex h-[var(--ds-icon-md)] w-[var(--ds-icon-md)] shrink-0 cursor-pointer items-center justify-center",
        "rounded-[var(--ds-radius-xs)] border border-[var(--ds-color-border)] bg-[var(--ds-color-background)]",
        "transition-colors duration-150",
        "data-[state=checked]:border-[var(--ds-color-primary)] data-[state=checked]:bg-[var(--ds-color-primary)]",
        "data-[state=indeterminate]:border-[var(--ds-color-primary)] data-[state=indeterminate]:bg-[var(--ds-color-primary)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]",
        children ? "" : className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CheckboxPrimitive.Indicator className="text-[var(--ds-color-text-inverse)] [&_svg]:h-[var(--ds-icon-sm)] [&_svg]:w-[var(--ds-icon-sm)]">
        {currentChecked === "indeterminate" ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!children) return root;

  return (
    <label
      htmlFor={checkboxId}
      className={[
        "ds-checkbox-label inline-flex items-center gap-[var(--ds-space-2)]",
        disabled ? "cursor-not-allowed opacity-[var(--ds-opacity-disabled)]" : "cursor-pointer",
        "text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] text-[var(--ds-color-text-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {root}
      {children}
    </label>
  );
}
