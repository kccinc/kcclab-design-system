import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactElement, ReactNode } from "react";

export type DrawerSide = "left" | "right";

export interface DrawerProps {
  /** 열림 상태 (controlled). */
  open?: boolean;
  /** 열림 상태 (uncontrolled) 초기값. */
  defaultOpen?: boolean;
  /** 열림 상태가 바뀔 때 호출됩니다. */
  onOpenChange?: (open: boolean) => void;
  /** 클릭 시 드로어를 여는 트리거 엘리먼트. 지정하지 않으면 `open`으로 직접 제어합니다. */
  trigger?: ReactElement;
  /** 슬라이드되어 나타나는 방향. @default "right" */
  side?: DrawerSide;
  children?: ReactNode;
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

const sideClassName: Record<DrawerSide, string> = {
  left: "left-0 data-[state=closed]:-translate-x-full",
  right: "right-0 data-[state=closed]:translate-x-full",
};

function DrawerRoot({ open, defaultOpen, onOpenChange, trigger, side = "right", children }: DrawerProps) {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ds-drawer-overlay fixed inset-0 z-[var(--ds-z-overlay)] bg-[var(--ds-color-grey-opacity-600)]" />
        <DialogPrimitive.Content
          className={[
            "ds-drawer-content fixed top-0 z-[var(--ds-z-modal)] h-full w-[min(100%,360px)]",
            "bg-[var(--ds-color-layered-background)] shadow-[var(--ds-shadow-elevation-3)] outline-none",
            "transition-transform duration-[var(--ds-transition-normal)] data-[state=open]:translate-x-0",
            sideClassName[side],
          ].join(" ")}
        >
          {children}
          <DialogPrimitive.Close
            className="absolute right-[var(--ds-space-4)] top-[var(--ds-space-4)] inline-flex h-[var(--ds-icon-lg)] w-[var(--ds-icon-lg)] cursor-pointer items-center justify-center rounded-[var(--ds-radius-full)] text-[var(--ds-color-text-tertiary)] hover:bg-[var(--ds-color-grey-opacity-100)]"
            aria-label="닫기"
          >
            <XIcon />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function DrawerTitle({ children }: { children?: ReactNode }) {
  return (
    <DialogPrimitive.Title className="text-[length:var(--ds-font-size-heading4)] leading-[var(--ds-line-height-heading4)] font-semibold text-[var(--ds-color-text-primary)]">
      {children}
    </DialogPrimitive.Title>
  );
}

function DrawerHeader({ children }: { children?: ReactNode }) {
  return (
    <div className="ds-drawer-header border-b border-[var(--ds-color-border)] p-[var(--ds-space-6)] pr-[var(--ds-space-10)]">
      {children}
    </div>
  );
}

function DrawerBody({ children }: { children?: ReactNode }) {
  return <div className="ds-drawer-body flex-1 overflow-y-auto p-[var(--ds-space-6)]">{children}</div>;
}

function DrawerFooter({ children }: { children?: ReactNode }) {
  return (
    <div className="ds-drawer-footer flex justify-end gap-[var(--ds-space-2)] border-t border-[var(--ds-color-border)] p-[var(--ds-space-6)]">
      {children}
    </div>
  );
}

export const Drawer = Object.assign(DrawerRoot, {
  Title: DrawerTitle,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DialogPrimitive.Close,
});
