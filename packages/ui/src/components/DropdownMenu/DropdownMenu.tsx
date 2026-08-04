import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ReactElement, ReactNode } from "react";

export interface DropdownMenuProps {
  /** 클릭 시 메뉴를 여는 트리거 엘리먼트. */
  trigger: ReactElement;
  /** 열림 상태 (controlled). */
  open?: boolean;
  /** 열림 상태가 바뀔 때 호출됩니다. */
  onOpenChange?: (open: boolean) => void;
  /** 트리거 기준 정렬. @default "start" */
  align?: "start" | "center" | "end";
  children?: ReactNode;
}

export interface DropdownMenuItemProps {
  onSelect?: () => void;
  disabled?: boolean;
  /** danger 스타일(빨간색)로 표시합니다 — 삭제 등 위험한 액션에 사용하세요. @default false */
  danger?: boolean;
  children?: ReactNode;
}

export interface DropdownMenuSubProps {
  /** 서브메뉴를 여는 트리거 라벨. */
  trigger: ReactNode;
  children?: ReactNode;
}

const itemClassName =
  "ds-dropdown-item flex cursor-pointer items-center gap-[var(--ds-space-2)] rounded-[var(--ds-radius-xs)] " +
  "px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] " +
  "outline-none transition-colors duration-150 " +
  "data-[highlighted]:bg-[var(--ds-color-grey-background)] " +
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[var(--ds-opacity-disabled)]";

const contentClassName =
  "ds-dropdown-content z-[var(--ds-z-dropdown)] min-w-[180px] rounded-[var(--ds-radius-md)] " +
  "border border-[var(--ds-color-border)] bg-[var(--ds-color-floated-background)] " +
  "p-[var(--ds-space-1)] shadow-[var(--ds-shadow-elevation-2)]";

function DropdownMenuRoot({ trigger, open, onOpenChange, align = "start", children }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content align={align} sideOffset={4} className={contentClassName}>
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

function DropdownMenuItem({ onSelect, disabled, danger = false, children }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      onSelect={onSelect}
      disabled={disabled}
      className={[itemClassName, danger ? "text-[var(--ds-color-danger)]" : "text-[var(--ds-color-text-primary)]"].join(
        " ",
      )}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuSeparator() {
  return <DropdownMenuPrimitive.Separator className="my-[var(--ds-space-1)] h-px bg-[var(--ds-color-border)]" />;
}

function DropdownMenuSub({ trigger, children }: DropdownMenuSubProps) {
  return (
    <DropdownMenuPrimitive.Sub>
      <DropdownMenuPrimitive.SubTrigger className={[itemClassName, "justify-between text-[var(--ds-color-text-primary)]"].join(" ")}>
        {trigger}
      </DropdownMenuPrimitive.SubTrigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.SubContent sideOffset={4} className={contentClassName}>
          {children}
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Sub>
  );
}

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  Sub: DropdownMenuSub,
});
