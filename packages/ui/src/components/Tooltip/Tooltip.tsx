import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactElement, ReactNode } from "react";

export type TooltipSide = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  /** 툴팁 안에 표시할 짧은 설명. */
  content: ReactNode;
  /** 트리거가 되는 엘리먼트 — hover/focus 시 툴팁이 나타납니다. */
  children: ReactElement;
  /** 트리거 기준 툴팁이 나타나는 방향. @default "top" */
  side?: TooltipSide;
  /** hover 후 툴팁이 나타나기까지의 지연 시간(ms). @default 200 */
  delayDuration?: number;
}

// Radix의 sideOffset은 위치 계산에 쓰이는 순수 숫자(px)만 받습니다 —
// --ds-space-1(4px)과 동일한 값입니다.
const SIDE_OFFSET = 4;

export function Tooltip({ content, children, side = "top", delayDuration = 200 }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={SIDE_OFFSET}
            className={[
              "ds-tooltip z-[var(--ds-z-tooltip)] max-w-[240px] rounded-[var(--ds-radius-sm)]",
              "bg-[var(--ds-color-inverse-background)] px-[var(--ds-space-3)] py-[var(--ds-space-2)]",
              "text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]",
              "text-[var(--ds-color-text-inverse)] shadow-[var(--ds-shadow-elevation-2)]",
            ].join(" ")}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[var(--ds-color-inverse-background)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
