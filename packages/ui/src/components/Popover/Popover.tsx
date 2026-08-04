import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ReactElement, ReactNode } from "react";

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  /** 클릭 시 팝오버를 여는 트리거 엘리먼트. */
  trigger: ReactElement;
  /** 팝오버 안에 표시할 콘텐츠. */
  children?: ReactNode;
  /** 열림 상태 (controlled). */
  open?: boolean;
  /** 열림 상태 (uncontrolled) 초기값. */
  defaultOpen?: boolean;
  /** 열림 상태가 바뀔 때 호출됩니다. */
  onOpenChange?: (open: boolean) => void;
  /** 트리거 기준 팝오버가 나타나는 방향. @default "bottom" */
  side?: PopoverSide;
  /** 트리거 기준 정렬. @default "start" */
  align?: PopoverAlign;
  className?: string;
}

// Radix의 sideOffset은 위치 계산에 쓰이는 순수 숫자(px)만 받습니다 — --ds-space-2(8px)와 동일한 값입니다.
const SIDE_OFFSET = 8;

export function Popover({
  trigger,
  children,
  open,
  defaultOpen,
  onOpenChange,
  side = "bottom",
  align = "start",
  className,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        {/* avoidCollisions는 Radix 기본값(true)으로, 화면 밖으로 나가지 않도록 자동 재배치합니다. */}
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={SIDE_OFFSET}
          className={[
            "ds-popover z-[var(--ds-z-dropdown)] max-w-[320px] rounded-[var(--ds-radius-md)]",
            "border border-[var(--ds-color-border)] bg-[var(--ds-color-floated-background)]",
            "p-[var(--ds-space-4)] shadow-[var(--ds-shadow-elevation-2)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
