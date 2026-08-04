import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactElement, ReactNode } from "react";

export type DialogSize = "sm" | "md" | "lg";

export interface DialogProps {
  /** 열림 상태 (controlled). */
  open?: boolean;
  /** 열림 상태 (uncontrolled) 초기값. */
  defaultOpen?: boolean;
  /** 열림 상태가 바뀔 때 호출됩니다. */
  onOpenChange?: (open: boolean) => void;
  /** 클릭 시 다이얼로그를 여는 트리거 엘리먼트. 지정하지 않으면 `open`으로 직접 제어합니다. */
  trigger?: ReactElement;
  /** 패널 최대 너비. @default "md" */
  size?: DialogSize;
  /** 우측 상단 닫기(X) 버튼 표시 여부 — ConfirmDialog/AlertDialog처럼 Footer의 버튼으로만
   * 닫도록 하고 싶다면 `false`로 둡니다. @default true */
  showCloseButton?: boolean;
  children?: ReactNode;
}

const sizeClassName: Record<DialogSize, string> = {
  sm: "max-w-[360px]",
  md: "max-w-[480px]",
  lg: "max-w-[640px]",
};

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function DialogRoot({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  size = "md",
  showCloseButton = true,
  children,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ds-dialog-overlay fixed inset-0 z-[var(--ds-z-overlay)] bg-[var(--ds-color-grey-opacity-600)]" />
        <DialogPrimitive.Content
          className={[
            "ds-dialog-content fixed left-1/2 top-1/2 z-[var(--ds-z-modal)] w-[calc(100%-var(--ds-space-8))] -translate-x-1/2 -translate-y-1/2",
            "rounded-[var(--ds-radius-lg)] bg-[var(--ds-color-layered-background)] shadow-[var(--ds-shadow-elevation-3)]",
            "outline-none",
            sizeClassName[size],
          ].join(" ")}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              className="absolute right-[var(--ds-space-4)] top-[var(--ds-space-4)] inline-flex h-[var(--ds-icon-lg)] w-[var(--ds-icon-lg)] cursor-pointer items-center justify-center rounded-[var(--ds-radius-full)] text-[var(--ds-color-text-tertiary)] hover:bg-[var(--ds-color-grey-opacity-100)]"
              aria-label="닫기"
            >
              <XIcon />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function DialogTitle({ children }: { children?: ReactNode }) {
  return (
    <DialogPrimitive.Title className="text-[length:var(--ds-font-size-heading4)] leading-[var(--ds-line-height-heading4)] font-semibold text-[var(--ds-color-text-primary)]">
      {children}
    </DialogPrimitive.Title>
  );
}

function DialogDescription({ children }: { children?: ReactNode }) {
  return (
    <DialogPrimitive.Description className="mt-[var(--ds-space-1)] text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)] text-[var(--ds-color-text-secondary)]">
      {children}
    </DialogPrimitive.Description>
  );
}

function DialogHeader({
  children,
  bordered = true,
  showCloseButton = true,
}: {
  children?: ReactNode;
  /** 하단 구분선 표시 여부. `Body` 없이 `Footer`가 바로 붙는 구성(예: ConfirmDialog)에서는 `false`로 둡니다. @default true */
  bordered?: boolean;
  /** 우측 닫기(X) 버튼을 위한 여백 확보 여부 — `Dialog`의 `showCloseButton`과 맞춰 `false`로 둡니다. @default true */
  showCloseButton?: boolean;
}) {
  return (
    <div
      className={[
        "ds-dialog-header px-[var(--ds-space-6)] py-[var(--ds-space-4)]",
        showCloseButton ? "pr-[var(--ds-space-10)]" : "",
        bordered ? "border-b border-[var(--ds-color-border)]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

function DialogBody({ children }: { children?: ReactNode }) {
  return <div className="ds-dialog-body p-[var(--ds-space-6)]">{children}</div>;
}

function DialogFooter({
  children,
  bordered = true,
}: {
  children?: ReactNode;
  /** 상단 구분선 표시 여부. `Body` 없이 `Header`에 바로 붙는 구성(예: ConfirmDialog)에서는 `false`로 둡니다. @default true */
  bordered?: boolean;
}) {
  return (
    <div
      className={[
        // bordered일 땐 위쪽 요소(Body)와 구분선으로 분리되니 pt-4를 그대로 두지만,
        // unbordered(Header 바로 다음)일 땐 Header의 하단 여백과 겹쳐 공백이 두 배로
        // 보이므로 상단 padding을 없애 간격을 좁힙니다.
        "ds-dialog-footer flex justify-end gap-[var(--ds-space-2)] px-[var(--ds-space-6)] pb-[var(--ds-space-4)]",
        bordered ? "border-t border-[var(--ds-color-border)] pt-[var(--ds-space-4)]" : "pt-0",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export const Dialog = Object.assign(DialogRoot, {
  Title: DialogTitle,
  Description: DialogDescription,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogPrimitive.Close,
});
