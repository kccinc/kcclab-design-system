import { useId } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ReactNode } from "react";

export interface SwitchProps {
  /** On/Off 상태 (controlled). */
  checked?: boolean;
  /** On/Off 상태 (uncontrolled) 초기값. @default false */
  defaultChecked?: boolean;
  /** 상태가 바뀔 때 호출됩니다. */
  onCheckedChange?: (checked: boolean) => void;
  /** 비활성화 여부. @default false */
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  /** 스위치 오른쪽에 표시할 라벨 텍스트 — 클릭 가능한 영역에 함께 포함됩니다. */
  children?: ReactNode;
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  id,
  name,
  className,
  children,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  const root = (
    <SwitchPrimitive.Root
      id={switchId}
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={[
        "ds-switch relative inline-flex h-[var(--ds-space-6)] w-[var(--ds-space-12)] shrink-0 cursor-pointer",
        "items-center rounded-[var(--ds-radius-full)] bg-[var(--ds-color-border-strong)] transition-colors duration-150",
        "data-[state=checked]:bg-[var(--ds-color-primary)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]",
        // disabled 상태는 opacity로 흐리게 하지 않습니다 — thumb이 흰색이라 옅어지면
        // 배경과 거의 구분이 안 돼서, 대신 track을 항상 같은 muted grey로 고정합니다.
        "disabled:cursor-not-allowed disabled:bg-[var(--ds-color-border-strong)]",
        "disabled:data-[state=checked]:bg-[var(--ds-color-border-strong)]",
        children ? "" : className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SwitchPrimitive.Thumb
        className={[
          "ds-switch-thumb ml-[var(--ds-space-1)] block h-[var(--ds-space-4)] w-[var(--ds-space-4)] rounded-[var(--ds-radius-full)]",
          "bg-[var(--ds-color-background)] shadow-[var(--ds-shadow-elevation-1)] transition-transform duration-150",
          "translate-x-0 data-[state=checked]:translate-x-[var(--ds-space-6)]",
        ].join(" ")}
      />
    </SwitchPrimitive.Root>
  );

  if (!children) return root;

  return (
    <label
      htmlFor={switchId}
      className={[
        "ds-switch-label inline-flex items-center gap-[var(--ds-space-2)]",
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
