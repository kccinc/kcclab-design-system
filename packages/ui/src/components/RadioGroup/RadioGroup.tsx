import { useId } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ReactNode } from "react";

export interface RadioGroupProps {
  /** 선택된 값 (controlled). */
  value?: string;
  /** 선택된 값 (uncontrolled) 초기값. */
  defaultValue?: string;
  /** 선택된 값이 바뀔 때 호출됩니다. */
  onValueChange?: (value: string) => void;
  /** 그룹 전체 비활성화 여부. @default false */
  disabled?: boolean;
  /** 그룹의 배치 방향. @default "vertical" */
  orientation?: "horizontal" | "vertical";
  name?: string;
  className?: string;
  children?: ReactNode;
}

export interface RadioGroupItemProps {
  /** 이 항목이 선택됐을 때 그룹의 `value`가 되는 값. */
  value: string;
  /** 이 항목만 개별적으로 비활성화합니다. */
  disabled?: boolean;
  id?: string;
  className?: string;
  /** 라디오 오른쪽에 표시할 라벨 텍스트 — 클릭 가능한 영역에 함께 포함됩니다. */
  children?: ReactNode;
}

function RadioGroupRoot({
  orientation = "vertical",
  className,
  children,
  ...rest
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      {...rest}
      className={[
        "ds-radio-group flex",
        orientation === "horizontal" ? "flex-row gap-[var(--ds-space-4)]" : "flex-col gap-[var(--ds-space-2)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}

function RadioGroupItem({ value, disabled, id, className, children }: RadioGroupItemProps) {
  const generatedId = useId();
  const itemId = id ?? generatedId;

  const item = (
    <RadioGroupPrimitive.Item
      value={value}
      disabled={disabled}
      id={itemId}
      className={[
        "ds-radio-group-item inline-flex h-[var(--ds-icon-md)] w-[var(--ds-icon-md)] shrink-0 cursor-pointer items-center justify-center",
        "rounded-[var(--ds-radius-full)] border border-[var(--ds-color-border)] bg-[var(--ds-color-background)]",
        "transition-colors duration-150",
        "data-[state=checked]:border-[var(--ds-color-primary)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]",
        children ? "" : className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <RadioGroupPrimitive.Indicator className="h-[var(--ds-space-3)] w-[var(--ds-space-3)] rounded-[var(--ds-radius-full)] bg-[var(--ds-color-primary)]" />
    </RadioGroupPrimitive.Item>
  );

  if (!children) return item;

  return (
    <label
      htmlFor={itemId}
      className={[
        "ds-radio-group-label inline-flex items-center gap-[var(--ds-space-2)]",
        disabled ? "cursor-not-allowed opacity-[var(--ds-opacity-disabled)]" : "cursor-pointer",
        "text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] text-[var(--ds-color-text-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {item}
      {children}
    </label>
  );
}

export const RadioGroup = Object.assign(RadioGroupRoot, { Item: RadioGroupItem });
